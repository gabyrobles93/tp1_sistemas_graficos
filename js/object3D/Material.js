var MaterialsList = {
    DEFAULT: 'default',
    LIGHT_BROWN: 'light_brown',
    DARK_BROWN: 'dark_brown',
    GREY: 'grey',
    WHITE: 'white',
    BEIGE: 'beige',
};

class Material {
    constructor(type) {
        this.vertex_program_name = 'vertex_shader_' + 'default' + '.glsl';
        this.fragment_program_name = 'fragment_shader_' + type + '.glsl';

        this.shaderProgram = utils.addShaderProg(gl, this.vertex_program_name, this.fragment_program_name);
        
        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program.");
        }

        this._initShaders();
    }

    setModelMatrixUniform(modelMatrix) {
        gl.useProgram(this.shaderProgram);

        gl.uniformMatrix4fv(this.shaderProgram.modelMatrixUniform, false, modelMatrix);
    }

    setNormalMatrixUniform(normalMatrix) {
        gl.useProgram(this.shaderProgram);

        gl.uniformMatrix3fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
    }

    setVertexPositionAttribute(webgl_position_buffer) {
        gl.useProgram(this.shaderProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);    
    }

    setVertexNormalAttribute(webgl_normal_buffer) {
        gl.useProgram(this.shaderProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        gl.useProgram(this.shaderProgram);
        
        gl.uniformMatrix4fv(this.shaderProgram.projMatrixUniform, false, projMatrix);
        gl.uniformMatrix4fv(this.shaderProgram.viewMatrixUniform, false, viewMatrix);
    }

    // Private

    _initShaders() {
        //use program
        gl.useProgram(this.shaderProgram);
    
        this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
    
        this.shaderProgram.vertexNormalAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
    
        this.shaderProgram.modelMatrixUniform = gl.getUniformLocation(this.shaderProgram, "modelMatrix");
        this.shaderProgram.viewMatrixUniform = gl.getUniformLocation(this.shaderProgram, "viewMatrix");
        this.shaderProgram.projMatrixUniform = gl.getUniformLocation(this.shaderProgram, "projMatrix");
        this.shaderProgram.normalMatrixUniform = gl.getUniformLocation(this.shaderProgram, "normalMatrix");
    }
    
}