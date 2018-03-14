#version 330 compatibility
#extension GL_EXT_gpu_shader4: enable
#extension GL_EXT_geometry_shader4: enable

layout( triangles ) in;
layout( triangle_strip, max_vertices=200 ) out;

uniform int uLevel;
uniform float uQuantize;
uniform bool uModelCoords;

in vec3 vNormal[3];
out float gLightIntensity;

const vec3 LIGHTPOS = vec3( 0., 10., 0. );

vec3 V01, V02;

float Quantize( float f ) {
	f *= uQuantize;
	f += .5;		// round-off
	int fi = int( f );
	f = float( fi ) / uQuantize;
	
	return f;
}

vec3 QuantizeVec3( vec3 v ) {
	vec3 vv;
	vv.x = Quantize( v.x );
	vv.y = Quantize( v.y );
	vv.z = Quantize( v.z );
	return vv;
}

void ProduceVertex( float s, float t ) {
	vec3 v = gl_in[0].gl_Position.xyz + vec3(s)*V01 + vec3(t)*V02;
	vec3 n = v;
	vec3 tnorm = normalize( gl_NormalMatrix * n ); // the transformed normal
	
	if(uModelCoords) {
		vec4 ECposition = gl_ModelViewMatrix * vec4( v, 1. );
		gLightIntensity = abs( dot( normalize(LIGHTPOS - ECposition.xyz), tnorm ) );
		gl_Position = gl_ProjectionMatrix * vec4(QuantizeVec3(ECposition.xyz), 1.);
	} else {
		vec4 ECposition = vec4( v, 1. );
		gLightIntensity = abs( dot( normalize(LIGHTPOS - ECposition.xyz), tnorm ) );
		gl_Position = gl_ModelViewProjectionMatrix * vec4(QuantizeVec3(ECposition.xyz), 1.);	
	}
	EmitVertex( );
}


void main() {
	V01 = (gl_in[1].gl_Position - gl_in[0].gl_Position).xyz;
	V02 = (gl_in[2].gl_Position - gl_in[0].gl_Position).xyz;
	
	vec3 N01 = vNormal[1] - vNormal[0];
	vec3 N02 = vNormal[2] - vNormal[0];
	
	int numLayers = 1 << uLevel;
	float dt = 1. / float( numLayers );
	float t_top = 1.;
	
	for(int it = 0; it < numLayers; it++) {
		float t_bot = t_top - dt;
		float smax_top = 1. - t_top;
		float smax_bot = 1. - t_bot;
		int nums = it + 1;
		float ds_top = smax_top / float( nums - 1 );
		float ds_bot = smax_bot / float( nums );
		float s_top = 0.;
		float s_bot = 0.;
		for( int is = 0; is < nums; is++ ) {
			ProduceVertex( s_bot, t_bot );
			ProduceVertex( s_top, t_top );
			s_top += ds_top;
			s_bot += ds_bot;
		}
		ProduceVertex( s_bot, t_bot );
		EndPrimitive( );
		t_top = t_bot;
		t_bot -= dt;
	}
}

/*
void main() {
	gl_Position = gl_ModelViewProjectionMatrix * vec4(QuantizeVec3(gl_in[0].gl_Position.xyz), 1.);
	gLightIntensity = abs( dot( normalize(LIGHTPOS - gl_Position.xyz), vNormal[0] ) );
	EmitVertex();
	gl_Position = gl_ModelViewProjectionMatrix * vec4(QuantizeVec3(gl_in[1].gl_Position.xyz), 1.);
	gLightIntensity = abs( dot( normalize(LIGHTPOS - gl_Position.xyz), vNormal[0] ) );
	EmitVertex();
	gl_Position = gl_ModelViewProjectionMatrix * vec4(QuantizeVec3(gl_in[2].gl_Position.xyz), 1.);
	gLightIntensity = abs( dot( normalize(LIGHTPOS - gl_Position.xyz), vNormal[0] ) );
	EmitVertex();
	EndPrimitive();
}
*/