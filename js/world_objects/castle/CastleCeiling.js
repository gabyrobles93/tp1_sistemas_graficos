class CastleCeiling extends Extrusion {
    constructor(size_1, size_2) {
        console.log("hola");
        super(new RectangleVariable(size_1 * 0.2, size_2 * 0.2, 4.5), new Line(4, 6), true, MaterialsList.BLUE);
    }
}