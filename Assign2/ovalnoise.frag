#version 330 compatibility

in float vLightIntensity;
in vec2 vST;
in vec3 vMCposition;
//in vec3 vECposition;
in vec3 vChromaColor;

uniform float uAd = 0.1;
uniform float uBd = 0.1;
uniform float uTol = 0.0;
uniform float uNoiseAmp;
uniform float uNoiseFreq;
uniform float uAlpha;
uniform sampler3D Noise3; //noise texture built in to glman

void
main() {
	vec4 c0 = vec4(vec3(0.9) * vLightIntensity, 1.);					// Dot color
	vec4 c1 = vec4(vec3(0.9, 0.2, 0.2) * vLightIntensity, uAlpha);		// Background color

	vec3 stp = uNoiseFreq * vMCposition; //get index to sample from based on position
	vec4 noiseVector = texture(Noise3, stp); //sample noise texture

	float sum = noiseVector.r + noiseVector.g + noiseVector.b + noiseVector.a; //4 octave noise
	
	sum -= 2.; //normalize sum
	
	sum *= uNoiseAmp; //incorporate noise amplitude
	
	
	float Ar = uAd/2.;
	float Br = uBd/2.;
	int numins = int( vST.s / uAd );
	int numint = int( vST.t / uBd );
	
	float sc = float(numins) * uAd  +  Ar;
	float ds = vST.s - sc;                   // wrt ellipse center
	float tc = float(numint) * uBd  +  Br;
	float dt = vST.t - tc;                   // wrt ellipse center

	float oldDist = sqrt( ds*ds + dt*dt );
	float newDist = oldDist + sum;
	float scale = newDist / oldDist;        // this could be < 1., = 1., or > 1.

	ds *= scale;                            // scale by noise factor
	ds /= Ar;                               // ellipse equation

	dt *= scale;                            // scale by noise factor
	dt /= Br;                               // ellipse equation

	float d = ds*ds + dt*dt;
	
	vec4 color = mix(c0, c1, smoothstep(1 - uTol, 1 + uTol, d));

	if(uAlpha == 0.) {
		if(color == c1) {
			discard;
		}
	}
	
	gl_FragColor = color;
}