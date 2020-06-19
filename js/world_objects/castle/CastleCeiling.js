class CastleCeiling extends Extrusion {
    constructor(size_1, size_2) {
        super(new RectangleVariable(size_1 * 0.5, size_2 * 0.1, 1.1, 10), new Line(4, 6), true, MaterialsList.BLUE);
    }
}