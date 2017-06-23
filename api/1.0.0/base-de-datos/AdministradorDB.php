<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class AdministradorDB extends BaseDeDatos{
	
	const REVISAR_CLAVES = "SELECT * FROM Administrador WHERE email = '%s' AND contrasena = SHA2(MD5(('%s')),512)";
	const CREAR_SESION= "INSERT INTO Sesion_Admin (token, fecha, email)
			VALUES ('%s', NOW(), '%s')";
	const REVISAR_TOKEN = "SELECT token AS token FROM Sesion_Admin WHERE token = '%s'";
	const LEER_PROYECTOS = "SELECT * FROM (SELECT Proyecto.id AS proyecto, Proyecto.titulo, Proyecto.sinopsis,
			Genero.nombreESP AS genero, SubCategoria.nombreESP AS subcategoria, Categoria.nombreESP AS categoria,
			aprobado, revisando, Trabajo.id AS idDream, 
			Usuario.nombre, Usuario.apellido, Usuario.id AS idUsuario, Usuario.email, Usuario.nombreDeUsuario FROM
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
			LEFT JOIN Trabajo
			ON Proyecto.id = Trabajo.idProyecto
			WHERE Proyecto.id IS NOT NULL AND aprobado = 0
			ORDER BY Trabajo.fecha DESC) AS help
			GROUP BY proyecto";
	const INICIAR_REVISION = "UPDATE Trabajo SET revisando = 1 WHERE id = %s";
	const APROBAR_TRABAJO= "UPDATE Trabajo SET aprobado = 1, revisando = 0 WHERE id = %s";
	const RECHAZAR_TRABAJO= "UPDATE Trabajo SET rechazado = 1 WHERE id = %s";
	
	function clavesCoinciden($email, $contraseña)
	{
		sleep(1);
		$query = sprintf(self::REVISAR_CLAVES, $email, $contraseña);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function crearSesion($email)
	{
		$token = md5 (uniqid(mt_rand(), true));
		$query = sprintf(self::CREAR_SESION, $token, $email);
		$this->ejecutarQuery($query);
		return $token;
	}
	
	function existeToken($token)
	{
		$query = sprintf(self::REVISAR_TOKEN, $token);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function buscarProyectosNoAutorizados()
	{
		$query = sprintf(self::LEER_PROYECTOS, $id);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	
	function iniciarRevision($id)
	{
		$query = sprintf(self::INICIAR_REVISION, $id);
		$this->ejecutarQuery($query);
	}
	
	function aprobar($id)
	{
		$query = sprintf(self::APROBAR_TRABAJO, $id);
		$this->ejecutarQuery($query);
	}
	
	function rechazar($id)
	{
		$query = sprintf(self::RECHAZAR_TRABAJO, $id);
		$this->ejecutarQuery($query);
	}
	
}
?>