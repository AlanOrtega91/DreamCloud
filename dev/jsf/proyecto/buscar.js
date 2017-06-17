(function ($){
  jQuery("document").ready(function(){
	  var direccionBuscar = "../api/1.0.0/interfaz/proyecto/buscar/";
	  var proyectos = [];
	  
	  var buscarRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	proyectos = datos.proyectos;
	        	llenarProyectos();
	        } else{
	        	
	        }
	  }
	  
	  var buscarError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  var token = leerToken();
	  var parametrosBuscar = {token: token};
	  $.post(direccionBuscar,parametrosBuscar, buscarRespondio,"json").fail(buscarError);

	  function llenarProyectos() {
		  var proyectosHTML = "<option value='-1'>Nuevo Proyecto</option>";
		  $.each(proyectos, function(index, value) {
			  proyectosHTML += "<option value='" + value.proyecto + "'>" + value.titulo + "</option>";
		  });
		  $('#proyectos').html(proyectosHTML);
	  }
	  
	  $('#token').val(token);
	  
	  $('#proyectos').change(function (){
		  var idProyectoSeleccionado = $(this).val();
		  if (idProyectoSeleccionado != '-1') {
			  var proyectoSeleccionado = $.grep(proyectos,function (proyecto){
				  return proyecto.proyecto == idProyectoSeleccionado;
			  })[0]
			  console.log(proyectoSeleccionado);
			  $('#titulo').val(proyectoSeleccionado.titulo);
			  $("#titulo").prop('readonly', true);
			  $('#sinopsis').val(proyectoSeleccionado.sinopsis);
			  $("#sinopsis").prop('readonly', true);
			  //Seleccionar ninguna
			  $('#convocatorias').html("<option value='-1'>Fuera de Convocatoria</option>");
			  //Seleccionar cuales
			  $('#categorias').html("<option value='-1'>" + proyectoSeleccionado.categoria + "</option>");
			  $('#subcategorias').html("<option value='-1'>" + proyectoSeleccionado.subcategoria + "</option>");
			  $('#generos').html("<option value='-1'>" + proyectoSeleccionado.genero + "</option>");
		  } else {
			  $('#titulo').val('');
			  $("#titulo").prop('readonly', false);
			  $('#sinopsis').val('');
			  $("#sinopsis").prop('readonly', false);
		  }
	  });
	  
	  
	  function leerToken(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('token');
			} else {
				// Save as Cookie
				return leerCookie("dreamcloudtoken");
			}
	  }
	  
	  function leerCookie(cname) {
		    var name = cname + "=";
		    var decodedCookie = decodeURIComponent(document.cookie);
		    var ca = decodedCookie.split(';');
		    for(var i = 0; i <ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0) == ' ') {
		            c = c.substring(1);
		        }
		        if (c.indexOf(name) == 0) {
		            return c.substring(name.length, c.length);
		        }
		    }
		    return "";
		}
  });
})(jQuery);