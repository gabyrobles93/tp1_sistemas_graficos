class CastleWallDoor {
    constructor(size) {
        this.size = size;
        this.WALL_PROPORTION = 0.23;
        this.DOOR_FRAME_WIDTH = 0.8;
        this.OFFSET = 5;

        this.wall_1 = new Extrusion(new CastleWall2D(), new Line(2, this.size * this.WALL_PROPORTION), true, MaterialsList.WALL_GREY);
        this.wall_2 = new Extrusion(new CastleWall2D(), new Line(2, this.size * this.WALL_PROPORTION), true, MaterialsList.WALL_GREY);

        this.door_frame_1 = new Cube(this.DOOR_FRAME_WIDTH, 8.5, 6.5, true, MaterialsList.WALL_GREY);
        this.door_frame_2 = new Cube(this.DOOR_FRAME_WIDTH, 8.5, 6.5, true, MaterialsList.WALL_GREY);
        this.door_frame_3 = new Cube(this.DOOR_FRAME_WIDTH, (this.size/2) - (this.size * this.WALL_PROPORTION) - this.OFFSET, 6.5, true, MaterialsList.WALL_GREY);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.OFFSET, 0, 0]);
        this.wall_1.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.size * (1-this.WALL_PROPORTION) - this.OFFSET, 0, 0]);
        this.wall_2.draw(m1);        

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [this.OFFSET, 0, 0]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, -1]);
        mat4.translate(m1, m1, [4, this.size * this.WALL_PROPORTION + this.DOOR_FRAME_WIDTH, 7.5]);
        this.door_frame_1.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, -1]);
        mat4.translate(m1, m1, [4, this.size * (1-this.WALL_PROPORTION) - this.OFFSET - this.DOOR_FRAME_WIDTH, 7.5]);
        this.door_frame_2.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [1, 0, 0]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [-10, 16.8, this.size/2]);
        this.door_frame_3.draw(m1);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.wall_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.wall_2.setViewProjectionMatrix(projMatrix, viewMatrix);

        this.door_frame_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.door_frame_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.door_frame_3.setViewProjectionMatrix(projMatrix, viewMatrix);

    }
}