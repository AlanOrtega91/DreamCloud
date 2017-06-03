(function ($){
  jQuery("document").ready(function(){
	  var direccionBuscar = "http://dclouding.com/dev/api/1.0.0/interfaz/proyecto/buscar/";	  
	  
	  var buscarRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarProyectos(datos.proyectos);
	        } else{
	        	
	        }
	  }
	  
	  var buscarError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  var parametrosBuscar = {token: leerToken()};
	  $.post(direccionBuscar,parametrosBuscar, buscarRespondio,"json").fail(buscarError);

	  function llenarProyectos(proyectos) {
		  var proyectosHTML = "<option value=nuevo>Nuevo Proyecto</option>";
		  $.each(proyectos, function(index, value) {
			  proyectosHTML += "<option value=" + value.id + ">" + value.titulo + "</option>";
		  });
		  $('#proyectos').html(proyectosHTML);
	  }
	  
	  
	  function leerToken(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('token');
			} else {
				// Save as Cookie
				return leerCookie("token");
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