class Castle {
    constructor(size_1, size_2, floors_qty) {
        this.FLOOR_HEIGHT = 10;
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.floors_qty = floors_qty;
        this.floors = [];

        this._createFloors();
        this.column_1 = new CastleColumn(this.floors_qty * this.FLOOR_HEIGHT);
        this.column_2 = new CastleColumn(this.floors_qty * this.FLOOR_HEIGHT);
        this.column_3 = new CastleColumn(this.floors_qty * this.FLOOR_HEIGHT);
        this.column_4 = new CastleColumn(this.floors_qty * this.FLOOR_HEIGHT);

        this.column_ceiling_1 = new CastleColumnCeiling();
        this.column_ceiling_2 = new CastleColumnCeiling();
        this.column_ceiling_3 = new CastleColumnCeiling();
        this.column_ceiling_4 = new CastleColumnCeiling();
    }

    draw(modelMatrix) {
        // DIBUJAMOS CADA PISO
        for (var i = 0; i < this.floors_qty; i++) {
            var m1 = mat4.clone(modelMatrix);
            mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
            mat4.translate(m1, m1, [i * (this.FLOOR_HEIGHT + 0.3), 0, 0]);
            this.floors[i].draw(m1);
        }

        // DIBUJAMOS LAS COLUMNAS
        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [1, 0, 0]);
        mat4.translate(m1, m1, [-this.size_1, this.size_2, -this.floors_qty * this.FLOOR_HEIGHT]);
        this.column_1.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [1, 0, 0]);
        mat4.translate(m1, m1, [this.size_1, this.size_2, -this.floors_qty * this.FLOOR_HEIGHT]);
        this.column_2.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [1, 0, 0]);
        mat4.translate(m1, m1, [-this.size_1, -this.size_2, -this.floors_qty * this.FLOOR_HEIGHT]);
        this.column_3.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [1, 0, 0]);
        mat4.translate(m1, m1, [this.size_1, -this.size_2, -this.floors_qty * this.FLOOR_HEIGHT]);
        this.column_4.draw(m1);

        // DIBUJAMOS LOS TECHOS DE LAS COLUMNAS
        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [-1, 0, 0]);
        mat4.translate(m1, m1, [-this.size_1, this.size_2, this.floors_qty * this.FLOOR_HEIGHT + 2.5]);
        mat4.scale(m1, m1, [3.2, 3.2, 3.2]);
        this.column_ceiling_1.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [-1, 0, 0]);
        mat4.translate(m1, m1, [this.size_1, this.size_2, this.floors_qty * this.FLOOR_HEIGHT + 2.5]);
        mat4.scale(m1, m1, [3.2, 3.2, 3.2]);
        this.column_ceiling_2.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [-1, 0, 0]);
        mat4.translate(m1, m1, [-this.size_1, -this.size_2, this.floors_qty * this.FLOOR_HEIGHT + 2.5]);
        mat4.scale(m1, m1, [3.2, 3.2, 3.2]);
        this.column_ceiling_3.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [-1, 0, 0]);
        mat4.translate(m1, m1, [this.size_1, -this.size_2, this.floors_qty * this.FLOOR_HEIGHT + 2.5]);
        mat4.scale(m1, m1, [3.2, 3.2, 3.2]);
        this.column_ceiling_4.draw(m1);

    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        for (var i = 0; i < this.floors_qty; i++) {
            this.floors[i].setViewProjectionMatrix(projMatrix, viewMatrix);
        }

        this.column_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.column_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.column_3.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.column_4.setViewProjectionMatrix(projMatrix, viewMatrix);

        this.column_ceiling_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.column_ceiling_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.column_ceiling_3.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.column_ceiling_4.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

    // Private

    _createFloors() {
        for (var i = 0; i < this.floors_qty; i++) {
            this.floors.push(new CastleFloor(this.size_1, this.size_2, this.FLOOR_HEIGHT));
        }
    }
}