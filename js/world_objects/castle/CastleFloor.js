class CastleFloor {
    constructor(size_1, size_2, height) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.height = height;

        this.floor = new Cube(size_1, size_2, height, false, MaterialsList.DEFAULT);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        this.floor.draw(m1);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.floor.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

}