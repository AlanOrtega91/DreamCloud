<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/ConvocatoriaDB.php";
require_once dirname ( __FILE__ ) . "/Socio.php";

class Convocatoria {

	function buscarConvocatoriasActivas()
	{
		$convocatorias = (new ConvocatoriaDB)->buscarConvocatoriasActivas();
		for ($convocatoriasLista = array(); $fila = $convocatorias->fetch_assoc(); $convocatoriasLista[] = $fila);
		return $convocatoriasLista;
	}
	
	function buscarConvocatorias($token)
	{
		$usuario = (new Socio())->leerCuenta($token, null, 0);
		$convocatorias = (new ConvocatoriaDB())->buscarConvocatorias($usuario['id']);
		for ($convocatoriasLista= array(); $fila = $convocatorias->fetch_assoc(); $convocatoriasLista[] = $fila);
		return $convocatoriasLista;
	}
	
	function buscarConvocatoriasId($id)
	{
		$convocatorias = (new ConvocatoriaDB())->buscarConvocatorias($id);
		for ($convocatoriasLista = array(); $fila = $convocatorias->fetch_assoc(); $convocatoriasLista[] = $fila);
		foreach ($convocatoriasLista as $key => $convocatoria)
		{
			if ($convocatoria['aprobado'] != '1') {
				unset($convocatoriasLista[$key]);
			}
		}
		return $convocatoriasLista;
	}

}

?>