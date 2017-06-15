<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class ProyectoDB extends BaseDeDatos {
	
	const LEER_PROYECTOS = "SELECT Proyecto.id, Proyecto.titulo, Proyecto.sinopsis, Genero.nombreESP AS genero, SubCategoria.nombreESP AS subcategoria, Categoria.nombreESP AS categoria FROM 
			Usuario 
			LEFT JOIN Usuario_tiene_Proyecto
			ON Usuario.id = Usuario_tiene_Proyecto.idUsuario
			LEFT JOIN Proyecto
			ON Usuario_tiene_Proyecto.idProyecto = Proyecto.id
			LEFT JOIN Genero
			ON Proyecto.idGenero = Genero.id
			LEFT JOIN SubCategoria
			ON Proyecto.idSubCategoria = SubCategoria.id
			LEFT JOIN Categoria
			ON SubCategoria.idCategoria = Categoria.id
			WHERE Usuario.id = '%s'";
	
	const LEER_CATEGORIAS = "SELECT id, nombreESP FROM Categoria";
	const LEER_SUBCATEGORIAS = "SELECT SubCategoria.id AS id, SubCategoria.nombreESP AS nombreESP 
			FROM Categoria LEFT JOIN SubCategoria 
			ON Categoria.id = SubCategoria.idCategoria
			WHERE Categoria.id = '%s'";
	const LEER_GENEROS= "SELECT Genero.id AS id, Genero.nombreESP AS nombreESP 
			FROM Categoria LEFT JOIN Categoria_tiene_Genero 
			ON Categoria.id = Categoria_tiene_Genero.idCategoria
			LEFT JOIN Genero
			ON Genero.id = Categoria_tiene_Genero.idGenero
			WHERE Categoria.id = '%s'";
	const NUEVO_PROYECTO = "INSERT INTO Proyecto (idGenero, idSubCategoria, titulo, sinopsis, proposito, fecha, idConvocatoria)
			VALUES ('%s', '%s', '%s', '%s', '%s', NOW(), %s)";
	const NUEVO_TRABAJO= "INSERT INTO Trabajo (idProyecto, direccion, direccionCertificado, fecha, idEstado)
			VALUES ('%s', '%s', '%s', NOW(), '%s')";
	const GUARDAR_REFERENCIA= "INSERT INTO Usuario_tiene_Proyecto (idUsuario, idProyecto)
			VALUES ('%s', '%s')";
	const CAMBIAR_PROPOSITO = "UPDATE Proyecto SET proposito = '%s' WHERE id = '%s'";
	
	function buscarProyectos($id)
	{
		$query = sprintf(self::LEER_PROYECTOS, $id);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	
	function buscarCategorias()
	{
		$query = sprintf(self::LEER_CATEGORIAS);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	
	function buscarSubcategorias($idCategoria)
	{
		$query = sprintf(self::LEER_SUBCATEGORIAS, $idCategoria);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	
	function buscarGeneros($idCategoria)
	{
		$query = sprintf(self::LEER_GENEROS, $idCategoria);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	
	function guardarProyectoNuevo($idGenero, $idSubcategoria, $titulo, $sinopsis, $proposito, $idConvocatoria)
	{
		$query = sprintf(self::NUEVO_PROYECTO, $idGenero, $idSubcategoria, $titulo, $sinopsis, $proposito, $idConvocatoria);
		$this->ejecutarQuery($query);
		return $this->mysqli->insert_id;
	}
	
	function guardarTrabajoNuevo($idProyecto, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $idEstado)
	{
		$query = sprintf(self::NUEVO_TRABAJO, $idProyecto, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $idEstado);
		$this->ejecutarQuery($query);
	}
	
	function guardarReferenciaUsuarioProyecto($id, $idProyecto)
	{
		$query = sprintf(self::GUARDAR_REFERENCIA, $id, $idProyecto);
		$this->ejecutarQuery($query);
	}
	
	function cambiarProposito($idProyecto, $proposito)
	{
		$query = sprintf(self::CAMBIAR_PROPOSITO, $proposito, $idProyecto);
		$this->ejecutarQuery($query);
	}
}
?>