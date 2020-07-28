class Rectangle {
    constructor(size_1, size_2) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.vertices = 9;

        this.sides = [  [size_1, -size_2, 0],
                        [size_1, -size_2, 0],
                        [size_1, size_2, 0],
                        [size_1, size_2, 0],
                        [-size_1, size_2, 0],
                        [-size_1, size_2, 0],
                        [-size_1, -size_2, 0],
                        [-size_1, -size_2, 0],
                        [size_1, -size_2, 0],
                        [size_1, -size_2, 0]];

        this.normals = [[0, -1, 0], 
                        [1, 0, 0],
                        [1, 0, 0],
                        [0, 1, 0],
                        [0, 1, 0],
                        [-1, 0, 0],
                        [-1, 0, 0],
                        [0, -1, 0],
                        [0, -1, 0],
                        [1, 0, 0]];
    }

    getPosition(u, level) {
        return this.sides[u*this.vertices];
    }

    getNormal(u) {
        return this.normals[u*this.vertices];
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
}