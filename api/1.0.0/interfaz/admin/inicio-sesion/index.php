<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Administrador.php";

header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['usuario']) || !isset($_POST['contrasenia'])) {
	die(json_encode(array("status"=>"error","clave"=>"valores","explicacion"=>"Faltan valores")));
}

try{
	$email = SafeString::safe($_POST['usuario']);
	$contraseña = SafeString::safe($_POST['contrasenia']);
	$token = (new Administrador())->iniciarSesion($email, $contraseña);
	echo json_encode(array("status"=>"ok","token"=>$token));
	
} catch (usuarioNoExisteAdmin $e) {
	echo json_encode(array("status"=>"error","clave"=>"noExiste","explicacion"=>"El nombre de Usuario/Email o la clave son incorrectos"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>