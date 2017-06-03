<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class ConvocatoriaDB extends BaseDeDatos{
	
	const LEER_CONVOCATORIAS_ACTIVAS= "SELECT id, nombre FROM Convocatoria;";
	
	function buscarConvocatoriasActivas()
	{
		$query = sprintf(self::LEER_CONVOCATORIAS_ACTIVAS);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
}
?>