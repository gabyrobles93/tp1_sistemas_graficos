class CastleWallDoor {
    constructor(size) {
        this.size = size;
        this.wall_1 = new Extrusion(new CastleWall2D(), new Line(2, this.size * 0.3), false, MaterialsList.WALL_GREY);
        this.wall_2 = new Extrusion(new CastleWall2D(), new Line(2, this.size * 0.3), false, MaterialsList.WALL_GREY);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        this.wall_1.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.size * 0.7, 0, 0]);
        this.wall_2.draw(m1);        
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.wall_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.wall_2.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}