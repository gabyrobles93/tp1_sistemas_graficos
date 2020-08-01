precision highp float;
varying vec3 vNormal;
varying vec3 vPosWorld;

varying vec3 vPosSun;
varying vec3 vPosProjectile;
varying vec3 vPosTorch1;
varying vec3 vPosTorch2;
varying vec3 vColor;

varying vec2 vUv;

void main(void) {
    vec3 lightVec = normalize(vPosSun - vPosWorld);
    vec3 color = 0.15 * dot(lightVec, vNormal) + 0.85 * vColor;

    gl_FragColor = vec4(color, 1.0);
}