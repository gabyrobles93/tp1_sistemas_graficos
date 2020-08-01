var gl = null;
var canvas = null;

var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;
var vec3 = glMatrix.vec3;
var vec4 = glMatrix.vec4;

var viewMatrix = mat4.create();
var projMatrix = mat4.create();

var FPS = 25;
var t = 0;

var CASTLE_SIZE_1 = 12;
var CASTLE_SIZE_2 = 6;
var CASTLE_FLOORS = 3;
var CASTLE_WALL_SIDES = 6; // Entre 4 y 8 lados
var CASTLE_WALL_DOOR_OPENING = 100; // 0 a 100%
var SUN_POSITION = [0, 0, 0];
var TORCH_1_POSITION = [0, 0, 0];
var TORCH_2_POSITION = [0, 0, 0];
var PROJECTILE_POSITION = [0, 0, 0];

var CASTLE_WALL_SIZE = 50;

// Controladores
var catapult_control = null;
var projectile_control = null;
var camera_control = null;
var menu_control = null;

var castle = null;
var catapult = null;
var projectile = null;
var castle_wall = null;
var axis = null;
var world_floor = null;
var sky = null;

function setViewProjectionMatrix() {
    castle_wall.setViewProjectionMatrix(projMatrix, viewMatrix);
    catapult.setViewProjectionMatrix(projMatrix, viewMatrix);
    castle.setViewProjectionMatrix(projMatrix, viewMatrix);
    projectile.setViewProjectionMatrix(projMatrix, viewMatrix);
    world_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
    axis.setViewProjectionMatrix(projMatrix, viewMatrix);
    sky.setViewProjectionMatrix(projMatrix, viewMatrix);
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
    
    sky.draw();
    castle.draw();

    mat4.identity(m1);
    m1 = castle_wall.translate(m1, -CASTLE_WALL_SIZE/2, 0, CASTLE_WALL_SIZE/2);
    castle_wall.rotate_x(m1, -90);
    castle_wall.draw();

    mat4.identity(m1);
    m1 = world_floor.rotate_z(m1, 90);
    world_floor.translate(m1, -1.5, 0, 0);
    world_floor.draw();

    catapult_control.drawCatapult();
    projectile_control.drawProjectile(catapult_control.getProjectileModelMatrix(), catapult_control.getArmAngle(), catapult_control.getMaxArmAngle());
}

function animate(t) {
    projectile_control.animate(t);
}

function tick() {
    requestAnimFrame(tick);
    t += 1/FPS;
    animate(t);
    drawScene();
}

function initWorldObjects() {
    axis = new Axis();

    catapult = new Catapult();
    catapult_control.setCatapult(catapult);
    castle = new Castle(CASTLE_SIZE_1, CASTLE_SIZE_2, CASTLE_FLOORS);
    projectile = new Sphere(0.9, 30, 30, MaterialsList.COLOR_GREY);
    projectile_control.setProjectile(projectile);
    castle_wall = new CastleWall(CASTLE_WALL_SIDES, CASTLE_WALL_SIZE);
    world_floor = new WorldFloor(CASTLE_WALL_SIZE);
    sky = new Sphere(300, 30, 30, MaterialsList.COLOR_BLUE);

}

function initControllers(canvas) {
    catapult_control = new CatapultControl(canvas);
    camera_control = new CameraControl(canvas, catapult_control);
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