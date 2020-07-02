class CameraControl {
    constructor(canvas, catapult_control) {
        this.CHANGE_CAMERA_KEY = "KeyC";         // c

        this.canvas = canvas;
        this.cameras = [];

        this.cameras.push(new OrbitalCamera(canvas));
        this.cameras.push(new CatapultCamera(catapult_control));
        this.cameras.push(new FirstPersonCamera(canvas));

        this._setEventListeners(canvas);

        this.cameras[0].use(this.canvas);
    }

    getViewMatrix() {
        return this.cameras[0].getViewMatrix();
    }

    // Private

    _nextCamera() {
        this.cameras.unshift(this.cameras.pop());
        this.cameras[0].use(this.canvas);
    }

    _setEventListeners(canvas) {
        document.addEventListener('keydown', (e) => {
            if(e.code === this.CHANGE_CAMERA_KEY) this._nextCamera();
        });
    }
}