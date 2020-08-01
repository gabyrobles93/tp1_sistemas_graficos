class CastleTower2D {
    constructor() {
        this.arc_1 = new BSplineCuadraticCurveConvex([8, -5, 0], [8, 4, 0], [4, 12, 0]);
        this.arc_2 = new BSplineCuadraticCurveConvex([8, 4, 0], [4, 12, 0], [7, 17, 0]);

        this.arc_vertices = 15;
        this.vertices = 7;
        this.points = [];
        this.normal_points = [];

        this._fillPoints();
    }

    getPosition(u, level) {
        return this.points[Math.round(u * this.vertices)];
    }

    getNormal(u) {
        return this.normal_points[Math.round(u * this.vertices)];
    }

    getTangent(u) {
        return [0, 0, 0];
    }

    getBinormal(u) {
        return [0, 0, 0];
    }

    getCenterPosition(u) {
        return [1, 0, 0];
    }

    getCenterNormal(u) {
        return [1, 0, 0];
    }

    // Private
    _fillPoints() {
        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_1.getPosition(u));
            this.normal_points.push(this.arc_1.getNormal(u));
            this.vertices = this.vertices + 1;
        }

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_2.getPosition(u));
            this.normal_points.push(this.arc_2.getNormal(u));
            this.vertices = this.vertices + 1;
        }

        this.points.push(this.arc_2.getPosition(1));
        this.normal_points.push([1, 0, 0]);

        this.points.push([5.5, 16, 0]);
        this.normal_points.push([1, 0, 0]);

        this.points.push([5.5, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([4.5, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([4.5, 16, 0]);
        this.normal_points.push([-1, 0, 0]);

        this.points.push([4.5, 14, 0]);
        this.normal_points.push([-1, 0, 0]);

        this.points.push([4.5, 14, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([0, 14, 0]);
        this.normal_points.push([0, 1, 0]);
    }
}