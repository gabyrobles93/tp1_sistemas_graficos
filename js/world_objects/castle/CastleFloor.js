class CastleFloor {
    constructor(size_1, size_2, height) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.height = height;

        this.floor = new Cube(size_1, size_2, height, false, MaterialsList.BEIGE);
        this.roof = new Cube(size_1 + 0.3, 0.3, size_2 * 2 + 0.6, true, MaterialsList.BEIGE);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        this.floor.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [-this.size_2 - 0.3, 0, this.height + 0.3]);
        this.roof.draw(m1);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.floor.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.roof.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

}