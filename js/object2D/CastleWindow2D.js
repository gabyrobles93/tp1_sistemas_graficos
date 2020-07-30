class CastleWindow2D {
    constructor() {
        this.arc_1 = new BezierCuadraticCurve([0, 0, 0], [0, 0.5, 0], [0.5, 0.5, 0]);
        this.arc_2 = new BezierCuadraticCurve([1, 0.5, 0], [1.5, 0.5, 0], [1.5, 0, 0]);
        this.arc_vertices = 15;
        this.vertices = (this.arc_vertices + 1) * 2 + 8;
        this.points = [];
        this.normal_points = [];

        this._fillPoints();
    }

    getPosition(u, level) {
        return this.points[u * this.vertices];
    }

    getNormal(u) {
        return this.normal_points[u * this.vertices];
    }

    getTangent(u) {
        return [0, 0, 0];
    }

    getBinormal(u) {
        return [0, 0, 0];
    }

    getCenterPosition(u) {
        return [0.75, -1, 0];
    }

    getCenterNormal(u) {
        return [0, 0, 1];
    }

    // Private

    _fillPoints() {
        this.points.push(this.arc_1.getPosition(0));
        this.normal_points.push([-1, 0, 0]);

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_1.getPosition(u));
            this.normal_points.push(this.arc_1.getNormal(u));
        }

        this.points.push(this.arc_1.getPosition(1));
        this.normal_points.push([0, 1, 0]);

        this.points.push(this.arc_2.getPosition(0));
        this.normal_points.push([0, 1, 0]);

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_2.getPosition(u));
            this.normal_points.push(this.arc_2.getNormal(u));
        }

        this.points.push(this.arc_2.getPosition(1));
        this.normal_points.push([1, 0, 0]);

        this.points.push([1.5, -2.5, 0]);
        this.normal_points.push([1, 0, 0]);

        this.points.push([1.5, -2.5, 0]);
        this.normal_points.push([0, -1, 0]);

        this.points.push([0, -2.5, 0]);
        this.normal_points.push([0, -1, 0]);

        this.points.push([0, -2.5, 0]);
        this.normal_points.push([-1, 0, 0]);

        this.points.push([0, 0, 0]);
        this.normal_points.push([-1, 0, 0]);
    }
}