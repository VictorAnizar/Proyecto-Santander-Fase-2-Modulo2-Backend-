// importamos el modelo de usuarios
// controllers/usuarios.js
const mongoose = require("mongoose")
const Usuario = mongoose.model("Usuario")

function crearUsuario(req, res, next) {
  
}

function obtenerUsuarios(req,res, next) {

  if (req.params.id) { 
    Usuario.findById(req.params.id)
      //Si sale bien, se manda el registro
      .then(
        usr => {res.send(usr)}
      )
      //Si sale mal se deja que mongoose responda
      .catch(next);
  }
  else{
    Usuario.find()
      //Si sale bien, se regresan los datos
      .then(usrs => res.send(usrs))
      //Si sale mal, mongoose responde
      .catch((next));
  }
  
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
