class CatapultCounterweight {
    constructor() {
        this.modelMatrix = this.modelMatrix = mat4.create();
        this.counterweight_column_1 = new CatapultColumn();
        this.counterweight_column_2 = new CatapultColumn();
        this.counterweight_hub = new Cilinder(0.15, 1.1, true, MaterialsList.COLOR_DARK_BROWN);
        this.counterweight = new Cube(0.7, 0.7, 1.4, true, MaterialsList.COLOR_GREY);
    }

    draw() {
        // DIBUJO COLUMNA DE CONTRAPESO 1

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.counterweight_column_1.rotate_x(m1, -90);
        m1 = this.counterweight_column_1.rotate_z(m1, 90);
        m1 = this.counterweight_column_1.translate(m1, 0.3, -0.4, -1);
        this.counterweight_column_1.scale(m1, 0.5, 0.8, 0.6);
        this.counterweight_column_1.draw();

        // DIBUJO COLUMNA DE CONTRAPESO 2

        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.counterweight_column_2.rotate_x(m1, -90);
        m1 = this.counterweight_column_2.rotate_z(m1, 90);
        m1 = this.counterweight_column_2.translate(m1, -0.45, -0.4, -1);
        this.counterweight_column_2.scale(m1, 0.5, 0.8, 0.6);
        this.counterweight_column_2.draw();
        
        // DIBUJO EJE DE CONTRAPESO
        var m1 = mat4.clone(this.modelMatrix);
        m1 = this.counterweight_hub.rotate_x(m1, -90);
        m1 = this.counterweight_hub.rotate_z(m1, -90);
        this.counterweight_hub.translate(m1, -0.55, 0, 0);
        this.counterweight_hub.draw();

        // DIBUJO CONTRAPESO
        var m1 = mat4.clone(this.modelMatrix);
        this.counterweight.translate(m1, -0.7, -1.5, 0);
        this.counterweight.draw();
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
        this.counterweight_column_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.counterweight_column_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.counterweight_hub.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.counterweight.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

}