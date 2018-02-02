#version 330 compatibility

uniform float uLightX, uLightY, uLightZ;
uniform float uK, uP, uY0;

out vec3 vNs;
out vec3 vLs;
out vec3 vEs;
out vec3 vMC;

const float PI = 3.14159265359;

vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );


void
main( )
{ 
	float z = uK * (uY0 - gl_Vertex.y) * sin(2. * PI * gl_Vertex.x / uP);
	vec4 vert = vec4(gl_Vertex.x, gl_Vertex.y, gl_Vertex.z + z, gl_Vertex.w);

	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;

	vNs = normalize( gl_NormalMatrix * gl_Normal );	// surface normal vector

	vLs = eyeLightPosition - ECposition.xyz;		// vector from the point
									// to the light position
	vEs = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
									// to the eye position 
	vMC = gl_Vertex.xyz;
	
	gl_Position = gl_ModelViewProjectionMatrix * vert;
}
