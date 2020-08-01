class Axis {
    constructor() {
        this.x = new Cilinder(0.02, 3, true, MaterialsList.COLOR_LIGHT_BROWN);
        this.y = new Cilinder(0.02, 3, true, MaterialsList.COLOR_LIGHT_BROWN);
        this.z = new Cilinder(0.02, 3, true, MaterialsList.COLOR_LIGHT_BROWN);
    }

    draw() {
        var m1 = mat4.create();
        mat4.identity(m1);

        this.y.rotate_z(m1, 90);
        this.z.rotate_y(m1, -90, 0);

        this.x.draw();
        this.y.draw();
        this.z.draw();
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.x.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.y.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.z.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}