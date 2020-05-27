var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;
var vec3 = glMatrix.vec3;

var modelMatrix = mat4.create();
var viewMatrix = mat4.create();
var projMatrix = mat4.create();
var normalMatrix = mat3.create();

var sphere = null;
var sphere2 = null;

function setViewProjectionMatrix() {
    gl.uniformMatrix4fv(shaderProgram.projMatrixUniform, false, projMatrix);
    gl.uniformMatrix4fv(shaderProgram.viewMatrixUniform, false, viewMatrix);
}

function setupSceneCamera() {
    var m_trans = mat4.create();

    mat4.identity(m_trans);

    mat4.translate(viewMatrix, m_trans, [0, 0, 0]);

    setViewProjectionMatrix();
}

function drawScene(){
    // Se configura el vierport dentro de área ¨canvas¨. en este caso se utiliza toda 
    // el área disponible
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    
    // Se habilita el color de borrado para la pantalla (Color Buffer) y otros buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Se configura la matriz de proyección
    mat4.perspective(projMatrix, 45, gl.viewportWidth / gl.viewportHeight, .4, 10000.0);

    // Definimos la ubicación de la camara
    setupSceneCamera();	

    var m1 = mat4.create();
    mat4.identity(m1);;
    mat4.translate(m1, m1, [0, 0, -10]);

    sphere.draw(m1);

    mat4.identity(m1);;
    mat4.translate(m1, m1, [0, -3, -10]);

    sphere2.draw(m1);
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
}

function initWorldObjects() {
    sphere = new Sphere(30, 30, 1);
    sphere2 = new Sphere(30, 30, 0.5);
}   

function webGLStart() {
    var canvas = document.getElementById("canvas");
    initGL(canvas);
    initShaders();
    initWorldObjects();

    // Pone en negro el fondo del canvas
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    tick();
}