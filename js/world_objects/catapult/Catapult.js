class Catapult {
    constructor() {
        this.CATAPULT_WHEEL_SEPARATION_1 = 9;
        this.CATAPULT_WHEEL_SEPARATION_2 = 6;
        this.CATAPULT_FLOOR_WIDTH = 0.3
        this.catapult_arm_angle = 0;
        this.modelMatrix = mat4.create();
        
        this.catapult_wheel_br = new CatapultWheel();
        this.catapult_wheel_fr = new CatapultWheel();
        this.catapult_wheel_bl = new CatapultWheel();
        this.catapult_wheel_fl = new CatapultWheel();
    }

    draw() {
        this._drawStaticsParts();
    }

    translate(relative_to, x, y, z) {
        mat4.translate(this.modelMatrix, relative_to, [x, y, z]);
    
        this.catapult_wheel_br.translate(this.modelMatrix, [x, y, z]);
        this.catapult_wheel_fr.translate(this.modelMatrix, [x, y, z]);
        this.catapult_wheel_bl.translate(this.modelMatrix, [x, y, z]);
        this.catapult_wheel_fl.translate(this.modelMatrix, [x, y, z]);

        return this.modelMatrix;
    }
    
      rotate_x(relative_to, x) {
        mat4.rotate(this.modelMatrix, relative_to, x * Math.PI/180, [1, 0, 0]);
       
        this.catapult_wheel_br.rotate_x(this.modelMatrix, x);
        this.catapult_wheel_fr.rotate_x(this.modelMatrix, x);
        this.catapult_wheel_bl.rotate_x(this.modelMatrix, x);
        this.catapult_wheel_fl.rotate_x(this.modelMatrix, x);
    
        return this.modelMatrix;
      }
    
      rotate_y(relative_to, y) {
        mat4.rotate(this.modelMatrix, relative_to, y * Math.PI/180, [0, 1, 0]);
    
        this.catapult_wheel_br.rotate_y(this.modelMatrix, y);
        this.catapult_wheel_fr.rotate_y(this.modelMatrix, y);
        this.catapult_wheel_bl.rotate_y(this.modelMatrix, y);
        this.catapult_wheel_fl.rotate_y(this.modelMatrix, y);
    
        return this.modelMatrix;
      }
    
      rotate_z(relative_to, z) {
        mat4.rotate(this.modelMatrix, relative_to, z * Math.PI/180, [0, 0, 1]); 
    
        this.catapult_wheel_br.rotate_z(this.modelMatrix, z);
        this.catapult_wheel_fr.rotate_z(this.modelMatrix, z);
        this.catapult_wheel_bl.rotate_z(this.modelMatrix, z);
        this.catapult_wheel_fl.rotate_z(this.modelMatrix, z);
    
        return this.modelMatrix;
      }
    
      scale(relative_to, x, y, z) {
        mat4.scale(this.modelMatrix, relative_to, [x, 1, 1]);
        mat4.scale(this.modelMatrix, relative_to, [1, y, 1]);
        mat4.scale(this.modelMatrix, relative_to, [1, 1, z]);    
    
        this.catapult_wheel_br.scale(this.modelMatrix, x, y, z);
        this.catapult_wheel_fr.scale(this.modelMatrix, x, y, z);
        this.catapult_wheel_bl.scale(this.modelMatrix, x, y, z);
        this.catapult_wheel_fl.scale(this.modelMatrix, x, y, z);
    
        return this.modelMatrix;
      }

    getCatapultArmAngle() {
        return this.catapult_arm_angle;
    }

    setCatapultArmAngle(catapult_arm_angle) {
        this.catapult_arm_angle = catapult_arm_angle;
    }

    getProjectileModelMatrix() {
        return this.catapult_arm.getProjectileModelMatrix();
    }

    hideProjectile() {
        this.catapult_arm.hideProjectile();
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.catapult_wheel_br.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_fr.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_bl.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_fl.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

    // Private

    _drawStaticsParts() {
        // DIBUJO RUEDAS
        this.catapult_wheel_br.translate(this.modelMatrix, 0, 0, 0);
        this.catapult_wheel_br.draw()

        this.catapult_wheel_fr.translate(this.modelMatrix, 0, 0, -this.CATAPULT_WHEEL_SEPARATION_1);
        this.catapult_wheel_fr.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.catapult_wheel_bl.rotate_y(m1, 180);
        this.catapult_wheel_bl.translate(m1, -(this.CATAPULT_WHEEL_SEPARATION_2 + 0), 0, 0);
        this.catapult_wheel_bl.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.catapult_wheel_fl.translate(m1, this.CATAPULT_WHEEL_SEPARATION_2, 0, -this.CATAPULT_WHEEL_SEPARATION_1);
        m1 = this.catapult_wheel_fl.rotate_y(m1, 180);
        this.catapult_wheel_fl.draw();
    }
}