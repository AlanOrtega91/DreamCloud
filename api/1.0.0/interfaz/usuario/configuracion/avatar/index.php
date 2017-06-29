<?php
require_once dirname(__FILE__)."/../../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../../modelo/Usuario.php";

//header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['token']) || !isset($_FILES['avatar'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

try{
	$token = SafeString::safe($_POST['token']);
	
	$imagen = $_FILES['avatar'];
	$nombreImagen = uniqid('',true).'.'.(end(explode('.',$imagen['name'])));
	echo $nombreImagen.'<br>';
	$ubicacionDestinoImagen = dirname(__FILE__).'/../../../../../../recursos/usuarios/'.$nombreImagen;
	echo $ubicacionDestinoImagen.'<br>';
	agregarArchivo($imagen, $ubicacionDestinoImagen);
	
	
	(new Usuario())->guardarImagen($token, $nombreImagen);
	
	header('Location: ' . $_SERVER['HTTP_REFERER']);
		
} catch (tokenInvalido$e) {
	echo json_encode(array("status"=>"error","clave"=>"nombreUsuario","explicacion"=>$e->getMessage()));
	header('Location: ' . $_SERVER['HTTP_REFERER']);
}  catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
	header('Location: ' . $_SERVER['HTTP_REFERER']);
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
	header('Location: ' . $_SERVER['HTTP_REFERER']);
}
 	
function agregarArchivo($archivo, $ubicacionDestino) {
	if ($archivo['error'] === 0)
	{
		if (move_uploaded_file($archivo['tmp_name'],$ubicacionDestino)) {
			
		} else {
			
		}
	} else {
		
	}
}
?>