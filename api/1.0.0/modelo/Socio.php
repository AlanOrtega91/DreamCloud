<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/SocioDB.php";

class Socio {

	
	
	function iniciarSesion($email, $contrase�a)
	{
		$socioDB = new SocioDB();
		if ($socioDB->clavesCoinciden($email, $contrase�a))
		{
			return $socioDB->crearSesion($email);
		} else {
			throw new usuarioNoExiste();
		}
	}
	
	function leerCuenta($token, $id)
	{
		$socioDB = new SocioDB();
		if ($token) {
			return $socioDB->leerCuentaToken($token);
		} else {
			return $socioDB->leerCuentaId($id);
		}
	}
	function cerrarSesion($token)
	{
		(new SocioDB)->cerrarSesion($token);
	}
}
?>