const mongoose = require('mongoose');

// Metodo para realizar la conexión a nuestra base de datos Msongo
const dbConnection = async()=>{

    try{
       
      await mongoose.connect(process.env.DB_CNN,{
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        useCreateIndex:true
        });
        console.log('DB ONLINE');

    }catch(error){
        console.log(error);
        throw new Error('Error en la base de datos - Comuniquese con el Administrador');
    }

}
module.exports={
    dbConnection
}