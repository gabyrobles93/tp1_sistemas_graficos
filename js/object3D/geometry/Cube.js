class Cube extends Extrusion {
  constructor(size_1, size_2, height, with_top, material) {
      super(new Rectangle(size_1, size_2), new Line(4, height), with_top, material);
  }
}