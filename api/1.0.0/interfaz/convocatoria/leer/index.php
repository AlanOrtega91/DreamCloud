<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Convocatoria.php";


header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['id'])) {
	die(json_encode(array("status"=>"error","clave"=>"parametros","explicacion"=>"faltan parametros")));
}

try {
	$id = SafeString::safe($_POST['id']);

	$convocatoria = (new Convocatoria())->buscarConvocatoria($id);
	echo json_encode(array("status"=>"ok","convocatoria"=>$convocatoria));
} catch (tokenInvalido $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>