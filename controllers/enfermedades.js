//importamos mongoose
const mongoose = require('mongoose');
//importamos el modelo definido en mongoose
const Enfermedad = mongoose.model("Enfermedad");


function crearEnfermedad(req, res, next) {
  //El cliente nos manda esa mascota en el body
  let enfermedad = new Enfermedad(req.body);  
  //Se debe de tratar con errores porque pueden surgir en cualquier momento
  enfermedad.save()
    //En caso de que TODO haya salido bien
    .then(enf => {
      //Se manda un estatus y se manda a la info
      res.status(200).send(enf);
    })
    //En caso de algun error
    //Dejamos que mongoose responda
    //Se usa el parametro next para modelar el paso siguiente
    .catch(next);
}

function obtenerEnfermedades(req, res, next) {
//Se tiene que definir dos comportamientos: Obtencion de todos los registros y obtencion de uno solo
  //vemos si en los parametros del usuario, hay un campo ID. En caso afirmativo, esta buscando un registro en especifico
  if(req.params.id){
    Enfermedad.findById(req.params.id)
    //Si sale bien, se manda el registro
    .then(
      enf => {res.send(enf)}
    )
    //Si sale mal se deja que mongoose responda
    .catch(next)
  }
  //Si la peticion no incluye un ID, el cliente busca todos los registros
  else{
    //Trae toda la info de la coleccion a la que se esta haciendo referencia
    Enfermedad.find()
    //Si sale bien, se regresan los datos
    .then(enfs => res.send(enfs))
    //Si sale mal, mongoose responde
    .catch(next);
  }
  
}
function obtenerEnfermedadPorPropiedad(req, res){
  //se guardan en variables los valores mandados por url
  // let valor = req.params.valor;
  // let propiedad = req.params.propiedad;
  // for (const key of Object.entries(usuarios)) {
  //     //si por lo menos sabemos que el valor mandado para la propiedad existe
  //     if (key[1][propiedad] ) {
  //         if (key[1][propiedad] == valor) {
  //         //se hace un filtro y se devuelve el json de la constelacion el cual contenga como propiedad
  //         //el valor mandado
  //         res.send(...key.filter(e => e[propiedad] == valor));
  //         }
  //     }
  //     else{
  //         res.status(404).send("Propiedad no definida");
  //     }
  // }
  // res.status(404).send(" Usuario no encontrado. Introduce un valor existente para la propiedad "+propiedad);
  res.status(418).send("I'm a such sic teapot");
}

function modificarEnfermedad(req, res, next) {
    Enfermedad.findById(req.params.id)
    .then(
      enf=>{
        //si no esta definida
        if (!enf) {
          res.status(401).send("Registro no encontrado para eliminar");
        }
        //Si sí existe, obtenemos lo que nos manda el usuario
      let nuevaInfo = req.body;
      //Si se desea cambiar el nombre
      if (typeof nuevaInfo.nombre !== "undefined") {
        enf.nombre = nuevaInfo.nombre
      }
      //Si se desea cambiar el texto
      if (typeof nuevaInfo.texto !== "undefined") {
        enf.texto = nuevaInfo.texto
      }
      
      //se guarda el registro actualizado
      enf.save()
        .then(
          //se manda a la BD en forma de JSON
          updated => res.status(200).json(updated.publicData())
        )
        .catch(next);
      })
      .catch(next);
}

function eliminarEnfermedad(req, res, next) {
  Enfermedad.findByIdAndDelete({_id: req.params.id})
  .then(r=>res.status(200).send("Registro eliminado"))
  .catch(next);
}

//funcion para ver si en el atributo mandado esta contenida la frase que tiene la variable pasada por URL "valorContenido"
function obtenerRegistrosCoincidenciaAtributos(req, res, next) {
  var atributo = req.params.atributo;
  let valorContenido = req.params.valorContenido;
  switch (atributo) {
    case "texto":

      Enfermedad.find(
        { 'texto': { '$regex': req.params.valorContenido, '$options': 'i' } }
      )
        .then(arts => {
          res.status(200).send(arts);
        })
        .catch(next);

      break;

    case "nombre":

      Enfermedad.find(
        {'nombre': {'$regex': req.params.valorContenido , '$options': 'i'}}
        )
      .then(arts=>{
        res.status(200).send(arts);
      })
      .catch(next);

      break;
    default:
      res.send("Atributo Desconocido " + atributo);
  }
  

}


function limitarNumeroRegistros(req, res, next){
  if (isNaN(req.params.limit)) {
    res.send("Proporciona un numero")
  }
  let limite = parseInt(req.params.limit);
  Enfermedad.find().limit(limite)
  .then(enfs=>{
    res.send(enfs)
  })
  .catch(next);
}

// exportamos las funciones definidas
module.exports = {
  crearEnfermedad,
  obtenerEnfermedades,
  obtenerEnfermedadPorPropiedad,
  modificarEnfermedad,
  eliminarEnfermedad,
  obtenerRegistrosCoincidenciaAtributos,
  limitarNumeroRegistros
}
