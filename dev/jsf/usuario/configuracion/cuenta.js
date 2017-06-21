(function ($){
  jQuery("document").ready(function(){
	  var baseAPI = "../../api/1.0.0/interfaz/";
	  var direccionCuenta = baseAPI + "usuario/leer-cuenta/";
	  var token = leerToken();
	  var parametrosCuenta = {token: token};
	  
	  var leerCuentaRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarDatosCuenta(datos.cuenta);
	        } else{

	        }
	  }
	  
	  var leerCuentaError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  $.post(direccionCuenta,parametrosCuenta, leerCuentaRespondio,"json").fail(leerCuentaError);
	  
	  function llenarDatosCuenta(cuenta) {
		$('#nombre').val(cuenta.nombre);
		$('#apellido').val(cuenta.apellido);
		$('#email').val(cuenta.email);
		$('#telefono').val(cuenta.telefono);
		$('#celular').val(cuenta.celular);
		$('#descripcion').val(cuenta.descripcion);
		var fecha = cuenta.fechaDeNacimiento.split(' ')[0];
		setTimeout(function (fecha){
			$('#dia-nacimiento').val(fecha.split('-')[2]);
			$('#mes-nacimiento').val(fecha.split('-')[1]);
			$('#anio-nacimiento').val(fecha.split('-')[0]);
		}, 1000, fecha);
	  }
	  
	  var direccionCambiarCuenta = baseAPI + "usuario/configuracion/cuenta/";
	  
	  $('#forma').submit(function afiliarse(event){

		  $('#forma-boton').prop('value', 'Guardando...');
		  
		  var nombre = $('#nombre').val();
		  var apellido = $('#apellido').val();
		  var email = $('#email').val();
		  var telefono = $('#telefono').val();
		  var celular = $('#celular').val();
		  var descripcion = $('#descripcion').val();
		  var fechaNacimiento = $('#anio-nacimiento').val() + "-" + $('#mes-nacimiento').val() + "-" + $('#dia-nacimiento').val();
		  var parametrosCambiarCuenta = {token: token, nombre: nombre, apellido: apellido, email: email, telefono: telefono, celular: celular, descripcion: descripcion, fechaDeNacimiento: fechaNacimiento};
		  
		  $.post(direccionCambiarCuenta,parametrosCambiarCuenta, leerCambiarCuentaRespondio,"json").fail(leerCambiarCuentaError);
	  });
	  
	  
	  
	  
	  
	  var leerCambiarCuentaRespondio = function (datos){
		  console.log(datos);
		  if(datos.status == "ok"){
			  mostrarExito();
			  } else{
				  
			  }
		  }
	  
	  var leerCambiarCuentaError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
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