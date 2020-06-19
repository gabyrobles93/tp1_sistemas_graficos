class BezierCuadraticCurve {
    constructor(start_control_point, center_control_point, end_control_point) {
        this.start_control_point = start_control_point;
        this.center_control_point = center_control_point;
        this.end_control_point = end_control_point;
    }

    getPosition(u, level) {
        var base_0 = (1-u) * (1-u);
        var base_1 = (1-u) * u * 2;
        var base_2 = u * u;

        var x = base_0 * this.start_control_point[0] + base_1 * this.center_control_point[0] + base_2 * this.end_control_point[0];
        var y = base_0 * this.start_control_point[1] + base_1 * this.center_control_point[1] + base_2 * this.end_control_point[1];
        var z = base_0 * this.start_control_point[2] + base_1 * this.center_control_point[2] + base_2 * this.end_control_point[2];

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