<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['nombreUsuario']) || !isset($_POST['nombre']) || !isset($_POST['primerApellido'])
		|| !isset($_POST['telefono']) || !isset($_POST['celular']) || !isset($_POST['avatar'])
		|| !isset($_POST['email']) || !isset($_POST['fechaDeNacimiento']) || !isset($_POST['descripcion'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

		try{
			$token = SafeString::safe($_POST['nombreUsuario']);
			$nombre = SafeString::safe($_POST['nombre']);
			$primerApellido = SafeString::safe($_POST['primerApellido']);
			$segundoApellido = null;
			if (isset($_POST['segundoApellido'])) {
				$segundoApellido = SafeString::safe($_POST['segundoApellido']);
			}
			$telefono = SafeString::safe($_POST['telefono']);
			$celular = SafeString::safe($_POST['celular']);
			$email = SafeString::safe($_POST['email']);
			$ocupacion = SafeString::safe($_POST['contrasenia']);
			$rfc = SafeString::safe($_POST['fechaDeNacimiento']);
			$beneficiario = SafeString::safe($_POST['beneficiario']);
			
			if(isset($_POST['imagenCodificada']))
			{

			}
		
		echo json_encode(array("Status"=>"OK"));
		
	} catch (Exception $e) {
 		echo json_encode(array("Status"=>"ERROR Desconocido"));
 	}
 	
 	function guardarImagen($idClient){
 		$encoded_string = $_POST['encoded_string'];
 		$encoded_string = str_replace('data:image/jpg;base64,', '', $encoded_string);
 		$encoded_string = str_replace(' ', '+', $encoded_string);
 		$image_name = "profile_image.jpg";
 		$decoded_string = base64_decode($encoded_string);
 		$directory = dirname(__FILE__).'/../../../images/users/'.$idClient;
 		$oldmask = umask(0);
 		if(!is_dir($directory)) {
 			mkdir($directory, 0777);
 		}
 		$path = dirname(__FILE__).'/../../../images/users/'.$idClient.'/'.$image_name;
 	
 		file_put_contents($path,$decoded_string);
 		umask($oldmask);
 	}
?>