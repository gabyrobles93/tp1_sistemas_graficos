class CastleColumn extends Extrusion {
    constructor() {
        //super(new CastleColumn2D(), new Line(4, 0.2), false, MaterialsList.DEFAULT);
        super(new CastleColumn2D(), new Circle(25, 0.000001), false, MaterialsList.DEFAULT);
    }
}