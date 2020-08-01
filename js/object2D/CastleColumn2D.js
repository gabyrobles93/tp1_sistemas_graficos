class CastleColumn2D {
    constructor(column_height) {
        this.arc = new BezierCubicCurveConvex([2, 0, 0], [2, 1.5, 0], [1, 1.5, 0], [1, 3, 0])
        this.arc_vertices = 15;
        this.vertices = (this.arc_vertices + 1) + 3;
        this.points = [];
        this.normal_points = [];

        this.COLUMN_WIDE_PART_SIZE = 4.5;
        this.COLUMN_NARROW_PART_SIZE = column_height;

        this._fillPoints();
    }

    getPosition(u, level) {
        return this.points[u * this.vertices];
    }

    getNormal(u) {
        //TODO: CALCULAR NORMALES
        return this.normal_points[u * this.vertices];
        return [1, 0, 0];
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
        this.points.push([2, 0-this.COLUMN_WIDE_PART_SIZE, 0]);
        this.normal_points.push([1, 0, 0]);

        this.points.push(this.arc.getPosition(0));
        this.normal_points.push([1, 0, 0]);

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc.getPosition(u));
            this.normal_points.push(this.arc.getNormal(u));
        }

        this.points.push(this.arc.getPosition(1));
        this.normal_points.push([1, 0, 0]);

        this.points.push([1, this.COLUMN_NARROW_PART_SIZE, 0]);
        this.normal_points.push([1, 0, 0]);
    }
}