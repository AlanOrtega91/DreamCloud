<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Convocatoria.php";
require_once dirname(__FILE__)."/../../../modelo/Socio.php";


header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['idUsuario']) || !isset($_POST['token']) || !isset($_POST['convocatoria'])) {
	die(json_encode(array("status"=>"error","clave"=>"parametros","explicacion"=>"faltan parametros")));
}

try {
	$id = SafeString::safe($_POST['idUsuario']);
	$token = SafeString::safe($_POST['token']);
	$convocatoria = SafeString::safe($_POST['convocatoria']);
	$socio = (new Socio())->leerCuenta($token);
	if ($socio) {
		$convocatoria = (new Convocatoria())->seleccionarGanador($id, $convocatoria);
		echo json_encode(array("status"=>"ok"));
	} else {
		echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
	}
} catch (tokenInvalido $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>