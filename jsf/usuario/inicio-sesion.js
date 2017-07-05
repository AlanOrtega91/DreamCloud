(function ($){
  jQuery("document").ready(function(){
	  
	  var direccion = "../api/1.0.0/interfaz/usuario/inicio-sesion/";
	  var enviando = false;
	  var token = leerToken('socio');
	  
	  $('#forma').submit(function (event){
		  $('#forma-boton').prop('value', 'Enviando...');
		  
		  if (enviando) {
			  console.log("regresa");
			  return;
		  }
		  enviando = true;
		  
		  var usuario = $('#usuario').val();
		  var contraseña = $('#contrasenia').val();
		  
		  var parametros = {usuario: usuario, contrasenia: contraseña};
		  $.post(direccion, parametros, respondio, "json").fail(error);
	  });
	  
	  var respondio = function(datos) {
		  console.log(datos);
	        if(datos.status == "ok"){
	        	guardarToken(datos.token);
	        	window.location.replace("../dreamer/cuenta.html");
	        } else{
	        	if(datos.clave == "noExiste") {	
	        		mostrarError("El nombre de Usuario/Email o la clave son incorrectos");
	        	} else if(datos.clave == "token") {
	        		mostrarError("No se pudo iniciar la sesion");
	        	} else {
	        		mostrarError("Error desconocido");
	        	}
	        }
	  }
	  
	  var error = function (datos) {
		  console.log(datos);
		  mostrarError('Error de Servidor intentalo mas tarde');
	  }
	  
	  var inicioSesionTokenRespondio = function(datos) {
		  console.log(datos);
	        if(datos.status == "ok"){
	        	guardarToken(datos.token);
	        	window.location.replace("../dreamer/cuenta.html");
	        } 
	  }
	  
	  function guardarToken(token){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  localStorage.setItem('dreamer',token);
			} else {
				// Save as Cookie
				document.cookie = 'dreamerdreamcloud=' + token;
			}
	  }
	  
	  function mostrarError(error){
		  $('#forma').show();
		  $('#mensaje-exito').hide();
		  $('#mensaje-error').show("slow");
		  $('#mensaje-error-texto').html(error);
		  $('#forma-boton').prop('value', 'Iniciar Sesion');
		  enviando = false;
	  }
	  
	  if(token != null){
		  var parametros = {token: token};
		  $.post(direccion, parametros, inicioSesionTokenRespondio, "json");
	  }
	  
	  function leerToken(nombre){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem(nombre);
			} else {
				// Save as Cookie
				return leerCookie(nombre + "dreamcloud");
			}
	  }
	  
	  
  });
})(jQuery);