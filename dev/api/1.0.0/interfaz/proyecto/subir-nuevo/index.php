<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Usuario.php";

//header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['idProyecto']) || !isset($_POST['titulo']) || !isset($_POST['sinopsis'])
		|| !isset($_POST['idConvocatoria']) || !isset($_POST['idSubcategoria']) || !isset($_POST['idGenero'])
			|| !isset($_POST['proposito']) || !isset($_FILES['trabajo']) || !isset($_FILES['certificado'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

try{
	$trabajo = $_FILES['trabajo'];
	$certificado = $_FILES['certificado'];
	
	if ("pdf" != strtolower(end(explode('.',$trabajo['name'])))){
		echo 'diferente terminacion';
	}
	if ($trabajo['error'] === 0)
	{
		$file_name_new = uniqid('',true).'.pdf';
		$fileDestination = dirname(__FILE__).'/../../../../../recursos/trabajos/'.$file_name_new;
		
		if (move_uploaded_file($trabajo['tmp_name'],$fileDestination))
		{
			echo $file_name_new
			echo $fileDestination;
		} else {
			echo $fileDestination.'<br>';
			echo $trabajo['tmp_name'].'<br>';
			echo "Error moviendo".'<br>';
		}
	} else {
		echo $trabajo['error'];
	}
	
		
	} catch (nombreDeUsuarioExiste $e) {
		echo json_encode(array("status"=>"error","clave"=>"nombreUsuario","explicacion"=>$e->getMessage()));
	} catch (usuarioExiste $e) {
 		echo json_encode(array("status"=>"error","clave"=>"email","explicacion"=>$e->getMessage()));
	} catch (errorConBaseDeDatos $e) {
 		echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
 	} catch (Exception $e) {
 		echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
 	}
?>