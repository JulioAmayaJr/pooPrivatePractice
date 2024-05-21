const express=require("express");
const db=require("./Config/db.js");
const personController=require("./Controller/person.js");

const app=new express();
const PORT=7000;
app.use(express.json())

db();
app.get("/person",personController.getData);
app.post("/person",personController.insertData);
app.put("/person/:id",personController.updateData);
app.delete("/person/:id",personController.deleteData);


app.listen(PORT,()=>{
    console.log("El servidor esta corriendo en el puerto "+PORT)
})
