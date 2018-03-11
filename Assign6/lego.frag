#version 330 compatibility

in float gLightIntensity;

void main() {
	gl_FragColor = vec4( gLightIntensity*vec3(0.6, 0.3, 0.5), 1. );
}