class CatapultArm {
    constructor() {
        this.arm = new Cube(0.3, 0.3, 13, true, MaterialsList.DEFAULT);
        this.bucket = new Cube(1.2, 1.2, 0.6, true, MaterialsList.DEFAULT);
        this.rope_end = new Cilinder(0.6, 0.5, true, MaterialsList.DEFAULT);
        this.rope = new Cilinder(0.05, 1, true, MaterialsList.DEFAULT);
    }

    draw(modelMatrix, rope_lookat) {
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [-2, 0, 0]);
        this.arm.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
        mat4.translate(m1, m1, [-0.3, -(11 + 1.2), 0]);
        this.bucket.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [7.3, 0, 0]);
        this.rope_end.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [7.55, 0, 0]);

        var eye = vec3.fromValues(m1[12], m1[13], m1[14]);
        var center = vec3.fromValues(rope_lookat[12], rope_lookat[13], rope_lookat[14]);
        var distance = vec3.distance(eye, center);

        console.log(distance);

        mat4.targetTo(m1, eye, center, [1, 0, 0]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);

        console.log(m1);
        mat4.scale(m1, m1, [distance, 1, 1]);
        console.log(m1);

        this.rope.draw(m1);      
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.arm.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.bucket.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.rope_end.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.rope.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}