var MaterialsList = {
    TEST_NORMAL: ['test', 'test_normal', 0],
    COLOR_LIGHT_BROWN: ['color', [0.5725, 0.4549, 0.3607], 0],
    COLOR_DARK_BROWN: ['color', [0.2549, 0.1764, 0.1803], 0],
    COLOR_GREY: ['color', [0.5843, 0.5882, 0.6078], 0],
    COLOR_WHITE: ['color', [1.0, 1.0, 1.0], 0],
    COLOR_BEIGE: ['color', [0.7607, 0.7450, 0.5529], 0],
    COLOR_BLUE: ['color', [0.3607, 0.3725, 0.5882], 0],
    COLOR_WALL_GREY: ['color', [0.5607, 0.5647, 0.5843], 0],
    COLOR_GREEN: ['color', [0.2627, 0.5607, 0.2862], 0],
    COLOR_AXIS_RED: ['color', [1, 0, 0], 0],
    COLOR_AXIS_GREEN: ['color', [0, 1, 0], 0],
    COLOR_AXIS_BLUE: ['color', [0, 0, 1], 0],
    LIGHT_FIRE: ['light', 'fire', 0],
    CASTLE_WINDOW: ['color', [0.2549, 0.1764, 0.1803], 9],
    CASTLE_CEILING: ['color', [0.3607, 0.3725, 0.5882], 15],
    WATER: ['color', [0.3607, 0.3725, 0.5882], 7]
};

class Material {
    constructor(type) {
        this.type = type;

        this.vertex_program_name = 'vertex_shader_' + 'default' + '.glsl';
        //this.fragment_program_name = 'fragment_shader_' + type + '.glsl';
        if (type[0].includes('color')) {
            this.fragment_program_name = 'fragment_shader_regular.glsl';
        } else if (type[0].includes('test')) {
            this.fragment_program_name = 'fragment_shader_test_normal.glsl';
        } else if (type[0].includes('light')) {
            this.fragment_program_name = 'fragment_shader_light.glsl';
        }

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

        gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
    }

    setProjectilePositionUniform(projectilePosition) {
        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosProjectile, projectilePosition);
    }

    setCamPositionUniform(camPosition) {
        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosCam, camPosition);        
    }

    setSunPositionUniform(sunPosition) {
        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosSun, sunPosition);
    }

    setTorch1Uniform(torch1Position) {
        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosTorch1, torch1Position);
    }

    setTorch2Uniform(torch2Position) {
        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosTorch2, torch2Position);
    }

    setColorUniform(color = this.type[1]) {
        if (this.type[0] != 'color') {
            color = [255, 255, 255];
        }

        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uColor, color);
    }

    setGlossinessUniform(glossiness = this.type[2]) {
        gl.useProgram(this.shaderProgram);

        gl.uniform1f(this.shaderProgram.uGlossiness, glossiness); 
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

        this.shaderProgram.uGlossiness = gl.getUniformLocation(this.shaderProgram, "uGlossiness");
        this.shaderProgram.uPosCam = gl.getUniformLocation(this.shaderProgram, "uPosCam");
        this.shaderProgram.uPosSun = gl.getUniformLocation(this.shaderProgram, "uPosSun");
        this.shaderProgram.uPosProjectile = gl.getUniformLocation(this.shaderProgram, "uPosProjectile");
        this.shaderProgram.uPosTorch1 = gl.getUniformLocation(this.shaderProgram, "uPosTorch1");
        this.shaderProgram.uPosTorch2 = gl.getUniformLocation(this.shaderProgram, "uPosTorch2");
        this.shaderProgram.uColor = gl.getUniformLocation(this.shaderProgram, "uColor");
    }
    
}