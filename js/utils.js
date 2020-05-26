// Función para extender el método Array.prototype.push() a vectores de 3 dim:
// Acepta a la entrada tanto el formato : [1, 2, 3] como {x:1, y:2, z:3}
// Ejemplo: 
//  var arr = [];
//  var arr3 = [1,2,3];
//  var obj3 = {x:1, y:2, z:3};
//  arr.pushVec3(arr3);
//  arr.pushVec3(obj3);
Array.prototype.pushVec3 = function(a) {
    if (a[0] != undefined) {
      this.push(a[0]);
      this.push(a[1]);
      this.push(a[2]);    
    } else if (a.x != undefined) {
      this.push(a.x);
      this.push(a.y);
      this.push(a.z);
    } else {
      return -1;
    };
  };