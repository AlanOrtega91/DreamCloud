<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/AdministradorDB.php";

class Administrador {

	function iniciarSesion($email, $contrase�a)
	{
		$administradorDB = new AdministradorDB();
		if ($administradorDB->clavesCoinciden($email, $contrase�a))
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