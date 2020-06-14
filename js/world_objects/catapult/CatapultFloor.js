class CatapultFloor {
    constructor() {
        this.CATAPULT_FLOOR_SIZE_A = 5;
        this.CATAPULT_FLOOR_SIZE_B = 2;
        this.CATAPULT_FLOOR_WIDTH = 0.3;

        this.catapult_floor = new Cube(this.CATAPULT_FLOOR_SIZE_A, this.CATAPULT_FLOOR_SIZE_B, this.CATAPULT_FLOOR_WIDTH, true, MaterialsList.DEFAULT);
    }

    draw(modelMatrix) {
        this.catapult_floor.draw(modelMatrix);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.catapult_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}