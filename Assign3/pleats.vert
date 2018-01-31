#version 330 compatibility

uniform float uLightX, uLightY, uLightZ;

out vec3 Ns;
out vec3 Ls;
out vec3 Es;

vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );


void
main( )
{ 

	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;

	Ns = normalize( gl_NormalMatrix * gl_Normal );	// surface normal vector

	Ls = eyeLightPosition - ECposition.xyz;		// vector from the point
									// to the light position
	Es = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
									// to the eye position 

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
