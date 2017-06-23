<?php
require_once dirname(__FILE__)."/../../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['token']) || !isset($_POST['nombre']) || !isset($_POST['apellido']) 
		|| !isset($_POST['email']) || !isset($_POST['telefono']) || !isset($_POST['celular']) || !isset($_POST['descripcion'])
		|| !isset($_POST['fechaDeNacimiento'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

try{
	$token = SafeString::safe($_POST['token']);
	$nombre = SafeString::safe($_POST['nombre']);
	$apellido = SafeString::safe($_POST['apellido']);
	$email = SafeString::safe($_POST['email']);
	$telefono = SafeString::safe($_POST['telefono']);
	$celular = SafeString::safe($_POST['celular']);
	$descripcion = SafeString::safe($_POST['descripcion']);
	$fechaNacimiento = SafeString::safe($_POST['fechaDeNacimiento']);

	$usuario = new Usuario();
	$usuario->cambiarDatosUsuario($token, $nombre, $apellido, $email, $telefono, $celular, $descripcion, $fechaNacimiento);
	
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