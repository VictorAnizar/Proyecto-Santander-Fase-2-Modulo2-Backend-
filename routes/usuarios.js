//estructura del crud

const router = require('express').Router();
const {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
    listarUsuariosPorTipo
} = require('../controllers/usuarios');

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarios);
router.get('/tipo/:tipo', listarUsuariosPorTipo);
router.post('/', crearUsuario);
router.put('/:id', modificarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;