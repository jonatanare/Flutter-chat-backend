/*
    Path: /api/mensajes

*/
const { Router } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


// retornar todos los usuarios excepto el logeado
router.get('/:de', validarJWT , obtenerChat);


module.exports = router;