<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/UsuarioDB.php";

class Usuario {

	function buscaNombreDeUsuario($nombreUsuario)
	{
		$usuarioDB = new UsuarioDB();
		if (!$usuarioDB->existeNombreDeUsuario($nombreUsuario))
		{
			throw new nombreDeUsuarioExiste();
		}
	}
	
	function nuevoUsuario($nombreUsuario, $nombre, $primerApellido, $segundoApellido, $telefono, $celular, $email, $contrase�a, $fechaNacimiento) 
	{
		$usuarioDB = new UsuarioDB();
		if ($usuarioDB->existeUsuario($email) || $usuarioDB->existeNombreDeUsuario($nombreUsuario)) {
			throw new usuarioExiste();
		} else {
			$usuarioDB->agregarUsuario($nombreUsuario, $nombre, $primerApellido, $segundoApellido, $telefono, $celular, $email, $contrase�a, $fechaNacimiento);
		}
	}
	
	function iniciarSesion($email, $contrase�a)
	{
		$usuarioDB = new UsuarioDB();
		if ($usuarioDB->existeUsuario($email)) 
		{
			return $usuarioDB->crearSesion($email, $contrase�a);
		} else {
			throw new usuarioNoExiste();
		}
	}
	
	function cerrarSesion($token)
	{
		$usuarioDB = new UsuarioDB();
		$usuarioDB->eliminarSesion($token);
	}
}

class usuarioExiste extends Exception{
}
class usuarioNoExiste extends Exception{
}
class nombreDeUsuarioExiste extends Exception{
}
?>