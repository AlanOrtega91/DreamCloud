<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class ProyectoDB extends BaseDeDatos {
	
	const LEER_PROYECTOS = "SELECT Proyecto.id, Proyecto.titulo FROM 
			Sesion_Usuario LEFT JOIN Usuario 
			ON Sesion_Usuario.email = Usuario.email
			LEFT JOIN Usuario_tiene_Proyecto
			ON Usuario.id = Usuario_tiene_Proyecto.idUsuario
			LEFT JOIN Proyecto
			ON Usuario_tiene_Proyecto.idProyecto = Proyecto.id
			WHERE token = '%s'";
	
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
	const NUEVO_PROYECTO = "INSERT INTO Proyecto (idGenero, idSubCategoria, titulo, sinopsis, proposito, fecha)
			VALUES ('%s', '%s', '%s', '%s', '%s', NOW())";
	const NUEVO_TRABAJO= "INSERT INTO Trabajo (idProyecto, direccion, direccionCertificado, fecha, idEstado)
			VALUES ('%s', '%s', '%s', NOW(), '%s')";
	
	function buscarProyectos($token)
	{
		$query = sprintf(self::LEER_PROYECTOS, $token);
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
	
	function guardarProyectoNuevo($idGenero, $idSubcategoria, $titulo, $sinopsis, $proposito)
	{
		$query = sprintf(self::NUEVO_PROYECTO, $idGenero, $idSubcategoria, $titulo, $sinopsis, $proposito);
		$this->ejecutarQuery($query);
		return $this->mysqli->insert_id;
	}
	
	function guardarTrabajoNuevo($idProyecto, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $idEstado)
	{
		$query = sprintf(self::NUEVO_TRABAJO, $idProyecto, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $idEstado);
		$this->ejecutarQuery($query);
	}
}
?>