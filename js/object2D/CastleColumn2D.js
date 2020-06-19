class CastleColumn2D {
    constructor(column_height) {
        this.arc = new BezierCubicCurve([2, 0, 0], [2, 1.5, 0], [1, 1.5, 0], [1, 3, 0])
        this.arc_vertices = 15;
        this.vertices = (this.arc_vertices + 1) + 1;
        this.points = [];

        this.COLUMN_WIDE_PART_SIZE = 2.5;
        this.COLUMN_NARROW_PART_SIZE = column_height;

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
        return [1, 0, 0];
    }

    getCenterNormal(u) {
        return [1, 0, 0];
    }

    // Private
    _fillPoints() {
        this.points.push([2, 0-this.COLUMN_WIDE_PART_SIZE, 0]);

        for (var i = 0; i <= this.arc_vertices; i++) {
            var u = i / this.arc_vertices;
            this.points.push(this.arc.getPosition(u));
        }

        this.points.push([1, this.COLUMN_NARROW_PART_SIZE, 0]);
    }
}