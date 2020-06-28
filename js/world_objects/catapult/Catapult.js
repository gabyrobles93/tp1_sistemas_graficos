class Catapult {
    constructor() {
        this.CATAPULT_WHEEL_SEPARATION_1 = 9;
        this.CATAPULT_WHEEL_SEPARATION_2 = 6;
        this.CATAPULT_FLOOR_WIDTH = 0.3
        this.catapult_wheel_fr = new CatapultWheel();
        this.catapult_wheel_fl = new CatapultWheel();
        this.catapult_wheel_br = new CatapultWheel();
        this.catapult_wheel_bl = new CatapultWheel();

        this.catapult_floor = new Cube(6, 2.7, 0.3, true, MaterialsList.LIGHT_BROWN);

        this.catapult_column_1 = new CatapultColumn();
        this.catapult_column_2 = new CatapultColumn();

        this.catapult_column_3 = new CatapultColumn();
        this.catapult_column_4 = new CatapultColumn();

        this.catapult_hub_principal = new Cilinder(0.4, this.CATAPULT_WHEEL_SEPARATION_2 * 0.84, true, MaterialsList.DARK_BROWN);
        this.catapult_hub_rope = new Cilinder(0.25, this.CATAPULT_WHEEL_SEPARATION_2 * 0.84 * 0.6, true, MaterialsList.DARK_BROWN);

        this.catapult_arm_angle = 0;
        this.catapult_arm = new CatapultArm();

        this.catapult_crank_1 = new Cilinder(0.05, 1.2, true, MaterialsList.LIGHT_BROWN);
        this.catapult_crank_2 = new Cilinder(0.05, 1.2, true, MaterialsList.LIGHT_BROWN);
    }

    draw(modelMatrix) {
        this._drawStaticsParts(modelMatrix);
        this._drawDynamicParts(modelMatrix);
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
        this.catapult_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_column_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_column_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_column_3.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_column_4.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_hub_principal.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_hub_rope.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_arm.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_crank_1.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

    // Private

    _drawDynamicParts(modelMatrix) {
        // REFERENCIA NO DIBUJABLE: CENTRO DEL EJE MOVIL, ENTRE LAS MANIVELAS
        var rope_lookat = mat4.clone(modelMatrix);
        mat4.translate(rope_lookat, rope_lookat, [this.CATAPULT_WHEEL_SEPARATION_1 * 0.35, 1.6, 0.57]);

        // DIBUJO BRAZO DE CATAPULTA
        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, -Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [-7, 4.6, -(this.CATAPULT_WHEEL_SEPARATION_2 / 2)]);
            // Rotación del brazo en su eje de catapulta
        mat4.rotate(m1, m1,  this.catapult_arm_angle * Math.PI/180, [0, 0, 1]);
        this.catapult_arm.draw(m1, rope_lookat, this.catapult_arm_angle);

        // DIBUJO MANIVELA DE EJE DE SOGA 1
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [1.8, 1.8, 0.57]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
        mat4.rotate(m1, m1, 5 * this.catapult_arm_angle * Math.PI/180, [0, 1, 0]);
        mat4.translate(m1, m1, [-0.6, 0, 0]);
        this.catapult_crank_1.draw(m1);

        // DIBUJO MANIVELA DE EJE DE SOGA 2
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [4.5, 1.8, 0.57]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
        mat4.rotate(m1, m1, 5 * this.catapult_arm_angle * Math.PI/180, [0, 1, 0]);
        mat4.translate(m1, m1, [-0.6, 0, 0]);
        this.catapult_crank_1.draw(m1);


    }

    _drawStaticsParts(modelMatrix) {
        // DIBUJO RUEDAS
        this.catapult_wheel_br.draw(modelMatrix)

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [0, 0, -this.CATAPULT_WHEEL_SEPARATION_1]);
        this.catapult_wheel_fr.draw(m1);

        m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI, [0, 1, 0]);
        mat4.translate(m1, m1, [-(this.CATAPULT_WHEEL_SEPARATION_2 + 0), 0, 0]);
        this.catapult_wheel_bl.draw(m1);

        m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.CATAPULT_WHEEL_SEPARATION_2, 0, -this.CATAPULT_WHEEL_SEPARATION_1]);
        mat4.rotate(m1, m1, Math.PI, [0, 1, 0]);
        this.catapult_wheel_fl.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [1, 0, 0]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [0, -this.CATAPULT_WHEEL_SEPARATION_1 / 2, this.CATAPULT_WHEEL_SEPARATION_2 / 2]);
        this.catapult_floor.draw(m1);

        // DIBUJO COLUMNAS DE BRAZO

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, -Math.PI/2, [1, 0, 0]);
        mat4.translate(m1, m1, [this.catapult_wheel_bl.CATAPULT_WHEEL_WIDTH * 2, this.CATAPULT_WHEEL_SEPARATION_1 * 0.65, this.CATAPULT_FLOOR_WIDTH]);
        mat4.scale(m1, m1, [1, 2.3, 2.3]);
        this.catapult_column_1.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, -Math.PI/2, [1, 0, 0]);
        mat4.translate(m1, m1, [this.CATAPULT_WHEEL_SEPARATION_2 - this.catapult_wheel_bl.CATAPULT_WHEEL_WIDTH * 3, this.CATAPULT_WHEEL_SEPARATION_1 * 0.65, this.CATAPULT_FLOOR_WIDTH]);
        mat4.scale(m1, m1, [1, 2.3, 2.3]);
        this.catapult_column_2.draw(m1);

        // DIBUJO COLUMNAS DE SOGA

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, -Math.PI/2, [1, 0, 0]);
        mat4.translate(m1, m1, [this.CATAPULT_WHEEL_SEPARATION_2 * 1/3, -1.2, this.CATAPULT_FLOOR_WIDTH]);
        mat4.scale(m1, m1, [1, 1.2, 1]);
        this.catapult_column_3.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, -Math.PI/2, [1, 0, 0]);
        mat4.translate(m1, m1, [this.CATAPULT_WHEEL_SEPARATION_2 - this.CATAPULT_WHEEL_SEPARATION_2 * 1/3, -1.2, this.CATAPULT_FLOOR_WIDTH]);
        mat4.scale(m1, m1, [1, 1.2, 1]);
        this.catapult_column_4.draw(m1);

        // DIBUJO EJE PRINCIPAL

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.catapult_wheel_bl.CATAPULT_WHEEL_WIDTH * 1.55, 4.2, -this.CATAPULT_WHEEL_SEPARATION_1 * 0.775]);
        this.catapult_hub_principal.draw(m1);

        // DIBUJO EJE DE SOGA

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.CATAPULT_WHEEL_SEPARATION_1 * 0.181, 1.8, 0.57]);
        this.catapult_hub_rope.draw(m1);
    }
}