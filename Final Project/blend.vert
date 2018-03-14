#version 330 compatibility 

out vec2 vST;
out vec3 vNormal;
out vec3 vLightVector;
out vec3 vEyeVector;

uniform float LightX, LightY, LightZ;

vec3 lightPos = vec3(LightX, LightY, LightZ);

void main() {
	vST = gl_MultiTexCoord0.st;
	vNormal = normalize(gl_NormalMatrix * gl_Normal);
	
	vLightVector = lightPos - (gl_ModelViewMatrix * gl_Vertex).xyz;
	vEyeVector = vec3(0., 0., 0.) - (gl_ModelViewMatrix * gl_Vertex).xyz;
	
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}