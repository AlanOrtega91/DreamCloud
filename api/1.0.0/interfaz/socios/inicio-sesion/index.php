<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Socio.php";

header('Content-Type: text/html; charset=utf8');

try{
	if (isset($_POST['email']) && isset($_POST['contrasenia'])) {
		$email = SafeString::safe($_POST['email']);
		$contraseña = SafeString::safe($_POST['contrasenia']);
		$token = (new Socio())->iniciarSesion($email, $contraseña);
		echo json_encode(array("status"=>"ok","token"=>$token));
	} else if (isset($_POST['token'])) {
		$token = SafeString::safe($_POST['token']);
		(new Socio())->iniciarSesionConToken($token);
		echo json_encode(array("status"=>"ok","token" => $token));
	}
	
} catch (usuarioNoExiste $e) {
	echo json_encode(array("status"=>"error","clave"=>"noExiste","explicacion"=>"El nombre de Email o la clave son incorrectos"));
} catch (tokenInvalido $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"El token no es valido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>