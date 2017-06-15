<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/AdministradorDB.php";

class Administrador {

	function iniciarSesion($email, $contraseņa)
	{
		$administradorDB = new AdministradorDB();
		if ($administradorDB->clavesCoinciden($email, $contraseņa))
		{
			return $administradorDB->crearSesion($email);
		} else {
			throw new usuarioNoExiste();
		}
	}
}
class usuarioNoExiste extends Exception{
}
?>