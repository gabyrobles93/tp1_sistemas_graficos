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
    }

    draw() {
        // DIBUJAMOS CADA PISO
        for (var i = 0; i < this.floors_qty; i++) {
            var m1 = mat4.clone(this.modelMatrix);
            m1 = this.floors[i].rotate_z(m1, 90);
            this.floors[i].translate(m1, i * (this.FLOOR_HEIGHT + 0.3), 0, 0);
            this.floors[i].draw();
        }
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