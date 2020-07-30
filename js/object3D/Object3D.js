class Object3D {
  constructor(rows, columns, material_type) {
    this.rows = rows;
    this.columns = columns;

    this.material = new Material(material_type);
    
    this.position_buffer = null;
    this.normal_buffer = null;
    this.index_buffer = null;

    this.normalMatrix = mat4.create();
    this.modelMatrix = mat4.create();

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_index_buffer = null;
    
    this.gl_draw_mode = gl.TRIANGLE_STRIP;

    this.visible = true;
  }

  translate(relative_to, x, y, z) {
    mat4.translate(this.modelMatrix, relative_to, [x, y, z]);

    mat4.invert(this.normalMatrix, this.modelMatrix);
    mat4.transpose(this.normalMatrix, this.normalMatrix);

    return this.modelMatrix;
  }

  rotate_x(relative_to, x) {
    mat4.rotate(this.modelMatrix, relative_to, x * Math.PI/180, [1, 0, 0]);
   
    mat4.invert(this.normalMatrix, this.modelMatrix);
    mat4.transpose(this.normalMatrix, this.normalMatrix);

    return this.modelMatrix;
  }

  rotate_y(relative_to, y) {
    mat4.rotate(this.modelMatrix, relative_to, y * Math.PI/180, [0, 1, 0]);

    mat4.invert(this.normalMatrix, this.modelMatrix);
    mat4.transpose(this.normalMatrix, this.normalMatrix);

    return this.modelMatrix;
  }

  rotate_z(relative_to, z) {
    mat4.rotate(this.modelMatrix, relative_to, z * Math.PI/180, [0, 0, 1]); 

    mat4.invert(this.normalMatrix, this.modelMatrix);
    mat4.transpose(this.normalMatrix, this.normalMatrix);

    return this.modelMatrix;
  }

  scale(relative_to, x, y, z) {
    mat4.scale(this.modelMatrix, relative_to, [x, 1, 1]);
    mat4.scale(this.modelMatrix, relative_to, [1, y, 1]);
    mat4.scale(this.modelMatrix, relative_to, [1, 1, z]);    

/*     mat4.invert(this.normalMatrix, this.modelMatrix);
    mat4.transpose(this.normalMatrix, this.normalMatrix); */

    return this.modelMatrix;
  }
  
  draw() {
    if(this.visible) {
      this.material.setModelMatrixUniform(this.modelMatrix);
    
      this.material.setNormalMatrixUniform(this.normalMatrix);
  
      this.material.setVertexPositionAttribute(this.webgl_position_buffer);
  
      this.material.setVertexNormalAttribute(this.webgl_normal_buffer);
  
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
      gl.drawElements(this.gl_draw_mode, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
  }

  setViewProjectionMatrix(projMatrix, viewMatrix) {
    this.material.setViewProjectionMatrix(projMatrix, viewMatrix);
  }

  setVisible() {
    this.visible = true;
  }

  setInvisible() {
    this.visible = false;
  }

  // Private

  _generateSurface() {
    this._fillPositionAndNormalBuffers();
    this._fillIndexBuffer();
    this._setupWebGLBuffers();
  }
  
  _setupWebGLBuffers() {
    this.webgl_position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positionBuffer), gl.STATIC_DRAW);
    this.webgl_position_buffer.itemSize = 3;
    this.webgl_position_buffer.numItems = this.positionBuffer.length / 3;

    this.webgl_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalBuffer), gl.STATIC_DRAW);
    this.webgl_normal_buffer.itemSize = 3;
    this.webgl_normal_buffer.numItems = this.normalBuffer.length / 3;

    this.webgl_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexBuffer), gl.STATIC_DRAW);
    this.webgl_index_buffer.itemSize = 1;
    this.webgl_index_buffer.numItems = this.indexBuffer.length;
  }
  
  _fillPositionAndNormalBuffers() {
    this.positionBuffer = [];
    this.normalBuffer = [];
    for (var i=0; i <= this.rows; i++) {
      for (var j=0; j <= this.columns; j++) {
        var u = j / this.columns;
        var v = i / this.rows;

        var pos = this.getPosition(u,v);

        this.positionBuffer.push(pos[0]);
        this.positionBuffer.push(pos[1]);
        this.positionBuffer.push(pos[2]);

        var nrm = this.getNormal(u,v);

        this.normalBuffer.push(nrm[0]);
        this.normalBuffer.push(nrm[1]);
        this.normalBuffer.push(nrm[2]);
      }
    }
  }

  _fillIndexBuffer() {
    this.indexBuffer = [];
    for (var i=0; i < this.rows; i++) {
      for (var j=0; j < this.columns; j++) {
        if (j==0) {
          this.indexBuffer.push(j + (i* (this.columns+1)));
          this.indexBuffer.push(j + ((i+1) * (this.columns+1)));
        }
        this.indexBuffer.push(j + 1 + (i* (this.columns+1)));
        this.indexBuffer.push(j + 1 + ((i+1) * (this.columns+1)));
        if ((j == this.columns - 1) && (i+1 < this.rows)) {
          this.indexBuffer.push(j + 1 + ((i+1) * (this.columns+1)));
          this.indexBuffer.push(((i+1) * (this.columns+1)));
        }
      }
    }
  }
}
