class RectangleVariable {
    constructor(size_1, size_2, size_1_variation, size_2_variation) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.size_1_variation = size_1_variation;
        this.size_2_variation = size_2_variation;
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

        this.normals = [[0, -0.707, -0.707], 
                        [0.707, 0, -0.707],
                        [0.707, 0, -0.707],
                        [0, 0.707, -0.707],
                        [0, 0.707, -0.707],
                        [-0.707, 0, -0.707],
                        [-0.707, 0, -0.707],
                        [0, -0.707, -0.707],
                        [0, -0.707, -0.707],
                        [0.707, 0, -0.707]];
    }

    getPosition(u, level) {
        var side = this.sides[u*this.vertices];
        var final_side = [side[0] * (1 + level * this.size_1_variation),
                          side[1] * (1 + level * this.size_2_variation),
                          side[2]];
        return final_side;
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