class Circle {
    constructor(vertices, radius) {
        this.vertices = vertices;
        this.radius = radius;
    }

    getPosition(u, level) {
        var x = this.radius * Math.cos(2*Math.PI * u);
        var y = this.radius * Math.sin(2*Math.PI * u);
        return [x, y, 0];
    }

    getNormal(u) {
        var x = this.radius * Math.cos(2*Math.PI * u);
        var y = this.radius * Math.sin(2*Math.PI * u);
        return [x/(Math.sqrt(x*x+y*y)), y/(Math.sqrt(x*x+y*y)), 0];
    }

    getTangent(u) {
        var x = -1 * this.radius * 2 * Math.PI * Math.sin(2*Math.PI * u);
        var y = this.radius * 2 * Math.PI * Math.cos(2*Math.PI * u);
        return [x, y, 0];
    }

    getBinormal(u) {
/*         var x_second_derivate = -1 * this.radius * 2 * Math.PI * 2 * Math.PI * Math.cos(2 * Math.PI * u);
        var y_second_derivate = -1 * this.radius * 2 * Math.PI * 2 * Math.PI * Math.sin(2 * Math.PI * u);
        var z_second_derivate = 0;
        
        var second_derivate = vec3.fromValues(x_second_derivate, y_second_derivate, z_second_derivate); */

        var tangent = this.getTangent(u);
        var tangent_vector = vec3.fromValues(tangent[0], tangent[1], tangent[2]);

        var normal = this.getNormal(u);
        var normal_vector = vec3.fromValues(normal[0], normal[1], normal[2]);

        var binormal = vec3.fromValues(0, 0, 0);
        vec3.cross(binormal, normal_vector, tangent_vector);
        vec3.normalize(binormal, binormal);

        return [0, 0, 1];
        return [binormal.x, binormal.y, binormal.z];
    }

    getCenterPosition(u) {
        return [0, 0, 0];
    }

    getCenterNormal(u) {
        return [0, 0, 1];
    }
}