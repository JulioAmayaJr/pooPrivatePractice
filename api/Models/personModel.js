const mongoose=require("mongoose");


const personSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        },
        email:{
            type: String,
            required:true
        }
    },{collection: "personas"})
    const Person=mongoose.model("Personas",personSchema,"personas")

    module.exports=Person;