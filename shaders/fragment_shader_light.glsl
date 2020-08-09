precision highp float;
varying vec3 vNormal;
varying vec3 vPosWorld;
varying vec2 vUv;

varying float vGlossiness;
varying vec3 vPosCam;
varying vec3 vPosSun;
varying vec3 vPosProjectile;
varying vec3 vPosTorch1;
varying vec3 vPosTorch2;
varying vec3 vColor;

void main(void) {
    gl_FragColor = vec4(vec3(0.9882, 0.8, 0.2902), 1.0);
}