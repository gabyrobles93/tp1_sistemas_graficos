class BezierCubicCurve {
    constructor(start_control_point, center_control_point_1, center_control_point_2, end_control_point) {
        this.start_control_point = start_control_point;
        this.center_control_point_1 = center_control_point_1;
        this.center_control_point_2 = center_control_point_2;
        this.end_control_point = end_control_point;

        this.vertices = 30;
    }

    getPosition(u, level) {
        var base_0 = (1-u) * (1-u) * (1-u);
        var base_1 = (1-u) * (1-u) * u * 3;
        var base_2 = (1-u) * u * u * 3;
        var base_3 = u * u * u;

        var x = base_0 * this.start_control_point[0] + base_1 * this.center_control_point_1[0] 
                + base_2 * this.center_control_point_2[0] + base_3 * this.end_control_point[0];
        var y = base_0 * this.start_control_point[1] + base_1 * this.center_control_point_1[1] 
                + base_2 * this.center_control_point_2[1] + base_3 * this.end_control_point[1];
        var z = base_0 * this.start_control_point[2] + base_1 * this.center_control_point_1[2] 
                + base_2 * this.center_control_point_2[2] + base_3 * this.end_control_point[2];

        return [x, y ,z];
    }

    getNormal(u) {
        var normal = vec3.fromValues(0, 0, 0);

        vec3.rotateZ(normal, this.getTangent(u), [0, 0, 0], Math.PI / 2);
        vec3.normalize(normal, normal);
        
        return [normal[0], normal[1], normal[2]];
    }

    getTangent(u) {
        var base_0 = -3 * u * u + 6 * u - 3;
        var base_1 = 9 * u * u - 12 * u + 3;
        var base_2 = -9 * u * u + 6 * u ;
        var base_3 = 3 * u * u;

        var x = base_0 * this.start_control_point[0] + 
                base_1 * this.center_control_point_1[0] + 
                base_2 * this.center_control_point_2[0] + 
                base_3 * this.end_control_point[0];

        var y = base_0 * this.start_control_point[1] + 
                base_1 * this.center_control_point_1[1] + 
                base_2 * this.center_control_point_2[1] + 
                base_3 * this.end_control_point[1];

        var z = base_0 * this.start_control_point[2] + 
                base_1 * this.center_control_point_1[2] + 
                base_2 * this.center_control_point_2[2] + 
                base_3 * this.end_control_point[2];

        var tangent = vec3.fromValues(x, y, z);
        vec3.normalize(tangent, tangent);
        
        return [tangent[0], tangent[1], tangent[2]];
    }

    getBinormal(u) {
        var binormal = vec3.create();
        var normal = this.getNormal(u);
        var tangent = this.getTangent(u);

        var v_normal = vec3.fromValues(normal[0], normal[1], normal[2]);
        var v_tangent = vec3.fromValues(tangent[0], tangent[1], tangent[2]);

        vec3.cross(binormal, v_normal, v_tangent);

        return [binormal[0], binormal[1], binormal[2]];
    }

    getCenterPosition(u) {
        return [this.end_control_point[0] - this.start_control_point[0], 0, 0];
    }

    getCenterNormal(u) {
        return [0, 0, 1];
    }
}