#version 330 compatibility

in float vLightIntensity;
in vec2 vST;

uniform float uAd = 0.1;
uniform float uBd = 0.1;
uniform float uTol = 0.0;

const vec3 c0 = vec3(0.9);
const vec3 c1 = vec3(0.9, 0.2, 0.2);

void
main() {
	float Ar = uAd/2.;
	float Br = uBd/2.;
	int numins = int( vST.s / uAd );
	int numint = int( vST.t / uBd );
	float sc = numins * uAd + Ar;
	float tc = numint * uBd + Br;
	
	vec3 color = mix(c0, c1, smoothstep(1 - uTol, 1 + uTol, pow(((vST.s - sc)/Ar), 2) + pow(((vST.t - tc)/Br), 2)));
	
	gl_FragColor = vec4(color * vLightIntensity, 1.);
}