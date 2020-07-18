class FirstPersonCamera {
    constructor(canvas) {
        this.CAMERA_HEIGHT = 3;
        this.TARGET_DISTANCE = 5;
        this.is_mouse_down = false

        this.MOVE_FORWARD_KEY = 87; // w
        this.MOVE_BACK_KEY = 83;    // s
        this.MOVE_LEFT_KEY = 65;    // a
        this.MOVE_RIGHT_KEY = 68;   // d

        this.mouse = { x:0, y:0 };
        this.last_client_x = 0;
        this.last_client_y = 0;

        this.position = mat4.create();
        mat4.translate(this.position, this.position, [0, this.CAMERA_HEIGHT, 80]);

        this.target = mat4.create();
        mat4.translate(this.target, this.target, [0, 0, -this.TARGET_DISTANCE]);
    
        this.alfa = 0;
        this.beta = Math.PI/2;
        this.speed_factor = 0.01;

        this.frontal = [0, 0, 1];
        this.lateral = [1, 0, 0];

        this.viewMatrix = mat4.create();

        this._setEventListeners(canvas);
    }

    getViewMatrix() {
        const aux_1 = vec3.create();
        vec3.transformMat4(aux_1, vec3.fromValues(0, 0, 0), this.position);

        const aux_2 = mat4.create();
        mat4.multiply(aux_2, this.position, this.target);

        const aux_3 = vec3.create();
        vec3.transformMat4(aux_3, vec3.fromValues(0, 0, 0), aux_2);

        this.viewMatrix = mat4.create();
        mat4.lookAt(this.viewMatrix, aux_1, aux_3, [0, 1, 0]);

        return this.viewMatrix;
    }

    use(canvas) {
        this._setEventListeners(canvas);
    }

    // Private

    _setEventListeners(canvas) {
        canvas.onmousemove = (event) => {
            if (this.is_mouse_down) {
                this.mouse.x = event.clientX;
                this.mouse.y = event.clientY;
            
                this._updateAlfaAndBeta();
                this._updatePosition();
                this._updateTarget();
            }
        }

        canvas.onmousedown = (event) => {
            this.is_mouse_down = true;
        }

        canvas.onmouseup = (event) => {
            this.is_mouse_down = false;
        }

        window.onkeydown = (event) => {
            if (event.keyCode == this.MOVE_FORWARD_KEY) {
                var current_position = vec3.create();
                mat4.getTranslation(current_position, this.position);

                var x = this.frontal[0];
                var y = 0;
                var z = this.frontal[2];

                mat4.translate(this.position, this.position, [x, y ,z]);
            }

            if (event.keyCode == this.MOVE_BACK_KEY) {
                var current_position = vec3.create();
                mat4.getTranslation(current_position, this.position);

                var x = - this.frontal[0];
                var y = 0;
                var z = - this.frontal[2];

                mat4.translate(this.position, this.position, [x, y ,z]);
            }

            if (event.keyCode == this.MOVE_LEFT_KEY) {
                var current_position = vec3.create();
                mat4.getTranslation(current_position, this.position);

                var x = this.lateral[0];
                var y = 0;
                var z = this.lateral[2];

                mat4.translate(this.position, this.position, [x, y ,z]);
            }

            if (event.keyCode == this.MOVE_RIGHT_KEY) {
                var current_position = vec3.create();
                mat4.getTranslation(current_position, this.position);

                var x = - this.lateral[0];
                var y = 0;
                var z = - this.lateral[2];

                mat4.translate(this.position, this.position, [x, y ,z]);
            }
        }
    }

    _updateAlfaAndBeta() {
            var delta_X = 0;
            var delta_Y = 0;

            if (this.last_client_x) delta_X = this.last_client_x - this.mouse.x;
            if (this.last_client_y) delta_Y = -(this.last_client_y - this.mouse.y);

            this.last_client_x = this.mouse.x;
            this.last_client_y = this.mouse.y;

            this.alfa = delta_X * this.speed_factor;
            this.beta = this.beta + delta_Y * this.speed_factor;

            if (this.beta < 0) this.beta = 0;
            if (this.beta > Math.PI) this.beta = Math.PI;
      }

      _updatePosition() {
        this.frontal = vec3.fromValues(0, 0, 1);
        this.lateral = vec3.fromValues(1, 0, 0);
    
        const m1 = mat4.create();
        mat4.fromYRotation(m1, this.alfa);
        vec3.transformMat4(this.frontal, this.frontal, m1);
        vec3.transformMat4(this.lateral, this.lateral, m1);
    
        mat4.rotate(this.position, this.position, this.alfa, [0, 1, 0]);
    }

    _updateTarget() {
        var x = this.TARGET_DISTANCE * Math.sin(this.alfa * this.speed_factor) * Math.sin(this.beta);
        var y = this.TARGET_DISTANCE * Math.cos(this.beta) + this.CAMERA_HEIGHT;
        var z = this.TARGET_DISTANCE * Math.cos(this.alfa * this.speed_factor) * Math.sin(this.beta);

        var m1 = mat4.create();
        mat4.translate(this.target, m1, [x, y, z]);
    }
}