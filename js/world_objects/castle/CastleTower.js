class CastleTower extends Extrusion {
    constructor() {
        super(new CastleTower2D(), new Circle(50, 0.001), false, MaterialsList.COLOR_WALL_GREY);
    }
}