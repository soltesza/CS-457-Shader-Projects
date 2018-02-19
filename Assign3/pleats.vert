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
	vec4 vert = vec4(gl_Vertex.x, gl_Vertex.y, z, gl_Vertex.w);

	vec4 ECposition = gl_ModelViewMatrix * vert;
	
	float dzdx = uK * (uY0-gl_Vertex.y) * (2. * PI/uP) * cos( 2. * PI * gl_Vertex.x/uP ); 
	float dzdy = -uK * sin( 2. * PI * gl_Vertex.x/uP );
	
	vNs = normalize( gl_NormalMatrix * cross(vec3(1., 0., dzdx ), vec3(0., 1., dzdy)) );
	
	vLs = eyeLightPosition - ECposition.xyz;		// vector from the point
									// to the light position
	vEs = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
									// to the eye position 
	vMC = vert.xyz;
	
	gl_Position = gl_ModelViewProjectionMatrix * vert;
}
