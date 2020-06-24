class CastleTower extends Extrusion {
    constructor() {
        super(new CastleTower2D(), new Line(4, 5), false, MaterialsList.DEFAULT);
        //super(new CastleTower2D(), new Circle(50, 10), false, MaterialsList.DEFAULT);
    }
}