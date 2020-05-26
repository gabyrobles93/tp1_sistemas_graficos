var mat4 = glMatrix.mat4;
var mat3 = glMatrix.mat3;
var vec3 = glMatrix.vec3;

var modelMatrix = mat4.create();
var viewMatrix = mat4.create();
var projMatrix = mat4.create();
var normalMatrix = mat4.create();

var rotate_angle = -1.57078;

var sphere = null;

function drawScene(){
    setupVertexShaderMatrix();

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
    gl.drawElements( gl.TRIANGLE_STRIP, trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
}

function tick() {
    requestAnimFrame(tick);
    drawScene();
    animate();
}

function initWorldObjects() {
    setupBuffers();
}

function setupGL(canvas) {
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.1, 0.1, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Matrix de Proyeccion Perspectiva

    mat4.perspective(projMatrix,45, canvas.width / canvas.height, 0.1, 100.0);
    
    mat4.identity(modelMatrix);
    mat4.rotate(modelMatrix,modelMatrix, -1.57078, [1.0, 0.0, 0.0]);

    mat4.identity(viewMatrix);
    mat4.translate(viewMatrix,viewMatrix, [0.0, 0.0, -15.0]);
}

function setupVertexShaderMatrix(){
    var modelMatrixUniform = gl.getUniformLocation(shaderProgram, "modelMatrix");
    var viewMatrixUniform  = gl.getUniformLocation(shaderProgram, "viewMatrix");
    var projMatrixUniform  = gl.getUniformLocation(shaderProgram, "projMatrix");
    var normalMatrixUniform  = gl.getUniformLocation(shaderProgram, "normalMatrix");

    gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrix);
    gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
    gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
    gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);
}        

function webGLStart() {
    var canvas = document.getElementById("canvas");
    initGL(canvas);
    setupGL(canvas);
    initShaders();
    setupVertexShaderMatrix();
    initWorldObjects();

    tick();
}