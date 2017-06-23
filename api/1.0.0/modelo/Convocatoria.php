<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/ConvocatoriaDB.php";

class Convocatoria {

	function buscarConvocatoriasActivas()
	{
		$convocatorias = (new ConvocatoriaDB)->buscarConvocatoriasActivas();
		for ($convocatoriasLista = array(); $fila = $convocatorias->fetch_assoc(); $convocatoriasLista[] = $fila);
		return $convocatoriasLista;
	}

}

?>