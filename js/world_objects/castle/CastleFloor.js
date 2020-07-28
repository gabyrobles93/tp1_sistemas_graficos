class CastleFloor {
    constructor(size_1, size_2, height, extra_height) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.height = height;
        this.extra_height = extra_height;

        this.floor = new Cube(this.size_1, this.size_2, height + extra_height, false, MaterialsList.TEST_NORMAL);
        this.roof = new Cube(this.size_1 + 0.3, 0.3, this.size_2 * 2 + 0.6, true, MaterialsList.TEST_NORMAL);
    }

    draw() {
        this.floor.draw();

        var m1 = mat4.clone(this.floor.modelMatrix);
        m1 = this.roof.rotate_y(m1, 90);
        this.roof.translate(m1, -this.size_2 - 0.3, 0, this.height + this.extra_height + 0.3);
        this.roof.draw();
    }

    translate(relative_to, x, y, z) {
        this.floor.translate(relative_to, x, y, z);
        this.roof.translate(relative_to, x, y, z);

        return this.floor.modelMatrix;
      }
    
    rotate_x(relative_to, x) {
        this.floor.rotate_x(relative_to, x);
        this.roof.rotate_x(relative_to, x);

        return this.floor.modelMatrix;
    }
    
    rotate_y(relative_to, y) {
        this.floor.rotate_y(relative_to, y);
        this.roof.rotate_y(relative_to, y);

        return this.floor.modelMatrix;
    }
    
    rotate_z(relative_to, z) {
        this.floor.rotate_z(relative_to, z);
        this.roof.rotate_z(relative_to, z);

        return this.floor.modelMatrix;
    }
    
      scale(relative_to, x, y, z) {
        mat4.scale(this.modelMatrix, relative_to, [x, 1, 1]);
        mat4.scale(this.modelMatrix, relative_to, [1, y, 1]);
        mat4.scale(this.modelMatrix, relative_to, [1, 1, z]);    
    
        mat4.invert(this.normalMatrix, this.modelMatrix);
        mat4.transpose(this.normalMatrix, this.normalMatrix);
    
        return this.modelMatrix;
      }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.floor.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.roof.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}