precision highp float;
varying vec3 vNormal;
varying vec3 vPosWorld;

void main(void) {

    vec3 lightVec=normalize(vec3(0.0,15.0,0.0)-vPosWorld);
    vec3 diffColor=mix(vec3(0.7,0.7,0.7),vNormal,0.4);
    vec3 color=dot(lightVec,vNormal)+vec3(0.5725, 0.4549, 0.3607);

    gl_FragColor = vec4(color,1.0);
}