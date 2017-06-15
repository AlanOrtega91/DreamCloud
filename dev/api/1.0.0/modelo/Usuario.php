<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/UsuarioDB.php";

class Usuario {

	function buscaNombreDeUsuarioLibre($nombreUsuario)
	{
		$usuarioDB = new UsuarioDB();
		if ($usuarioDB->existeNombreDeUsuario($nombreUsuario))
		{
			throw new nombreDeUsuarioExiste();
		}
	}
	
	function buscaEmailDeUsuarioLibre($email) 
	{
		$usuarioDB = new UsuarioDB();
		if ($usuarioDB->existeUsuarioEmail($email))
		{
			throw new usuarioExiste();
		}
	}
	
	function nuevoUsuario($nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $contraseña)
	{
		$usuarioDB = new UsuarioDB();
		$this->buscaNombreDeUsuarioLibre($nombreUsuario);
		$this->buscaEmailDeUsuarioLibre($email);
		$usuarioDB->agregarUsuario($nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $contraseña);
	}
	
	function iniciarSesion($emailONombre, $contraseña)
	{
		$usuarioDB = new UsuarioDB();
		if ($usuarioDB->clavesCoinciden($emailONombre, $contraseña))
		{
			if (strpos($emailONombre,'@')) {
				return $usuarioDB->crearSesion($emailONombre);
			} else {
				$informacionUsuario = $usuarioDB->leerUsuarioPorNombre($emailONombre);
				return $usuarioDB->crearSesion($informacionUsuario['email']);
			}
		} else {
			throw new usuarioNoExiste();
		}
	}
	
	function iniciarSesionConToken($token)
	{
		$usuarioDB = new UsuarioDB();
		if ($usuarioDB->existeToken($token)) 
		{
			$usuarioDB->actualizaToken($token);		
		} else {
			throw new tokenInvalido();
		}
	}
	
	function leerCuentaPropia($token)
	{
		$usuarioDB = new UsuarioDB();
		$this->iniciarSesionConToken($token);
		return $usuarioDB->leerCuentaPropia($token);
	}
	
	function calcularCalificacionPropia($token)
	{
		$usuarioDB = new UsuarioDB();
		$this->iniciarSesionConToken($token);
		return $usuarioDB->leerCalificacionPropia($token);
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
class tokenInvalido extends Exception{
}
?>