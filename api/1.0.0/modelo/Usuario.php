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
	
	function nuevoUsuario($nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $contrase�a)
	{
		$usuarioDB = new UsuarioDB();
		$this->buscaNombreDeUsuarioLibre($nombreUsuario);
		$this->buscaEmailDeUsuarioLibre($email);
		$usuarioDB->agregarUsuario($nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $contrase�a);
		
		$mensaje = Mail::construirBienvenida($nombre + " " + $apellido);
		Mail::enviarEmail("Bienvenido a DreamCloud",$mensaje,$email);
	}
	
	function iniciarSesion($emailONombre, $contrase�a)
	{
		$usuarioDB = new UsuarioDB();
		if ($usuarioDB->clavesCoinciden($emailONombre, $contrase�a))
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
	
	function leerCuenta($token, $id)
	{
		$usuarioDB = new UsuarioDB();
		if ($token) {
			return $usuarioDB->leerCuentaToken($token);
		} else {
			return $usuarioDB->leerCuentaId($id);
		}
	}
	
	
	function calcularCalificacion($id)
	{
		$usuarioDB = new UsuarioDB();
		return $usuarioDB->leerCalificacion($id);
	}
	
	function leerNewsFeed($token)
	{
		$usuario = $this->leerCuenta($token, null);
		$news = (new UsuarioDB)->leerNewsFeed($usuario['id']);
		for ($newsLista = array(); $fila = $news->fetch_assoc(); $newsLista[] = $fila);
		return $newsLista;
	}
	
	function cambiarDatosUsuario($token, $nombre, $apellido, $email, $telefono, $celular, $descripcion, $fechaNacimiento)
	{
		$usuario = $this->leerCuenta($token, null);
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
	
	function revisarSiSeSiguen($id, $idSeguidor)
	{
		if ((new UsuarioDB)->usuariosSeSiguen($id, $idSeguidor))
		{
			return 1;
		} else {
			return 0;
		}
	}
	
	function seguir($id, $usuario, $seguir)
	{
		if ($seguir == 1)
		{
			(new UsuarioDB)->seguir($id, $usuario);
		} else {
			(new UsuarioDB)->dejarDeSeguir($id, $usuario);
		}
	}
	
	function contactar($id, $usuario, $mensaje)
	{
		(new UsuarioDB)->contactar($id, 'null',$usuario, $mensaje);
	}
	
	function cambiarContrase�a($id, $contrase�a, $contrase�aNueva)
	{
		if ((new UsuarioDB)->cambiarContrase�a($id, $contrase�a, $contrase�aNueva) < 1) {
			throw new datosInvalidos();
		}
	}
	function guardarImagen($token, $nombreImagen)
	{
		$usuario = $this->leerCuenta($token, null);
		(new UsuarioDB())->guardarDireccionImagen($usuario['id'], $nombreImagen);
	}
	
	function recuperarContrase�a($email)
	{
		$usuarioDB = new UsuarioDB();
		if (!$usuarioDB->existeUsuarioEmail($email))
		{
			throw new usuarioNoExiste();
		}
		$clave = rand();
		$usuarioDB->recuperarContrase�a($email, $clave);
		Mail::enviarEmail("Solicitud de recuperacion de contrase�a","Accede a este link para recuperar tu contrase�a <br> 
			http://dclouding.com/dreamer/reestablecer-contrasena.html?clave=$clave",$email);
	}
	
	function reestablecerContrase�a($clave, $contrase�a)
	{
		$usuarioDB = new UsuarioDB();
		$email = $usuarioDB->leerEmailRecuperarContrase�a($clave);
		if($email) {
			$usuarioDB->reestablecerContrase�a($contrase�a, $email);
			$usuarioDB->borrarDeReestablecer($clave, $email);
		}
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
class datosInvalidos extends Exception{
}
?>