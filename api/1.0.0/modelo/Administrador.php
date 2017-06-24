<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/AdministradorDB.php";
require_once dirname ( __FILE__ ) . "/Mail.php";

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
	
	function buscarContactosNoAutorizados($token)
	{
		$this->iniciarSesionConToken($token);
		$contactos = (new AdministradorDB())->buscarContactosNoAutorizados();
		for ($contactosLista= array(); $fila = $contactos->fetch_assoc(); $contactosLista[] = $fila);
		return $contactosLista;
	}
	
	function autorizarContacto($id)
	{
		$contacto = (new AdministradorDB())->leerContacto($id);
		Mail::enviarEmail("Solicitud de contacto",$contacto['mensaje'],$contacto['email']);
		(new AdministradorDB())->autorizarContacto($id);
	}
	function rechazarContacto($id)
	{
		(new AdministradorDB())->rechazarContacto($id);
	}
}
class usuarioNoExisteAdmin extends Exception{
}
class tokenInvalidoAdmin extends Exception{
}
class errorCambiandoEstado extends Exception{
}
?>