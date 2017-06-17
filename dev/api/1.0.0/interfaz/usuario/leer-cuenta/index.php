<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');


	try{
		if (isset($_POST['token'])) 
		{
			$token = SafeString::safe($_POST['token']);
			$informacion = (new Usuario())->leerCuentaPropia($token);
			$calificacion = (new Usuario())->calcularCalificacionPropia($token);
			$informacion['calificacion'] = $calificacion['calificacionUsuario'];
			echo json_encode(array("status"=>"ok", "cuenta"=>$informacion));
		} elseif (isset($_POST['id']))
		{
			$id = SafeString::safe($_POST['id']);
		} else 
		{
			die(json_encode(array("Status"=>"ERROR missing values")));
		}
		
	} catch(tokenInvalido $e) {
		echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
	} catch (Exception $e) {
		echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
 	}
?>