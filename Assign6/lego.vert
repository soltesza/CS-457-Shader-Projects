#version 330 compatibility

out vec3 vNormal;

void main() {
	vNormal = normalize( gl_NormalMatrix * gl_Normal );

	gl_Position = gl_Vertex;
}