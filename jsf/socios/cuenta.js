(function ($){
  jQuery("document").ready(function(){
	  var direccionCuenta = "../api/1.0.0/interfaz/socios/leer-cuenta/";
	  var propio = true;
	  var admin = false;
	  
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
		  if (admin) {
			  $('#nombre').text(cuenta.nombre + ' (' + cuenta.id + ')');
			  $('#nombreDeUsuario').text("@" + cuenta.nombreDeUsuario + ' (' + cuenta.email + ')');
		  } else {
			  $('#nombre').text(cuenta.nombre);
			  $('#nombreDeUsuario').text("@" + cuenta.nombreDeUsuario);
		  }

		  if(cuenta.avatar) {
			  $('#imagen').prop('src','../../recursos/usuarios/' + cuenta.avatar);
		  }
		  if (cuenta.descripcion) 
		  {
			  $('#descripcion').html(cuenta.descripcion);
		  } 
		  else {
			  $('#descripcion').html("");
		  }
	  }
	  
	  
	  var id = $.urlParam('socio');
	  var token = '';
	  if((token = leerToken('socio')) != null) {
		  propio = true;
		  var parametrosCuenta = {token: token, usuario: 0};
		  
	  } else if ((token = leerToken('dreamer')) != null) {
		  propio = false;
		  var parametrosCuenta = {id: id, token: token, usuario: 1};
	  } else {
		  token = leerToken('admin');
		  propio = false;
		  admin = true;
		  var parametrosCuenta = {id: id, token: token, usuario: 1};
	  }
	  
	  $.post(direccionCuenta,parametrosCuenta, leerCuentaRespondio,"json").fail(leerCuentaError);
	  

	  var direccionCerrar = "../api/1.0.0/interfaz/socios/cerrar-sesion/";
	  
	  var cerrarRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	borrarToken('socio');
	        } else{
	        	borrarToken('socio');
	        }
	        window.location.replace("../");
	  }
	  
	  var cerrarError = function (datos) {
		  console.log(datos);
		  borrarToken('socio');
		  window.location.replace("../");
	  }
	  
	  
	  $('#opcion2').click(function(){
		  if(propio) {
			  var parametrosCerrar = {token: leerToken('socio')};
			  $.post(direccionCerrar,parametrosCerrar, cerrarRespondio,"json").fail(cerrarError);
		  }
	  });
	  
	  function leerToken(nombre){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem(nombre);
			} else {
				// Save as Cookie
				return leerCookie(nombre + "dreamcloud");
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
	  
	  function borrarToken(nombre) {
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  localStorage.removeItem(nombre);
			} else {
				// Save as Cookie
				document.cookie = nombre + 'dreamcloud=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			}
	  }
	  
  });
})(jQuery);