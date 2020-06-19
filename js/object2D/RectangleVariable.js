class RectangleVariable {
    constructor(size_1, size_2, percentage_size_variation) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.percentage_size_variation = percentage_size_variation;
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
        var final_side = [side[0] * (1 + level * this.percentage_size_variation),
                          side[1] * (1 + level * this.percentage_size_variation),
                          side[2] * (1 + level * this.percentage_size_variation)];
        if (level == 1) {
            console.log(this.size_1);
            console.log(this.size_2);
            console.log(final_side);
        }
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