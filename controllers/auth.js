const bcrypt = require('bcryptjs');

 const { response } = require("express");
 const { validationResult } = require("express-validator");
 const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');

const Usuario = require("../models/usuario");
const router = require('../routes/auth');

// Nos permite registrar usuarios en nuestra DB
const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {

    const existEmail = await Usuario.findOne({email});
    if(existEmail){
        return res.status(400).json({
            ok:false, msg:'El correo ya se encuentra registrado'
        });
    }

    const usuario = new Usuario(req.body);

    //Encriptar Contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Generar mi JWT
    const token = await generarJWT(usuario.id);


    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Pongase en contacto con el administrador",
    });
  }

 
};

//Metodo para realizar un login al servidor
const login = async (req,res)=>{

  const { email, password } = req.body;

  try {
    
    const usuarioDB = await Usuario.findOne({email});

    //Validación de email
    if(!usuarioDB){
      res.status(404).json({ok:false, msg:'Email no encontrado'});
    }

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    
    //Validación de password
    if(!validPassword){
      res.status(400).json({ok:false, msg:'Contraseña no valida'});
    } 

    //Nos permite llamar al metodo para generar un token
    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok:false,msg:'Contacte con el administrador'
    })
  }

  
}

//Nos permite renovar el token
const renewToken =async (req,res=response)=>{
  
  const uid = req.uid;
  const token = await generarJWT(uid);
  const usuario = await Usuario.findById(uid);


  res.json({
    ok:true,
    usuario:usuario,
    token 
  });
}

module.exports = {
  crearUsuario, login, renewToken
};
