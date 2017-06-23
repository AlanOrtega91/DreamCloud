<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

try {
	if (isset($_POST['nombreUsuario'])) {
		$nombreUsuario = SafeString::safe($_POST['nombreUsuario']);
		$usuarios = (new Usuario())->buscarUsuarios($nombreUsuario);
		echo json_encode(array("status"=>"ok","usuarios"=>$usuarios));
	} else {
		echo json_encode(array("status"=>"error","clave"=>"vacio","explicacion"=>"falta el nombre"));
	}
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>