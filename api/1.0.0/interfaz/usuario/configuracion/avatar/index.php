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
	
	$ubicacionDestinoImagen = dirname(__FILE__).'/../../../../../../recursos/usuarios/'.$nombreImagen;
	
	agregarArchivo($imagen, $ubicacionDestinoImagen);
	
	
	(new Usuario())->guardarImagen($token, $nombreImagen);
	
	header('Location: ' . $_SERVER['HTTP_REFERER'].'?exito=1');
		
} catch (tokenInvalido$e) {
	header('Location: ' . $_SERVER['HTTP_REFERER'].'?error=1');
}  catch (errorConBaseDeDatos $e) {
	header('Location: ' . $_SERVER['HTTP_REFERER'].'?error=2');
} catch (Exception $e) {
	header('Location: ' . $_SERVER['HTTP_REFERER'].'?error=3');
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