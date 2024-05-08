import mongoose from "mongoose";
//creando instancia, se necesita si o si metodo new
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    
},{
    timestamps:true

})

//con en mongo db se necesita crear un metodo para interactuar con la base de datos
//crear un modelo mongoose.model se guarda el modelo, (como y cual)
export default mongoose.model('User', userSchema)