<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['token'])) {
			die(json_encode(array("Status"=>"ERROR faltan parametros")));
		}

	try{
		$token = SafeString::safe($_POST['token']);
		$usuario = new Usuario();
		$usuario->cerrarSesion($token);
		echo json_encode(array("Status"=>"ok"));
		
	} catch (Exception $e) {
 		echo json_encode(array("Status"=>"ERROR Desconocido"));
 	}
?>