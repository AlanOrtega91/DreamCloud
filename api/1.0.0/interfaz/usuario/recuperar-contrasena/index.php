<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['email'])) {
	die(json_encode(array("status"=>"error","clave"=>"parametros","explicacion"=>"Faltan parametros")));
}

try{
	$email = SafeString::safe($_POST['email']);
	(new Usuario())->recuperarContraseña($email);
	echo json_encode(array("status"=>"ok"));
	
} catch (usuarioNoExiste $e) {
	echo json_encode(array("status"=>"error","clave"=>"noExiste","explicacion"=>"El nombre de Usuario/Email o la clave son incorrectos"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>