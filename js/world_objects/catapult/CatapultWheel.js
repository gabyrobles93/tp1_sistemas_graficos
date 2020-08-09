class CatapultWheel {
    constructor() {
        this.CATAPULT_WHEEL_WIDTH = 0.3;
        this.CATAPULT_WHEEL_HUB_WIDTH = 0.1;
        this.CATAPULT_WHEEL_RADIUS = 1;
        this.CATAPULT_WHEEL_HUB_RADIUS = 1/6;

        this.wheel = new Cilinder(this.CATAPULT_WHEEL_RADIUS, this.CATAPULT_WHEEL_WIDTH, true, MaterialsList.WOOD_LIGHT)
        this.wheel_hub = new Cilinder (this.CATAPULT_WHEEL_HUB_RADIUS, this.CATAPULT_WHEEL_HUB_WIDTH, true, MaterialsList.WOOD_DARK)
    }

    draw() {
        this.wheel_hub.translate(this.wheel.modelMatrix, -this.CATAPULT_WHEEL_HUB_WIDTH, 0, 0);

        this.wheel.draw();
        this.wheel_hub.draw();
    }

    translate(relative_to, x, y, z) {
        this.wheel.translate(relative_to, x, y, z);
        this.wheel_hub.translate(relative_to, x, y, z);

        return this.wheel.modelMatrix;
    }
    
    rotate_x(relative_to, x) {
        this.wheel.rotate_x(relative_to, x);
        this.wheel_hub.rotate_x(relative_to, x);

        return this.wheel.modelMatrix;
    }
    
      rotate_y(relative_to, y) {
        this.wheel.rotate_y(relative_to, y);
        this.wheel_hub.rotate_y(relative_to, y);

        return this.wheel.modelMatrix;
      }
    
      rotate_z(relative_to, z) {
        this.wheel.rotate_z(relative_to, z);
        this.wheel_hub.rotate_z(relative_to, z);

        return this.wheel.modelMatrix;
      }
    
      scale(relative_to, x, y, z) {
        this.wheel.scale(relative_to, x, y, z);
        this.wheel_hub.scale(relative_to, x, y, z);

        return this.wheel.modelMatrix;
      }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.wheel.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.wheel_hub.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}