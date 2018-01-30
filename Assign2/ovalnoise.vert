#version 330 compatibility

out vec3 vMCposition;
//out vec3 vECposition;
out vec3 vChromaColor;
out float vLightIntensity; 
out vec2 vST;

uniform float uChromaRed;
uniform float uChromaBlue;

vec3 LIGHTPOS   = vec3( -2., 0., 10. );

void
main()
{
	vST = gl_MultiTexCoord0.st;

	vec3 tnorm = normalize( gl_NormalMatrix * gl_Normal );
	vec3 vECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
	vLightIntensity  = abs( dot( normalize(LIGHTPOS - vECposition), tnorm ) );
	
	vMCposition  = gl_Vertex.xyz;
	
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}