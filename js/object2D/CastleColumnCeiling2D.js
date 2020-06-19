class CastleColumnCeiling2D {
    constructor() {
        this.top_offset = 0.02
        this.arc = new BezierCubicCurve([0 + this.top_offset, 2, 0], [0.05 + this.top_offset, 1.2, 0], [0.5 + this.top_offset, 0.4, 0], [0.75 + this.top_offset, 0, 0]);
        this.arc_vertices = 15;
        this.vertices = (this.arc_vertices);
        this.points = [];

        this._fillPoints();
    }

    getPosition(u) {
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
        return [0, 2, 0];
    }

    getCenterNormal(u) {
        return [1, 0, 0];
    }

    // Private
    _fillPoints() {
        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc.getPosition(u));
        }
    }
}