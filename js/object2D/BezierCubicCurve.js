class BezierCubicCurve {
    constructor(start_control_point, center_control_point_1, center_control_point_2, end_control_point) {
        this.start_control_point = start_control_point;
        this.center_control_point_1 = center_control_point_1;
        this.center_control_point_2 = center_control_point_2;
        this.end_control_point = end_control_point;

        this.vertices = 30;
    }

    getPosition(u) {
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
        // TO DO: CALCULO DE NORMAL
        return [0, 0, 1];
    }

    getTangent(u) {
        // TO DO: CALCULO DE TANGENTE 
        return [1, 0, 0];
    }

    getBinormal(u) {
        // TO DO: CALCULO DE BINORMAL 
        return [x, y, 0];
    }

    getCenterPosition(u) {
        return [this.end_control_point[0] - this.start_control_point[0], 0, 0];
    }

    getCenterNormal(u) {
        // TO DO: CALCULO DE NORMAL
        return [0, 0, 1];
    }
}