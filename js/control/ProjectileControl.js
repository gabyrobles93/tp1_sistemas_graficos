class ProjectileControl {
    constructor(projectile) {
        this.projectile = null;
        this.initial_speed = 0.6;
        this.gravity = 0.1;
        this.initial_time = 0;
        this.max_arm_angle = 0;

        this.projectile_flying = false;
    }

    setProjectile(projectile) {
        this.projectile = projectile;
    }

    drawProjectile(original_projectile_model_matrix, arm_angle, max_arm_angle) {
        if (arm_angle >= max_arm_angle && !this.projectile_flying) {
            console.log("Hola");
            this.projectile_flying = true;
            this.max_arm_angle = max_arm_angle;
            this.initial_time = 0;
            this.projectile.setVisible();
        } else if (arm_angle < max_arm_angle) {
            console.log("Chau");
            this.projectile_flying = false;
            this.projectile.translate(original_projectile_model_matrix, 0, 0, 0);
            this.projectile.rotate_z(original_projectile_model_matrix, max_arm_angle);
            this.projectile.setInvisible();
        }

        this.projectile.draw();
    }

    animate(t) {
        if (this.initial_time == 0) {
            this.initial_time = t;
        }

        if (this.projectile_flying) {
            var delta_t = t - this.initial_time;
            var x_speed = this.initial_speed * Math.sin(this.max_arm_angle * Math.PI/180) - this.gravity * delta_t;
            var y_speed = this.initial_speed * Math.cos(this.max_arm_angle * Math.PI/180);

            this.projectile.translate(this.projectile.modelMatrix, x_speed, y_speed, 0);
        }
    }
}