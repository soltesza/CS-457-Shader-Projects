#version 330 compatibility

in vec3 Ns;
in vec3 Ls;
in vec3 Es;

uniform float uKa, uKd, uKs;

uniform vec4 uColor;
uniform vec4 uSpecularColor;

uniform float uShininess;

void
main( )
{
	vec3 Normal = normalize(Ns);;
	vec3 Light = normalize(Ls);
	vec3 Eye = normalize(Es);

	vec4 ambient = uKa * uColor;

	float d = max( dot(Normal,Light), 0. );
	vec4 diffuse = uKd * d * uColor;

	float s = 0.;
	if( dot(Normal,Light) > 0. )		// only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * Normal * dot(Normal,Light) - Light );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec4 specular = uKs * s * uSpecularColor;

	gl_FragColor = vec4( ambient.rgb + diffuse.rgb + specular.rgb, 1. );
}