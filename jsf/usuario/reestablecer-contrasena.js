(function ($){
  jQuery("document").ready(function(){
	  
	  var VERSION = "1.0.0";
	  var direccion = "../api/" + VERSION + "/interfaz/usuario/reestablecer-contrasena/";
	  var enviando = false;
	  
	  $('#forma').submit(function tokenizar(event){
		  $('#forma-boton').prop('value', 'Enviando...');
		  
		  if (enviando) {
			  console.log("regresa");
			  return;
		  }
		  enviando = true;
		  
		  var contraseña = $('#contrasena').val();
		  var contraseña2 = $('#contrasena2').val();
		  if(contraseña.length < 6) {
			  mostrarError("La contraseña debe tener al menos 6 caracteres");
			  return;
		  }
		  if(contraseña != contraseña2){
			  mostrarError("Las contraseñas no coinciden");
			  return;
		  }
		  
		  var parametros = {clave: clave, contrasena: contraseña};
		  $.post(direccion, parametros, respondio, "json").fail(error);
	  });
	  
	  var respondio = function(datos) {
		  console.log(datos);
	        if(datos.status == "ok"){
	        	mostrarExito();
	        } else{
	        	if(datos.clave == "noExiste") {	
	        		mostrarError("El email no existe en nuestra base de datos");
	        	} else {
	        		mostrarError("Error desconocido");
	        	}
	        }
	  }
	  
	  var error = function (xhr, status, datos) {
		  console.log(datos);
		  mostrarError('Error de Servidor intentalo mas tarde');
	  }
	  
	  function mostrarExito(){
		  $('#forma').hide("slow");
		  $('#mensaje-exito').show("slow");
		  $('#mensaje-error').hide();
	  }
	  
	  function mostrarError(error){
		  $('#forma').show();
		  $('#mensaje-exito').hide();
		  $('#mensaje-error').show("slow");
		  $('#mensaje-error-texto').html(error);
		  $('#forma-boton').prop('value', 'Recuperar Contraseña');
		  enviando = false;
	  }
	  
	  
	  $.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return decodeURI(results[1]) || 0;
		    }
		}
	  
	  var clave = $.urlParam('clave');
	  
	  
  });
})(jQuery);