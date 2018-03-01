#version 330 compatibility 

in vec2 vST;

uniform sampler2D splatmap;

uniform sampler2D mat1Height;
uniform sampler2D mat2Height;

uniform sampler2D mat1Diffuse;
uniform sampler2D mat2Diffuse;

vec4 drawMat1() {
	return texture(mat1Diffuse, vST);
}

vec4 drawMat2() {
	return texture(mat2Diffuse, vST);
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