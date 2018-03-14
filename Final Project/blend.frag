#version 330 compatibility 

in vec2 vST;
in vec3 vNormal;
in vec3 vLightVector;
in vec3 vEyeVector;

uniform sampler2D splatmap;

uniform sampler2D mat1Height;
uniform sampler2D mat2Height;

uniform sampler2D mat1Diffuse;
uniform sampler2D mat2Diffuse;

uniform sampler2D mat1Normal;
uniform sampler2D mat2Normal;

uniform sampler2D mat1Roughness;
uniform sampler2D mat2Roughness;

uniform vec4 LightColor;
uniform vec4 AmbientColor;

vec4 calcLighting(vec3 diffuseColor, vec3 specularIntensity, vec3 normal) {
	float shininess = 10.;
	
	vec3 light = normalize(vLightVector);
	vec3 eye = normalize(vEyeVector);
	
	
	vec3 ambient = AmbientColor.rgb * (1 - max( dot(normal, light), 0. )) * diffuseColor;
	
	vec3 diffuse = diffuseColor * max( dot(normal, light), 0. ) * LightColor;
	
	vec3 specular = vec3(0.);
	
	if( dot(normal, light) > 0. ) {
		vec3 ref = normalize( 2. * normal * dot(normal, light) - light );
		specular = pow(max(dot(eye, ref), 0.), shininess) * (vec3(1.) - specularIntensity);
	}
	
	return vec4(ambient + diffuse + specular * 0.2, 1.);
}

vec4 drawMat1() {
	vec3 diffuseColor = texture(mat1Diffuse, vST).rgb;
	vec3 normal = vNormal * texture(mat1Normal, vST).rgb;
	vec3 specular = texture(mat1Roughness, vST).rgb;
	
	return calcLighting(diffuseColor, specular, normal);
}

vec4 drawMat2() {
	vec3 diffuseColor = texture(mat2Diffuse, vST).rgb;
	vec3 normal = vNormal * texture(mat2Normal, vST).rgb;
	vec3 specular = texture(mat2Roughness, vST).rgb;
	
	return calcLighting(diffuseColor, specular, normal);
}

void main() {
	float mat1Bias = texture(splatmap, vST).r;
	float mat2Bias = texture(splatmap, vST).g;
	if(texture(mat1Height, vST).r * mat1Bias > texture(mat2Height, vST).r * mat2Bias) {
		gl_FragColor = drawMat1();
	} 
	else {
		gl_FragColor = drawMat2();
	}
}