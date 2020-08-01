class CastleWall {
    constructor(sides_qty, side_size) {
        this.sides_qty = sides_qty;
        this.side_size = side_size;
        this.modelMatrix = mat4.create();
        this.towers = [];
        this.WALL_DOOR_PROPORTION = 0.82;
        this.GENERAL_ROTATION = Math.PI/2 - (2*Math.PI - 2*Math.PI * this.WALL_DOOR_PROPORTION) / 2;

        this.wall = new Extrusion(new CastleWall2D(), new CircleIncomplete(this.sides_qty - 2, this.side_size, this.WALL_DOOR_PROPORTION), false, MaterialsList.COLOR_WALL_GREY);
        this.door = new CastleWallDoor(this.side_size);

        this._createTowers();
    }

    draw() {
        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.wall.translate(m1, 0, 0, 0);
        m1 = this.wall.translate(m1, this.side_size/2, this.side_size/2, 0);
        this.wall.rotate_z(m1, -this.GENERAL_ROTATION * 180/Math.PI);
        this.wall.draw();

        var angle_increment = (this.WALL_DOOR_PROPORTION*2*Math.PI)/(this.sides_qty - 1);
        for (var i = 0; i < this.sides_qty; i++) {
            var angle = i * angle_increment;
            var m2 = mat4.clone(m1);
            m2 = this.towers[i].rotate_z(m2, angle * 180/Math.PI);
            m2 = this.towers[i].translate(m2, this.side_size - 8, 0, 0);
            this.towers[i].scale(m2, 1, 1, 1.4);
            this.towers[i].draw();
        }

        var m3 = mat4.clone(m1);
        m3 = this.door.rotate_z(m3, this.GENERAL_ROTATION * 180/Math.PI);
        this.door.translate(m3, -this.side_size/2, -(this.side_size/2 + 4), 0);
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
        this.wall.setViewProjectionMatrix(projMatrix, viewMatrix);

        for (var i = 0; i < this.sides_qty; i++) {
            this.towers[i].setViewProjectionMatrix(projMatrix, viewMatrix);
        }

        this.door.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

    // Private

    _createTowers() {
        for (var i = 0; i < this.sides_qty; i++) {
            this.towers.push(new CastleTower());
        }
    }
}