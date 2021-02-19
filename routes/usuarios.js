/*

    path: api/usuarios

*/
const { Router } = require('express');
const { response } = require('express');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


// retornar todos los usuarios excepto el logeado
router.get('/', validarJWT , getUsuarios);


module.exports = router;