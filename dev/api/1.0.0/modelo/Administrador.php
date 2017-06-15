<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/AdministradorDB.php";

class Administrador {

	function iniciarSesion($email, $contraseña)
	{
		$administradorDB = new AdministradorDB();
		if ($administradorDB->clavesCoinciden($email, $contraseña))
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