<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/ComunidadDB.php";
require_once dirname ( __FILE__ ) . "/Mail.php";

class Comunidad {
	
	function leer()
	{
		$entradas = (new ComunidadDB)->leer();
		for ($entradasLista = array(); $fila = $entradas->fetch_assoc(); $entradasLista[] = $fila);
		return $entradasLista;
	}

}
?>