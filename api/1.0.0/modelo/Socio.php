<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/SocioDB.php";

class Socio {

	
	
	function iniciarSesion($email, $contraseña)
	{
		$socioDB = new SocioDB();
		if ($socioDB->clavesCoinciden($email, $contraseña))
		{
			return $socioDB->crearSesion($email);
		} else {
			throw new usuarioNoExiste();
		}
	}
	
	function leerCuenta($token, $id, $modo)
	{
		$socioDB = new SocioDB();
		if ($modo == 0) {
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