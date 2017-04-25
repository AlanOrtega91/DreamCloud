<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

	if (!isset($_POST['email']) || !isset($_POST['contrasenia'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

	try{
		$email = SafeString::safe($_POST['email']);
		$contraseña = SafeString::safe($_POST['contrasenia']);

		$usuario = new Usuario();
		$token = $usuario->iniciarSesion($email, $contraseña);
		echo json_encode(array("Status"=>"ok","token"=>$token));
		
	}catch (usuarioNoExiste $e) {
 		echo json_encode(array("status"=>"error","tipo"=> "No Existe Usuario". $e->getMessage()));
 	} catch (Exception $e) {
 		echo json_encode(array("status"=>"error"));
 	}
?>