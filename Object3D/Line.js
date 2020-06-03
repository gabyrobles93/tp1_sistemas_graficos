class Line {
    constructor(vertices, longitude) {
        this.vertices = vertices;
        this.longitude = longitude;
    }

    getPosition(u) {
        return [this.longitude * u, 0, 0];
    }

    getNormal(u) {
        return [0, 1/Math.sqrt(2), 1/Math.sqrt(2)];
    }

    getTangent(u) {
        return [1, 0, 0];
    }

    getBinormal(u) {
        return [0, 0, 0];
    }
}