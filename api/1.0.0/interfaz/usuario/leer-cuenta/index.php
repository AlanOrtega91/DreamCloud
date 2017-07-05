<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";
require_once dirname(__FILE__)."/../../../modelo/Administrador.php";

header('Content-Type: text/html; charset=utf8');


	try{
		if (($_POST['usuario'] == 0 )) 
		{
			$token = SafeString::safe($_POST['token']);
			$informacion = (new Usuario())->leerCuenta($token, null, $modo = "propia");
			$calificacion = (new Usuario())->calcularCalificacion($informacion['id']);
			$informacion['calificacion'] = $calificacion['calificacionUsuario'];
			echo json_encode(array("status"=>"ok", "cuenta"=>$informacion));
			
		} elseif (($_POST['usuario'] == 1 ))
		{
			$id = SafeString::safe($_POST['id']);
			$token = SafeString::safe($_POST['token']);
			$infoPropia = (new Usuario())->leerCuenta($token, null, 0);
			
			$informacion = (new Usuario())->leerCuenta(null, $id, 1);
			
			$calificacion = (new Usuario())->calcularCalificacion($id);
			
			$siguiendo = (new Usuario())->revisarSiSeSiguen($id, $infoPropia['id']);
			
			$informacion['calificacion'] = $calificacion['calificacionUsuario'];
			echo json_encode(array("status"=>"ok", "cuenta"=>$informacion, "siguiendo" => $siguiendo));
			
		} elseif (($_POST['usuario'] == 2 ))
		{
			$id = SafeString::safe($_POST['id']);
			$token = SafeString::safe($_POST['token']);
			(new Administrador())->iniciarSesionConToken($token);
			$informacion = (new Usuario())->leerCuenta(null, $id, 1);
			$calificacion = (new Usuario())->calcularCalificacion($id);
			$informacion['calificacion'] = $calificacion['calificacionUsuario'];
			echo json_encode(array("status"=>"ok", "cuenta"=>$informacion));
			
		}else 
		{
			die(json_encode(array("Status"=>"ERROR missing values")));
		}
		
	} catch(tokenInvalido $e) {
		echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
	} catch (Exception $e) {
		echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
 	}
?>