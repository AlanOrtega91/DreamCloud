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
				$mensaje = Mail::contruirMensajeProyecto($titulo, "Revision iniciada");
				Mail::enviarEmail("Tu trabajo esta en revision", $mensaje, $email);
				break;
			case 2:
				(new AdministradorDB())->aprobar($id);
				$mensaje = Mail::contruirMensajeProyecto($titulo, "Aprobado");
				Mail::enviarEmail("Tu trabajo ha sido aprobado", $mensaje, $email);
				break;
			case 3:
				(new AdministradorDB())->rechazar($id);
				$mensaje = Mail::contruirMensajeProyecto($titulo, "Rechazado");
				Mail::enviarEmail("Tu trabajo ha sido rechazado", $mensaje, $email);
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
	function buscarConvocatoriasGanadas($token)
	{
		$this->iniciarSesionConToken($token);
		$convocatorias = (new AdministradorDB())->buscarConvocatoriasGanadas();
		for ($convocatoriasLista = array(); $fila = $convocatorias->fetch_assoc(); $convocatoriasLista[] = $fila);
		return $convocatoriasLista;
	}
}
class usuarioNoExisteAdmin extends Exception{
}
class tokenInvalidoAdmin extends Exception{
}
class errorCambiandoEstado extends Exception{
}
?>