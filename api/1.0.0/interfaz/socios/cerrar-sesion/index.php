<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Socio.php";

header('Content-Type: text/html; charset=utf8');

try{
	if (isset($_POST['token'])) {
		$token = SafeString::safe($_POST['token']);
		(new Socio())->cerrarSesion($token);
		echo json_encode(array("status"=>"ok"));
	}
	
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>