class CastleCeiling extends Extrusion {
    constructor(size_1, size_2) {
        super(new RectangleVariable(size_1 * 0.3, size_2 * 0.1, 2.5, 10), new Line(4, 8), true, MaterialsList.BLUE);
    }
}