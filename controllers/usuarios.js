/*  Archivo controllers/Usuarios.js
 *  Simulando la respuesta de objetos Usuario
 *  en un futuro aquí se utilizarán los modelos
 */

// importamos el modelo de Usuarios
const Usuario = require('../models/Usuario')



function crearUsuario() {
  // Instanciaremos un nuevo Usuario utilizando la clase Usuario
  
}

function obtenerUsuarios(req,res) {
  // Simulando dos Usuarios y respondiendolos
    res.send(usuarios);
}

//Este metodo Buscar Un usuario por una propiedad en especifico. Devuelve la primer instancia de la búsqueda
function obtenerUsuarioPorPropiedad(req, res){
  // se guardan en variables los valores mandados por url
  let valor = req.params.valor;
  let propiedad = req.params.propiedad;
  for (const key of Object.entries(usuarios)) {
      //si por lo menos sabemos que el valor mandado para la propiedad existe
      if (key[1][propiedad] ) {
          if (key[1][propiedad] == valor) {
          //se hace un filtro y se devuelve el json de la constelacion el cual contenga como propiedad
          //el valor mandado
          res.send(...key.filter(e => e[propiedad] == valor));
          }
      }
      else{
          res.status(404).send("Propiedad no definida");
      }
  }
  res.status(404).send(" Usuario no encontrado. Introduce un valor existente para la propiedad "+propiedad);

}

function modificarUsuario() {
 
}

function eliminarUsuario() {
  
}

// exportamos las funciones definidas
module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorPropiedad,
  modificarUsuario,
  eliminarUsuario
}
