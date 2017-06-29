<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['clave']) || !isset($_POST['contrasena'])) {
	die(json_encode(array("status"=>"error","clave"=>"parametros","explicacion"=>"Faltan parametros")));
}

try{
	$clave = SafeString::safe($_POST['clave']);
	$contraseña = SafeString::safe($_POST['contrasena']);
	(new Usuario())->reestablecerContraseña($clave, $contraseña);
	echo json_encode(array("status"=>"ok"));
	
} catch (usuarioNoExiste $e) {
	echo json_encode(array("status"=>"error","clave"=>"noExiste","explicacion"=>"El nombre de Usuario/Email o la clave son incorrectos"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>