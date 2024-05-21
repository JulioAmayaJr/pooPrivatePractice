const mongoose=require("mongoose")

const DB_URI="mongodb://localhost:27017/dbPersonas";

const connectDB=async()=>{
    try {
        await mongoose.connect(DB_URI,{
            family: 4
        })
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error("Error de conexion"+error.message);
    }
}

module.exports=connectDB;