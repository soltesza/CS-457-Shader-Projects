#version 330 compatibility

in vec3 vNs;
in vec3 vLs;
in vec3 vEs;
in vec2 vST;

uniform float uSnowCutoff;
uniform float uBlendAmount;
uniform sampler2D SnowNormalMap;
uniform sampler2D SnowSpecularMap;
uniform sampler2D RockAlbedoMap;
uniform sampler2D RockNormalMap;
uniform sampler2D RockRoughnessMap;

const float baseKa = 0.1;
const float baseKd = 0.6;
const float baseKs = 0.2;
const float BaseShininess = 5.;
const vec4 BaseColor = vec4(1., 1., 1., 1.);
const float rockTexRes = 2;

const float snowKa = 0.2;
const float snowKd = 0.6;
const float snowKs = 0.0;
const float snowShininess = 1;
const vec4 snowColor = vec4(1., 1., 1., 1.);
const float snowTexRes = 4.;

vec4 drawSnow(vec3 Normal, vec3 Light, vec3 Eye) {
	vec3 snowNormal = Normal * texture(SnowNormalMap, vST * snowTexRes).rgb;
		
	vec4 ambient = snowKa * vec4(0.38, 0.75, .98, 1.);

	float d = max( dot(snowNormal,Light), 0. );
	vec4 diffuse = snowKd * d * snowColor;

	float s = 0.;
	if( dot(snowNormal,Light) > 0. )		// only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * Normal * dot(snowNormal,Light) - Light );
		s = pow( max( dot(Eye,ref),0. ), snowShininess );
	}
	vec4 specular = texture(SnowSpecularMap, vST * snowTexRes) * s * vec4(1., 1., 1., 1.);

	return vec4( ambient.rgb + diffuse.rgb + specular.rgb, 1. );
}

vec4 drawBase(vec3 Normal, vec3 Light, vec3 Eye) {
	vec3 baseNormal = Normal * texture(RockNormalMap, vST * rockTexRes).rgb;

	vec4 ambient = baseKa * BaseColor;

	float d = max( dot(baseNormal,Light), 0. );
	vec4 diffuse = baseKd * d * texture(RockAlbedoMap, vST * rockTexRes);
	
	float s = 0.;
	if( dot(baseNormal,Light) > 0. )		// only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * baseNormal * dot(baseNormal,Light) - Light );
		s = pow( max( dot(Eye,ref),0. ), BaseShininess );
	}

	vec4 specular = baseKs * texture(RockRoughnessMap, vST * rockTexRes) * s * vec4(1., 1., 1., 1.);

	return vec4( ambient.rgb + diffuse.rgb + specular.rgb, 1. );
}

void main() {
	vec3 Normal = normalize(vNs);
	vec3 Light = normalize(vLs);
	vec3 Eye = normalize(vEs);

	float t = smoothstep(uSnowCutoff, uBlendAmount, (dot(inverse(gl_NormalMatrix) * Normal * texture(RockNormalMap, vST * rockTexRes).rgb, vec3(0., 1., 0.)) + 1) / 2);
	gl_FragColor = mix(drawBase(Normal, Light, Eye), drawSnow(Normal, Light, Eye), t);
}