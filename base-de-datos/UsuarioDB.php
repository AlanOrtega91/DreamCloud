<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class UsuarioDB extends BaseDeDatos{
	
	const LEER_NOMBRE_DE_USUARIO = "SELECT * FROM Usuario WHERE nombreDeUsuario = '%s';";
	const LEER_USUARIO = "SELECT * FROM Usuario WHERE email = '%s';";
	
	const AGREGAR_USUARIO = "INSERT INTO Usuario (nombreDeUsuario, nombre, primerApellido, segundoApellido, telefono, celular, email, contrasenia, fechaDeNacimiento) 
			VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', SHA2(MD5(('%s')),512), '%s');";
	const CREAR_SESION= "INSERT INTO Sesion_Usuario (token, fecha, idUsuario)
			VALUES ('%s', NOW(), (SELECT id FROM Usuario WHERE email = '%s' AND contrasenia = SHA2(MD5(('%s')),512)));";
	
	const ELIMINAR_SESION= "DELETE FROM Sesion_Usuario WHERE token = '%s';";
	
	function existeNombreDeUsuario($nombreUsuario)
	{
		$query = sprintf(self::LEER_NOMBRE_DE_USUARIO, $nombreUsuario);
		$result = $this->ejecutarQuery($query);
		if ($result->num_rows > 0)
		{
			return true;
		} else {
			return false;
		}
	}
	
	function existeUsuario($email)
	{
		$query = sprintf(self::LEER_USUARIO, $email);
		$result = $this->ejecutarQuery($query);
		if ($result->num_rows > 0)
		{
			return true;
		} else {
			return false;
		}
	}
	
	function agregarUsuario($nombreUsuario, $nombre, $primerApellido, $segundoApellido, $telefono, $celular, $email, $contraseña, $fechaNacimiento)
	{
		$query = sprintf(self::AGREGAR_USUARIO, $nombreUsuario, $nombre, $primerApellido, $segundoApellido, $telefono, $celular, $email, $contraseña, $fechaNacimiento);
		$this->ejecutarQuery($query);
	}
	
	function crearSesion($email, $contraseña)
	{
		$token = md5 (uniqid(mt_rand(), true));
		$query = sprintf(self::CREAR_SESION, $token, $email, $contraseña);
		$result = $this->ejecutarQuery($query);
		return $token;
	}
	
	function eliminarSesion($token)
	{
		$query = sprintf(self::ELIMINAR_SESION, $token);
		$result = $this->ejecutarQuery($query);
	}
}
?>