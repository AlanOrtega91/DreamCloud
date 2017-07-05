(function ($){
  jQuery("document").ready(function(){
	  var token = leerToken();
	  var direccionCambiarContrasena = "../../api/1.0.0/interfaz/usuario/configuracion/contrasena/";
	  
	  
	  $('#forma').submit(function afiliarse(event){

		  $('#forma-boton').prop('value', 'Guardando...');
		  
		  var contraseña = $('#contrasena').val();
		  var contraseñaNueva = $('#contraseniaNueva').val();
		  var contraseñaNueva2 = $('#contraseniaNueva2').val();
		  
		  if(contraseñaNueva != contraseñaNueva2) {
			  mostrarError("Las contraseñas no coinciden");
			  return;
		  }
		  
		  var parametrosCambiarContrasena = {token: leerToken(), contrasena: contraseña, contrasenaNueva: contraseñaNueva};
		  $.post(direccionCambiarContrasena,parametrosCambiarContrasena, leerCambiarContrasenaRespondio,"json").fail(leerCambiarContrasenaError);
	  });
	  
	  
	  
	  
	  
	  var leerCambiarContrasenaRespondio = function (datos){
		  console.log(datos);
		  if(datos.status == "ok"){
			  mostrarExito();
			  } else{
				  if(datos.clave == "claves") {
					  mostrarError("La contraseña no coincide");
				  } else {
					  mostrarError(datos.explicacion);
				  }
			  }
		  }
	  
	  var leerCambiarContrasenaError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor intentalo mas tarde");
	  }
	  
	  

	  function leerToken(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('dreamer');
			} else {
				// Save as Cookie
				return leerCookie("dreamerdreamcloud");
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
		  $('#forma-boton').prop('value', 'Guardar');
	  }
	  
  });
})(jQuery);