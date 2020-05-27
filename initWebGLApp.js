var gl = null;
var canvas = null;
var shaderProgram = null;

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

function initShaders() {
    shaderProgram = utils.addShaderProg(gl, 'vertex_shader.glsl', 'fragment_shader.glsl');
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }
    
    //use program
    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    shaderProgram.modelMatrixUniform = gl.getUniformLocation(shaderProgram, "modelMatrix");
    shaderProgram.viewMatrixUniform = gl.getUniformLocation(shaderProgram, "viewMatrix");
    shaderProgram.projMatrixUniform = gl.getUniformLocation(shaderProgram, "projMatrix");
    shaderProgram.normalMatrixUniform = gl.getUniformLocation(shaderProgram, "normalMatrix");
}
