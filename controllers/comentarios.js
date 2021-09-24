/*  Archivo controllers/Comentarios.js
 *  Simulando la respuesta de objetos Comentario
 *  en un futuro aquí se utilizarán los modelos
 */

// importamos el modelo de Comentarios
const mongoose = require ('mongoose');
const Comentario = mongoose.model("Comentario");
function crearComentario(req, res, next) {
  // Instanciaremos un nuevo Comentario utilizando la clase Comentario
  let comentario = new Comentario(req.body);
  comentario.save()
  .then(com=>res.send("Registro creado"))
  .catch(next);
  
}

function obtenerComentarios(req, res, next) {
  // Simulando dos Comentarios y respondiendolos
  if (req.params.id) {
    Comentario.findById(req.params.id)
    .then(com=>res.send(com))
    .catch(next);
  }
  else{
    Comentario.find()
    .then(coms=>res.send(coms))
    .catch(next);
  }
}



function modificarComentario(req, res, next) {
  Comentario.findById(req.params.id)
  .then(
    com=>{
      if (!com) {
        return res.send("Registro no encontrado para modificar");
      }
      let nuevaInfo = req.body;
      //Si se desea cambiar el texto (Es li unico que se puede modificar)
      if (typeof nuevaInfo.texto !== "undefined") {
        com.texto = nuevaInfo.texto
      }
      
      com.save()
        .then(
          //se manda a la BD en forma de JSON
          updated => res.status(200).send("Registro modificado")
        )
        .catch(next); 
    }
  )
  .catch(next)
}

function eliminarComentario(req, res, next) {
    Comentario.findByIdAndDelete({_id:req.params.id})
    .then(com=>{res.send("Registro eliminado")})
    .catch(next);
}
//funcion para obtener los comentarios que son anonimos o no dependiendo del valor booleano recibido
function isAnonimoComentario(req, res, next){
  let valorBooleano = req.params.valorBooleano;
  Comentario.find({'anonimo': valorBooleano})
  .then(coms=>{
    res.send(coms);
  })
  .catch(next);
}

//funcion que devuelve comentarios con una cierta cantidad de comentarios
function getNumberOfReactions(req, res, next){
  let maximo=req.params.max;
  
  if (isNaN(maximo)) {
    res.status(400).send("Solo se recibe un numero maximo")
  }
  else{
    Comentario.find({'reacciones':maximo})
    .then(coms=>{
      res.send(coms);
    })
    .catch(next);
  }
}

// exportamos las funciones definidas
module.exports = {
  crearComentario,
  obtenerComentarios,
  modificarComentario,
  eliminarComentario,
  isAnonimoComentario,
  getNumberOfReactions
}
