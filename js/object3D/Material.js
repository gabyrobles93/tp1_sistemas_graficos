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
    CASTLE_CEILING: ['texture', 'castle_ceiling', 15],
    WATER: ['texture', 'water', 7],
    GRASS: ['texture', 'grass', 0],
    WALL: ['texture', 'brick_wall', 0],
    CASTLE_WALL: ['texture', 'brick_castle', 0],
    CASTLE_COLUMN: ['texture', 'brick_castle_column', 0],
    TOWER: ['texture', 'brick_tower', 0]
};

class Material {
    constructor(type) {
        this.type = type;
        this.textures = [];

        //this.fragment_program_name = 'fragment_shader_' + type + '.glsl';
        if (type[0].includes('color')) {
            this.fragment_program_name = 'fragment_shader_regular.glsl';
            this.vertex_program_name = 'vertex_shader_' + 'regular' + '.glsl';
        } else if (type[0].includes('test')) {
            this.fragment_program_name = 'fragment_shader_test_normal.glsl';
            this.vertex_program_name = 'vertex_shader_' + 'regular' + '.glsl';
        } else if (type[0].includes('light')) {
            this.fragment_program_name = 'fragment_shader_light.glsl';
            this.vertex_program_name = 'vertex_shader_light.glsl';
        } else if (type[0].includes('texture')) {
            this.fragment_program_name = 'fragment_shader_' + type[1] + '.glsl';
            this.vertex_program_name = 'vertex_shader_' + 'regular' + '.glsl';
            this._initTexture(type[1]);
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
        if (this.type[0] == 'light') { return; }

        gl.useProgram(this.shaderProgram);

        gl.uniformMatrix4fv(this.shaderProgram.normalMatrixUniform, false, normalMatrix);
    }

    setProjectilePositionUniform(projectilePosition) {
        if (this.type[0] == 'light') { return; }

        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosProjectile, projectilePosition);
    }

    setCamPositionUniform(camPosition) {
        if (this.type[0] == 'light') { return; }

        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosCam, camPosition);        
    }

    setSunPositionUniform(sunPosition) {
        if (this.type[0] == 'light') { return; }

        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosSun, sunPosition);
    }

    setTorch1Uniform(torch1Position) {
        if (this.type[0] == 'light') { return; }

        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosTorch1, torch1Position);
    }

    setTorch2Uniform(torch2Position) {
        if (this.type[0] == 'light') { return; }

        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uPosTorch2, torch2Position);
    }

    setColorUniform(color = this.type[1]) {
        if (this.type[0] == 'light') { return; }

        if (this.type[0] != 'color') {
            color = [255, 255, 255];
        }

        gl.useProgram(this.shaderProgram);

        gl.uniform3fv(this.shaderProgram.uColor, color);
    }

    setGlossinessUniform(glossiness = this.type[2]) {
        if (this.type[0] == 'light') { return; }

        gl.useProgram(this.shaderProgram);

        gl.uniform1f(this.shaderProgram.uGlossiness, glossiness); 
    }

    setVertexPositionAttribute(webgl_position_buffer) {
        gl.useProgram(this.shaderProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER, webgl_position_buffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);    
    }

    setVertexNormalAttribute(webgl_normal_buffer) {
        if (this.type[0] == 'light') { return; }
        
        gl.useProgram(this.shaderProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER, webgl_normal_buffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        gl.useProgram(this.shaderProgram);
        
        gl.uniformMatrix4fv(this.shaderProgram.projMatrixUniform, false, projMatrix);
        gl.uniformMatrix4fv(this.shaderProgram.viewMatrixUniform, false, viewMatrix);
    }

    setSamplerUniform(sampler = this.type[1]) {
        if (this.type[0] == 'texture') { 
            gl.useProgram(this.shaderProgram);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.textures[0]);
            gl.uniform1i(this.shaderProgram.uSampler0, 0);
        }
    }

    // Private

    _initShaders() {
        //use program
        gl.useProgram(this.shaderProgram);
    
        this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
    
        this.shaderProgram.modelMatrixUniform = gl.getUniformLocation(this.shaderProgram, "modelMatrix");
        this.shaderProgram.viewMatrixUniform = gl.getUniformLocation(this.shaderProgram, "viewMatrix");
        this.shaderProgram.projMatrixUniform = gl.getUniformLocation(this.shaderProgram, "projMatrix");

        if (this.type[0] != 'light') {
            this.shaderProgram.vertexNormalAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
            gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
        
            this.shaderProgram.normalMatrixUniform = gl.getUniformLocation(this.shaderProgram, "normalMatrix");

            this.shaderProgram.uGlossiness = gl.getUniformLocation(this.shaderProgram, "uGlossiness");
            this.shaderProgram.uPosCam = gl.getUniformLocation(this.shaderProgram, "uPosCam");
            this.shaderProgram.uPosSun = gl.getUniformLocation(this.shaderProgram, "uPosSun");
            this.shaderProgram.uPosProjectile = gl.getUniformLocation(this.shaderProgram, "uPosProjectile");
            this.shaderProgram.uPosTorch1 = gl.getUniformLocation(this.shaderProgram, "uPosTorch1");
            this.shaderProgram.uPosTorch2 = gl.getUniformLocation(this.shaderProgram, "uPosTorch2");
            this.shaderProgram.uColor = gl.getUniformLocation(this.shaderProgram, "uColor");
        }

        if (this.type[0] == 'texture') {
            this.shaderProgram.uSampler0 = gl.getUniformLocation(this.shaderProgram, "uSampler0");
        }
    }

    _initTexture(file) {
        gl.useProgram(this.shaderProgram);

        var texture = gl.createTexture();
        file = './textures/' + file + '.jpg';

        texture.image = new Image();
        
        this.textures.push(texture);

        texture.image.onload = function () {
        
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 					// invierto el ejeY					
            gl.bindTexture(gl.TEXTURE_2D, texture); 						// activo la textura
            
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);	// cargo el bitmap en la GPU

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);					// selecciono filtro de magnificacion
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);	// selecciono filtro de minificacion
            
            gl.generateMipmap(gl.TEXTURE_2D);		// genero los mipmaps
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        texture.image.src = file;    
    }
    
}