var gl = null;
var canvas = null;

var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;

// Cámaras
var orbital_camera = null;

// Controladores
var catapult_control = null;

var viewMatrix = mat4.create();
var projMatrix = mat4.create();

// Parámetros del mundo
var CASTLE_SIZE_1 = 12;
var CASTLE_SIZE_2 = 6;
var CASTLE_FLOORS = 3;
var CASTLE_WALL_SIDES = 6; // Entre 4 y 8 lados
// Fin de Parámetros del mundo

var CASTLE_WALL_SIZE = 50;

var castle = null;
var catapult = null;
var castle_wall = null;
var world_floor = null;

function setViewProjectionMatrix() {
    catapult.setViewProjectionMatrix(projMatrix, viewMatrix);
    castle.setViewProjectionMatrix(projMatrix, viewMatrix);
    castle_wall.setViewProjectionMatrix(projMatrix, viewMatrix);
    world_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
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

/*     var m1 = mat4.create();
    mat4.identity(m1);
    mat4.translate(m1, m1, [-2.5, 0.5, 95]);
    catapult.draw(m1); */

    this.catapult_control.drawCatapult(catapult);

    var m1 = mat4.create();
    mat4.identity(m1);
    mat4.translate(m1, m1, [0, 0, 0]);
    castle.draw(m1);

    var m1 = mat4.create();
    mat4.identity(m1);
    mat4.translate(m1, m1, [-CASTLE_WALL_SIZE/2, 0, CASTLE_WALL_SIZE/2]);
    mat4.rotate(m1, m1, -Math.PI/2, [1, 0, 0]);
    castle_wall.draw(m1);

    var m1 = mat4.create();
    mat4.identity(m1);
    mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
    mat4.translate(m1, m1, [-1.5, 0, 0]);
    world_floor.draw(m1);
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
}

function initWorldObjects() {
    catapult = new Catapult();
    castle = new Castle(CASTLE_SIZE_1, CASTLE_SIZE_2, CASTLE_FLOORS);
    castle_wall = new CastleWall(CASTLE_WALL_SIDES, CASTLE_WALL_SIZE);

    world_floor = new WorldFloor(CASTLE_WALL_SIZE);
}

function initWorldCameras(canvas) {
    orbital_camera = new OrbitalCamera(canvas);
}

function initControllers(canvas) {
    this.catapult_control = new CatapultControl(canvas);
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
    initControllers(canvas);
    initWorldObjects();

    // Pone en negro el fondo del canvas
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    tick();
}