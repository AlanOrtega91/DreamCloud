<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

try{
	if (isset($_POST['usuario']) && isset($_POST['contrasenia'])) {
		$emailONombre = SafeString::safe($_POST['usuario']);
		$contraseña = SafeString::safe($_POST['contrasenia']);
		$token = (new Usuario())->iniciarSesion($emailONombre, $contraseña);
		echo json_encode(array("status"=>"ok","token"=>$token));
	} else if (isset($_POST['token'])) {
		$token = SafeString::safe($_POST['token']);
		(new Usuario())->iniciarSesionConToken($token);
		echo json_encode(array("status"=>"ok","token" => $token));
	}
	
} catch (usuarioNoExiste $e) {
	echo json_encode(array("status"=>"error","clave"=>"noExiste","explicacion"=>"El nombre de Usuario/Email o la clave son incorrectos"));
} catch (tokenInvalido $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"El token no es valido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>