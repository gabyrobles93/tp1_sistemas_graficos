class CatapultArm {
    constructor() {
        this.modelMatrix = this.modelMatrix = mat4.create();
        this.projectile_model_matrix = mat4.create();
        this.arm = new Cube(0.3, 0.3, 13, true, MaterialsList.TEST_NORMAL);
        this.bucket = new Cube(1.2, 1.2, 0.6, true, MaterialsList.TEST_NORMAL);
        this.rope_end = new Cilinder(0.6, 0.5, true, MaterialsList.TEST_NORMAL);
        this.rope = new Cilinder(0.05, 1, true, MaterialsList.TEST_NORMAL);
        this.projectile = new Sphere(0.9, 30, 30, MaterialsList.TEST_NORMAL);
    }

    draw(rope_lookat, arm_angle) {
        // DIBUJO BRAZO PRINCIPAL
        var m1 = mat4.clone(this.modelMatrix);
        this.arm.translate(m1, -2.5, 0, 0);
        this.arm.draw();

        // DIBUJO PORTA PROYECTIL

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.bucket.rotate_z(m1, 90);
        this.bucket.translate(m1, -0.3, -(10.5 + 1.2), 0);
        this.bucket.draw();

        // DIBUJO FINAL DE SOGA
        var m1 = mat4.clone(this.modelMatrix);
        this.rope_end.translate(m1, 7.3, 0, 0);
        this.rope_end.draw();

        // DIBUJO SOGA
        var m1 = mat4.clone(this.modelMatrix);
        mat4.translate(m1, m1, [7.55, 0, 0]);

        var eye = vec3.fromValues(m1[12], m1[13], m1[14]);
        var center = vec3.fromValues(rope_lookat[12], rope_lookat[13], rope_lookat[14]);
        var distance = vec3.distance(eye, center);

        mat4.targetTo(m1, eye, center, [1, 0, 0]);
        m1 = this.rope.rotate_y(m1, 90);
        this.rope.scale(m1, distance, 1, 1);
        this.rope.draw();

        // DIBUJO CONTRAPESO
/*         var m1 = mat4.clone(this.modelMatrix);
        m1 = this.counterweight.translate(m1, -2, 0, 0);
        this.counterweight.rotate_z(m1, -arm_angle);
        this.counterweight.draw(); */

/* 

        // DIBUJO CONTRAPESO
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [-2, 0, 0]);
        mat4.rotate(m1, m1, arm_angle * Math.PI/180, [0, 0, -1]);
        this.counterweight.draw(m1);

        // DIBUJO PROYECTIL
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [11.75, 1.2, 0]);
        this.projectile_model_matrix = mat4.clone(m1);
        this.projectile.draw(m1); */
    }

    translate(relative_to, x, y, z) {
        mat4.translate(this.modelMatrix, relative_to, [x, y, z]);
    
        return this.modelMatrix;
    }

    rotate_x(relative_to, x) {
        mat4.rotate(this.modelMatrix, relative_to, x * Math.PI/180, [1, 0, 0]);

        return this.modelMatrix;
    }

    rotate_y(relative_to, y) {
        mat4.rotate(this.modelMatrix, relative_to, y * Math.PI/180, [0, 1, 0]);

        return this.modelMatrix;
    }

    rotate_z(relative_to, z) {
        mat4.rotate(this.modelMatrix, relative_to, z * Math.PI/180, [0, 0, 1]); 

        return this.modelMatrix;
    }

    scale(relative_to, x, y, z) {
        mat4.scale(this.modelMatrix, relative_to, [x, 1, 1]);
        mat4.scale(this.modelMatrix, relative_to, [1, y, 1]);
        mat4.scale(this.modelMatrix, relative_to, [1, 1, z]);    

        return this.modelMatrix;
    }

    getProjectileModelMatrix() {
        return this.projectile_model_matrix;
    }

    hideProjectile() {
        this.projectile.setInvisible();
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.arm.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.bucket.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.rope_end.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.rope.setViewProjectionMatrix(projMatrix, viewMatrix);
/*         this.counterweight.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.projectile.setViewProjectionMatrix(projMatrix, viewMatrix); */
    }
}