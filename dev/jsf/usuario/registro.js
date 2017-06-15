(function ($){
  jQuery("document").ready(function(){
	  var VERSION = "1.0.0";
	  var BASE_API = "../api/" + VERSION + "/interfaz/usuario/";
	  var enviando = false;
	  $('#forma').submit(function afiliarse(event){

		  $('#forma-boton').prop('value', 'Enviando...');
		  
		  if (enviando) {
			  console.log("regresa");
			  return;
		  }
		  enviando = true;
		  
		  var nombreUsuario = $('#nombre-usuario').val().toLowerCase();
		  var email = $('#email').val();
		  var contraseña = $('#contrasenia').val();
		  var contraseña2 = $('#contrasenia2').val();
		  var nombre = $('#nombre').val();
		  var apellido = $('#apellido').val();
		  var fechaNacimiento = $('#anio-nacimiento').val() + "-" + $('#mes-nacimiento').val() + "-" + $('#dia-nacimiento').val();
		  
		  
		  if (contraseña != contraseña2) {
			  mostrarError("Contraseñas no coinciden");
			  return;
		  }
		  
		  var parametros = {nombreUsuario: nombreUsuario, email: email, contrasenia: contraseña, nombre: nombre, apellido: apellido, fechaNacimiento:fechaNacimiento};
		  var direccion = BASE_API + "registrarse/";
		  $.post(direccion, parametros, registroRespondio, "json").fail(registroError);
	  });
	  
	  var registroRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	mostrarExito();
	        } else{
	        	if(datos.clave == "email") {	
	        		mostrarError("El email ya esta siendo usado en otra cuenta");
	        	} else if(datos.clave == "nombreUsuario") {	
	        		mostrarError("El nombre de usuario ya existe");
	        	} else {
	        		mostrarError("Error al registrar la cuenta. Intentalo mas tarde");
	        	}
	        }
	  }
	  
	  var registroError = function (datos) {
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
		  $('#forma-boton').prop('value', 'Registrarse');
		  enviando = false;
	  }
	  
  });
})(jQuery);