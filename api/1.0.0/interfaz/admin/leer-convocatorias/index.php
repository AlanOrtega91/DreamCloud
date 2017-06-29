<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Administrador.php";

header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['token'])) {
	die(json_encode(array("status"=>"error","clave"=>"valores","explicacion"=>"Faltan valores")));
}

try {
	$token = SafeString::safe($_POST['token']);
	$convocatorias = (new Administrador())->buscarConvocatoriasGanadas($token);
	echo json_encode(array("status"=>"ok","convocatorias"=>$convocatorias));
		
} catch (tokenInvalidoAdmin $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>