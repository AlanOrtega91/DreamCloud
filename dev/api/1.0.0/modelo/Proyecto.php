<?php
require_once dirname ( __FILE__ ) . "/../base-de-datos/ProyectoDB.php";
require_once dirname ( __FILE__ ) . "/Usuario.php";

class Proyecto {

	function buscarProyectos($token)
	{
		(new Usuario())->iniciarSesionConToken($token);
		$proyectos = (new ProyectoDB)->buscarProyectos($token);
		for ($proyectosLista= array(); $fila = $proyectos->fetch_assoc(); $proyectosLista[] = $fila);
		return $proyectosLista;
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
		(new Usuario())->iniciarSesionConToken($token);
		$proyectoDB = new ProyectoDB();
		$idProyecto = $proyectoDB->guardarProyectoNuevo($idGenero, $idSubcategoria, $titulo, $sinopsis, $proposito);
		echo $idProyecto;
		$proyectoDB->guardarTrabajoNuevo($idProyecto, $ubicacionDestinoTrabajo, $ubicacionDestinoCertificado, $idEstado);
	}
}
?>