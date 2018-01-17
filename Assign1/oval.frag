#version 330 compatibility

in float vLightIntensity;
in vec2 vST;

uniform float uAd = 0.1;
uniform float uBd = 0.1;
uniform float uTol = 0.0;

void
main() {
	float Ar = uAd/2.;
	float Br = uBd/2.;
	int numins = int( vST.s / uAd );
	int numint = int( vST.t / uBd );
	float sc = numins * uAd + Ar;
	float tc = numint * uBd + Br;
	
	//vec3 color = vec3(pow(((vST.s - sc)/Ar), 2) + pow(((vST.t - tc)/Br), 2));
	
	vec3 color = vec3(0.9);
	
	if((pow(((vST.s - sc)/Ar), 2) + pow(((vST.t - tc)/Br), 2)) <= 1){
		color = vec3(0.9, 0.1, 0.1);
	}
	
	gl_FragColor = vec4(color, 1.);
}