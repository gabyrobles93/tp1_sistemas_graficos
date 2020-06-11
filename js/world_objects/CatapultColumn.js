class CatapultColumn {
    constructor() {
        this.CATAPULT_COLUMN_SIZE_1 = 1;
        this.CATAPULT_COLUMN_SIZE_2 = 2;
        this.CATAPULT_COLUMN_WIDTH = 0.3;
        this.column = new Parallelogram3D(this.CATAPULT_COLUMN_SIZE_1, this.CATAPULT_COLUMN_SIZE_2, this.CATAPULT_COLUMN_WIDTH, true, MaterialsList.DEFAULT);
    }

    draw(modelMatrix) {
        this.column.draw(modelMatrix);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.column.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}
