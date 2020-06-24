class CastleWallDoor {
    constructor(size) {
        this.size = size;
        this.WALL_PROPORTION = 0.25;
        this.wall_1 = new Extrusion(new CastleWall2D(), new Line(2, this.size * this.WALL_PROPORTION), false, MaterialsList.WALL_GREY);
        this.wall_2 = new Extrusion(new CastleWall2D(), new Line(2, this.size * this.WALL_PROPORTION), false, MaterialsList.WALL_GREY);
        this.OFFSET = 5;
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.OFFSET, 0, 0]);
        this.wall_1.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.size * (1-this.WALL_PROPORTION) - this.OFFSET, 0, 0]);
        this.wall_2.draw(m1);        
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.wall_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.wall_2.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}