class Parallelogram3D extends Extrusion {
    constructor(size_1, size_2, height, with_top, material) {
        super(new Parallelogram(size_1, size_2), new Line(4, height), with_top, material);
    }
}