class OrbitalCamera {
    constructor(canvas) {
        this.last_mouse_X = 0;
        this.last_mouse_Y = 0;
        this.mode = 'orbital';
        this.is_mouse_down = false;
        this.pressedKeys = new Set();

        this.radius = -130;
        this.alfa = -Math.PI/4;
        this.beta = 0.6 * Math.PI;

        this.move_speed_factor = 0.01;
        this.zoom_speed_factor = 0.025;

        this.viewMatrix = mat4.create();
        mat4.identity(this.viewMatrix);

        this.position = [0, 0, -0];
        this.up_vector = [0, 1, 0];
        this.target = [0, 0, 0];

        this._setEventListeners(canvas);
        this._updateCamera();
    }

    getViewMatrix() {
        return this.viewMatrix;
    }

    use(canvas) {
        this._setEventListeners(canvas);
    }

    getPosition() {
        return this.position;
    }

    // Private

    _setEventListeners(canvas) {
        window.onkeydown = (event) => {
            if (event.keyCode == 81) {
                // zoom in [q]
                this.radius += this.zoom_speed_factor * 100;
                this._updateCamera();
            }

            if (event.keyCode == 69) {
                // zoom out [e]
                this.radius -= this.zoom_speed_factor * 100;
                this._updateCamera();
            }
        }


        canvas.onmousedown = (event) => {
            this.is_mouse_down = true;
        }

        canvas.onmouseup = (event) => {
            this.is_mouse_down = false;
            this.last_mouse_X = 0;
            this.last_mouse_Y = 0;
        }

        canvas.onmousemove = (event) => {
            if (this.is_mouse_down) {
                var delta_X=0;
                var delta_Y=0;

                if (this.last_mouse_X) delta_X = mouse.x - this.last_mouse_X;
                if (this.last_mouse_Y) delta_Y = mouse.y - this.last_mouse_Y;

                this.last_mouse_X = mouse.x;
                this.last_mouse_Y = mouse.y;

                this.alfa = this.alfa + delta_X * this.move_speed_factor;
                this.beta = this.beta + delta_Y * this.move_speed_factor;

                if (this.beta < Math.PI/2) this.beta = Math.PI/2;
                if (this.beta > Math.PI) this.beta = Math.PI;

                this._updateCamera();
            }
        }
    }

    _updateCamera() {
        var x = this.radius * Math.sin((this.beta)) * Math.cos(this.alfa);
        var y = this.radius * Math.cos(this.beta);
        var z = this.radius * Math.sin(this.beta) * Math.sin(this.alfa);
        this.position = [x, y, z];
        mat4.lookAt(this.viewMatrix, this.position, this.target, this.up_vector);
    }
}