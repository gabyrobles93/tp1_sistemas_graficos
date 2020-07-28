class Cube extends Extrusion {
    constructor(size_1, size_2, height, with_top, material) {
        super(new Rectangle(size_1, size_2), new Line(4, height), with_top, material);
        this.top = new Extrusion(new Rectangle(size_1-0.001, size_2-0.001), new Line(4, height), false, material);
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.height = height;
        this.with_top = with_top;
    }

    draw() {
        this.top.rotate_y(this.top.modelMatrix, 90);
        this.top.translate(this.top.modelMatrix, -this.size_1, 0, this.height/2);
        this.top.draw();
        super.draw();
    }

    translate(relative_to, x, y, z) {
        this.top.translate(relative_to, x, y, z);
        super.translate(relative_to, x, y, z);

        return this.modelMatrix;
    }

    rotate_x(relative_to, x) {
        this.top.rotate_x(relative_to, x);
        super.rotate_x(relative_to, x);
    
        return this.modelMatrix;
      }
    
      rotate_y(relative_to, y) {
        this.top.rotate_y(relative_to, y);
        super.rotate_y(relative_to, y);
    
        return this.modelMatrix;
      }
    
      rotate_z(relative_to, z) {
        this.top.rotate_z(relative_to, z);
        super.rotate_z(relative_to, z);
    
        return this.modelMatrix;
      }

      scale(relative_to, x, y, z) {
        super.scale(relative_to, x, y, z);
        this.top.scale(relative_to, x, y, z);

        return this.modelMatrix;
      }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.top.setViewProjectionMatrix(projMatrix, viewMatrix);
        super.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}