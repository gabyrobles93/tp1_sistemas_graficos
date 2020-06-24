class CastleWall {
    constructor(sides_qty, side_size) {
        this.sides_qty = sides_qty - 1;
        this.side_size = side_size;

        this.wall = new Extrusion(new CastleWall2D(), new Circle(this.sides_qty, this.side_size), false, MaterialsList.WALL_GREY);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.side_size/2, this.side_size/2, 0]);
        this.wall.draw(m1);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.wall.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}