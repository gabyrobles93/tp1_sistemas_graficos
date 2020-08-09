class CastleWallDoor {
    constructor(size) {
        this.size = size;
        this.modelMatrix = mat4.create();
        this.WALL_PROPORTION = 0.23;
        this.DOOR_FRAME_WIDTH = 0.8;
        this.DOOR_WIDTH = 0.8;
        this.OFFSET = 5;
        this.DOOR_ANGLE = Math.PI/2;

        this.wall_1 = new Extrusion(new CastleWall2D(), new Line(2, this.size * this.WALL_PROPORTION), true, MaterialsList.WALL_DOOR);
        this.wall_2 = new Extrusion(new CastleWall2D(), new Line(2, this.size * this.WALL_PROPORTION), true, MaterialsList.WALL_DOOR);

        this.door_frame_1 = new Cube(this.DOOR_FRAME_WIDTH, 8.5, 6.5, true, MaterialsList.WALL_DOOR_PERIMETER);
        this.door_frame_2 = new Cube(this.DOOR_FRAME_WIDTH, 8.5, 6.5, true, MaterialsList.WALL_DOOR_PERIMETER);
        this.door_frame_3 = new Cube(this.DOOR_FRAME_WIDTH, (this.size/2) - (this.size * this.WALL_PROPORTION) - this.OFFSET, 6.5, true, MaterialsList.WALL_DOOR_PERIMETER);

        this.door = new Cube(this.DOOR_WIDTH, 8, this.size/2 - this.size * this.WALL_PROPORTION + 0.2, true, MaterialsList.WOOD_DARK);
    }

    draw() {
        var m1 = mat4.clone(this.modelMatrix);
        this.wall_1.translate(m1, this.OFFSET, 0, 0);
        this.wall_1.draw();

        var m1 = mat4.clone(this.modelMatrix);
        this.wall_2.translate(m1, this.size * (1-this.WALL_PROPORTION) - this.OFFSET, 0, 0);
        this.wall_2.draw();     

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.door_frame_1.translate(m1, this.OFFSET, 0, 0);
        m1 = this.door_frame_1.rotate_z(m1, -90);
        this.door_frame_1.translate(m1, 4, this.size * this.WALL_PROPORTION + this.DOOR_FRAME_WIDTH, 7.5);
        this.door_frame_1.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.door_frame_2.rotate_z(m1, -90);
        this.door_frame_1.translate(m1, 4, this.size * this.WALL_PROPORTION + this.DOOR_FRAME_WIDTH, 7.5);
        this.door_frame_1.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.door_frame_2.rotate_z(m1, -90);
        this.door_frame_2.translate(m1, 4, this.size * (1-this.WALL_PROPORTION) - this.OFFSET - this.DOOR_FRAME_WIDTH, 7.5);
        this.door_frame_2.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.door_frame_3.rotate_x(m1, 90);
        m1 = this.door_frame_3.rotate_y(m1, 90);
        this.door_frame_3.translate(m1, -10.5, 16.8, this.size/2);
        this.door_frame_3.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.door.translate(m1, 0, -6 - this.DOOR_WIDTH, 0);
        m1 = this.door.translate(m1, this.OFFSET + this.size * this.WALL_PROPORTION + this.DOOR_FRAME_WIDTH * 2, 0, 0);
        m1 = this.door.rotate_x(m1, CASTLE_WALL_DOOR_OPENING/100 * 90);
        this.door.translate(m1, 0, 0, 7);
        this.door.draw();
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
        this.wall_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.wall_2.setViewProjectionMatrix(projMatrix, viewMatrix);

        this.door_frame_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.door_frame_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.door_frame_3.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.door.setViewProjectionMatrix(projMatrix, viewMatrix);
    }
}