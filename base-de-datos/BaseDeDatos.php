<?php
abstract class BaseDeDatos {
	
//  	const DB_LINK = '127.0.0.1';
//  	const DB_LOGIN = 'washerDBus4r';
//  	const DB_PASSWORD ='lk_je9023U23daerD';
//  	const DB_NAME = 'washer';
 	
 	const DB_LINK = '127.0.0.1';
 	const DB_LOGIN = 'root';
 	const DB_PASSWORD ='';
 	const DB_NAME = 'dream_cloud';

 	var $mysqli;
 	
 	public function __construct() {
 		$this->mysqli = new mysqli ( self::DB_LINK, self::DB_LOGIN, self::DB_PASSWORD, self::DB_NAME );
 		if ($this->mysqli->connect_errno)
 			throw new errorWithDatabaseException ( "Error connecting with database" );
 		$this->mysqli->set_charset("utf8");
 	}
 	
 	function ejecutarQuery($query)
 	{
 		if(! ($resultado = $this->mysqli->query($query))) {
 			throw new errorConBaseDeDatos('Query failed'.$this->mysqli->error);
 		}
 		return $resultado;
 	}
}
class errorConBaseDeDatos extends Exception{}
?>