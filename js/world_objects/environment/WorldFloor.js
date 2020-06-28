class WorldFloor {
    constructor(castle_floor_size) {
        this.castle_floor_size = castle_floor_size;
        this.castle_floor = new Extrusion(new Circle(40, this.castle_floor_size + 3), new Line(4, 1), true, MaterialsList.GREEN);
        this.castle_bridge = new Cube(8, 28, 1, true, MaterialsList.GREEN);
        this.castle_water = new Extrusion(new Line(4, 28), new Circle(7, this.castle_floor_size + 3), false, MaterialsList.BLUE);
        this.world_floor = new Extrusion(new Rectangle(this.castle_floor_size + 70, 1), new Circle(7, this.castle_floor_size + 150), true, MaterialsList.GREEN);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        this.castle_floor.draw(m1);
        
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [0, 0, this.castle_floor_size + 3]);
        this.castle_bridge.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [0, 0, 0]);
        this.castle_water.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        this.world_floor.draw(m1);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.castle_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.castle_bridge.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.castle_water.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.world_floor.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}