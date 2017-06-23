<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');


	try{
		if (isset($_POST['id'])) 
		{
			$id = SafeString::safe($_POST['id']);
			$token = SafeString::safe($_POST['token']);
			$infoPropia = (new Usuario())->leerCuenta($token, null, 0);
			$informacion = (new Usuario())->leerCuenta($token = null, $id, $modo = 1);
			
			$calificacion = (new Usuario())->calcularCalificacion($id);
			
			$siguiendo = (new Usuario())->revisarSiSeSiguen($id, $infoPropia['id']);
			
			$informacion['calificacion'] = $calificacion['calificacionUsuario'];
			echo json_encode(array("status"=>"ok", "cuenta"=>$informacion, "siguiendo" => $siguiendo));
		} elseif (isset($_POST['token']))
		{
			$token = SafeString::safe($_POST['token']);
			$informacion = (new Usuario())->leerCuenta($token, null, $modo = "propia");
			$calificacion = (new Usuario())->calcularCalificacion($informacion['id']);
			$informacion['calificacion'] = $calificacion['calificacionUsuario'];
			echo json_encode(array("status"=>"ok", "cuenta"=>$informacion));
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