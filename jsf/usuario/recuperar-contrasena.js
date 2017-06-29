(function ($){
  jQuery("document").ready(function(){
	  
	  var VERSION = "1.0.0";
	  var direccion = "../api/" + VERSION + "/interfaz/usuario/recuperar-contrasena/";
	  var enviando = false;
	  
	  $('#forma').submit(function tokenizar(event){
		  $('#forma-boton').prop('value', 'Enviando...');
		  
		  if (enviando) {
			  console.log("regresa");
			  return;
		  }
		  enviando = true;
		  
		  var email = $('#email').val();
		  
		  var parametros = {email: email};
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
	  
	  
  });
})(jQuery);