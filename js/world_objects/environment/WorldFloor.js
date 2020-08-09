class WorldFloor {
    constructor(castle_floor_size) {
        this.castle_floor_size = castle_floor_size;
        this.modelMatrix = mat4.create();
        this.castle_floor = new Extrusion(new Circle(40, this.castle_floor_size + 3), new Line(4, 1), true, MaterialsList.GRASS);
        this.castle_bridge = new Cube(8, 28, 1, true, MaterialsList.GRASS);
        this.castle_water = new Extrusion(new Line(4, 28), new Circle(7, this.castle_floor_size + 3), false, MaterialsList.WATER);
        this.world_floor = new Extrusion(new Rectangle(this.castle_floor_size + 70, 1), new Circle(7, this.castle_floor_size + 150), true, MaterialsList.GRASS);
    }

    draw() {
        var m1 = mat4.clone(this.modelMatrix);
        this.castle_floor.translate(m1, 0, 0, 0);
        this.castle_floor.draw();
        
        var m1 = mat4.clone(this.modelMatrix);
        this.castle_bridge.translate(m1, 0, 0, this.castle_floor_size + 3);
        this.castle_bridge.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.castle_water.rotate_y(m1, 90);
        this.castle_water.translate(m1, 0, 0, 0);
        this.castle_water.draw();

        var m1 = mat4.clone(this.modelMatrix);
        this.world_floor.rotate_y(m1, 90);
        this.world_floor.draw();
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
        this.castle_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.castle_bridge.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.castle_water.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.world_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}