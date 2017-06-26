<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Convocatoria.php";

header('Content-Type: text/html; charset=utf8');

try {
	if (isset($_POST['id'])) {
		$id = SafeString::safe($_POST['id']);
		$convocatorias = (new Convocatoria())->buscarConvocatoriasId($id);
		echo json_encode(array("status"=>"ok","convocatorias"=>$convocatorias));
		
	} elseif (isset($_POST['token'])){
		$token = SafeString::safe($_POST['token']);
		$convocatorias= (new Convocatoria())->buscarConvocatorias($token);
		echo json_encode(array("status"=>"ok","convocatorias"=>$convocatorias));
	} else {
		echo json_encode(array("status"=>"error","clave"=>"parametros","explicacion"=>"Faltan parametros"));
	}
} catch (tokenInvalido $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>