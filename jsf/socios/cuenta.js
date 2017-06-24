(function ($){
  jQuery("document").ready(function(){
	  var direccionCuenta = "../api/1.0.0/interfaz/socios/leer-cuenta/";
	  var propio = true;
	  
	  $.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return decodeURI(results[1]) || 0;
		    }
		}
	  
	  
	  
	  var leerCuentaRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarCuenta(datos.cuenta);
	        	if (id) {
		        	if (datos.siguiendo == 1) {
		        		$('#opcion1').html('Dejar de Seguir');
		        	} else {
		        		$('#opcion1').html('Seguir');
		        	}
	        	}
	        } else{

	        }
	  }
	  
	  var leerCuentaError = function (datos) {
		  console.log(datos);
	  }
	  
	  
	  

	  
	  function llenarCuenta(cuenta)
	  {
		  $('#nombre').text(cuenta.nombre);
		  $('#nombreDeUsuario').text("@" + cuenta.nombreDeUsuario);
		  
		  if (cuenta.descripcion) 
		  {
			  $('#descripcion').html(cuenta.descripcion);
		  } 
		  else {
			  $('#descripcion').html("");
		  }
	  }
	  
	  
	  var id = $.urlParam('socio');
	  if (id)
	  {
		  propio = false;
		  var parametrosCuenta = {id: id, token: leerToken()};
		  $.post(direccionCuenta,parametrosCuenta, leerCuentaRespondio,"json").fail(leerCuentaError);
	  } else {
		  propio = true;
		  var parametrosCuenta = {token: leerTokenSocio()};
		  $.post(direccionCuenta,parametrosCuenta, leerCuentaRespondio,"json").fail(leerCuentaError);
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
	  
	  function leerTokenSocio(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('tokenSocio');
			} else {
				// Save as Cookie
				return leerCookie("dreamcloudtokenSocio");
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
	  
	  
	  var direccionCerrar = "../api/1.0.0/interfaz/socios/cerrar-sesion/";
	  
	  var cerrarRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	borrarToken();
	        } else{
	        	borrarToken();
	        }
	        window.location.replace("../");
	  }
	  
	  var cerrarError = function (datos) {
		  console.log(datos);
		  borrarToken();
		  window.location.replace("../");
	  }
	  
	  
	  $('#opcion2').click(function(){
		  if(propio) {
			  var parametrosCerrar = {token: leerToken()};
			  $.post(direccionCerrar,parametrosCerrar, cerrarRespondio,"json").fail(cerrarError);
		  }
	  });
	  
	  function borrarToken() {
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  localStorage.removeItem('tokenSocio');
			} else {
				// Save as Cookie
				document.cookie = 'dreamcloudtokenSocio=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			}
	  }
	  
  });
})(jQuery);