class CastleWall {
    constructor(sides_qty, side_size) {
        this.sides_qty = sides_qty;
        this.side_size = side_size;
        this.towers = [];
        this.WALL_DOOR_PROPORTION = 0.82;
        this.GENERAL_ROTATION = Math.PI/2 - (2*Math.PI - 2*Math.PI * this.WALL_DOOR_PROPORTION) / 2;

        this.wall = new Extrusion(new CastleWall2D(), new CircleIncomplete(this.sides_qty - 2, this.side_size, this.WALL_DOOR_PROPORTION), false, MaterialsList.WALL_GREY);
        this.door = new CastleWallDoor(this.side_size);

        this._createTowers();
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [0, 0, 0]);
        mat4.translate(m1, m1, [this.side_size/2, this.side_size/2, 0]);
        mat4.rotate(m1, m1, -this.GENERAL_ROTATION, [0, 0, 1]);
        this.wall.draw(m1);

        var angle_increment = (this.WALL_DOOR_PROPORTION*2*Math.PI)/(this.sides_qty - 1);
        for (var i = 0; i < this.sides_qty; i++) {
            var angle = i * angle_increment;
            var m2 = mat4.clone(m1);
            mat4.rotate(m2, m2, angle, [0, 0, 1]);
            mat4.translate(m2, m2, [this.side_size - 8, 0, 0]);
            mat4.scale(m2, m2, [1, 1, 1.4]);
            this.towers[i].draw(m2);
        }

        var m3 = mat4.clone(m1);
        mat4.rotate(m3, m3, this.GENERAL_ROTATION, [0, 0, 1]);
        mat4.translate(m3, m3, [-this.side_size/2, -(this.side_size/2 + 4), 0]);
        this.door.draw(m3);
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