<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class SocioDB extends BaseDeDatos{
	
	const REVISAR_CLAVES = "SELECT * FROM Empresa WHERE email = '%s' AND contrasena = SHA2(MD5(('%s')),512);";
	const CREAR_SESION= "INSERT INTO Sesion_Empresa (token, fecha, email)
			VALUES ('%s', NOW(), '%s');";
	
	const LEER_CUENTA_TOKEN = "SELECT nombre AS nombre, nombreDeUsuario, descripcion AS descripcion, Empresa.email AS email, Empresa.id AS id
			FROM Sesion_Empresa
			LEFT JOIN Empresa
			ON Sesion_Empresa.email = Empresa.email
			WHERE token = '%s'";
	const LEER_CUENTA_ID = "SELECT nombre AS nombre, nombreDeUsuario, descripcion AS descripcion, email, Empresa.id AS id
			FROM Empresa
			WHERE id = '%s'";
	const CERRAR_SESION = "DELETE FROM Sesion_Empresa WHERE token = '%s'";
	
	function clavesCoinciden($email, $contraseña)
	{
		sleep(1);
		$query = sprintf(self::REVISAR_CLAVES, $email, $contraseña);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function crearSesion($email)
	{
		$token = md5 (uniqid(mt_rand(), true));
		$query = sprintf(self::CREAR_SESION, $token, $email);
		$this->ejecutarQuery($query);
		return $token;
	}
	
	function leerCuentaToken($token)
	{
		$query = sprintf(self::LEER_CUENTA_TOKEN, $token);
		$resultado = $this->ejecutarQuery($query);
		return $resultado->fetch_assoc();
	}
	
	function leerCuentaId($id)
	{
		$query = sprintf(self::LEER_CUENTA_ID, $id);
		$resultado = $this->ejecutarQuery($query);
		return $resultado->fetch_assoc();
	}
	
	function cerrarSesion($token)
	{
		$query = sprintf(self::CERRAR_SESION, $token);
		$this->ejecutarQuery($query);
	}
	
}
?>