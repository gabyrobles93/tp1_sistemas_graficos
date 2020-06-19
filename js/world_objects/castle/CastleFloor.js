class CastleFloor {
    constructor(size_1, size_2, height, extra_height) {
        this.size_1 = size_1;
        this.size_2 = size_2;
        this.height = height;
        this.extra_height = extra_height;

        this.floor = new Cube(this.size_1, this.size_2, height + extra_height, false, MaterialsList.BEIGE);
        this.roof = new Cube(this.size_1 + 0.3, 0.3, this.size_2 * 2 + 0.6, true, MaterialsList.BEIGE);
        this.windows_size_1_front = [];
        this.windows_size_1_back = [];
        this.windows_size_2_front = [];
        this.windows_size_2_back = [];

        this.BORDER_MARGIN = 3;
        this.MIN_WINDOW_BETWEEN_SIZE = 2;
        this.WINDOW_SIZE = 1.8;

        this.window_points_size_1 = [];
        this.window_points_size_2 = [];
        
        this._calcWindowSize1Points();
        this._calcWindowSize2Points();

        this._createWindows(this.window_points_size_1, this.window_points_size_2);
    }

    draw(modelMatrix) {
        var m1 = mat4.clone(modelMatrix);
        this.floor.draw(m1);

        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
        mat4.translate(m1, m1, [-this.size_2 - 0.3, 0, this.height + this.extra_height + 0.3]);
        this.roof.draw(m1);

        this._drawSize1Windows(modelMatrix);
        this._drawSize2Windows(modelMatrix);

    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.floor.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.roof.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.windows_size_1_front.forEach(window => window.setViewProjectionMatrix(projMatrix, viewMatrix));
        this.windows_size_1_back.forEach(window => window.setViewProjectionMatrix(projMatrix, viewMatrix));
        this.windows_size_2_front.forEach(window => window.setViewProjectionMatrix(projMatrix, viewMatrix));
        this.windows_size_2_back.forEach(window => window.setViewProjectionMatrix(projMatrix, viewMatrix));
    }

    // PRIVATE

    _drawSize1Windows(modelMatrix) {
        for (var i = 0; i < this.windows_size_1_front.length; i++) {
            var m1 = mat4.clone(modelMatrix);
            mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
            var windows_position = 0;
            if (this.window_points_size_1[i] > 0) {
                windows_position = this.size_1 - this.window_points_size_1[i] - this.WINDOW_SIZE/2;
            } else {
                windows_position = this.window_points_size_1[i] - this.WINDOW_SIZE/2;
            }
            mat4.translate(m1, m1, [-(this.size_2 + 0.3), windows_position, 0.6 * this.height]);
            this.windows_size_1_front[i].draw(m1);
        }

        for (var i = 0; i < this.windows_size_1_back.length; i++) {
            var m1 = mat4.clone(modelMatrix);
            mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
            var windows_position = 0;
            if (this.window_points_size_1[i] > 0) {
                windows_position = this.size_1 - this.window_points_size_1[i] - this.WINDOW_SIZE/2;
            } else {
                windows_position = this.window_points_size_1[i] - this.WINDOW_SIZE/2;
            }
            mat4.translate(m1, m1, [(this.size_2 + 0.3), windows_position, 0.6 * this.height]);
            this.windows_size_1_back[i].draw(m1);
        }
    }

    _drawSize2Windows(modelMatrix) {
        for (var i = 0; i < this.windows_size_2_front.length; i++) {
            var m1 = mat4.clone(modelMatrix);
            mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
            mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
            var windows_position = 0;
            if (this.window_points_size_2[i] > 0) {
                windows_position = this.size_2 - this.window_points_size_2[i] - this.WINDOW_SIZE/2;
            } else {
                windows_position = this.window_points_size_2[i] - this.WINDOW_SIZE/2;
            }
            mat4.translate(m1, m1, [this.size_1, windows_position, 0.6 * this.height]);
            this.windows_size_2_front[i].draw(m1);
        }

        for (var i = 0; i < this.windows_size_2_back.length; i++) {
            var m1 = mat4.clone(modelMatrix);
            mat4.rotate(m1, m1, Math.PI/2, [0, 1, 0]);
            mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
            var windows_position = 0;
            if (this.window_points_size_2[i] > 0) {
                windows_position = this.size_2 - this.window_points_size_2[i] - this.WINDOW_SIZE/2;
            } else {
                windows_position = this.window_points_size_2[i] - this.WINDOW_SIZE/2;
            }
            mat4.translate(m1, m1, [-(this.size_1 + 0.3), windows_position, 0.6 * this.height]);
            this.windows_size_2_back[i].draw(m1);
        }
    }

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

    _calcWindowSize2Points() {
        var step = this.size_2 * 2;
        var prev_step = 0;
        while (step/2 >= this.BORDER_MARGIN) {
            step = step/2;
            this.window_points_size_2.push(step);
            if (step + prev_step < this.size_2) {
                this.window_points_size_2.push(step + prev_step);
            }
            prev_step = step;
        }
    }

    _createWindows(window_points_size_1, window_points_size_2) {
        var simetric_points = [];
        for (var i = 0; i < window_points_size_1.length; i++) {
            this.windows_size_1_front.push(new CastleWindow());
            this.windows_size_1_back.push(new CastleWindow());
            if (i != 0) {
                this.windows_size_1_front.push(new CastleWindow());
                this.windows_size_1_back.push(new CastleWindow());
                simetric_points.push(window_points_size_1[i] * -1);
            }
        }
        this.window_points_size_1 = this.window_points_size_1.concat(simetric_points);

        var simetric_points = [];
        for (var i = 0; i < window_points_size_2.length; i++) {
            this.windows_size_2_front.push(new CastleWindow());
            this.windows_size_2_back.push(new CastleWindow());
            if (i != 0) {
                this.windows_size_2_front.push(new CastleWindow());
                this.windows_size_2_back.push(new CastleWindow());
                simetric_points.push(window_points_size_2[i] * -1);
            }
        }
        this.window_points_size_2 = this.window_points_size_2.concat(simetric_points);

    }
}