<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Proyecto.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";
require_once dirname(__FILE__)."/../../../modelo/Administrador.php";

header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['token']) || !isset($_POST['idDream']) || !isset($_POST['admin'])) {
	die(json_encode(array("status"=>"error","clave"=>"parametros","explicacion"=>"faltan parametros")));
}

try {
	$token = SafeString::safe($_POST['token']);
	$idDream = SafeString::safe($_POST['idDream']);
	$admin = SafeString::safe($_POST['admin']);
	if ($admin === "1") {
		(new Administrador())->iniciarSesionConToken($token);
	} else {
		(new Usuario())->leerCuenta($token, null, 0);
	}
	$trabajo = (new Proyecto())->buscarTrabajo($idDream);
	echo json_encode(array("status"=>"ok","dream"=>$trabajo));
} catch (tokenInvalido $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>