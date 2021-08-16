const jwt = require("jsonwebtoken");

// Este metodo nos permite generar un Java Web Token con una duración de 24 horas 
const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        //No se pudo crear el token
        if (err) {
            reject('No se pudo generar el JWT');
        } else {
          //TOKEN
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
