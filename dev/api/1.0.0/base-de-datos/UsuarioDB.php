<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class UsuarioDB extends BaseDeDatos{
	
	const LEER_NOMBRE_DE_USUARIO = "SELECT * FROM Usuario WHERE nombreDeUsuario = '%s';";
	const LEER_USUARIO_POR_NOMBRE = "SELECT * FROM Usuario WHERE nombreDeUsuario = '%s';";
	
	const AGREGAR_USUARIO = "INSERT INTO Usuario (nombreDeUsuario, nombre, apellido, fechaDeNacimiento, email, contrasenia) 
			VALUES ('%s', '%s', '%s', '%s', '%s', '%s');";
	
	const REVISAR_CLAVES = "SELECT * FROM Usuario WHERE (nombreDeUsuario = '%s' OR email = '%s') AND (contrasenia = '%s');";
	const CREAR_SESION= "INSERT INTO Sesion_Usuario (token, fecha, email)
			VALUES ('%s', NOW(), '%s');";
	
	const REVISAR_TOKEN = "SELECT * FROM Sesion_Usuario WHERE token = '%s';";
	
	const ACTUALIZAR_TOKEN = "UPDATE Sesion_Usuario SET fecha = NOW() WHERE token = '%s'";
	
	const ELIMINAR_SESION= "DELETE FROM Sesion_Usuario WHERE token = '%s';";
	
	function existeNombreDeUsuario($nombreUsuario)
	{
		$query = sprintf(self::LEER_NOMBRE_DE_USUARIO, $nombreUsuario);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function existeUsuarioEmail($email)
	{
		$query = sprintf(self::LEER_USUARIO, $email);
		$resultado = $this->ejecutarQuery($query);		
		return $this->resultadoTieneValores($resultado);
	}
	
	function agregarUsuario($nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $contraseña)
	{
		$hashContraseña = hash("sha512", md5($contraseña));
		$query = sprintf(self::AGREGAR_USUARIO, $nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $hashContraseña);
		$this->ejecutarQuery($query);
	}
	
	function crearSesion($email)
	{
		$token = md5 (uniqid(mt_rand(), true));
		$query = sprintf(self::CREAR_SESION, $token, $email);
		$this->ejecutarQuery($query);
		return $token;
	}
	
	function clavesCoinciden($emailONombre, $contraseña)
	{
		$hashContraseña = hash("sha512", md5($contraseña));
		sleep(1);
		$query = sprintf(self::REVISAR_CLAVES, $emailONombre, $emailONombre, $hashContraseña);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function leerUsuarioPorNombre($usuario)
	{
		$query = sprintf(self::LEER_USUARIO_POR_NOMBRE, $usuario);
		$resultado = $this->ejecutarQuery($query);
		return $resultado->fetch_assoc();
	}
	
	function existeToken($token)
	{
		$query = sprintf(self::REVISAR_TOKEN, $token);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function actualizaToken($token)
	{
		$query = sprintf(self::ACTUALIZAR_TOKEN, $token);
		$this->ejecutarQuery($query);
	}
	
	function eliminarSesion($token)
	{
		$query = sprintf(self::ELIMINAR_SESION, $token);
		$result = $this->ejecutarQuery($query);
	}
}
?>