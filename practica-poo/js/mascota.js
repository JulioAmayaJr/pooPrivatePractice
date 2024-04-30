class Mascota{
    constructor(id,nombre, raza,edad) {
        this.id=id;
        this.nombre = nombre;
        this.raza=raza;
        this.edad = edad;
      }

      listarMascotas(){
        var formData=new FormData();
        formData.append("accion","Mostrar")
        fetch('http://localhost/practica-poo/data.php', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            console.log(data); 
        
            data.forEach(element => {
               
                const fila = document.createElement("tr");
                const idCell = document.createElement("td");
                idCell.textContent = element.id_mascota;
                fila.appendChild(idCell);
                const nombreCell = document.createElement("td");
                nombreCell.textContent = element.nombre;
                fila.appendChild(nombreCell)
                const razaCell = document.createElement("td");
                razaCell.textContent = element.raza;
                fila.appendChild(razaCell)
                const edadCell = document.createElement("td");
                edadCell.textContent = element.edad;
                fila.appendChild(edadCell)
        
                const opcionesCell = document.createElement("td");
                opcionesCell.classList.add("options");

                //Boton de editar
                const btnEditar = document.createElement("button");
                btnEditar.classList.add("btn", "btn-primary", "btn-sm", "update-button");
                btnEditar.textContent = "Editar";
                btnEditar.setAttribute("data-toggle", "modal");
                btnEditar.setAttribute("data-target", "#modalData");
                btnEditar.setAttribute("data-id", element.id_mascota);
                //Evento click boton editar
                btnEditar.addEventListener("click", (event) => {
                    event.preventDefault();
                    const idMascota = event.target.getAttribute("data-id");
                    txtId.value = idMascota;
                    console.log("Editar mascota con ID:", idMascota);
                    console.log(this.listarMascotaPorId(idMascota))

                });
                opcionesCell.appendChild(btnEditar);
    
                // Boton de eliminar
                const btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn", "btn-danger", "btn-sm", "delete-button");
                btnEliminar.textContent = "Eliminar";
                btnEliminar.setAttribute("data-id", element.id_mascota);
                btnEliminar.setAttribute("data-nombre", element.nombre);
                //Evento click boton eliminar
                btnEliminar.addEventListener("click", (event) => {
                    const idMascota = event.target.getAttribute("data-id");
                    this.nombre=event.target.getAttribute("data-nombre");
                    console.log("Eliminar mascota con ID:", idMascota);
                    this.eliminarMascota(idMascota)
                });
                opcionesCell.appendChild(btnEliminar);
            
               
                fila.appendChild(opcionesCell);
        
                const tbody = document.getElementById("tbodyMascota");
                tbody.appendChild(fila);
                console.log(element)
            });
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }

      listarMascotaPorId(id){
            var formData=new FormData();
            formData.append("id",id)
            formData.append("accion","SelectId")
        fetch('http://localhost/practica-poo/data.php', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            console.log(data); 
        
        
            data.forEach(element => {
                const txtNombre=document.getElementById("txtNombre")
                txtNombre.value=element.nombre
                const txtRaza=document.getElementById("txtRaza")
                txtRaza.value=element.raza
                const txtEdad=document.getElementById("txtEdad")
                txtEdad.value=element.edad
                console.log(element)
                this.id=element.id_mascota
                
            });
          })
          .catch(error => {
            console.error('Error:', error);
          });

          
      }

      agregarMascota() {
        const formData = new FormData();
        formData.append("nombre", this.nombre);
        formData.append("raza", this.raza);
        formData.append("edad", this.edad);
        formData.append("accion","Insertar");
        
        fetch('http://localhost/practica-poo/data.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.mensaje) {
                location.reload();
            } else {  
                console.error("Error al agregar la mascota:", data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }

        editarMascota(){
            const formData = new FormData();
            formData.append("nombre", this.nombre);
            formData.append("raza", this.raza);
            formData.append("edad", this.edad);
            formData.append("id",this.id);
            
            fetch('http://localhost/practica-poo/update.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.mensaje) {
                    location.reload();
                } else {  
                    console.error("Error al agregar la mascota:", data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        eliminarMascota(id){
            
            Swal.fire({
                title: "Eliminar",
                text: "Desea eliminar la mascota "+this.nombre,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!"
              }).then((result) => {
                if (result.isConfirmed) {
                    fetch('http://localhost/practica-poo/delete.php?id='+id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.mensaje) {
                            location.reload();
                        } else {  
                            console.error("Error al agregar la mascota:", data.error);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
              });
           
        }


}


document.addEventListener("DOMContentLoaded", () => {
    const mascotas = new Mascota();
    mascotas.listarMascotas();
   
    const contenedorBotones = document.getElementById("tbodyMascota");
    const txtId = document.getElementById("txtId");
    const txtNombre=document.getElementById("txtNombre")
    const txtRaza=document.getElementById("txtRaza")
    const txtEdad=document.getElementById("txtEdad")
    const btnGuardar=document.getElementById("btnGuardar")
    btnGuardar.addEventListener("click",()=>{
        if(txtId.value>0){
            const mascotaAgregar = new Mascota(mascotas.id,txtNombre.value,txtRaza.value,txtEdad.value);
            mascotaAgregar.editarMascota();
            
        }else{
            const mascotaAgregar = new Mascota(0,txtNombre.value,txtRaza.value,txtEdad.value);
            mascotaAgregar.agregarMascota();
            console.log(mascotaAgregar.id)
        }
    })

   
});
