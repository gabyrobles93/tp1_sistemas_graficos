class Sphere extends Object3D {
    constructor(radius, rows, columns, material) {
        super(rows, columns, material);
        this.radius = radius;
        super._generateSurface();
    }

    getPosition(u, v) {
        u = (2 * Math.PI * u);
        v = Math.PI * (v-0.5);
        var x = this.radius * Math.cos(u) * Math.cos(v);
        var y = this.radius * Math.sin(u) * Math.cos(v);
        var z = this.radius * Math.sin(v);
        return [x,y,z];
    }

    getNormal(u, v) {
        u = (2* Math.PI * u);
        v = Math.PI * (v-0.5);
        var x = this.radius * Math.cos(u) * Math.cos(v);
        var y = this.radius * Math.sin(u) * Math.cos(v);
        var z = this.radius * Math.sin(v)
        var norma = Math.sqrt(x*x+y*y+z*z);
        return [x/norma, y/norma, z/norma];
    }
}