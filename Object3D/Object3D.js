// Objeto 3D genérico
// Posee el método para generar el index_buffer[] que es igual sea cual
// sea la forma del objeto, por lo tanto la heredan sus hijos. (esto es 
// en caso de renderizar con TRIANGLE_STRIP. En caso de renderizar de otra
// forma se debe sobrescribir el método "generateIndeces(N,M)" y el valor del
// atributo gl_draw_mode).
// La función initBuffers() genera una malla plana de NxM. Este método
// debe ser sobrescrito en cada hijo para adoptar la forma requerida.
// En cada hijo se debe llamar a la función init() para inicializar
// los buffers en el constructor.
// Uso:
// var asd = new Object3D(N,M);
// asd.setColor(r,g,b);
// asd.draw();
// TODO: 
//  - Texturas.

//<script type="text/javascript" src="Object3D/Object3D.js"></script>
// ---------------------------------------------------------------------- //
    // ----- Object3D.js  ------ //
    function Object3D(N, M) {
      this.rows = N;
      this.cols = M;
      
      this.position_buffer = null;
      this.normal_buffer = null;
      this.index_buffer = null;

      this.webgl_position_buffer = null;
      this.webgl_normal_buffer = null;
      this.webgl_index_buffer = null;

      // Esto es para decirle como interpretar el index_buffer:
      // Por defecto, TS (Triangle strip)
      this.gl_draw_mode = gl.TRIANGLE_STRIP;
  }

  /*
    Función para generar los índices del arreglo "index_buffer"
    correspondientes al recorrido TS (Triangle Strip) de una grilla
    de NxM.
  */
      /*************************************/
      Object3D.prototype.generateIndeces = function(N, M) {
        var i, j, k;
        //this.index_buffer = [];
        var a = [];

        /* Validación de la entrada */
        if (N<1 || M<1)
          return null;

        /* Caso de una línea */
        if (N == 1 || M == 1) {
          for (i=0; i<((N==1)?M:N); i++)
            a.push(i);
          return a;
        }

        for(p=0, k=1; k<=N; p++, k++) {
          // Sub-Recorrido "ascendente"
          for(i=p, j=p+M; i-p<M; i++, j++) { 
            a.push(i);
            a.push(j);
          }
          k++;
          if (k==N)
            return a;

          // Sub-Recorrido "descendente"
          p += 2*M-1;
          for(i=p, j=p+M; p-i<M; i--, j--) {
            a.push(i);
            a.push(j);
          }
        }

        return a;

      }
      /*************************************/


      // En la clase Object3D se genera una malla plana de N por M puntos y 
      // dimensiones 1x1 en el Plano XY, con sistema de referencia en el 
      // centro del plano, por defecto.
      // En las clases hijas (esfera, plano, cilindro, etc) se generan los buffers específicos.
      Object3D.prototype.initBuffers = function(){

          this.position_buffer = [];
          this.normal_buffer = [];

          for (var i = 0.0; i < this.rows; i++) { 
             for (var j = 0.0; j < this.cols; j++) {

                 // Para cada vértice definimos su posición
                 // como coordenada (x, y, z=0)
                 var x = -0.5 + j/(this.cols-1);
                 var y = 0.5 + i/(this.rows-1);
                 var z = 0;
                 this.position_buffer.push(x);
                 this.position_buffer.push(y);
                 this.position_buffer.push(z);
                                        
             };
          };
          this.normal_buffer = this.position_buffer.slice();
      }

      // Creación e Inicialización de los buffers a nivel de OpenGL
      Object3D.prototype.setupWebGLBuffers = function() {
        this.webgl_normal_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normal_buffer), gl.STATIC_DRAW);
        this.webgl_normal_buffer.itemSize = 3;
        this.webgl_normal_buffer.numItems = this.normal_buffer.length / 3;

        this.webgl_position_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.position_buffer), gl.STATIC_DRAW);
        this.webgl_position_buffer.itemSize = 3;
        this.webgl_position_buffer.numItems = this.position_buffer.length / 3;

        this.webgl_index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index_buffer), gl.STATIC_DRAW);
        this.webgl_index_buffer.itemSize = 1;
        this.webgl_index_buffer.numItems = this.index_buffer.length;
      }

      // Inicializo los buffers:
      Object3D.prototype.init = function() {
          this.initBuffers();
          this.index_buffer = this.generateIndeces(this.rows, this.cols);
          this.setupWebGLBuffers();
      }

      // Dibujado
      Object3D.prototype.draw = function(modelMatrix){
          // Matriz uniform para transformar normales
          gl.uniformMatrix4fv(shaderProgram.modelMatrixUniform, false, modelMatrix);
          
          var normalMatrix = mat3.create();
          // mat4.toInverseMat3(modelMatrix, normalMatrix); reempalzado x las siguientes dos lineas:
          mat3.fromMat4(normalMatrix, modelMatrix);
          mat3.invert(normalMatrix, normalMatrix);

          mat3.transpose(normalMatrix, normalMatrix);
          gl.uniformMatrix3fv(shaderProgram.normalMatrixUniform, false, normalMatrix);
        
          
          // Se configuran los buffers que alimentarán el pipeline
          gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_position_buffer);
          gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.webgl_position_buffer.itemSize, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, this.webgl_normal_buffer);
          gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.webgl_normal_buffer.itemSize, gl.FLOAT, false, 0, 0);       

          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webgl_index_buffer);
          gl.drawElements(this.gl_draw_mode, this.webgl_index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
          /////////////////////////////////
      }
      
  //}
// ---------------------------------------------------------------------- //
