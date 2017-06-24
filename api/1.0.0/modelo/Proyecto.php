<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/ProyectoDB.php";
require_once dirname ( __FILE__ ) . "/Usuario.php";

class Proyecto {

	function buscarProyectos($token)
	{
		$usuario = (new Usuario())->leerCuenta($token, null, 0);
		$proyectos = (new ProyectoDB)->buscarProyectos($usuario['id']);
		for ($proyectosLista= array(); $fila = $proyectos->fetch_assoc(); $proyectosLista[] = $fila);
		for ($i = 0; $i < count($proyectosLista); $i++)
		{
			$calificacion = $this->leerCalificacionProyecto($proyectosLista[$i]['proyecto']);
			$proyectosLista[$i]['calificacion'] = $calificacion;
		}
		return $proyectosLista;
	}
	
	function buscarProyectosId($id)
	{
		$proyectos = (new ProyectoDB)->buscarProyectos($id);
		for ($proyectosLista= array(); $fila = $proyectos->fetch_assoc(); $proyectosLista[] = $fila);
		for ($i = 0; $i < count($proyectosLista); $i++)
		{
			$calificacion = $this->leerCalificacionProyecto($proyectosLista[$i]['proyecto']);
			$proyectosLista[$i]['calificacion'] = $calificacion;
		}
		foreach ($proyectosLista as $key => $proyecto)
		{
			if ($proyecto['aprobado'] != '1') {
				unset($proyectosLista[$key]);
			}
		}
		return $proyectosLista;
	}
	
	function leerCalificacionProyecto($id)
	{
		return (new ProyectoDB)->leerCalificacionProyecto($id);
	}
	
	function buscarCategorias()
	{
		$categorias = (new ProyectoDB)->buscarCategorias();
		for ($categoriasLista = array(); $fila = $categorias->fetch_assoc(); $categoriasLista[] = $fila);
		return $categoriasLista;
	}
	
	function buscarSubcategorias($idCategoria)
	{
		$subcategorias = (new ProyectoDB)->buscarSubcategorias($idCategoria);
		for ($subcategoriasLista = array(); $fila = $subcategorias->fetch_assoc(); $subcategoriasLista[] = $fila);
		return $subcategoriasLista;
	}
	
	function buscarGeneros($idCategoria)
	{
		$generos = (new ProyectoDB)->buscarGeneros($idCategoria);
		for ($generosLista = array(); $fila = $generos->fetch_assoc(); $generosLista[] = $fila);
		return $generosLista;
	}
	
	function nuevoProyecto($token, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $titulo, $sinopsis, $idConvocatoria, $idSubcategoria, $idGenero, $proposito, $idEstado)
	{
		$usuario = (new Usuario())->leerCuenta($token, null, 0);
		$proyectoDB = new ProyectoDB();
		if ($idConvocatoria === '-1')
		{
			$idConvocatoria = 'NULL';
		}
		$idProyecto = $proyectoDB->guardarProyectoNuevo($idGenero, $idSubcategoria, $titulo, $sinopsis, $proposito, $idConvocatoria);
		$proyectoDB->guardarTrabajoNuevo($idProyecto, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $idEstado);
		$proyectoDB->guardarReferenciaUsuarioProyecto($usuario['id'], $idProyecto);
	}
	
	function nuevoTrabajo($token, $idProyecto, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $proposito, $idEstado)
	{
		$usuario = (new Usuario())->leerCuenta($token, null, 0);
		$proyectoDB = new ProyectoDB();
		$proyectoDB->guardarTrabajoNuevo($idProyecto, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $idEstado);
		$proyectoDB->cambiarProposito($idProyecto, $proposito);
	}
	
	function buscarTrabajo($idDream)
	{
		return (new ProyectoDB)->buscarTrabajo($idDream);
	}
	
	function filtrarProyectos($categoria, $subcategoria, $genero, $extra, $texto)
	{
		$proyectos = (new ProyectoDB)->filtrarProyectos($categoria, $subcategoria, $genero, $extra, $texto);
		for ($proyectosLista= array(); $fila = $proyectos->fetch_assoc(); $proyectosLista[] = $fila);
		for ($i = 0; $i < count($proyectosLista); $i++)
		{
			$calificacion = $this->leerCalificacionProyecto($proyectosLista[$i]['proyecto']);
			$proyectosLista[$i]['calificacion'] = $calificacion;
		}
		return $proyectosLista;
	}
	
	function buscarResenas($idDream)
	{
		$resenas = (new ProyectoDB)->leerResenas($idDream);
		for ($resenasLista= array(); $fila = $resenas->fetch_assoc(); $resenasLista[] = $fila);
		return $resenasLista;
	}
	
	function enviarResena($id, $idDream, $titulo, $comentario, $calificacion)
	{
		(new ProyectoDB)->guardarResena($id, $idDream, $titulo, $comentario, $calificacion);
	}
	function enviarSubcomentario($idUsuario, $subcomentario, $idResena)
	{
		(new ProyectoDB)->guardarSubcomentario($idUsuario, $subcomentario, $idResena);
	}
	function buscarSubcomentarios($id)
	{
		$subcomentarios = (new ProyectoDB)->leerSubcomentarios($id);
		for ($subcomentariosLista= array(); $fila = $subcomentarios->fetch_assoc(); $subcomentariosLista[] = $fila);
		return $subcomentariosLista;
	}
	function revisarSiguiendo($id, $idDream)
	{
		return (new ProyectoDB)->usuarioSigueProyecto($id, $idDream);
	}
	function seguir($id, $idDream,$seguir)
	{
		$proyecto = (new ProyectoDB)->buscarProyectoDeTrabajo($idDream);
		if ($seguir == "true") {
			(new ProyectoDB)->seguir($id, $proyecto['id']);
		} else {
			(new ProyectoDB)->dejarDeSeguir($id, $proyecto['id']);
		}
	}
}
?>