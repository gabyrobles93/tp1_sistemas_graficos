class Triangle {
    constructor(size) {
        this.size = size;
        this.vertices = 3;
        this.sides = [[size, 0, 0], 
                [0, 0, 0], 
                [0, size, 0],
                [size, 0, 0]];
    }

    getPosition(u) {
        return this.sides[u*3];
    }

    getNormal(u) {
        return [0, 0, 1];
    }

    getTangent(u) {
        return [0, 0, 0];
    }

    getBinormal(u) {
        return [0, 0, 0];
    }
}