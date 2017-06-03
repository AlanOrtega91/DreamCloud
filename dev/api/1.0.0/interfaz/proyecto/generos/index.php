<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Proyecto.php";

header('Content-Type: text/html; charset=utf8');

try {
	if (isset($_POST['idCategoria'])) {
		$idCategoria = SafeString::safe($_POST['idCategoria']);
		$generos = (new Proyecto())->buscarGeneros($idCategoria);
		echo json_encode(array("status"=>"ok","generos"=>$generos));
	} else {
		echo json_encode(array("status"=>"error","clave"=>"id","explicacion"=>"id Necesario"));
	}

} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>