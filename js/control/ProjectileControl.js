class ProjectileControl {
    constructor(canvas) {
        this.initial_speed = 0.6;
        this.gravity = 0.1;
        this.initial_time = 0;
        this.max_arm_angle = 0;

        this.projectile_flying = false;
        this.projectile_model_matrix = mat4.create();
        mat4.identity(this.projectile_model_matrix);
    }

    drawProjectile(projectile, original_projectile_model_matrix, arm_angle, max_arm_angle) {
        if (arm_angle >= max_arm_angle && !this.projectile_flying) {
            this.projectile_flying = true;
            this.max_arm_angle = max_arm_angle;
            this.initial_time = 0;
        } else if (arm_angle < max_arm_angle) {
            this.projectile_flying = false;
            mat4.rotate(original_projectile_model_matrix, original_projectile_model_matrix, max_arm_angle * Math.PI/180, [0, 0, 1]);
            this.projectile_model_matrix = mat4.clone(original_projectile_model_matrix);
        }

        projectile.draw(this.projectile_model_matrix);
    }

    animate(t) {
        if (this.initial_time == 0) {
            this.initial_time = t;
        }

        if (this.projectile_flying) {
            var delta_t = t - this.initial_time;
            var y_speed = this.initial_speed * Math.sin(this.max_arm_angle * Math.PI/180) - this.gravity * delta_t;
            var x_speed = this.initial_speed * Math.cos(this.max_arm_angle * Math.PI/180);
            mat4.translate(this.projectile_model_matrix, this.projectile_model_matrix, [y_speed, x_speed, 0]);
        }
    }
}