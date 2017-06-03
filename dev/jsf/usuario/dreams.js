(function ($){
  jQuery("document").ready(function(){
	  var baseAPI = "http://dclouding.com/dev/api/1.0.0/interfaz/";
	  var direccionCuenta = baseAPI + "usuario/leer-dreams/";
	  var PERSONAL = 1;
	  var EXTERNO = 2;
	  var tipo = PERSONAL;
	  
	  var PERSONAL = 1;
	  var EXTERNO = 2;
	  var tipo = PERSONAL;
	  
	  $.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return decodeURI(results[1]) || 0;
		    }
		}
	  
	  var id = $.urlParam('idUsuario');
	  if (id)
	  {
		  tipo = EXTERNO;
	  } else {
		  tipo = PERSONAL
	  }
	  
	  
	  var leerCuentaRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarCuenta(datos);
	        } else{
	        	if(datos.clave == "email") {	
	        		mostrarError("El email no existe");
	        	} else {
	        		mostrarError("Error al leer");
	        	}
	        }
	  }
	  
	  var leerCuentaError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  

	  
	  function llenarCuenta(datos)
	  {
		  $('#nombre').text(datos.cuenta.nombre + " " + datos.cuenta.apellido);
		  $('#nombreDeUsuario').text("@" + datos.cuenta.nombreDeUsuario);
		  
		  if (datos.cuenta.descripcion) 
		  {
			  $('#descripcion').html(datos.cuenta.descripcion);
		  } 
		  else {
			  $('#descripcion').html("");
		  }
		  if (datos.cuenta.calificacion) {
			  
		  } 
		  else 
		  {
			  $('#estrella1').hide();
			  $('#estrella2').hide();
			  $('#estrella3').hide();
			  $('#estrella4').hide();
			  $('#estrella5').hide();
			}
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
	  

	  if (tipo == EXTERNO) {
		  
	  } else {
		  var token = leerToken();
		  var parametrosCuenta = {token: token};
		  $.post(direccionCuenta,parametrosCuenta, leerCuentaRespondio,"json").fail(leerCuentaError);
		  configuraCuentaPersonal();
	  }
	  
	  function configuraCuentaPersonal() 
	  {
		  $('#opcion1').html("Mis Proyectos");
		  $('#opcion2').html("Editar");
		  $('#opcion3').html("Cerrar Sesión");
	  }
	  
  });
})(jQuery);