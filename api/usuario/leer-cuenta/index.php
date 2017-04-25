<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['token']) && !isset($_POST['id'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

	try{
		if (isset($_POST['token'])) 
		{
			
		} elseif (isset($_POST['id']))
		{
			
		} else 
		{
			die(json_encode(array("Status"=>"ERROR missing values")));
		}
		$token = SafeString::safe($_POST['token']);
		$nombre = SafeString::safe($_POST['nombre']);
		$primerApellido = SafeString::safe($_POST['primerApellido']);

		echo json_encode(array("Status"=>"OK"));
		
	} catch(errorWithDatabaseException $e) {
		echo json_encode(array("Status"=>"ERROR DB"));
	} catch(errorMakingPaymentException $e) {
		echo json_encode(array("Status"=>"ERROR PAGO"));
 	} catch(Conekta\ErrorList $e) {
 		echo json_encode(array("Status"=>"ERROR Datos".$e->getMessage()));
 	} catch (Exception $e) {
 		echo json_encode(array("Status"=>"ERROR Desconocido"));
 	}
?>