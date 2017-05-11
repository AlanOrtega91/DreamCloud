(function ($){
  jQuery("document").ready(function(){
	  
	  var direccion = "http://dclouding.com/usuario/registrarse/";
	  
	  
	  $('#registro').submit(function tokenizar(event){
		  
		  var nombreUsuario = $('#nombre-usuario').val();
		  var nombre = $('#nombres').val();
		  var apellidos = $('#apellidos').val();
		  var dia = $('#dia-nacimiento').val();
		  var mes = $('#mes-nacimiento').val();
		  var año = $('#anio-nacimiento').val();
		  var email = $('#email').val();
		  var contraseña2 = $('#contrasenia2').val();
		  var contraseña = $('#contrasenia').val();
		  
		  if (contraseña != contraseña2) {
			  $('#mensaje-error').show("slow");
			  $('#mensaje-error').text('Las contraseñas no coinciden');
		  }
		  var fechaNacimiento = año + '-' + mes + '-' + dia;
		  var parametros = {nombreUsuario: nombreUsuario, nombre: nombre, apellidos: apellidos, fechaNacimiento: fechaNacimiento, email: email, contrasenia: contraseña};
		  $.post(direccion, parametros, registroRespondio, "json");
	  });
	  
	  var registroRespondio = function(datos) {
		  console.log(data);
	        if(datos.status == "OK"){
	        	$('#mensaje-error').hide();
	        	$('#mensaje-exito').show("slow");
	        	$('#registro').hide();
	        } else{
	        	$('#mensaje-error').text('Error a definir');
	        }
	  }
	  
	  function guardarToken(token){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  localStorage.setItem('token',token);
			} else {
				// Save as Cookie
				document.cookie = 'dreamcloud=' + token;
			}
	  }
  });
})(jQuery);