class CatapultWheel {
    constructor() {
        this.CATAPULT_WHEEL_WIDTH = 0.3;
        this.CATAPULT_WHEEL_HUB_WIDTH = 0.1;
        this.CATAPULT_WHEEL_RADIUS = 1;
        this.CATAPULT_WHEEL_HUB_RADIUS = 1/6;

        this.wheel = new Cilinder(this.CATAPULT_WHEEL_RADIUS, this.CATAPULT_WHEEL_WIDTH, true, MaterialsList.DEFAULT)
        this.wheel_hub = new Cilinder (this.CATAPULT_WHEEL_HUB_RADIUS, this.CATAPULT_WHEEL_HUB_WIDTH, true, MaterialsList.DEFAULT)
    }

    draw(modelMatrix) {
        var wheel_hub_translation = mat4.clone(modelMatrix);

        mat4.translate(wheel_hub_translation, wheel_hub_translation, [-this.CATAPULT_WHEEL_HUB_WIDTH, 0, 0]);

        this.wheel.draw(modelMatrix);
        this.wheel_hub.draw(wheel_hub_translation);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.wheel.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.wheel_hub.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}