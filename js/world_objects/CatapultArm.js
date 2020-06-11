class CatapultArm {
    constructor() {
        this.arm = new Cube(0.3, 0.3, 13, true, MaterialsList.DEFAULT);
        this.bucket = new Cube(1.2, 1.2, 0.6, true, MaterialsList.DEFAULT);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        this.arm.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
        mat4.translate(m1, m1, [-0.3, -(13 + 1.2), 0]);
        this.bucket.draw(m1);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.arm.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.bucket.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}