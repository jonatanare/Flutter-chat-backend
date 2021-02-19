/*

    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligtoria').not().isEmpty(),
    check('email', 'El campo es obligtorio y debe ser un correo valido').isEmail().normalizeEmail(),
    validarCampos
] ,crearUsuario);

router.post('/', [
    check('email', 'El campo es obligtorio y debe ser valido').isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginUsuario);

// validarJWT
router.get('/renew', validarJWT ,renewToken);


module.exports = router;