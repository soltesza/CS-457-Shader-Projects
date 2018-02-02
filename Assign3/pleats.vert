#version 330 compatibility

uniform float uLightX, uLightY, uLightZ;

out vec3 vNs;
out vec3 vLs;
out vec3 vEs;
out vec3 vMC;

vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );


void
main( )
{ 

	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;

	vNs = normalize( gl_NormalMatrix * gl_Normal );	// surface normal vector

	vLs = eyeLightPosition - ECposition.xyz;		// vector from the point
									// to the light position
	vEs = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
									// to the eye position 
	vMC = gl_Vertex.xyz;
	
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
