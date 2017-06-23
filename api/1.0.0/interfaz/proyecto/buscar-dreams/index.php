<?php
require_once dirname(__FILE__)."/../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../modelo/Proyecto.php";

header('Content-Type: text/html; charset=utf8');
if (!isset($_POST['token']) || !isset($_POST['admin']) || !isset($_POST['subcategoria'])  || !isset($_POST['categoria']) 
		|| !isset($_POST['genero']) || !isset($_POST['extra']) || !isset($_POST['texto'])) {
	die(json_encode(array("status"=>"error","clave"=>"valores","explicacion"=>"Faltan valores")));
}

try {
	
	$token = SafeString::safe($_POST['token']);
	$admin = SafeString::safe($_POST['admin']);
	$categoria = SafeString::safe($_POST['categoria']);
	$subcategoria = SafeString::safe($_POST['subcategoria']);
	$genero = SafeString::safe($_POST['genero']);
	$extra = SafeString::safe($_POST['extra']);
	$texto = SafeString::safe($_POST['texto']);
	$proyectos = (new Proyecto())->filtrarProyectos($categoria, $subcategoria, $genero, $extra, $texto);
	echo json_encode(array("status"=>"ok","proyectos"=>$proyectos));
	
} catch (tokenInvalido $e) {
	echo json_encode(array("status"=>"error","clave"=>"token","explicacion"=>"Token invalido"));
} catch (errorConBaseDeDatos $e) {
	echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
} catch (Exception $e) {
	echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
}
?>