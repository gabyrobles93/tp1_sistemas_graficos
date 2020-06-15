class Castle {
    constructor(size_1, size_2, floors_qty) {
        this.FLOOR_HEIGHT = 10;
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.floors_qty = floors_qty;
        this.floors = [];

        this._createFloors();
    }

    draw(modelMatrix) {
        // DIBUJAMOS CADA PISO
        for (var i = 0; i < this.floors_qty; i++) {
            var m1 = mat4.clone(modelMatrix);
            mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
            mat4.translate(m1, m1, [i * (this.FLOOR_HEIGHT + 0.3), 0, 0]);
            this.floors[i].draw(m1);
        }

    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        for (var i = 0; i < this.floors_qty; i++) {
            this.floors[i].setViewProjectionMatrix(projMatrix, viewMatrix);
        }
    }

    // Private

    _createFloors() {
        for (var i = 0; i < this.floors_qty; i++) {
            this.floors.push(new CastleFloor(this.size_1, this.size_2, this.FLOOR_HEIGHT));
        }
    }
}