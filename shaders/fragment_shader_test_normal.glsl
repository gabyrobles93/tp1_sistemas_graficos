precision highp float;
varying vec3 vNormal;
varying vec3 vPosWorld;
varying vec2 vUv;

void main(void) {
    vec3 lightVec = normalize(vec3(0.0, 3.0, 5.0) - vPosWorld);
    vec3 diffColor = mix(vec3(0.7, 0.7, 0.7), vNormal, 0.4);
    vec3 color = dot(lightVec, vNormal) * diffColor + vec3(.60784, .60784, 0.60784);

    vec3 nrmX = vec3(abs(vNormal.x), 0.0, 0.0);
    vec3 nrmY = vec3(0.0, abs(vNormal.y), 0.0);
    vec3 nrmZ = vec3(0.0, 0.0, abs(vNormal.z));

    gl_FragColor = vec4(abs(vNormal), 1.0);
}