#version 330 compatibility

uniform float LightX, LightY, LightZ;

out vec3 vNs;
out vec3 vLs;
out vec3 vEs;
out vec2 vST;

vec3 eyeLightPosition = vec3( LightX, LightY, LightZ );

void main() {
	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;

	vNs = normalize( gl_NormalMatrix * gl_Normal );	// surface normal vector
	//vNs = normalize( gl_Normal );
	
	vLs = eyeLightPosition - ECposition.xyz;		// vector from the point
									// to the light position
	vEs = vec3( 0., 0., 0. ) - ECposition.xyz;		// vector from the point
									// to the eye position 
	vST = gl_MultiTexCoord0.st;
									
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}