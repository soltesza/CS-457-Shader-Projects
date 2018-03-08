#version 330 compatibility

in float gLightIntensity;

uniform vec3 uColor;

void main() {
	gl_FragColor = vec4( gLightIntensity*uColor.rgb, 1. );
}