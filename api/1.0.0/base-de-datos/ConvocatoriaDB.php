<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class ConvocatoriaDB extends BaseDeDatos{
	
	const LEER_CONVOCATORIAS_ACTIVAS= "SELECT id, titulo FROM Convocatoria;";
	const LEER_CONVOCATORIAS = "SELECT Convocatoria.id AS id, Convocatoria.titulo, Convocatoria.tema, 
			Genero.nombreESP AS genero, SubCategoria.nombreESP AS subcategoria, Categoria.nombreESP AS categoria, 
			aprobado, revisando FROM 
			Empresa 
			LEFT JOIN Convocatoria
			ON Empresa.id = Convocatoria.idEmpresa
			LEFT JOIN Genero
			ON Convocatoria.idGenero = Genero.id
			LEFT JOIN SubCategoria
			ON Convocatoria.idSubCategoria = SubCategoria.id
			LEFT JOIN Categoria
			ON SubCategoria.idCategoria = Categoria.id
			WHERE Empresa.id = %s 
			AND Convocatoria.id IS NOT NULL
			ORDER BY Convocatoria.fechaLimite DESC";
	const GUARDAR_CONVOCATORIA = "INSERT INTO Convocatoria (titulo, fechaLimite, tema, idEmpresa, idSubCategoria, idGenero, imagen)
			VALUES ('%s', '%s-%s-%s 00:00:00', '%s', %s, %s, %s, '%s')";
	
	function buscarConvocatoriasActivas()
	{
		$query = sprintf(self::LEER_CONVOCATORIAS_ACTIVAS);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	
	function buscarConvocatorias($id)
	{
		$query = sprintf(self::LEER_CONVOCATORIAS, $id);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	function guardarConvocatoriaNueva($id, $titulo, $tema, $idSubcategoria, $idGenero, $dia, $mes, $ano, $ubicacionDestinoImagen)
	{
		$query = sprintf(self::GUARDAR_CONVOCATORIA, $titulo, $ano, $mes, $dia, $tema, $id, $idSubcategoria, $idGenero, $ubicacionDestinoImagen);
		$this->ejecutarQuery($query);
	}
}
?>