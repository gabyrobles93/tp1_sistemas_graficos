class CastleWall {
    constructor(sides_qty, side_size) {
        this.sides_qty = sides_qty;
        this.side_size = side_size;
        this.side_offset = 7;
        this.sides = []
        this.sum_angles = 180 + 180 * (this.sides_qty - 3);
        this.each_angle = this.sum_angles / this.sides_qty;

        this._createSides();
    }

    draw(modelMatrix) {
        for(var i = 0; i < this.sides_qty; i++) {
            var m1 = mat4.clone(modelMatrix);
            
            for (var j = 0; j < i; j++) {
                mat4.translate(m1, m1, [this.side_size - this.side_offset, -this.side_offset, 0]);
                mat4.rotate(m1, m1, (180 - this.each_angle) * Math.PI / 180, [0, 0, 1]);
            }

            this.sides[i].draw(m1);
        }
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        for (var i = 0; i <= this.sides_qty; i++) {
            this.sides[i].setViewProjectionMatrix(projMatrix, viewMatrix);
        }
    }

    // Private
    _createSides() {
        for (var i = 0; i <= this.sides_qty; i++) {
            this.sides.push(new Extrusion(new CastleWall2D(), new Line(4, this.side_size), false, MaterialsList.WALL_GREY));
        }
    }
}