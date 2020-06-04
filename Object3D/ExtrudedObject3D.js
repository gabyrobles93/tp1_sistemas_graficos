class ExtrudedObject3D {
  constructor(shape, path, material_type) {
    this.levels = path.vertices + 1;
    this.vertices = shape.vertices;

    this.shape = shape;
    this.path = path;

    this.material = new Material(material_type);
    
    this.position_buffer = null;
    this.normal_buffer = null;
    this.index_buffer = null;

    this.webgl_position_buffer = null;
    this.webgl_normal_buffer = null;
    this.webgl_index_buffer = null;
    
    this.gl_draw_mode = gl.TRIANGLE_STRIP;

    this._generateSurface();
  }

  draw(modelMatrix) {
    this.material.setModelMatrixUniform(modelMatrix);
    
    var normalMatrix = mat3.create();
    this.material.setNormalMatrixUniform(normalMatrix);

    this.material.setVertexPositionAttribute(this.webgl_position_buffer);

    this.material.setVertexNormalAttribute(this.webgl_normal_buffer);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
    gl.drawElements(this.gl_draw_mode, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
  }

  setViewProjectionMatrix(projMatrix, viewMatrix) {
    this.material.setViewProjectionMatrix(projMatrix, viewMatrix);
  }

    // Private

  _generateSurface() {
    this._fillPositionAndNormalBuffers();
    this._fillIndexBuffer();
    this._setupWebGLBuffers();
  }

  _fillPositionAndNormalBuffers() {
    this.positionBuffer = [];
    this.normalBuffer = [];
    for (var level=0; level <= this.levels; level++) {
      var v = level / this.levels;

      var path_pos = this.path.getPosition(v);
      var path_tangent = this.path.getTangent(v);
      var path_binormal = this.path.getBinormal(v);
      var path_normal = this.path.getNormal(v);

      var level_matrix = mat4.fromValues(
        ...path_normal, 0,
        ...path_binormal, 0,
        ...path_tangent, 0,
        ...path_pos, 1
      )

      console.log("Matriz de nivel " + level);
      console.log(level_matrix);

      for (var vertex=0; vertex <= this.vertices; vertex++) {
        var u = vertex / this.vertices;
      
        var vertex_pos = this.shape.getPosition(u);
        var vertex_normal = this.shape.getNormal(u);

        console.log("Vertex viejo " + vertex);
        console.log(vertex_pos);

        var new_vertex_pos = vec4.create();
        var vec4_vertex_pos = vec4.fromValues(vertex_pos[0], vertex_pos[1], vertex_pos[2], 1);

        vec4.transformMat4(new_vertex_pos, vec4_vertex_pos, level_matrix);

        console.log("Vertex nuevo " + vertex);
        console.log(new_vertex_pos);

        this.positionBuffer.push(new_vertex_pos[0]);
        this.positionBuffer.push(new_vertex_pos[1]);
        this.positionBuffer.push(new_vertex_pos[2]);

        var normal_matrix = mat3.fromValues(
          path_normal[0], path_normal[1], path_normal[2],
          path_binormal[0], path_binormal[1], path_binormal[2],
          path_tangent[0], path_tangent[1], path_tangent[2]
        )

        var new_vertex_normal = vec3.create();

        vec3.transformMat3(new_vertex_normal, vertex_normal, normal_matrix);

        this.normalBuffer.push(new_vertex_normal[0]);
        this.normalBuffer.push(new_vertex_normal[1]);
        this.normalBuffer.push(new_vertex_normal[2]);
      }
    }
  }

  _fillIndexBuffer() {
      this.indexBuffer = [];
      for (var i=0; i < this.levels; i++) {
        for (var j=0; j < this.vertices; j++) {
          if (j==0) {
            this.indexBuffer.push(j + (i* (this.vertices+1)));
            this.indexBuffer.push(j + ((i+1) * (this.vertices+1)));
          }
          this.indexBuffer.push(j + 1 + (i* (this.vertices+1)));
          this.indexBuffer.push(j + 1 + ((i+1) * (this.vertices+1)));
          if ((j == this.vertices - 1) && (i+1 < this.levels)) {
            this.indexBuffer.push(j + 1 + ((i+1) * (this.vertices+1)));
            this.indexBuffer.push(((i+1) * (this.vertices+1)));
          }
        }
      }
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
}