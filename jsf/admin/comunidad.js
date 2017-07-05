(function ($){
  jQuery("document").ready(function(){
	  var direccionAgregarDream = "../api/1.0.0/interfaz/comunidad/agregar-dream/";
	  var direccionBorrarDream = "../api/1.0.0/interfaz/comunidad/borrar-dream/";
	  var direccionAgregarConvocatoria = "../api/1.0.0/interfaz/comunidad/agregar-convocatoria/";
	  var direccionBorrarConvocatoria = "../api/1.0.0/interfaz/comunidad/borrar-convocatoria/";
	  var token = leerToken();
	  
	  var respondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	location.reload();
	        } else{
	        	
	        }
	  }
	  
	  var error = function (datos) {
		  console.log(datos);
	  }
	  
	  
	  $('#agregar-dream').click(function(){
		  var id = $('#idDream').val();
		  var parametros = {token: token, id: id};
		  $.post(direccionAgregarDream, parametros, respondio,"json").fail(error);
	  });
	  
	  $('#borrar-dream').click(function(){
		  var id = $('#idDream').val();
		  var parametros = {token: token, id: id};
		  $.post(direccionBorrarDream, parametros, respondio,"json").fail(error);
	  });
	  
	  $('#agregar-convocatoria').click(function(){
		  var id = $('#idConvocatoria').val();
		  var parametros = {token: token, id: id};
		  $.post(direccionAgregarConvocatoria, parametros, respondio,"json").fail(error);
	  });
	  
	  $('#borrar-convocatoria').click(function(){
		  var id = $('#idConvocatoria').val();
		  var parametros = {token: token, id: id};
		  $.post(direccionBorrarConvocatoria, parametros, respondio,"json").fail(error);
	  });
	  
	  
	  function leerToken(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('admin');
			} else {
				// Save as Cookie
				return leerCookie("admindreamcloud");
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
	  
  });
})(jQuery);