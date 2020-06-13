class CatapultCounterweight {
    constructor() {
        this.counterweight_column_1 = new CatapultColumn();
        this.counterweight_column_2 = new CatapultColumn();
        this.counterweight_hub = new Cilinder(0.15, 1.1, true, MaterialsList.DEFAULT);
        this.counterweight = new Cube(0.7, 0.7, 1.4, true, MaterialsList.DEFAULT);

        this.referencia = new Cilinder(0.01, 0.8, true, MaterialsList.DEFAULT);
    }

    draw(modelMatrix, arm_angle) {
        // DIBUJO COLUMNA DE CONTRAPESO 1
        var m1 = mat4.clone(modelMatrix);

        mat4.rotate(m1, m1, Math.PI/2, [-1, 0, 0]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
        mat4.translate(m1, m1, [0.3, -0.4, -1]);
        mat4.scale(m1, m1, [0.5, 0.8, 0.6]);

        this.counterweight_column_1.draw(m1);

        // DIBUJO COLUMNA DE CONTRAPESO 1
        var m1 = mat4.clone(modelMatrix);

        mat4.rotate(m1, m1, Math.PI/2, [-1, 0, 0]);
        mat4.rotate(m1, m1, Math.PI/2, [0, 0, 1]);
        mat4.translate(m1, m1, [-0.45, -0.4, -1]);
        mat4.scale(m1, m1, [0.5, 0.8, 0.6]);

        this.counterweight_column_2.draw(m1);

        // DIBUJO EJE DE CONTRAPESO
        var m1 = mat4.clone(modelMatrix);
        mat4.rotate(m1, m1, -Math.PI/2, [1, 0, 0]);
        mat4.rotate(m1, m1, -Math.PI/2, [0, 0, 1]);
        mat4.translate(m1, m1, [-0.55, 0, 0]);

        this.counterweight_hub.draw(m1); 

        // DIBUJO CONTRAPESO
        var m1 = mat4.clone(modelMatrix);
        mat4.translate(m1, m1, [-0.7, -1.5, 0]);

        this.counterweight.draw(m1);

    }

    setViewProjectionMatrix(projMatrix, viewMatrix) {
        this.counterweight_column_1.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.counterweight_column_2.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.counterweight_hub.setViewProjectionMatrix(projMatrix, viewMatrix);
        this.counterweight.setViewProjectionMatrix(projMatrix, viewMatrix);

        this.referencia.setViewProjectionMatrix(projMatrix, viewMatrix);
    }

}