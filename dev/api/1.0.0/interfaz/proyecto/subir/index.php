<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Proyecto.php";

//header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['idProyecto']) || !isset($_POST['titulo']) || !isset($_POST['sinopsis'])
		|| !isset($_POST['idConvocatoria']) || !isset($_POST['idSubcategoria']) || !isset($_POST['idGenero'])
		|| !isset($_POST['proposito']) || !isset($_FILES['trabajo']) || !isset($_FILES['certificado']) || !isset($_POST['token'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

try{
	
	
	$idProyecto = SafeString::safe($_POST['idProyecto']);
	$titulo = SafeString::safe($_POST['titulo']);
	$sinopsis = SafeString::safe($_POST['sinopsis']);
	$idConvocatoria = SafeString::safe($_POST['idConvocatoria']);
	$idSubcategoria = SafeString::safe($_POST['idSubcategoria']);
	$idGenero= SafeString::safe($_POST['idGenero']);
	$proposito = SafeString::safe($_POST['proposito']);
	$idEstado = SafeString::safe($_POST['idEstado']);
	$token = SafeString::safe($_POST['token']);
	
	$trabajo = $_FILES['trabajo'];
	$certificado = $_FILES['certificado'];
	$nombreTrabajo = uniqid('',true).'.pdf';
	$ubicacionDestinoTrabajo = $fileDestinationCertificado = dirname(__FILE__).'/../../../../../recursos/trabajos/'.$nombreTrabajo;
	$nombreCertificado = uniqid('',true).'.pdf';
	$ubicacionDestinoCertificado = $fileDestinationCertificado = dirname(__FILE__).'/../../../../../recursos/certificados/'.$nombreCertificado;
	agregarArchivo($trabajo, $ubicacionDestinoTrabajo, "pdf");
	agregarArchivo($certificado, $ubicacionDestinoCertificado, "pdf");
	
	
	if ($idProyecto === "-1") {
		(new Proyecto())->nuevoProyecto($token, $nombreTrabajo, $nombreCertificado, $titulo, $sinopsis, $idConvocatoria, $idSubcategoria, $idGenero, $proposito, $idEstado);
	} else {
		(new Proyecto())->nuevoTrabajo($token, $idProyecto, $nombreTrabajo, $nombreCertificado, $proposito, $idEstado);
	}
	
	header('Location: ../../../../../dreams/subir/exito.html');
		
} catch (tokenInvalido$e) {
	echo json_encode(array("status"=>"error","clave"=>"nombreUsuario","explicacion"=>$e->getMessage()));
	header('Location: ' . $_SERVER['HTTP_REFERER']);
}  catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
	header('Location: ' . $_SERVER['HTTP_REFERER']);
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
	header('Location: ' . $_SERVER['HTTP_REFERER']);
}
 	
 function agregarArchivo($archivo, $ubicacionDestino, $terminacion) {
 	if ($terminacion === strtolower(end(explode('.',$archivo['name'])))){
 		if ($archivo['error'] === 0)
 		{
 			if (move_uploaded_file($archivo['tmp_name'],$ubicacionDestino)) {
 				
 			} else {
 				
 			}
 		} else {
 			
 		}
 	} else {
 		
 	}
 }
?>