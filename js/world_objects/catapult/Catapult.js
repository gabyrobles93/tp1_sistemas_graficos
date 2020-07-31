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

        this.catapult_floor = new Cube(6, 2.7, 0.3, true, MaterialsList.TEST_NORMAL);

        this.catapult_column_1 = new CatapultColumn();
        this.catapult_column_2 = new CatapultColumn();

        this.catapult_column_3 = new CatapultColumn();
        this.catapult_column_4 = new CatapultColumn();

        this.catapult_hub_principal = new Cilinder(0.4, this.CATAPULT_WHEEL_SEPARATION_2 * 0.84, true, MaterialsList.TEST_NORMAL);
        this.catapult_hub_rope = new Cilinder(0.25, this.CATAPULT_WHEEL_SEPARATION_2 * 0.84 * 0.6, true, MaterialsList.TEST_NORMAL);

        this.catapult_crank_1 = new Cilinder(0.05, 1.2, true, MaterialsList.TEST_NORMAL);
        this.catapult_crank_2 = new Cilinder(0.05, 1.2, true, MaterialsList.TEST_NORMAL);

        this.catapult_arm = new CatapultArm();
    }

    draw() {
        this._drawStaticsParts();
        this._drawDynamicParts();
    }

    translate(relative_to, x, y, z) {
        mat4.translate(this.modelMatrix, relative_to, [x, y, z]);

        return this.modelMatrix;
    }
    
      rotate_x(relative_to, x) {
        mat4.rotate(this.modelMatrix, relative_to, x * Math.PI/180, [1, 0, 0]);
     
        return this.modelMatrix;
      }
    
      rotate_y(relative_to, y) {
        mat4.rotate(this.modelMatrix, relative_to, y * Math.PI/180, [0, 1, 0]);
    
        return this.modelMatrix;
      }
    
      rotate_z(relative_to, z) {
        mat4.rotate(this.modelMatrix, relative_to, z * Math.PI/180, [0, 0, 1]); 
    
        return this.modelMatrix;
      }
    
      scale(relative_to, x, y, z) {
        mat4.scale(this.modelMatrix, relative_to, [x, 1, 1]);
        mat4.scale(this.modelMatrix, relative_to, [1, y, 1]);
        mat4.scale(this.modelMatrix, relative_to, [1, 1, z]);    
    
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

    showProjectile() {
      this.catapult_arm.showProjectile();
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.catapult_wheel_br.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_fr.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_bl.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_fl.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_column_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_column_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_column_3.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_column_4.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_hub_principal.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_hub_rope.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_crank_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_crank_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_arm.setViewProjectionMatrix(projMatrix, viewMatrix);
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

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.catapult_floor.rotate_x(m1, 90);
        m1 = this.catapult_floor.rotate_y(m1, 90);
        this.catapult_floor.translate(m1, 0, -this.CATAPULT_WHEEL_SEPARATION_1 / 2, this.CATAPULT_WHEEL_SEPARATION_2 / 2);
        this.catapult_floor.draw();

        // DIBUJO COLUMNAS DE BRAZO

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.catapult_column_1.rotate_x(m1, -90);
        m1 = this.catapult_column_1.translate(m1, this.catapult_wheel_bl.CATAPULT_WHEEL_WIDTH * 2, this.CATAPULT_WHEEL_SEPARATION_1 * 0.65, this.CATAPULT_FLOOR_WIDTH);
        this.catapult_column_1.scale(m1, 1, 2.3, 2.3);
        this.catapult_column_1.draw();


        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.catapult_column_2.rotate_x(m1, -90);
        m1 = this.catapult_column_2.translate(m1, this.CATAPULT_WHEEL_SEPARATION_2 - this.catapult_wheel_bl.CATAPULT_WHEEL_WIDTH * 3, this.CATAPULT_WHEEL_SEPARATION_1 * 0.65, this.CATAPULT_FLOOR_WIDTH);
        this.catapult_column_2.scale(m1, 1, 2.3, 2.3);
        this.catapult_column_2.draw();

        // DIBUJO COLUMNAS DE SOGA

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.catapult_column_3.rotate_x(m1, -90);
        m1 = this.catapult_column_3.translate(m1, this.CATAPULT_WHEEL_SEPARATION_2 * 1/3, -1.2, this.CATAPULT_FLOOR_WIDTH);
        this.catapult_column_3.scale(m1, 1, 1.2, 1);
        this.catapult_column_3.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.catapult_column_4.rotate_x(m1, -90);
        m1 = this.catapult_column_4.translate(m1, this.CATAPULT_WHEEL_SEPARATION_2 - this.CATAPULT_WHEEL_SEPARATION_2 * 1/3, -1.2, this.CATAPULT_FLOOR_WIDTH);
        this.catapult_column_4.scale(m1, 1, 1.2, 1);
        this.catapult_column_4.draw();

        // DIBUJO EJE PRINCIPAL

        var m1 = mat4.clone(this.modelMatrix);
        this.catapult_hub_principal.translate(m1, this.catapult_wheel_bl.CATAPULT_WHEEL_WIDTH * 1.55, 4.2, -this.CATAPULT_WHEEL_SEPARATION_1 * 0.775);
        this.catapult_hub_principal.draw();

        // DIBUJO EJE DE SOGA

        var m1 = mat4.clone(this.modelMatrix);
        this.catapult_hub_rope.translate(m1, this.CATAPULT_WHEEL_SEPARATION_1 * 0.181, 1.8, 0.57);
        this.catapult_hub_rope.draw();
    }

    _drawDynamicParts() {
      // REFERENCIA NO DIBUJABLE: CENTRO DEL EJE MOVIL, ENTRE LAS MANIVELAS
      var rope_lookat = mat4.clone(this.modelMatrix);
      mat4.translate(rope_lookat, rope_lookat, [this.CATAPULT_WHEEL_SEPARATION_1 * 0.35, 1.6, 0.57]);

      var m1 = mat4.clone(this.modelMatrix);
      m1 = this.catapult_arm.rotate_y(m1, -90);
      m1 = this.catapult_arm.translate(m1, -7, 4.6, -(this.CATAPULT_WHEEL_SEPARATION_2 / 2));
      this.catapult_arm.rotate_z(m1, this.catapult_arm_angle);
      this.catapult_arm.draw(rope_lookat, this.catapult_arm_angle);

      // DIBUJO BRAZO DE CATAPULTA
/*       var m1 = mat4.clone(modelMatrix);
      mat4.rotate(m1, m1, -Math.PI/2, [0, 1, 0]);
      mat4.translate(m1, m1, [-7, 4.6, -(this.CATAPULT_WHEEL_SEPARATION_2 / 2)]);
          // Rotación del brazo en su eje de catapulta
      mat4.rotate(m1, m1,  this.catapult_arm_angle * Math.PI/180, [0, 0, 1]);
      this.catapult_arm.draw(m1, rope_lookat, this.catapult_arm_angle); */

      // DIBUJO MANIVELA DE EJE DE SOGA 1
      var m1 = mat4.clone(this.modelMatrix);
      m1 = this.catapult_crank_1.translate(m1, 1.8, 1.8, 0.57);
      m1 = this.catapult_crank_1.rotate_z(m1, 90);
      m1 = this.catapult_crank_1.rotate_y(m1, 5 * this.catapult_arm_angle);
      this.catapult_crank_1.translate(m1, -0.6, 0, 0);
      this.catapult_crank_1.draw();

      // DIBUJO MANIVELA DE EJE DE SOGA 2
      var m1 = mat4.clone(this.modelMatrix);
      m1 = this.catapult_crank_2.translate(m1, 4.5, 1.8, 0.57);
      m1 = this.catapult_crank_2.rotate_z(m1, 90);
      m1 = this.catapult_crank_2.rotate_y(m1, 5 * this.catapult_arm_angle);
      this.catapult_crank_2.translate(m1, -0.6, 0, 0);
      this.catapult_crank_2.draw();
  }
}