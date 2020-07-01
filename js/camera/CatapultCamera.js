class CatapultCamera {
    constructor(catapult_control) {
        this.catapult_control = catapult_control;
        this.height = 6;
        this.radius = 40;

        this.viewMatrix = mat4.create();
        mat4.identity(this.viewMatrix);
    }

    getViewMatrix() {
        var catapult_position = this.catapult_control.getCatapultPosition();

        var catapult_look_position = vec3.create();
        // Necesario porque el 0 de la catapulta esta en una rueda trasera
        // Esto genera que la rotación de la catapulta se vea medio rara
        vec3.add(catapult_look_position, catapult_position, vec3.fromValues(3, 0, -3));


        var camera_position = vec3.fromValues(
            catapult_look_position[0] + this.catapult_control.getCatapultFrontal()[0] * this.radius,
            catapult_look_position[1] + this.height,
            catapult_look_position[2] + this.catapult_control.getCatapultFrontal()[2] * this.radius
        )

        mat4.lookAt(this.viewMatrix, camera_position, catapult_look_position, [0, 1, 0]);
        return this.viewMatrix;
    }

    use() {
        // Nada para hacer
    }
}