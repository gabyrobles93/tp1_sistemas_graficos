class CastleFloor {
    constructor(size_1, size_2, height) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.height = height;

        this.floor = new Cube(this.size_1, this.size_2, height, false, MaterialsList.BEIGE);
        this.roof = new Cube(this.size_1 + 0.3, 0.3, this.size_2 * 2 + 0.6, true, MaterialsList.BEIGE);
        this.windows_size_1 = [];
        this.window_test = new CastleWindow();

        this.BORDER_MARGIN = 3;
        this.MIN_WINDOW_BETWEEN_SIZE = 2;
        this.WINDOW_SIZE = 1.8;

        this.window_points_size_1 = [];
        
        this._calcWindowSize1Points();
        this._createWindows(this.window_points_size_1);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        this.floor.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [-this.size_2 - 0.3, 0, this.height + 0.3]);
        this.roof.draw(m1);

        console.log(this.windows_size_1.length);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [-(this.size_2 + 0.3), -this.FIRST_WINDOW_POSITION, 0.38 * this.height]);
        this.window_test.draw(m1);

        for (var i = 0; i < this.windows_size_1.length; i++) {
            var m1 = mat4.clone(modelMatrix);
            mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
            var windows_position = 0;
            if (this.window_points_size_1[i] > 0) {
                windows_position = this.size_1 - this.window_points_size_1[i] - this.WINDOW_SIZE/2;
            } else {
                windows_position = this.window_points_size_1[i] - this.WINDOW_SIZE/2;
            }
            mat4.translate(m1, m1, [-(this.size_2 + 0.3), windows_position, 0.38 * this.height]);
            this.windows_size_1[i].draw(m1);
        }
    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.floor.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.roof.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.window_test.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.windows_size_1.forEach(window => window.setViewProjectionMatrix(projMatrix, viewMatrix));
    }

    // PRIVATE

    _calcWindowSize1Points() {
        var step = this.size_1 * 2;
        var prev_step = 0;
        while (step/2 >= this.BORDER_MARGIN) {
            step = step/2;
            this.window_points_size_1.push(step);
            if (step + prev_step < this.size_1) {
                this.window_points_size_1.push(step + prev_step);
            }
            prev_step = step;
        }
    }

    _createWindows(window_points_size_1) {
        var simetric_points = [];
        for (var i = 0; i < window_points_size_1.length; i++) {
            this.windows_size_1.push(new CastleWindow());
            if (i != 0) {
                this.windows_size_1.push(new CastleWindow());
                simetric_points.push(window_points_size_1[i] * -1);
            }
        }
        this.window_points_size_1 = this.window_points_size_1.concat(simetric_points);
        console.log(this.window_points_size_1);
    }
}