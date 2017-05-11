<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

	if (!isset($_POST['nombreUsuario']) || !isset($_POST['nombre']) || !isset($_POST['apellidos'])
		|| !isset($_POST['fechaNacimiento']) || !isset($_POST['email'])
		|| !isset($_POST['contrasenia']) || !isset($_POST['contrasenia']) || !isset($_POST['fechaDeNacimiento'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

	try{
		$nombreUsuario = SafeString::safe($_POST['nombreUsuario']);
		$nombre = SafeString::safe($_POST['nombre']);
		$primerApellido = SafeString::safe($_POST['primerApellido']);
		$segundoApellido = null;
		if (isset($_POST['segundoApellido'])) {
			$segundoApellido = SafeString::safe($_POST['segundoApellido']);
		}
		$telefono = SafeString::safe($_POST['telefono']);
		$celular = SafeString::safe($_POST['celular']);
		$email = SafeString::safe($_POST['email']);
		$contraseña = SafeString::safe($_POST['contrasenia']);
		$fechaNacimiento = SafeString::safe($_POST['fechaDeNacimiento']);

		$usuario = new Usuario();
		$usuario->nuevoUsuario($nombreUsuario, $nombre, $primerApellido, $segundoApellido, $telefono, $celular, $email, $contraseña, $fechaNacimiento);
	
		echo json_encode(array("status"=>"ok"));
		
	} catch (errorConBaseDeDatos$e) {
		echo json_encode(array("status"=>"error","tipo"=> "ERROR DB". $e->getMessage()));
 	}catch (usuarioExiste $e) {
 		echo json_encode(array("status"=>"error","tipo"=> "ERROR Existe Usuario". $e->getMessage()));
 	}catch (nombreDeUsuarioExiste $e) {
 		echo json_encode(array("status"=>"error","tipo"=> "ERROR Existe Nombre de Usuario". $e->getMessage()));
 	}catch (Exception $e) {
 		echo json_encode(array("status"=>"error","tipo"=> "ERROR Desconocido". $e->getMessage()));
 	}
?>