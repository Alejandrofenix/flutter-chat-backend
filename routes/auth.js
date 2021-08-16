/*
    path: api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");

const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-datos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/new",
  //Middlewares
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

// post: /
// validar Email y Pass

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
  ],
  login
);

// Token renew 
router.get('/renew', validarJWT, renewToken);

module.exports = router;
