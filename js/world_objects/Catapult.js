class Catapult {
    constructor() {
        this.CATAPULT_WHEEL_SEPARATION_1 = 9;
        this.CATAPULT_WHEEL_SEPARATION_2 = 6;
        this.CATAPULT_FLOOR_WIDTH = 0.3
        this.catapult_wheel_fr = new CatapultWheel();
        this.catapult_wheel_fl = new CatapultWheel();
        this.catapult_wheel_br = new CatapultWheel();
        this.catapult_wheel_bl = new CatapultWheel();

        this.catapult_floor = new Cube(6, 2.7, 0.3, true, MaterialsList.DEFAULT);

        this.catapult_column_1 = new CatapultColumn();
        this.catapult_column_2 = new CatapultColumn();

        this.catapult_column_3 = new CatapultColumn();
        this.catapult_column_4 = new CatapultColumn();

        this.catapult_hub_principal = new Cilinder(0.4, this.CATAPULT_WHEEL_SEPARATION_2 * 0.84, true, MaterialsList.DEFAULT);
        this.catapult_hub_rope = new Cilinder(0.25, this.CATAPULT_WHEEL_SEPARATION_2 * 0.84 * 0.5, true, MaterialsList.DEFAULT);

        this.catapult_arm = new CatapultArm();
    }

    draw(modelMatrix) {
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
        mat4.translate(m1, m1, [this.CATAPULT_WHEEL_SEPARATION_1 * 0.21, 1.8, 0.57]);
        this.catapult_hub_rope.draw(m1);

        // DIBUJO BRAZO DE CATAPULTA

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, -Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [-7, 4.6, -(this.CATAPULT_WHEEL_SEPARATION_2 / 2)]);
            // Rotación del brazo en su eje de catapulta
        mat4.rotate(m1, m1, Math.PI/7, [0, 0, 1]);
        this.catapult_arm.draw(m1);
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
    }
}