class CastleColumn extends Extrusion {
    constructor() {
        super(new CastleColumn2D(), new Line(4, 0.2), true, MaterialsList.DEFAULT);
        //super(new CastleColumn2D(), new Circle(10, 0.001), true, MaterialsList.DEFAULT);
    }
}