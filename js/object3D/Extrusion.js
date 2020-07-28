class Extrusion extends Object3D {
  constructor(shape, path, with_top, material_type) {
    if (with_top) {
      super(path.vertices + 1 + 2 + 2, shape.vertices, material_type);
    } else {
      super(path.vertices + 1, shape.vertices, material_type);
    }
    
    this.levels = path.vertices + 1;
    this.vertices = shape.vertices;

    this.shape = shape;
    this.path = path;
    this.with_top = with_top;

    this._generateSurface();
  }

    // Private

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

      var normal_matrix = mat3.fromValues(
        path_normal[0], path_normal[1], path_normal[2],
        path_binormal[0], path_binormal[1], path_binormal[2],
        path_tangent[0], path_tangent[1], path_tangent[2]
      )

/*       console.log("Matriz de nivel " + level);
      console.log(level_matrix); */

      if (this.with_top == true && level == 0) {
        this._fillPositionAndNormalBuffersForTopStart(level_matrix, normal_matrix);
      }

      for (var vertex=0; vertex <= this.vertices; vertex++) {
        var u = vertex / this.vertices;      
        var vertex_pos = this.shape.getPosition(u, v);
        var vertex_normal = this.shape.getNormal(u);

/*         console.log("Vertex viejo " + vertex);
        console.log(vertex_pos); */

        var new_vertex_pos = vec4.create();
        var vec4_vertex_pos = vec4.fromValues(vertex_pos[0], vertex_pos[1], vertex_pos[2], 1);

        vec4.transformMat4(new_vertex_pos, vec4_vertex_pos, level_matrix);

/*         console.log("Vertex nuevo " + vertex);
        console.log(new_vertex_pos); */

        this.positionBuffer.push(new_vertex_pos[0]);
        this.positionBuffer.push(new_vertex_pos[1]);
        this.positionBuffer.push(new_vertex_pos[2]);

        var new_vertex_normal = vec3.create();

        vec3.transformMat3(new_vertex_normal, vertex_normal, normal_matrix);

        this.normalBuffer.push(new_vertex_normal[0]);
        this.normalBuffer.push(new_vertex_normal[1]);
        this.normalBuffer.push(new_vertex_normal[2]);
      }

      if (this.with_top == true && level == this.levels) {
        this._fillPositionAndNormalBuffersForTopEnd(level_matrix, normal_matrix);
      }
    }
  }

  _fillPositionAndNormalBuffersForTopStart(level_matrix, normal_matrix) {
    for (var vertex=0; vertex <= this.vertices; vertex++) {
      var u = vertex / this.vertices;      

      var center_vertex_pos = this.shape.getCenterPosition(u);
      var center_vertex_normal = this.shape.getCenterNormal(u);
      center_vertex_normal[0] = center_vertex_normal[0] * -1;
      center_vertex_normal[1] = center_vertex_normal[1] * -1;
      center_vertex_normal[2] = center_vertex_normal[2] * -1;

      var new_center_vertex_pos = vec4.create();
      var new_center_vertex_normal = vec3.create();

      var vec4_center_vertex_pos = vec4.fromValues(center_vertex_pos[0], center_vertex_pos[1], center_vertex_pos[2], 1);
      vec4.transformMat4(new_center_vertex_pos, vec4_center_vertex_pos, level_matrix);

      vec3.transformMat3(new_center_vertex_normal, center_vertex_normal, normal_matrix);

      this.positionBuffer.push(new_center_vertex_pos[0]);
      this.positionBuffer.push(new_center_vertex_pos[1]);
      this.positionBuffer.push(new_center_vertex_pos[2]);

      this.normalBuffer.push(new_center_vertex_normal[0]);
      this.normalBuffer.push(new_center_vertex_normal[1]);
      this.normalBuffer.push(new_center_vertex_normal[2]);
    }

    for (var vertex=0; vertex <= this.vertices; vertex++) {
      var u = vertex / this.vertices;      

      var center_vertex_pos = this.shape.getPosition(u);
      var center_vertex_normal = this.shape.getCenterNormal(u);
      center_vertex_normal[0] = center_vertex_normal[0] * -1;
      center_vertex_normal[1] = center_vertex_normal[1] * -1;
      center_vertex_normal[2] = center_vertex_normal[2] * -1;

      var new_center_vertex_pos = vec4.create();
      var new_center_vertex_normal = vec3.create();

      var vec4_center_vertex_pos = vec4.fromValues(center_vertex_pos[0], center_vertex_pos[1], center_vertex_pos[2], 1);
      vec4.transformMat4(new_center_vertex_pos, vec4_center_vertex_pos, level_matrix);

      vec3.transformMat3(new_center_vertex_normal, center_vertex_normal, normal_matrix);

      this.positionBuffer.push(new_center_vertex_pos[0]);
      this.positionBuffer.push(new_center_vertex_pos[1]);
      this.positionBuffer.push(new_center_vertex_pos[2]);

      this.normalBuffer.push(new_center_vertex_normal[0]);
      this.normalBuffer.push(new_center_vertex_normal[1]);
      this.normalBuffer.push(new_center_vertex_normal[2]);
    }
  }

  _fillPositionAndNormalBuffersForTopEnd(level_matrix, normal_matrix) {
    for (var vertex=0; vertex <= this.vertices; vertex++) {
      var u = vertex / this.vertices;      

      var center_vertex_pos = this.shape.getPosition(u);
      var center_vertex_normal = this.shape.getCenterNormal(u);

      var new_center_vertex_pos = vec4.create();
      var new_center_vertex_normal = vec3.create();

      var vec4_center_vertex_pos = vec4.fromValues(center_vertex_pos[0], center_vertex_pos[1], center_vertex_pos[2], 1);
      vec4.transformMat4(new_center_vertex_pos, vec4_center_vertex_pos, level_matrix);

      vec3.transformMat3(new_center_vertex_normal, center_vertex_normal, normal_matrix);

      this.positionBuffer.push(new_center_vertex_pos[0]);
      this.positionBuffer.push(new_center_vertex_pos[1]);
      this.positionBuffer.push(new_center_vertex_pos[2]);

      this.normalBuffer.push(new_center_vertex_normal[0]);
      this.normalBuffer.push(new_center_vertex_normal[1]);
      this.normalBuffer.push(new_center_vertex_normal[2]);
    }

    for (var vertex=0; vertex <= this.vertices; vertex++) {
      var u = vertex / this.vertices;      

      var center_vertex_pos = this.shape.getCenterPosition(u);
      var center_vertex_normal = this.shape.getCenterNormal(u);

      var new_center_vertex_pos = vec4.create();
      var new_center_vertex_normal = vec3.create();

      var vec4_center_vertex_pos = vec4.fromValues(center_vertex_pos[0], center_vertex_pos[1], center_vertex_pos[2], 1);
      vec4.transformMat4(new_center_vertex_pos, vec4_center_vertex_pos, level_matrix);

      vec3.transformMat3(new_center_vertex_normal, center_vertex_normal, normal_matrix);

      this.positionBuffer.push(new_center_vertex_pos[0]);
      this.positionBuffer.push(new_center_vertex_pos[1]);
      this.positionBuffer.push(new_center_vertex_pos[2]);

      this.normalBuffer.push(new_center_vertex_normal[0]);
      this.normalBuffer.push(new_center_vertex_normal[1]);
      this.normalBuffer.push(new_center_vertex_normal[2]);
    }
  }
}