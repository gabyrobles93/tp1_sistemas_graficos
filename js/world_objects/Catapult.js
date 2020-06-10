class Catapult {
    constructor() {
        this.WHEEL_SEPARATION_1 = 9;
        this.WHEEL_SEPARATION_2 = 6;
        this.catapult_wheel_fr = new CatapultWheel();
        this.catapult_wheel_fl = new CatapultWheel();
        this.catapult_wheel_br = new CatapultWheel();
        this.catapult_wheel_bl = new CatapultWheel();

        this.catapult_floor = new Cube(6, 2.7, 0.3, true, MaterialsList.DEFAULT);
    }

    draw(modelMatrix) {
        this.catapult_wheel_br.draw(modelMatrix)

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [0, 0, -this.WHEEL_SEPARATION_1]);
        this.catapult_wheel_fr.draw(m1);

        m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI, [0, 1, 0]);
        mat4.translate(m1, m1, [-(this.WHEEL_SEPARATION_2 + 0), 0, 0]);
        this.catapult_wheel_bl.draw(m1);

        m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.WHEEL_SEPARATION_2, 0, -this.WHEEL_SEPARATION_1]);
        mat4.rotate(m1, m1, Math.PI, [0, 1, 0]);
        this.catapult_wheel_fl.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [1, 0, 0]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [0, -this.WHEEL_SEPARATION_1 / 2, this.WHEEL_SEPARATION_2 / 2]);
        this.catapult_floor.draw(m1);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.catapult_wheel_br.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_fr.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_bl.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_wheel_fl.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.catapult_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}