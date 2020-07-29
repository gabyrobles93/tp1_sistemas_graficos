class CatapultControl {
    constructor(canvas) {
        this.catapult = null;

        this.catapult_is_shooting = false;
        this.max_catapult_arm_angle = 45;
        this.catapult_arm_angle = 0;
        this.catapult_angle = 0;
        this.catapult_frontal = [0, 0, 1];

        this.catapult_position_x = 0;//95;
        this.catapult_position_y = 0.5;
        this.catapult_model_matrix = mat4.create();

        this.CATAPULT_ADVANCE_KEY = "KeyU";         // k
        this.CATAPULT_RECOIL_KEY = "KeyJ";          // j
        this.CATAPULT_LEFT_ROTATION_KEY = "KeyH";   // h
        this.CATAPULT_RIGHT_ROTATION_KEY = "KeyK";  // k

        this.CATAPULT_SHOOT_KEY = "Space";           // spacebar
        this.CATAPULT_LOAD_PROJECTILE = "KeyO";     // o

        this._setEventListeners(canvas);
    }

    setCatapult(catapult) {
        this.catapult = catapult;

        var m1 = mat4.clone(this.catapult.modelMatrix);
        m1 = this.catapult.translate(m1, -2.5, this.catapult_position_y, this.catapult_position_x);
        this.catapult.rotate_y(m1, this.catapult_angle);
    }

    drawCatapult() {
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
        catapult.draw();
    }

    getProjectileModelMatrix() {
        return this.catapult.getProjectileModelMatrix();
    }

    getArmAngle() {
        return this.catapult_arm_angle;
    }

    getMaxArmAngle() {
        return this.max_catapult_arm_angle;
    }

    getCatapultPosition() {
        var catapult_position = vec3.create();
        mat4.getTranslation(catapult_position, this.catapult.modelMatrix);
        return catapult_position;
    }

    getCatapultFrontal() {
        return this.catapult_frontal;
    }

    // Private

    _setEventListeners(canvas) {
        document.addEventListener('keydown', (e) => {
            if(e.code === this.CATAPULT_ADVANCE_KEY) this.catapult.translate(this.catapult.modelMatrix, 0, 0, -1);
            if(e.code === this.CATAPULT_RECOIL_KEY) this.catapult.translate(this.catapult.modelMatrix, 0, 0, 1);

            if(e.code === this.CATAPULT_LEFT_ROTATION_KEY) {
                this.catapult.rotate_y(this.catapult.modelMatrix, 1);
                var m1 = mat4.create();
                mat4.fromYRotation(m1, 1 * Math.PI/180);
                vec3.transformMat4(this.catapult_frontal, this.catapult_frontal, m1);
            } 

            if(e.code === this.CATAPULT_RIGHT_ROTATION_KEY) {
                this.catapult.rotate_y(this.catapult.modelMatrix, -1);
                var m1 = mat4.create();
                mat4.fromYRotation(m1, -1 * Math.PI/180);
                vec3.transformMat4(this.catapult_frontal, this.catapult_frontal, m1);
            } 

            if(e.code === this.CATAPULT_SHOOT_KEY) this.catapult_is_shooting = true;
            if(e.code === this.CATAPULT_LOAD_PROJECTILE) this.catapult_is_shooting = false;
        });
    }
}