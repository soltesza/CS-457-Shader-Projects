#version 330 compatibility

uniform sampler2D uImageUnit;
uniform float uScenter;
uniform float uTcenter;
uniform float uDs;
uniform float uDt;
uniform float uMagFactor;
uniform float uRotAngle;

in vec2 vST;

void main() {
	vec4 color;

	if((vST.s < uScenter + uDs && vST.s > uScenter - uDs) && (vST.t < uTcenter + uDt && vST.t > uTcenter - uDt)) {
		vec2 magnificationOffset = (vec2(uScenter, uTcenter) - vST) * uMagFactor;
		
		vec2 rotatedST;
		rotatedST = vec2(uScenter, uTcenter) + vec2((vST.s - uScenter)*cos(uRotAngle) - (vST.t - uTcenter)*sin(uRotAngle),(vST.s -  uScenter)*sin(uRotAngle) + (vST.t - uTcenter)*cos(uRotAngle));
		//rotatedST = vec2(uScenter, uTcenter) + vec2((vST.s)*cos(uRotAngle) - (vST.t)*sin(uRotAngle),(vST.s)*sin(uRotAngle) + (vST.t)*cos(uRotAngle));
		
		color = texture(uImageUnit, rotatedST + magnificationOffset);
	}
	else {
		color = texture(uImageUnit, vST);
	}
	
	gl_FragColor = color;
}