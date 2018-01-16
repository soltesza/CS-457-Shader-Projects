#version 330 compatibility

in float vLightIntensity;
in vec2 vST;

uniform float uAd;
uniform float uBd;
uniform float uTol;

void
main() {
	float Ar = uAd/2.;
	float Br = uBd/2.;
	int numins = int( vST.s / uAd );
	int numint = int( vST.t / uBd );
	uc = numins * uAd + Ar;
	vc = numint * uBd + Br;
	
	gl_FragColor = vec4(0.7, 0.2, 0.2, 1.);
}