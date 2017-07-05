<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Convocatoria.php";

//header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['titulo']) || !isset($_POST['tema']) || !isset($_POST['idSubcategoria']) || !isset($_POST['idGenero']) || !isset($_POST['token'])
		|| !isset($_POST['dia']) || !isset($_POST['mes']) || !isset($_POST['ano'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

try{
	$token = SafeString::safe($_POST['token']);
	$titulo = SafeString::safe($_POST['titulo']);
	$tema = SafeString::safe($_POST['tema']);
	$idSubcategoria = SafeString::safe($_POST['idSubcategoria']);
	$idGenero= SafeString::safe($_POST['idGenero']);
	$dia = SafeString::safe($_POST['dia']);
	$mes = SafeString::safe($_POST['mes']);
	$ano = SafeString::safe($_POST['ano']);
	if(isset($_FILES['imagen'])) {
		$imagen = $_FILES['imagen'];
		$nombreImagen = uniqid('',true).'.'.(end(explode('.',$imagen['name'])));
	
		$ubicacionDestinoImagen = dirname(__FILE__).'/../../../../../recursos/convocatorias/'.$nombreImagen;
	
		agregarArchivo($imagen, $ubicacionDestinoImagen);
	} else {
		$nombreImagen = null;
	}
	
	
	(new Convocatoria())->nuevaConvocatoria($token, $titulo, $tema, $idSubcategoria, $idGenero, $dia, $mes, $ano, $nombreImagen);
	
	header('Location: ../../../../../empresa/exito.html');
		
} catch (tokenInvalido$e) {
	header('Location: ' . $_SERVER['HTTP_REFERER'].'?error=1');
}  catch (errorConBaseDeDatos $e) {
	header('Location: ' . $_SERVER['HTTP_REFERER'].'?error=2');
} catch (Exception $e) {
	header('Location: ' . $_SERVER['HTTP_REFERER'].'?error=3');
}
 	
 function agregarArchivo($archivo, $ubicacionDestino) {
 		if ($archivo['error'] === 0)
 		{
 			if (move_uploaded_file($archivo['tmp_name'],$ubicacionDestino)) {
 				
 			} else {
 				
 			}
 		} else {
 			
 		}
 }
?>