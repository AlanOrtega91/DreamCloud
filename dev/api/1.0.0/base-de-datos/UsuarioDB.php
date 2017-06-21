<?php
require_once dirname ( __FILE__ ) . "/BaseDeDatos.php";

class UsuarioDB extends BaseDeDatos{
	
	const LEER_NOMBRE_DE_USUARIO = "SELECT nombreDeUsuario AS nombreDeUsuario FROM Usuario WHERE nombreDeUsuario = '%s';";
	const LEER_EMAIL = "SELECT email AS email FROM Usuario WHERE email = '%s';";
	const LEER_USUARIO_POR_NOMBRE = "SELECT email AS email FROM Usuario WHERE nombreDeUsuario = '%s';";
	
	const AGREGAR_USUARIO = "INSERT INTO Usuario (nombreDeUsuario, nombre, apellido, fechaDeNacimiento, email, contrasena) 
			VALUES ('%s', '%s', '%s', '%s', '%s', SHA2(MD5(('%s')),512))";
	
	const REVISAR_CLAVES = "SELECT * FROM Usuario WHERE (nombreDeUsuario = '%s' OR email = '%s') AND (contrasena = SHA2(MD5(('%s')),512));";
	const CREAR_SESION= "INSERT INTO Sesion_Usuario (token, fecha, email)
			VALUES ('%s', NOW(), '%s');";
	
	const REVISAR_TOKEN = "SELECT token AS token FROM Sesion_Usuario WHERE token = '%s';";
	
	const ACTUALIZAR_TOKEN = "UPDATE Sesion_Usuario SET fecha = NOW() WHERE token = '%s'";
	
	const LEER_CUENTA_PROPIA = "SELECT nombre AS nombre, apellido AS apellido, nombreDeUsuario AS nombreDeUsuario, descripcion AS descripcion, Usuario.id AS id,
			Usuario.telefono, Usuario.celular, Usuario.fechaDeNacimiento, Usuario.email
			FROM Sesion_Usuario 
			LEFT JOIN Usuario 
			ON Sesion_Usuario.email = Usuario.email
			WHERE token = '%s'";
	
	const LEER_CALIFICACION_PROPIA = "SELECT AVG(calificacion) AS calificacionUsuario 
			FROM Sesion_Usuario LEFT JOIN Usuario 
			ON Sesion_Usuario.email = Usuario.email
			LEFT JOIN Usuario_tiene_Proyecto
			ON Usuario_tiene_Proyecto.idUsuario = Usuario.id
			LEFT JOIN Proyecto
			ON Proyecto.id = Usuario_tiene_Proyecto.idProyecto
			LEFT JOIN Trabajo
			ON Trabajo.idProyecto = Proyecto.id
			LEFT JOIN Resena
			ON Resena.idTrabajo = Trabajo.id
			WHERE token = '%s'";
	
	const LEER_NEWSFEED = "(SELECT * FROM (SELECT Proyecto.id AS proyecto, Proyecto.titulo, Proyecto.sinopsis, 
			Genero.nombreESP AS genero, SubCategoria.nombreESP AS subcategoria, Categoria.nombreESP AS categoria, 
			aprobado, revisando, Trabajo.id AS idDream FROM 
			Usuario AS u1
			LEFT JOIN Usuario_sigue_Usuario
			ON u1.id = Usuario_sigue_Usuario.idUsuarioSeguidor
			LEFT JOIN Usuario AS u2
			ON Usuario_sigue_Usuario.idUsuarioSeguido = u2.id
			LEFT JOIN Usuario_tiene_Proyecto
			ON u2.id = Usuario_tiene_Proyecto.idUsuario
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
			WHERE u1.id = '%s' AND Proyecto.id IS NOT NULL
			ORDER BY Trabajo.fecha DESC) AS help
			GROUP BY proyecto)
			UNION
			(SELECT * FROM (SELECT Proyecto.id AS proyecto, Proyecto.titulo, Proyecto.sinopsis, 
			Genero.nombreESP AS genero, SubCategoria.nombreESP AS subcategoria, Categoria.nombreESP AS categoria, 
			aprobado, revisando, Trabajo.id AS idDream FROM 
			Usuario 
			LEFT JOIN Usuario_sigue_Proyecto
			ON Usuario.id = Usuario_sigue_Proyecto.idUsuario
			LEFT JOIN Proyecto
			ON Usuario_sigue_Proyecto.idProyecto = Proyecto.id
			LEFT JOIN Genero
			ON Proyecto.idGenero = Genero.id
			LEFT JOIN SubCategoria
			ON Proyecto.idSubCategoria = SubCategoria.id
			LEFT JOIN Categoria
			ON SubCategoria.idCategoria = Categoria.id
			LEFT JOIN Trabajo
			ON Proyecto.id = Trabajo.idProyecto
			WHERE Usuario.id = '%s' AND Proyecto.id IS NOT NULL
			ORDER BY Trabajo.fecha DESC) AS help
			GROUP BY proyecto)";
	
	const CAMBIAR_DATOS_USUARIO = "UPDATE Usuario SET nombre = '%s', apellido = '%s',email = '%s', telefono = '%s', celular = '%s', 
			descripcion = '%s',
			fechaDeNacimiento = '%s' 
			WHERE id = '%s'";
	
	const CERRAR_SESION = "DELETE FROM Sesion_Usuario WHERE token = '%s'";
			
	function existeNombreDeUsuario($nombreUsuario)
	{
		$query = sprintf(self::LEER_NOMBRE_DE_USUARIO, $nombreUsuario);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function existeUsuarioEmail($email)
	{
		$query = sprintf(self::LEER_EMAIL, $email);
		$resultado = $this->ejecutarQuery($query);		
		return $this->resultadoTieneValores($resultado);
	}
	
	function agregarUsuario($nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $contraseña)
	{
		$query = sprintf(self::AGREGAR_USUARIO, $nombreUsuario, $nombre, $apellido, $fechaNacimiento, $email, $contraseña);
		$this->ejecutarQuery($query);
	}
	
	function crearSesion($email)
	{
		$token = md5 (uniqid(mt_rand(), true));
		$query = sprintf(self::CREAR_SESION, $token, $email);
		$this->ejecutarQuery($query);
		return $token;
	}
	
	function clavesCoinciden($emailONombre, $contraseña)
	{
		sleep(1);
		$query = sprintf(self::REVISAR_CLAVES, $emailONombre, $emailONombre, $contraseña);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function leerUsuarioPorNombre($usuario)
	{
		$query = sprintf(self::LEER_USUARIO_POR_NOMBRE, $usuario);
		$resultado = $this->ejecutarQuery($query);
		return $resultado->fetch_assoc();
	}
	
	function existeToken($token)
	{
		$query = sprintf(self::REVISAR_TOKEN, $token);
		$resultado = $this->ejecutarQuery($query);
		return $this->resultadoTieneValores($resultado);
	}
	
	function actualizaToken($token)
	{
		$query = sprintf(self::ACTUALIZAR_TOKEN, $token);
		$this->ejecutarQuery($query);
	}
	
	function leerCuentaPropia($token)
	{
		$query = sprintf(self::LEER_CUENTA_PROPIA, $token);
		$resultado = $this->ejecutarQuery($query);
		return $resultado->fetch_assoc();
	}
	
	function leerCalificacionPropia($token)
	{
		$query = sprintf(self::LEER_CALIFICACION_PROPIA, $token);
		$resultado = $this->ejecutarQuery($query);
		return $resultado->fetch_assoc();
	}
	
	
	function leerNewsFeed($id)
	{
		$query = sprintf(self::LEER_NEWSFEED, $id, $id);
		$resultado = $this->ejecutarQuery($query);
		return $resultado;
	}
	
	function cambiarDatosUsuario($id, $nombre, $apellido, $email, $telefono, $celular, $descripcion, $fechaNacimiento)
	{
		$query = sprintf(self::CAMBIAR_DATOS_USUARIO, $nombre, $apellido, $email, $telefono, $celular, $descripcion, $fechaNacimiento, $id);
		$this->ejecutarQuery($query);
	}
	function cerrarSesion($token)
	{
		$query = sprintf(self::CERRAR_SESION, $token);
		$this->ejecutarQuery($query);
	}
}
?>