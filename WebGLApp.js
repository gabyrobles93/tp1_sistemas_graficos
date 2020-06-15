var gl = null;
var canvas = null;

var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;

var orbital_camera = null;

var viewMatrix = mat4.create();
var projMatrix = mat4.create();

var castle = null;
var catapult = null;

var test_castle_column = null;

function setViewProjectionMatrix() {
    catapult.setViewProjectionMatrix(projMatrix, viewMatrix);
    castle.setViewProjectionMatrix(projMatrix, viewMatrix);
    test_castle_column.setViewProjectionMatrix(projMatrix, viewMatrix);
}

function setupSceneCamera() {
    var m_trans = mat4.create();

    mat4.identity(m_trans);

    //mat4.translate(viewMatrix, m_trans, [0, 0, -15]);

    viewMatrix = orbital_camera.getViewMatrix();

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
    mat4.identity(m1);
    mat4.translate(m1, m1, [0, 0, 30]);
    catapult.draw(m1);

    var m1 = mat4.create();
    mat4.identity(m1);
    mat4.translate(m1, m1, [0, 0, 0]);
    //castle.draw(m1);

    var m1 = mat4.create();
    mat4.identity(m1);
    test_castle_column.draw(m1);
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
}

function initWorldObjects() {
    catapult = new Catapult();
    castle = new Castle(12, 6, 2);

    test_castle_column = new CastleColumn();
}

function initWorldCameras(canvas) {
    orbital_camera = new OrbitalCamera(canvas);
}

function initGL(canvas) {
    try {
        gl = canvas.getContext("webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL");
    }
}

function webGLStart() {
    var canvas = document.getElementById("canvas");
    initGL(canvas);
    initWorldCameras(canvas);
    initWorldObjects();

    // Pone en negro el fondo del canvas
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    tick();
}