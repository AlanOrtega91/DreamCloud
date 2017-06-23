<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Convocatoria.php";

header('Content-Type: text/html; charset=utf8');

try {
	$convocatorias = (new Convocatoria())->buscarConvocatoriasActivas();
	echo json_encode(array("status"=>"ok","convocatorias"=>$convocatorias));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>