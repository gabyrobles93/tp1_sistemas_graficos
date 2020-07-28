var gl = null;
var canvas = null;

var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;

var viewMatrix = mat4.create();
var projMatrix = mat4.create();

var CASTLE_SIZE_1 = 12;
var CASTLE_SIZE_2 = 6;
var CASTLE_FLOORS = 3;
var CASTLE_WALL_SIDES = 6; // Entre 4 y 8 lados

// Controladores
var catapult_control = null;
var projectile_control = null;
var camera_control = null;
var menu_control = null;

var castle = null;

var axis = null;
var sphere = null;
var cube = null;
var cilinder = null;

function setViewProjectionMatrix() {
    castle.setViewProjectionMatrix(projMatrix, viewMatrix);
    axis.setViewProjectionMatrix(projMatrix, viewMatrix);
    sphere.setViewProjectionMatrix(projMatrix, viewMatrix);
    cube.setViewProjectionMatrix(projMatrix, viewMatrix);
    cilinder.setViewProjectionMatrix(projMatrix, viewMatrix);
}

function setupSceneCamera() {
    var m_trans = mat4.create();

    mat4.identity(m_trans);

    //mat4.translate(viewMatrix, m_trans, [0, 0, -15]);

    viewMatrix = camera_control.getViewMatrix();

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

    axis.draw()

    var m1 = mat4.create();
    mat4.identity(m1);

    m1 = castle.translate(m1, 50, 0, 0);
    castle.rotate_z(m1, 90);
    castle.draw();
}

function animate(t) {
    /* projectile_control.animate(t); */
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
}

function initWorldObjects() {
    axis = new Axis();

    castle = new Castle(CASTLE_SIZE_1, CASTLE_SIZE_2, CASTLE_FLOORS);
    sphere = new Sphere(0.9, 30, 30, MaterialsList.TEST_NORMAL);
    cube = new Cube(1, 1, 2, true, MaterialsList.TEST_NORMAL);
    cilinder = new Cilinder(0.6, 5, true, MaterialsList.LIGHT_BROWN);
}

function initControllers(canvas) {
    camera_control = new CameraControl(canvas, catapult_control);
    catapult_control = new CatapultControl(canvas);
    projectile_control = new ProjectileControl(canvas);
    
    menu_control = new MenuControl();
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
    initControllers(canvas);
    initWorldObjects();

    // Pone en negro el fondo del canvas
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    tick();
}