class CastleColumn2D {
    constructor() {
        this.arc = new BezierCubicCurve([0, 0, 0], [1, 0, 0], [2, 1, 0], [3, 1, 0]);
        this.arc_vertices = 15;
        this.vertices = (this.arc_vertices + 1) + 4;
        this.points = [];

        this.COLUMN_WIDE_PART_SIZE = 1;
        this.COLUMN_NARROW_PART_SIZE = 6;

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
        return [0, 1, 0];
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

        this.points.push([this.COLUMN_NARROW_PART_SIZE, 1, 0]);
        this.points.push([this.COLUMN_NARROW_PART_SIZE, 1.5, 0]);
        this.points.push([0-this.COLUMN_WIDE_PART_SIZE, 1.5, 0]);
        this.points.push([0-this.COLUMN_WIDE_PART_SIZE, 0, 0]);
        this.points.push([0, 0, 0]);

        console.log(this.points);
    }
}