class CastleCeiling extends Extrusion {
    constructor(size_1, size_2) {
        super(new RectangleVariable(size_1 * 0.3, size_2 * 0.1, 2.5, 10), new Line(4, 8), true, MaterialsList.TEST_NORMAL);
        this.top = new Cube(size_1 * 0.3, size_2 * 0.1, 0.1, true, MaterialsList.TEST_NORMAL);
        this.modelMatrix = mat4.create();
    }

    draw() {
        super.draw();
        this.top.draw();
    }

    translate(relative_to, x, y, z) {
        this.top.translate(relative_to, x, y, z);
        super.translate(relative_to, x, y, z);

        return super.modelMatrix;
    }
    
    rotate_x(relative_to, x) {
        this.top.rotate_x(relative_to, x);
        super.rotate_x(relative_to, x);

        return super.modelMatrix;
    }
    
    rotate_y(relative_to, y) {
        this.top.rotate_y(relative_to, y);
        this.modelMatrix = super.rotate_y(relative_to, y);

        return super.modelMatrix;
    }
    
    rotate_z(relative_to, z) {
        this.modelMatrix = super.rotate_z(relative_to, z);
        this.top.rotate_z(relative_to, z);

        return this.modelMatrix;
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        super.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.top.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}