(function ($){
  jQuery("document").ready(function(){
	  
	  var direccion = "http://dclouding.com/usuario/inicio-sesion/";
	  
	  $('#iniciar-sesion').submit(function tokenizar(event){
		  
		  var email = $('#email').val();
		  var contraseña = $('#contrasenia').val();
		  
		  var parametros = {email: email, contrasenia: contraseña};
		  $.post(direccion, parametros, inicioSesionRespondio, "json");
	  });
	  
	  var inicioSesionRespondio = function(datos) {
		  console.log(data);
	        if(datos.status == "OK"){
	        	guardarToken(datos.token);
	        	window.location.replace("http://dclouding.com/comunidad.html");
	        } else{
	        	$('#mensaje-error').show("slow");
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