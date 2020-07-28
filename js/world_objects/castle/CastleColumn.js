class CastleColumn extends Extrusion {
    constructor(column_height) {
        super(new CastleColumn2D(column_height), new Circle(25, 0.000001), false, MaterialsList.TEST_NORMAL);
    }
}