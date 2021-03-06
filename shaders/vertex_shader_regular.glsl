precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextCoords;

uniform mat4 modelMatrix;            
uniform mat4 viewMatrix;
uniform mat4 projMatrix;
uniform mat4 normalMatrix;

uniform float uGlossiness;
uniform vec3 uPosCam;
uniform vec3 uPosSun;
uniform vec3 uPosProjectile;
uniform vec3 uPosTorch1;
uniform vec3 uPosTorch2;
uniform vec3 uColor;

varying vec3 vNormal;    
varying vec3 vPosWorld;

varying float vGlossiness;
varying vec3 vPosCam;
varying vec3 vPosSun;
varying vec3 vPosProjectile;
varying vec3 vPosTorch1;
varying vec3 vPosTorch2;
varying vec3 vColor;
varying highp vec2 vTextCoords;

void main(void) {
    gl_Position = projMatrix * viewMatrix * modelMatrix * vec4(aVertexPosition, 1.0);

    vPosWorld=(modelMatrix*vec4(aVertexPosition,1.0)).xyz;    //la posicion en coordenadas de mundo
    vNormal=(normalMatrix*vec4(aVertexNormal,1.0)).xyz;       //la normal en coordenadas de mundo                
    
    vGlossiness = uGlossiness;
    vPosCam = uPosCam;
    vPosSun = uPosSun;
    vPosProjectile = uPosProjectile;
    vPosTorch1 = uPosTorch1;
    vPosTorch2 = uPosTorch2;
    vColor = uColor;
    vTextCoords = aTextCoords;
}