class Extrusion extends Object3D {
  constructor(shape, path, material_type) {
    super(path.vertices + 1, shape.vertices, material_type);
    this.levels = path.vertices + 1;
    this.vertices = shape.vertices;

    this.shape = shape;
    this.path = path;

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

/*       console.log("Matriz de nivel " + level);
      console.log(level_matrix); */

      for (var vertex=0; vertex <= this.vertices; vertex++) {
        var u = vertex / this.vertices;
      
        var vertex_pos = this.shape.getPosition(u);
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
}