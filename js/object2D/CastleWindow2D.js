class CastleWindow2D {
    constructor() {
        this.arc_1 = new BezierCuadraticCurve([0, 0, 0], [0, 0.5, 0], [0.5, 0.5, 0]);
        this.arc_2 = new BezierCuadraticCurve([1, 0.5, 0], [1.5, 0.5, 0], [1.5, 0, 0]);
        this.arc_vertices = 15;
        this.vertices = (this.arc_vertices + 1) * 2 + 2;
        this.points = [];

        this._fillPoints();
    }

    getPosition(u, level) {
        return this.points[u * this.vertices];
    }

    getNormal(u) {
        //TODO: CALCULAR NORMALES
        return [1, 0, 0];
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
        return [1, 0, 0];
    }

    // Private

    _fillPoints() {
        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_1.getPosition(u));
        }

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc_2.getPosition(u));
        }

        this.points.push([1.5, -2.5, 0]);
        this.points.push([0, -2.5, 0]);
        this.points.push([0, 0, 0]);
    }
}