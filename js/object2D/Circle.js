class Circle {
    constructor(vertices, radius) {
        this.vertices = vertices;
        this.radius = radius;
    }

    getPosition(u) {
        var x = this.radius * Math.cos(2*Math.PI * u);
        var y = this.radius * Math.sin(2*Math.PI * u);
        return [x, y, 0];
    }

    getNormal(u) {
        var x = this.radius * Math.cos(2*Math.PI * u);
        var y = this.radius * Math.sin(2*Math.PI * u);
        return [x/(Math.sqrt(x*x+y*y)), y/(Math.sqrt(x*x+y*y)), 0];
    }

    getTangent(u) {
        var x = -1 * this.radius * 2 * Math.PI * Math.sin(2*Math.PI * u);
        var y = this.radius * 2 * Math.PI * Math.cos(2*Math.PI * u);
        return [x, y, 0];
    }

    getBinormal(u) {
        var x = -2 * Math.PI * this.radius * this.radius * Math.sin(2 * Math.PI * u) * Math.cos(2 * Math.PI * u);
        var y = 2 * Math.PI * this.radius * this.radius * Math.sin(2 * Math.PI * u) * Math.cos(2 * Math.PI *  u);
        return [x, y, 0];
    }

    getCenterPosition(u) {
        return [0, 0, 0];
    }

    getCenterNormal(u) {
        return [1, 0, 0];
    }
}