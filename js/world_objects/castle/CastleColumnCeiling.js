class CastleColumnCeiling extends Extrusion {
    constructor() {
        super(new CastleColumnCeiling2D(), new Circle(25, 0.000001), false, MaterialsList.DEFAULT);
        //super(new CastleColumnCeiling2D(), new Line(4, 1), false, MaterialsList.DEFAULT);
    }
}