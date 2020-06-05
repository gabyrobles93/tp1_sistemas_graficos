class Cube extends Extrusion {
    constructor(size_1, size_2, height, material) {
        super(new Rectangle(size_1, size_2), new Line(4, height), material);
    }
}