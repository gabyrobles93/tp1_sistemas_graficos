class CastleWall2D {
    constructor() {
        this.arc_1 = new BSplineCuadraticCurve([0, -5, 0], [0, 4, 0], [-4, 12, 0]);
        this.arc_2 = new BSplineCuadraticCurve([0, 4, 0], [-4, 12, 0], [-4, 17, 0]);

        this.arc_3 = new BSplineCuadraticCurve([-4, 16.5, 0], [-4, 17.5, 0], [-4.5, 17.5, 0]);
        this.arc_4 = new BSplineCuadraticCurve([-4.5, 17.5, 0], [-5.5, 17.5, 0], [-5.5, 16.5, 0]);

        this.arc_5 = new BSplineCuadraticCurve([-9, 16.5, 0], [-9, 17.5, 0], [-9.5, 17.5, 0]);
        this.arc_6 = new BSplineCuadraticCurve([-9.5, 17.5, 0], [-10.5, 17.5, 0], [-10.5, 16.5, 0]);

        this.arc_7 = new BSplineCuadraticCurve([-10.5, 17, 0], [-10.5, 12, 0], [-14.5, 4, 0]);
        this.arc_8 = new BSplineCuadraticCurve([-10.5, 12, 0], [-14.5, 4, 0], [-14.5, -5, 0],);

        this.arc_vertices = 15;
        this.vertices = 8;
        this.points = [];
        this.normal_points = [];

        this._fillPoints();
    }

    getPosition(u, level) {
        return this.points[Math.round(u * this.vertices)];
    }

    getNormal(u) {
        //TODO: CALCULAR NORMALES
        return this.normal_points[Math.round(u * this.vertices)];
    }

    getTangent(u) {
        return [0, 0, 0];
    }

    getBinormal(u) {
        return [0, 0, 0];
    }

    getCenterPosition(u) {
        return [0, 0, 0];
    }

    getCenterNormal(u) {
        return [0, 0, 1];
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

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_3.getPosition(u));
            this.normal_points.push(this.arc_3.getNormal(u));
            this.vertices = this.vertices + 1;
        }

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_4.getPosition(u));
            this.normal_points.push(this.arc_4.getNormal(u));
            this.vertices = this.vertices + 1;
        }

        this.points.push([-5.5, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        //
        this.points.push([-6, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([-6.5, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([-7, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([-7.5, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([-8, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([-8.5, 16, 0]);
        this.normal_points.push([0, 1, 0]);
        //

        this.points.push([-9, 16, 0]);
        this.normal_points.push([0, 1, 0]);

        this.points.push([-9, 17, 0]);
        this.normal_points.push([1, 0, 0]);

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_5.getPosition(u));
            this.normal_points.push(this.arc_5.getNormal(u));
            this.vertices = this.vertices + 1;
        }

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_6.getPosition(u));
            this.normal_points.push(this.arc_6.getNormal(u));
            this.vertices = this.vertices + 1;
        }

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_7.getPosition(u));
            this.normal_points.push(this.arc_7.getNormal(u));
            this.vertices = this.vertices + 1;
        }

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_8.getPosition(u));
            this.normal_points.push(this.arc_8.getNormal(u));
            this.vertices = this.vertices + 1;
        }
    }
}