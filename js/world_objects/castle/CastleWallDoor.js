class CastleWallDoor {
    constructor(size) {
        this.size = size;
        this.WALL_PROPORTION = 0.23;
        this.DOOR_FRAME_WIDTH = 0.8;
        this.DOOR_WIDTH = 0.8;
        this.OFFSET = 5;
        this.DOOR_ANGLE = Math.PI/2;

        this.wall_1 = new Extrusion(new CastleWall2D(), new Line(2, this.size * this.WALL_PROPORTION), true, MaterialsList.TEST_NORMAL);
        this.wall_2 = new Extrusion(new CastleWall2D(), new Line(2, this.size * this.WALL_PROPORTION), true, MaterialsList.TEST_NORMAL);

        this.door_frame_1 = new Cube(this.DOOR_FRAME_WIDTH, 8.5, 6.5, true, MaterialsList.TEST_NORMAL);
        this.door_frame_2 = new Cube(this.DOOR_FRAME_WIDTH, 8.5, 6.5, true, MaterialsList.TEST_NORMAL);
        this.door_frame_3 = new Cube(this.DOOR_FRAME_WIDTH, (this.size/2) - (this.size * this.WALL_PROPORTION) - this.OFFSET, 6.5, true, MaterialsList.TEST_NORMAL);

        this.door = new Cube(this.DOOR_WIDTH, 8, this.size/2 - this.size * this.WALL_PROPORTION + 0.2, true, MaterialsList.TEST_NORMAL);

        this.referencia = new Cilinder(0.1, 1, true, MaterialsList.TEST_NORMAL);
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
        mat4.translate(m1, m1, [-10.5, 16.8, this.size/2]);
        this.door_frame_3.draw(m1);

/*         var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [0, -6 - this.DOOR_WIDTH, 7]);
        mat4.translate(m1, m1, [this.OFFSET + this.size * this.WALL_PROPORTION + this.DOOR_FRAME_WIDTH * 2, 0, 0]);
        this.door.draw(m1); */

        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [0, -6 - this.DOOR_WIDTH, 0]);
        mat4.translate(m1, m1, [this.OFFSET + this.size * this.WALL_PROPORTION + this.DOOR_FRAME_WIDTH * 2, 0, 0]);
        mat4.rotate(m1, m1, this.DOOR_ANGLE, [1, 0, 0]);
        mat4.translate(m1, m1, [0, 0, 7]);
        this.door.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
        mat4.translate(m1, m1, [-6, 0, 0]);
        this.referencia.draw(m1);
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.wall_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.wall_2.setViewProjectionMatrix(projMatrix, viewMatrix);

        this.door_frame_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.door_frame_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.door_frame_3.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.door.setViewProjectionMatrix(projMatrix, viewMatrix);

        this.referencia.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}