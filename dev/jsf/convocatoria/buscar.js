(function ($){
  jQuery("document").ready(function(){
	  var direccionBuscar = "http://dclouding.com/dev/api/1.0.0/interfaz/convocatoria/buscar-activas/";	  
	  
	  var buscarRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarConvocatorias(datos.convocatorias);
	        } else{
	        	
	        }
	  }
	  
	  var buscarError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  $.post(direccionBuscar, buscarRespondio,"json").fail(buscarError);

	  function llenarConvocatorias(convocatorias) {
		  var convocatoriasHTML = "<option value=no>Fuera de Convocatoria</option>";
		  $.each(convocatorias, function(index, value) {
			  convocatoriasHTML += "<option value=" + value.id + ">" + value.nombre + "</option>";
		  });
		  $('#convocatorias').html(convocatoriasHTML);
	  }
  });
})(jQuery);