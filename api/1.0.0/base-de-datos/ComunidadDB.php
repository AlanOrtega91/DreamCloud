<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class ComunidadDB extends BaseDeDatos{
	
	const LEER_COMUNIDAD = "
			SELECT Convocatoria.id AS id, Convocatoria.titulo AS titulo, Convocatoria.tema AS info, Convocatoria.fechaLimite, Convocatoria.idProyectoGanador,
			Genero.nombreESP AS genero, SubCategoria.nombreESP AS subcategoria, Categoria.nombreESP AS categoria, 
			aprobado, revisando,
			Empresa.nombre, null AS apellido, Empresa.id AS idUsuario, Empresa.email, Empresa.nombreDeUsuario, Empresa.avatar,
			0 AS tipo 
			FROM Empresa 
			LEFT JOIN Convocatoria
			ON Empresa.id = Convocatoria.idEmpresa
			LEFT JOIN Genero
			ON Convocatoria.idGenero = Genero.id
			LEFT JOIN SubCategoria
			ON Convocatoria.idSubCategoria = SubCategoria.id
			LEFT JOIN Categoria
			ON SubCategoria.idCategoria = Categoria.id
			LEFT JOIN Newsfeed 
			ON Newsfeed.idConvocatoria = Convocatoria.id 
			WHERE Newsfeed.idConvocatoria IS NOT NULL
			UNION 
			SELECT Trabajo.id AS id, Proyecto.titulo AS titulo, Proyecto.sinopsis AS info, null AS fechaLimite, null AS idProyectoGanador,
			Genero.nombreESP AS genero, SubCategoria.nombreESP AS subcategoria, Categoria.nombreESP AS categoria,
			null, null,
			Usuario.nombre, Usuario.apellido, Usuario.id AS idUsuario, Usuario.email, Usuario.nombreDeUsuario, Usuario.avatar,
			1 AS tipo 
			FROM Usuario 
			LEFT JOIN Usuario_tiene_Proyecto
			ON Usuario.id = Usuario_tiene_Proyecto.idUsuario
			LEFT JOIN Proyecto
			ON Usuario_tiene_Proyecto.idProyecto = Proyecto.id
			LEFT JOIN SubCategoria
			ON Proyecto.idSubCategoria = SubCategoria.id
			LEFT JOIN Categoria
			ON SubCategoria.idCategoria = Categoria.id
			LEFT JOIN Genero
			ON Proyecto.idGenero = Genero.id
			LEFT JOIN Trabajo
			ON Proyecto.id = Trabajo.idProyecto
			LEFT JOIN Convocatoria
			ON Proyecto.idConvocatoria = Convocatoria.id 
			LEFT JOIN Newsfeed 
			ON Newsfeed.idTrabajo = Trabajo.id 
			WHERE Newsfeed.id IS NOT NULL";
	const AGREGAR_DREAM = "INSERT INTO Newsfeed (idTrabajo)
			VALUES (%s)";
	const BORRAR_DREAM = "DELETE FROM Newsfeed WHERE idTrabajo = %s";
	const AGREGAR_CONVOCATORIA = "INSERT INTO Newsfeed (idConvocatoria)
			VALUES (%s)";
	const BORRAR_CONVOCATORIA= "DELETE FROM Newsfeed WHERE idConvocatoria = %s";
	
	function leer()
	{
		$query = sprintf(self::LEER_COMUNIDAD);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	
	function agregarDream($id)
	{
		$query = sprintf(self::AGREGAR_DREAM, $id);
		$this->ejecutarQuery($query);
	}
	
	function borrarDream($id)
	{
		$query = sprintf(self::BORRAR_DREAM, $id);
		$this->ejecutarQuery($query);
	}
	function agregarConvocatoria($id)
	{
		$query = sprintf(self::AGREGAR_CONVOCATORIA, $id);
		$this->ejecutarQuery($query);
	}
	
	function borrarConvocatoria($id)
	{
		$query = sprintf(self::BORRAR_CONVOCATORIA, $id);
		$this->ejecutarQuery($query);
	}
}
?>