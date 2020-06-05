class Cilinder extends Extrusion {
    constructor(radius, height, material) {
        super(new Circle(25, radius), new Line(4, height), material);
    }
}