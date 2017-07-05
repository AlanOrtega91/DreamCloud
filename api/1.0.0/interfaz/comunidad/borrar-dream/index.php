<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Administrador.php";
require_once dirname(__FILE__)."/../../../modelo/Comunidad.php";

header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['token']) || !isset($_POST['id'])) {
	die(json_encode(array("status"=>"error","clave"=>"parametros","explicacion"=>"faltan parametros")));
}

try {
	$token = SafeString::safe($_POST['token']);
	$id = SafeString::safe($_POST['id']);
	(new Administrador())->iniciarSesionConToken($token);
	(new Comunidad())->borrarDream($id);
	echo json_encode(array("status"=>"ok"));
} catch (tokenInvalido $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>