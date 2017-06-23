(function ($){
  jQuery("document").ready(function(){
	  
	  var VERSION = "1.0.0";
	  var direccion = "api/" + VERSION + "/interfaz/usuario/inicio-sesion/";
	  var token = leerToken();
	  
	  
	  var inicioSesionTokenRespondio = function(datos) {
		  console.log(datos);
	        if(datos.status == "ok"){
	        	window.location.replace("dreamer/cuenta.html");
	        } 
	  }
	  
	  if(token != null){
		  var parametros = {token: token};
		  $.post(direccion, parametros, inicioSesionTokenRespondio, "json");
	  }
	  
	  function leerToken(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('token');
			} else {
				// Save as Cookie
				return leerCookie("dreamcloudtoken");
			}
	  }
	  
	  
  });
})(jQuery);