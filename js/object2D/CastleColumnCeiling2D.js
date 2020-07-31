class CastleColumnCeiling2D {
    constructor() {
        this.top_offset = 0.02
        this.arc = new BezierCubicCurve([0 + this.top_offset, 2.3, 0], [0.05 + this.top_offset, 1.2, 0], [0.5 + this.top_offset, 0.4, 0], [0.75 + this.top_offset, 0, 0]);
        this.arc_vertices = 15;
        this.vertices = (this.arc_vertices) + 2;
        this.position_points = [];
        this.normal_points = [];
        this.tangent_points = [];
        this.binormal_points = [];

        this._fillPoints();
    }

    getPosition(u, level) {
        return this.position_points[u * this.vertices];
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
        return [0, 2, 0];
    }

    getCenterNormal(u) {
        return [0, 0, 1];
    }

    // Private
    _fillPoints() {
        this.position_points.push([0, 2.3, 0]);
        this.normal_points.push([0, 1, 0]);

        this.position_points.push(this.arc.getPosition(0));
        this.normal_points.push([0, 1, 0]);

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.position_points.push(this.arc.getPosition(u));
            this.normal_points.push(this.arc.getNormal(u));
        }
    }
}