class RectangleVariable {
    constructor(size_1, size_2, size_1_variation, size_2_variation) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.size_1_variation = size_1_variation;
        this.size_2_variation = size_2_variation;
        this.vertices = 4;
        this.sides = [[size_1, size_2, 0], 
                [-size_1, size_2, 0], 
                [-size_1, -size_2, 0],
                [size_1, -size_2, 0],
                [size_1, size_2, 0]];

        this.normals = [[1, 0, 1], 
                [0, 0, -1], 
                [0, 0, -1],
                [0, 0, 1],
                [0, 0, 1]];
    }

    getPosition(u, level) {
        var side = this.sides[u*4];
        var final_side = [side[0] * (1 + level * this.size_1_variation),
                          side[1] * (1 + level * this.size_2_variation),
                          side[2]];
        return final_side;
    }

    getNormal(u) {
        return this.normals[u*4];
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
        return [1, 0, 0];
    }
}