<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class AdministradorDB extends BaseDeDatos{
	
	const REVISAR_CLAVES = "SELECT * FROM Administrador WHERE email = '%s' AND contrasena = SHA2(MD5(('%s')),512)";
	const CREAR_SESION= "INSERT INTO Sesion_Admin (token, fecha, email)
			VALUES ('%s', NOW(), '%s');";
	
	function clavesCoinciden($email, $contraseña)
	{
		sleep(1);
		$query = sprintf(self::REVISAR_CLAVES, $email, $hashContraseña);
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
	
}
?>