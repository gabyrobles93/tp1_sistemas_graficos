class Cilinder extends Extrusion {
    constructor(radius, height, with_top, material) {
        super(new Circle(25, radius), new Line(4, height), with_top, material);
    }
}