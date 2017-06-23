<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/UsuarioDB.php";
require_once dirname ( __FILE__ ) . "/Mail.php";

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
		
		
		Mail::enviarEmail("Bienvenido a DreamCloud","Prueba",$email);
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
	
	function leerNewsFeed($token)
	{
		$usuario = $this->leerCuentaPropia($token);
		$news = (new UsuarioDB)->leerNewsFeed($usuario['id']);
		for ($newsLista = array(); $fila = $news->fetch_assoc(); $newsLista[] = $fila);
		return $newsLista;
	}
	
	function cambiarDatosUsuario($token, $nombre, $apellido, $email, $telefono, $celular, $descripcion, $fechaNacimiento)
	{
		$usuario = $this->leerCuentaPropia($token);
		(new UsuarioDB)->cambiarDatosUsuario($usuario['id'], $nombre, $apellido, $email, $telefono, $celular, $descripcion, $fechaNacimiento);
	}
	
	function cerrarSesion($token)
	{
		(new UsuarioDB)->cerrarSesion($token);
	}
	
	function buscarUsuarios($nombreUsuario)
	{
		$usuarios = (new UsuarioDB)->buscarUsuarios($nombreUsuario);
		for ($usuariosLista = array(); $fila = $usuarios->fetch_assoc(); $usuariosLista[] = $fila);
		return $usuariosLista;
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