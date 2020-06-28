class CatapultControl {
    constructor(canvas) {
        this.catapult_initial_angle = 0;
        this.catapult_angle = 0;

        this.catapult_position_x = 95;
        this.catapult_position_y = 0.5;
        this.catapult_model_matrix = mat4.create();
        mat4.identity(this.catapult_model_matrix);
        mat4.translate(this.catapult_model_matrix, this.catapult_model_matrix, [-2.5, this.catapult_position_y, this.catapult_position_x]);
        mat4.rotate(this.catapult_model_matrix, this.catapult_model_matrix, this.catapult_angle * Math.PI/180, [0, 1, 0]);

        this.CATAPULT_ADVANCE_KEY = 85;         // k
        this.CATAPULT_RECOIL_KEY = 74;          // j
        this.CATAPULT_LEFT_ROTATION_KEY = 72;   // h
        this.CATAPULT_RIGHT_ROTATION_KEY = 75;  // k

        this.CATAPULT_SHOOT_KEY = 32;           // spacebar
        this.CATAPULT_LOAD_PROJECTILE = 79;     // o

        this._setEventListeners(canvas);
    }

    drawCatapult(catapult) {
        catapult.draw(this.catapult_model_matrix);
    }

    // Private

    _setEventListeners(canvas) {
        window.onkeydown = (event) => {
            if (event.keyCode == this.CATAPULT_ADVANCE_KEY) {
                mat4.translate(this.catapult_model_matrix, this.catapult_model_matrix, [0, 0, -1]);
            }

            if (event.keyCode == this.CATAPULT_RECOIL_KEY) {
                mat4.translate(this.catapult_model_matrix, this.catapult_model_matrix, [0, 0, 1]);
            }

            if (event.keyCode == this.CATAPULT_LEFT_ROTATION_KEY) {
                mat4.rotate(this.catapult_model_matrix, this.catapult_model_matrix, 1 * Math.PI/180, [0, 1, 0]);
            }

            if (event.keyCode == this.CATAPULT_RIGHT_ROTATION_KEY) {
                mat4.rotate(this.catapult_model_matrix, this.catapult_model_matrix, -1 * Math.PI/180, [0, 1, 0]);
            }
        }
    }
}