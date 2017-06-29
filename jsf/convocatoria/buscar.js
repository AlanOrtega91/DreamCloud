(function ($){
  jQuery("document").ready(function(){
	  var direccionBuscar = "../api/1.0.0/interfaz/convocatoria/buscar-activas/";
	  var convocatorias = [];
	  
	  var buscarRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	convocatorias = datos.convocatorias;
	        	llenarConvocatorias();
	        } else{
	        	
	        }
	  }
	  
	  var buscarError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  $.post(direccionBuscar, buscarRespondio,"json").fail(buscarError);

	  function llenarConvocatorias() {
		  var convocatoriasHTML = "<option value='-1'>Fuera de Convocatoria</option>";
		  $.each(convocatorias, function(index, value) {
			  if (value.id != null) {
				  convocatoriasHTML += "<option value=" + value.id + ">"+ value.empresa + ' - ' + value.titulo + "</option>";
			  }
		  });
		  $('#convocatorias').html(convocatoriasHTML);
	  }
	  
	  $('#proyectos').change(function (){
		  var idProyectoSeleccionado = $(this).val();
		  if (idProyectoSeleccionado == '-1') {
			  llenarConvocatorias();
		  }
	  });
	  
	  $('#convocatorias').change(function (){
		  var idConvocatoria = $(this).val();
		  if (idConvocatoria != "-1") {
			  for(var i = 0 ; i < convocatorias.length ; i++) {
				  if(convocatorias[i].id == idConvocatoria) {
					  $('#proyectos').html("<option value='-1'>Nuevo Proyecto</option>");
					  $('#categorias').html("<option>"+ convocatorias[i].categoria + "</option>");
					  $('#subcategorias').html("<option value='" + convocatorias[i].idSubcategoria + "'>"+ convocatorias[i].subcategoria + "</option>");
					  $('#generos').html("<option value='" + convocatorias[i].idGenero + "'>"+ convocatorias[i].genero + "</option>");
					  break;
				  }
			  }
		  }
	  });
  });
})(jQuery);