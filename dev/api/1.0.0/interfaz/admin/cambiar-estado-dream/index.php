<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Administrador.php";

header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['token']) || !isset($_POST['id']) || !isset($_POST['estado'])) {
	die(json_encode(array("status"=>"error","clave"=>"valores","explicacion"=>"Faltan valores")));
}

try{
	$token = SafeString::safe($_POST['token']);
	$id = SafeString::safe($_POST['id']);
	$estado = SafeString::safe($_POST['estado']);
	(new Administrador())->iniciarSesionConToken($token);
	
	(new Administrador())->cambiarEstadoTrabajo($id, $estado);
	echo json_encode(array("status"=>"ok"));
	
} catch (tokenInvalidoAdmin $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"El token es invalido"));
} catch (errorCambiandoEstado $e) {
	echo json_encode(array("status"=>"error","clave"=>"estado","explicacion"=>"Error cambiando estado"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>