class CastleWall extends Extrusion {
    constructor(column_height) {
        super(new CastleWall2D(), new Circle(100, 50), false, MaterialsList.WALL_GREY);
    }
}