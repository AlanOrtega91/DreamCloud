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
	
	function agregarDream($id)
	{
		(new ComunidadDB())->agregarDream($id);
	}
	function borrarDream($id)
	{
		(new ComunidadDB())->borrarDream($id);
	}
	function agregarConvocatoria($id)
	{
		(new ComunidadDB())->agregarConvocatoria($id);
	}
	function borrarConvocatoria($id)
	{
		(new ComunidadDB())->borrarConvocatoria($id);
	}

}
?>