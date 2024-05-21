const mongoose=require("mongoose")
const model=require("../Models/personModel.js");


exports.getData=async (req,res)=>{
    try {
        const results=await model.find({})

        res.send({
            results
        })
    } catch (err) {
        res.status(500).send({
            error:err.message
        })
    }
}

exports.insertData=async(req,res)=>{
    try {
        const data=req.body
        const savedPerson=await model.create(data);
        res.status(201).send(savedPerson);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}

exports.updateData=async(req,res)=>{
    try {
        const {id}=req.params
        const body=req.body
        console.log("Datos actualizados",body)
        await model.updateOne(
            {_id: id},
            {$set : body}
        )
        res.status(201).send({message:"Persona actualizada"})
    } catch (error) {
        res.status(500).send({error: err.message})
    }
}

exports.deleteData=async(req,res)=>{
    try {
        const {id}=req.params
        const deletePerson=await model.findByIdAndDelete(id);
        if(!deletePerson){
            return res.status(404).send({error: "Persona no encontrada"})
        }
        res.status(200).send({message:"Persona eliminada correctamente"})
    } catch (err) {
        res.status(500).send({error:err.message})
        }
}

