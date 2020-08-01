class Torch {
    constructor() {
        this.modelMatrix = mat4.create();
        this.handle = new Cilinder(0.2, 4, true, MaterialsList.COLOR_LIGHT_BROWN);
        this.fire = new Sphere(0.65, 30, 30, MaterialsList.COLOR_AXIS_RED);
    }

    draw() {
        this.handle.translate(this.modelMatrix, 0, 0, 0);
        this.fire.translate(this.modelMatrix, 0, 0, 0);

        this.handle.draw();
        this.fire.draw();
    }

    getPosition() {
        var torch_position = vec3.create();
        mat4.getTranslation(torch_position, this.modelMatrix);
        return torch_position;
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

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.handle.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.fire.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}