class CatapultColumn {
    constructor() {
        this.CATAPULT_COLUMN_SIZE_1 = 1;
        this.CATAPULT_COLUMN_SIZE_2 = 2;
        this.CATAPULT_COLUMN_WIDTH = 0.3;
        this.column = new Parallelogram3D(this.CATAPULT_COLUMN_SIZE_1, this.CATAPULT_COLUMN_SIZE_2, this.CATAPULT_COLUMN_WIDTH, true, MaterialsList.TEST_NORMAL);
    }

    draw(modelMatrix) {
        this.column.draw(modelMatrix);
    }

    translate(relative_to, x, y, z) {
        this.column.translate(relative_to, x, y, z);

        return this.column.modelMatrix;
    }
    
    rotate_x(relative_to, x) {
        this.column.rotate_x(relative_to, x);

        return this.column.modelMatrix;
    }
    
      rotate_y(relative_to, y) {
        this.column.rotate_y(relative_to, y);

        return this.column.modelMatrix;
      }
    
      rotate_z(relative_to, z) {
        this.column.rotate_z(relative_to, z);

        return this.column.modelMatrix;
      }
    
      scale(relative_to, x, y, z) {
        this.column.scale(relative_to, x, y, z);

        return this.column.modelMatrix;
      }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.column.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}
