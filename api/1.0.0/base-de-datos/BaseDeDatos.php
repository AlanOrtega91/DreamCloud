<?php
abstract class BaseDeDatos {
 	
 	const DB_LINK = 'localhost';
 	const DB_LOGIN = 'dcloudin_userDB';
 	const DB_PASSWORD ='DreamCloudAdm0n!';
 	const DB_NAME = 'dcloudin_main';

 	var $mysqli;
 	
 	public function __construct() {
 		$this->mysqli = new mysqli ( self::DB_LINK, self::DB_LOGIN, self::DB_PASSWORD, self::DB_NAME );
 		if ($this->mysqli->connect_errno)
 			throw new errorConBaseDeDatos( "Error connecting with database".$mysqli->connect_error );
 		$this->mysqli->set_charset("utf8");
 	}
 	
 	function ejecutarQuery($query)
 	{
 		if(! ($resultado = $this->mysqli->query($query))) {
 			throw new errorConBaseDeDatos('Query failed'.$this->mysqli->error);
 		}
 		return $resultado;
 	}
 	
 	function resultadoTieneValores($resultado) {
 		if ($resultado->num_rows > 0)
 		{
 			return true;
 		} else {
 			return false;
 		}
 	}
}
class errorConBaseDeDatos extends Exception{}
?>