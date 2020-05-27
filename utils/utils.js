utils = {};

utils.allShaders = {};
utils.SHADER_TYPE_FRAGMENT = "x-shader/x-fragment";
utils.SHADER_TYPE_VERTEX = "x-shader/x-vertex";

utils.addShaderProg = function (gl, vertex, fragment) {

    utils.loadShader(vertex, utils.SHADER_TYPE_VERTEX);
    utils.loadShader(fragment, utils.SHADER_TYPE_FRAGMENT);

    var vertexShader = utils.getShader(gl, vertex);
    var fragmentShader = utils.getShader(gl, fragment);

    var prog = gl.createProgram();
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {alert("Could not initialise main shaders");}

    return prog;
};

utils.loadShader = function(file, type) {
    var cache, shader;

    $.ajax({
        async: false,
        url: "shaders/" + file,
        success: function(result) {
           cache = {script: result, type: type};
        }
    });

    // store in global cache
    utils.allShaders[file] = cache;
};

utils.getShader = function (gl, id) {

    //get the shader object from our main.shaders repository
    var shaderObj = utils.allShaders[id];
    var shaderScript = shaderObj.script;
    var shaderType = shaderObj.type;

    //create the right shader
    var shader;
    if (shaderType == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderType == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    //wire up the shader and compile
    gl.shaderSource(shader, shaderScript);
    gl.compileShader(shader);

    //if things didn't go so well alert
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    //return the shader reference
    return shader;

};//end:getShader

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