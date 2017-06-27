<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/AdministradorDB.php";
require_once dirname ( __FILE__ ) . "/../base-de-datos/ProyectoDB.php";
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
		$trabajo = (new ProyectoDB())->buscarTrabajo($id);
		$email = $trabajo['email'];
		$titulo = $trabajo['titulo'];
		switch ($estado) {
			case 1:
				(new AdministradorDB())->iniciarRevision($id);
				Mail::enviarEmail("Tu trabajo esta en revision","Se ha iniciado la revision de $titulo",$email);
				break;
			case 2:
				(new AdministradorDB())->aprobar($id);
				Mail::enviarEmail("Tu trabajo ha sido aprobado","Se ha aprobado $titulo",$email);
				break;
			case 3:
				(new AdministradorDB())->rechazar($id);
				Mail::enviarEmail("Tu trabajo ha sido rechazado","Se ha rechazado $titulo",$email);
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