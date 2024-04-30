<?php
$accion = isset($_POST['accion'])? $_POST['accion']:"";
 // bandera para eliminacion desde la
$nombre = isset($_POST['nombre']) ? $_POST['nombre']:"";
$raza = isset($_POST['raza']) ? $_POST['raza']:"";
$edad = isset($_POST['edad']) ? $_POST['edad']:"";
$id= isset($_POST['id'])? $_POST['id']:""; // variable id para seleccionar los datos incrustados
//id para eliminacion de parametros

include_once ('config/conf.php');

class registros {
    public $conexion;
    public function __construct($conexion){
        $this->conexion = $conexion;
    }
    public function select(){
        $consultaSelect = "SELECT * FROM tbl_mascota";
        $ejecutar_consulta = $this->conexion->conexion->query($consultaSelect);
        return $ejecutar_consulta->fetch_all(MYSQLI_ASSOC);
    }

    public function insert($datos){
        $campos = implode(',', array_keys($datos));
        var_dump($campos);
        $valores = "'".implode("','", array_values($datos))."'";
        var_dump($valores);
        $consulta_insertar = "INSERT INTO tbl_mascota ($campos) VALUES ($valores)";
        var_dump($consulta_insertar);
        $resultado = $this->conexion->conexion->query($consulta_insertar);
        if ($resultado){
            return true;
        }else{
            $this->conexion->conexion->error;
        }
    }

    //metodo de seleccion para update
    public function selectupdate($id){
        $consultaSelect = "SELECT * FROM tbl_mascota WHERE id_mascota=$id";
        $ejecutar_consulta = $this->conexion->conexion->query($consultaSelect);
        return $ejecutar_consulta->fetch_all(MYSQLI_ASSOC);
    }
    //metodo update
    public function update($id, $datos){
        $set = [];
        foreach ($datos as $campo => $valor){
            $set[] = "$campo = '$valor'";
        }
        $set = implode(',', $set);
        $consulta_actualizar = "UPDATE tbl_mascota SET $set WHERE id_mascota = $id";
        $resultado = $this->conexion->conexion->query($consulta_actualizar);
        if($resultado){
            return true;
        }else{
            return $this->conexion->conexion->error;
        }
    }
    //metodo eliminacion
    public function delete($id){
        $consultadelete = "DELETE FROM tbl_mascota WHERE id_mascota=$id";
        $ejecutar_delete = $this->conexion->conexion->query($consultadelete);
        return $ejecutar_delete;
    }
}

$gestion = new registros($conexion);

if($accion == "Insertar"){
    $datosInsert = array('nombre' => $nombre, 'raza' => $raza, 'edad' => $edad);
    $conexion->conectar();
    $prueba = $gestion->insert($datosInsert);
    if($prueba){
        echo json_encode(array("mensaje" => "Mascota agregada correctamente"));
    }
}else if ($accion == 2){
    $id = $ids;
    $datosUpdate = array('nombre' => $nombre, 'telefono' => $telefono, 'genero' => $genero);
    $conexion->conectar();
    $prueba = $gestion->update($id, $datosUpdate);

    if ($prueba){
        header('location:index.php');
    }
}else if($accion == 3){ //bandera de eliminacion
    $conexion->conectar();
    $prueba = $gestion->delete($idd);
    if($prueba){
        header("location: index.php");
    }
}else if($accion=="Mostrar"){
    $conexion->conectar();
    $prueba = $gestion->select();
    if($prueba){
        echo json_encode($prueba);
    }
}else if($accion=="SelectId"){
    $conexion->conectar();
    $prueba = $gestion->selectupdate($id);
    if($prueba){
        echo json_encode($prueba);
    }
}
?>