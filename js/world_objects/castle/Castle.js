class Castle {
    constructor(size_1, size_2, floors_qty) {
        this.FLOOR_HEIGHT = 10;
        this.TOP_FLOOR_EXTRA_HEIGHT = 1.5;

        this.modelMatrix = mat4.create();

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

        this.ceiling = new CastleCeiling(size_1, size_2);
    }

    draw() {
        // DIBUJAMOS CADA PISO
        for (var i = 0; i < this.floors_qty; i++) {
            var m1 = mat4.clone(this.modelMatrix);
            m1 = this.floors[i].rotate_z(m1, 90);
            this.floors[i].translate(m1, i * (this.FLOOR_HEIGHT + 0.3), 0, 0);
            this.floors[i].draw();
        }

        // DIBUJAMOS LAS COLUMNAS
        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.column_1.rotate_x(m1, 90);
        this.column_1.translate(m1, -this.size_1, this.size_2, -this.floors_qty * this.FLOOR_HEIGHT);
        this.column_1.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.column_2.rotate_x(m1, 90);
        this.column_2.translate(m1, this.size_1, this.size_2, -this.floors_qty * this.FLOOR_HEIGHT);
        this.column_2.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.column_3.rotate_x(m1, 90);
        this.column_3.translate(m1, -this.size_1, -this.size_2, -this.floors_qty * this.FLOOR_HEIGHT);
        this.column_3.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.column_4.rotate_x(m1, 90);
        this.column_4.translate(m1, this.size_1, -this.size_2, -this.floors_qty * this.FLOOR_HEIGHT);
        this.column_4.draw();

        // DIBUJAMOS LOS TECHOS DE LAS COLUMNAS
        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.column_ceiling_1.rotate_x(m1, -90);
        m1 = this.column_ceiling_1.translate(m1, -this.size_1, this.size_2, this.floors_qty * this.FLOOR_HEIGHT + 4.5);
        this.column_ceiling_1.scale(m1, 3.2, 3.2, 3.2);
        this.column_ceiling_1.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.column_ceiling_2.rotate_x(m1, -90);
        m1 = this.column_ceiling_2.translate(m1, this.size_1, this.size_2, this.floors_qty * this.FLOOR_HEIGHT + 4.5);
        this.column_ceiling_2.scale(m1, 3.2, 3.2, 3.2);
        this.column_ceiling_2.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.column_ceiling_3.rotate_x(m1, -90);
        m1 = this.column_ceiling_3.translate(m1, -this.size_1, -this.size_2, this.floors_qty * this.FLOOR_HEIGHT + 4.5);
        this.column_ceiling_3.scale(m1, 3.2, 3.2, 3.2);
        this.column_ceiling_3.draw();

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.column_ceiling_3.rotate_x(m1, -90);
        m1 = this.column_ceiling_3.translate(m1, this.size_1, -this.size_2, this.floors_qty * this.FLOOR_HEIGHT + 4.5);
        this.column_ceiling_3.scale(m1, 3.2, 3.2, 3.2);
        this.column_ceiling_3.draw();

        // DIBUJO TECHO DEL CASTILLO

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.ceiling.rotate_z(m1, -90);
        this.ceiling.translate(m1, -this.floors_qty * this.FLOOR_HEIGHT - 10 - 0.3 * (this.floors_qty - 1), 0, 0);
        this.ceiling.draw();
    }

    translate(relative_to, x, y, z) {
        mat4.translate(this.modelMatrix, relative_to, [x, y, z]);

        for (var i = 0; i < this.floors_qty; i++) {
            this.floors[i].translate(this.modelMatrix, x, y, z);
        }

        return this.modelMatrix;
    }

    rotate_x(relative_to, x) {
        mat4.rotate(this.modelMatrix, relative_to, x * Math.PI/180, [1, 0, 0]);
       
        for (var i = 0; i < this.floors_qty; i++) {
            this.floors[i].rotate_x(this.modelMatrix, x);
        }
    
        return this.modelMatrix;
    }

    rotate_y(relative_to, y) {
        mat4.rotate(this.modelMatrix, relative_to, y * Math.PI/180, [0, 1, 0]);
    
        for (var i = 0; i < this.floors_qty; i++) {
            this.floors[i].rotate_y(this.modelMatrix, y);
        }
    
        return this.modelMatrix;
    }

    rotate_z(relative_to, z) {
        mat4.rotate(this.modelMatrix, relative_to, z * Math.PI/180, [0, 0, 1]);
    
        for (var i = 0; i < this.floors_qty; i++) {
            this.floors[i].rotate_z(this.modelMatrix, z);
        }
    
        return this.modelMatrix;
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

        this.ceiling.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

    // Private

    _createFloors() {
        for (var i = 0; i < this.floors_qty; i++) {
            var extra_floor_height = 0;
            if (i == this.floors_qty - 1) {
                extra_floor_height = this.TOP_FLOOR_EXTRA_HEIGHT;
            }
            this.floors.push(new CastleFloor(this.size_1, this.size_2, this.FLOOR_HEIGHT, extra_floor_height));
        }
    }
}