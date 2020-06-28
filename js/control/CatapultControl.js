class CatapultControl {
    constructor(canvas) {
        this.catapult_is_shooting = false;
        this.max_catapult_arm_angle = 45;
        this.catapult_arm_angle = 0;
        this.catapult_angle = 0;

        this.catapult_position_x = 95;
        this.catapult_position_y = 0.5;
        this.catapult_model_matrix = mat4.create();
        mat4.identity(this.catapult_model_matrix);
        mat4.translate(this.catapult_model_matrix, this.catapult_model_matrix, [-2.5, this.catapult_position_y, this.catapult_position_x]);
        mat4.rotate(this.catapult_model_matrix, this.catapult_model_matrix, this.catapult_angle * Math.PI/180, [0, 1, 0]);

        this.CATAPULT_ADVANCE_KEY = "KeyU";         // k
        this.CATAPULT_RECOIL_KEY = "KeyJ";          // j
        this.CATAPULT_LEFT_ROTATION_KEY = "KeyH";   // h
        this.CATAPULT_RIGHT_ROTATION_KEY = "KeyK";  // k

        this.CATAPULT_SHOOT_KEY = "Space";           // spacebar
        this.CATAPULT_LOAD_PROJECTILE = "KeyO";     // o

        this._setEventListeners(canvas);
    }

    drawCatapult(catapult) {
        if (this.catapult_is_shooting && this.catapult_arm_angle <= this.max_catapult_arm_angle) {
            this.catapult_arm_angle = this.catapult_arm_angle + 1;
        }

        if (!this.catapult_is_shooting) {
            this.catapult_arm_angle = 0;
        }

        if (this.catapult_arm_angle >= this.max_catapult_arm_angle) {
            catapult.hideProjectile();
        }

        catapult.setCatapultArmAngle(this.catapult_arm_angle);
        catapult.draw(this.catapult_model_matrix);
    }

    getProjectileModelMatrix(catapult) {
        return catapult.getProjectileModelMatrix();
    }

    // Private

    _setEventListeners(canvas) {
        document.addEventListener('keydown', (e) => {
            if(e.code === this.CATAPULT_ADVANCE_KEY) mat4.translate(this.catapult_model_matrix, this.catapult_model_matrix, [0, 0, -1]);
            if(e.code === this.CATAPULT_RECOIL_KEY) mat4.translate(this.catapult_model_matrix, this.catapult_model_matrix, [0, 0, 1]);
            if(e.code === this.CATAPULT_LEFT_ROTATION_KEY) mat4.rotate(this.catapult_model_matrix, this.catapult_model_matrix, 1 * Math.PI/180, [0, 1, 0]);
            if(e.code === this.CATAPULT_RIGHT_ROTATION_KEY) mat4.rotate(this.catapult_model_matrix, this.catapult_model_matrix, -1 * Math.PI/180, [0, 1, 0]);
            if(e.code === this.CATAPULT_SHOOT_KEY) this.catapult_is_shooting = true;
            if(e.code === this.CATAPULT_LOAD_PROJECTILE) this.catapult_is_shooting = false;
        });
    }
}