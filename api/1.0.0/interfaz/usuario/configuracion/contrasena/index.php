<?php
require_once dirname(__FILE__)."/../../../../modelo/SafeString.php";
require_once dirname(__FILE__)."/../../../../modelo/Usuario.php";

header('Content-Type: text/html; charset=utf8');

if (!isset($_POST['token']) || !isset($_POST['contrasena']) || !isset($_POST['contrasenaNueva'])) {
			die(json_encode(array("Status"=>"ERROR missing values")));
		}

try{
	$token = SafeString::safe($_POST['token']);
	$contraseña = SafeString::safe($_POST['contrasena']);
	$contraseñaNueva = SafeString::safe($_POST['contrasenaNueva']);

	$usuario = new Usuario();
	$informacion = $usuario->leerCuenta($token, null, 0);
	$usuario->cambiarContraseña($informacion['id'], $contraseña, $contraseñaNueva);
	
	echo json_encode(array("status"=>"ok"));
		
	} catch (datosInvalidos $e) {
 		echo json_encode(array("status"=>"error","clave"=>"datos","explicacion"=>"Los datos no coinciden"));
	} catch (errorConBaseDeDatos $e) {
 		echo json_encode(array("status"=>"error","clave"=>"db","explicacion"=>$e->getMessage()));
 	} catch (Exception $e) {
 		echo json_encode(array("status"=>"error","clave"=>"desconocido","explicacion"=>$e->getMessage()));
 	}
?>