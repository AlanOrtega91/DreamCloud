(function ($){
  jQuery("document").ready(function(){
	 
	  var direccionCuenta = "../api/1.0.0/interfaz/usuario/leer-cuenta/";
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
	        	if (!propio) {
		        	if (datos.siguiendo == 1) {
		        		$('#opcion2').html('Dejar de Seguir');
		        	} else {
		        		$('#opcion2').html('Seguir');
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
			  $('#nombre').text(cuenta.nombre + " " + cuenta.apellido + ' (' + cuenta.id + ')');
			  $('#nombreDeUsuario').text("@" + cuenta.nombreDeUsuario + ' (' + cuenta.email + ')');
		  } else {
			  $('#nombre').text(cuenta.nombre + " " + cuenta.apellido);
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
		  switch (Math.round(cuenta.calificacion)) 
		  {
		  	case 1:
		  		$('#estrella1').show();
				$('#estrella2').hide();
				$('#estrella3').hide();
				$('#estrella4').hide();
				$('#estrella5').hide(); 
		  		break;
		  	case 2:
		  		$('#estrella1').show();
				$('#estrella2').show();
				$('#estrella3').hide();
				$('#estrella4').hide();
				$('#estrella5').hide(); 
		  		break;
		  	case 3:
		  		$('#estrella1').show();
				$('#estrella2').show();
				$('#estrella3').show();
				$('#estrella4').hide();
				$('#estrella5').hide(); 
		  		break;
		  	case 4:
		  		$('#estrella1').show();
				$('#estrella2').show();
				$('#estrella3').show();
				$('#estrella4').show();
				$('#estrella5').hide(); 
		  		break;
		  	case 5:
		  		$('#estrella1').show();
				$('#estrella2').show();
				$('#estrella3').show();
				$('#estrella4').show();
				$('#estrella5').show(); 
		  		break;
			default:
				$('#estrella1').hide();
				$('#estrella2').hide();
				$('#estrella3').hide();
				$('#estrella4').hide();
				$('#estrella5').hide(); 
		  
		  }
	  }
	  
	  var id = $.urlParam('usuario');
	  var token = '';
	  if((token = leerToken('dreamer')) != null) {
		  propio = true;
		  var parametrosCuenta = {token: token, usuario: 0};
		  
	  } else if ((token = leerToken('socio')) != null) {
		  propio = false;
		  var parametrosCuenta = {id: id, token: token, usuario: 1};
	  } else {
		  token = leerToken('admin');
		  propio = false;
		  admin = true;
		  var parametrosCuenta = {id: id, token: token, usuario: 2};
	  }
	  
	  $.post(direccionCuenta,parametrosCuenta, leerCuentaRespondio,"json").fail(leerCuentaError);
	  
	  
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
	  
	  
	  var direccionCerrar = "../api/1.0.0/interfaz/usuario/cerrar-sesion/";
	  
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
	  
	  
	  $('#opcion3').click(function(){
		  if(propio) {
			  var parametrosCerrar = {token: leerToken()};
			  $.post(direccionCerrar,parametrosCerrar, cerrarRespondio,"json").fail(cerrarError);
		  }
	  });
	  
	  function borrarToken() {
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  localStorage.removeItem('dreamer');
			} else {
				// Save as Cookie
				document.cookie = 'dreamerdreamcloud=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			}
	  }
	  
  });
})(jQuery);