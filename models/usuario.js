const{Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    online:{
        type:Boolean,
        default:false
    },
});
//Metodo para descartar los valores que nos da el return de usuario
UsuarioSchema.method('toJSON',function(){
    //__v, _id y password seran omitidas, todo lo demas ... sera almacenada en una variable llamada objeto
    const {__v, _id,password,...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports= model('Usuario', UsuarioSchema);
