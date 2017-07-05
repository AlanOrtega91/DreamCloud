(function ($){
  jQuery("document").ready(function(){
	  
	  var direccionCuenta = "../../api/1.0.0/interfaz/usuario/leer-cuenta/";
	  var token = leerToken();
	  var parametrosCuenta = {token: token};
	  $('#token').val(token);	  
	  
	  var leerCuentaRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	if(datos.cuenta.avatar) {
	        		$('#imagen').prop('src','../../recursos/usuarios/' + datos.cuenta.avatar);
	        	}
	        } else{

	        }
	  }
	  
	  var leerCuentaError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  $.post(direccionCuenta,parametrosCuenta, leerCuentaRespondio,"json").fail(leerCuentaError);	  
	  

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
	  
	  $.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return decodeURI(results[1]) || 0;
		    }
		}
	  
	  var error = $.urlParam('error');

	  if (error == '1') {
		  mostrarError('Token invalido');
	  } else if (error == '2') {
		  mostrarError('Error con los datos');
	  } else if (error == '3') {
		  mostrarError('Error con los datos');
	  }
	  
  });
})(jQuery);