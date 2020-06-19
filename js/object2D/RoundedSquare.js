class RoundedSquare {
    constructor() {
        this.vertices = 12;
        this.sides = [[0, 0, 0], 
                [0, 48/18, 0], 
                [2/18, 52/18, 0],
                [4/18, 54/18, 0],
                [8/18, 58/18, 0],
                [14/18, 60/18, 0],
                [18/18, 60/18, 0],
                [24/18, 58/18, 0],
                [28/18, 54/18, 0],
                [30/18, 52/18, 0],
                [32/18, 48/18, 0],
                [32/18, 0, 0],
                [0, 0, 0]];

        this.normals = [[0, 0, 1], 
                        [0, 0, 1], 
                        [0, 1, 0],
                        [0, 1, 0],
                        [1, 0, 0],
                        [1, 0, 0],
                        [0, 0, 1],
                        [0, 0, 1],
                        [0, 1, 0],
                        [0, 1, 0],
                        [1, 0, 0],
                        [1, 0, 0],
                        [0, 0, 1]];
    }

    getPosition(u, level) {
        return this.sides[u*12];
    }

    getNormal(u) {
        return this.normals[u*12];
    }

    getTangent(u) {
        return [0, 0, 0];
    }

    getBinormal(u) {
        return [0, 0, 0];
    }

    getCenterPosition(u) {
        return [16/18, 28/18, 0];
    }

    getCenterNormal(u) {
        return [1, 0, 0];
    }
}