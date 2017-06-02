<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

	if (!isset($_POST['nombreUsuario']) || !isset($_POST['nombre']) || !isset($_POST['apellido'])
		|| !isset($_POST['fechaNacimiento']) || !isset($_POST['email']) || !isset($_POST['contrasenia'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

	try{
		$nombreUsuario = SafeString::safe($_POST['nombreUsuario']);
		$nombre = SafeString::safe($_POST['nombre']);
		$apellido = SafeString::safe($_POST['apellido']);
		$fechaNacimiento = SafeString::safe($_POST['fechaNacimiento']);
		$email = SafeString::safe($_POST['email']);
		$contraseña = SafeString::safe($_POST['contrasenia']);

		$usuario = new Usuario();
		$usuario->nuevoUsuario($nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $contraseña);
	
		echo json_encode(array("status"=>"ok"));
		
	} catch (nombreDeUsuarioExiste $e) {
		echo json_encode(array("status"=>"error","clave"=>"nombreUsuario","explicacion"=>$e->getMessage()));
	} catch (usuarioExiste $e) {
 		echo json_encode(array("status"=>"error","clave"=>"email","explicacion"=>$e->getMessage()));
	} catch (errorConBaseDeDatos $e) {
 		echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
 	} catch (Exception $e) {
 		echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
 	}
?>