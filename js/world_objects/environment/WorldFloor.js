class WorldFloor {
    constructor(castle_floor_size) {
        this.castle_floor_size = castle_floor_size;
        //this.castle_floor = new Extrusion(new Line(4, this.castle_floor_size + 3), new Circle(40, 0.001), false, MaterialsList.GREEN);
        this.castle_floor = new Extrusion(new Circle(40, this.castle_floor_size + 3), new Line(4, 1), true, MaterialsList.GREEN);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        this.castle_floor.draw(m1);       
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.castle_floor.setViewProjectionMatrix(projMatrix, viewMatrix)
    }
}