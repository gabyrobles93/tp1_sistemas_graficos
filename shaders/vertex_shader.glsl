precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 modelMatrix;            
uniform mat4 viewMatrix;
uniform mat4 projMatrix;
uniform mat3 normalMatrix;

varying vec3 vNormal;    
varying vec4 vPosWorld;  

void main(void) {
    vPosWorld = viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = projMatrix * vPosWorld;

    vNormal = normalize(normalMatrix * normalize(aVertexNormal));                              
}