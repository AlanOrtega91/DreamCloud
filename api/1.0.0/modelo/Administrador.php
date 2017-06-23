<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/AdministradorDB.php";

class Administrador {

	function iniciarSesion($email, $contraseña)
	{
		$administradorDB = new AdministradorDB();
		if ($administradorDB->clavesCoinciden($email, $contraseña))
		{
			return $administradorDB->crearSesion($email);
		} else {
			throw new usuarioNoExisteAdmin();
		}
	}
	
	function buscarProyectosNoAutorizados($token)
	{
		$this->iniciarSesionConToken($token);
		$proyectos = (new AdministradorDB())->buscarProyectosNoAutorizados();
		for ($proyectosLista= array(); $fila = $proyectos->fetch_assoc(); $proyectosLista[] = $fila);
		return $proyectosLista;
	}
	
	function iniciarSesionConToken($token)
	{
		$administradorDB= new AdministradorDB();
		if (!$administradorDB->existeToken($token))
		{
			throw new tokenInvalidoAdmin();
		}
	}
	
	function cambiarEstadoTrabajo($id, $estado)
	{
		switch ($estado) {
			case 1:
				(new AdministradorDB())->iniciarRevision($id);
				break;
			case 2:
				(new AdministradorDB())->aprobar($id);
				break;
			case 3:
				(new AdministradorDB())->rechazar($id);
				break;
			default:
				throw new errorCambiandoEstado();
		}
	}
}
class usuarioNoExisteAdmin extends Exception{
}
class tokenInvalidoAdmin extends Exception{
}
class errorCambiandoEstado extends Exception{
}
?>