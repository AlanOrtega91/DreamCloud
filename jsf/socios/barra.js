(function ($){
  jQuery("document").ready(function(){
	  var seguir = 1;
	  var socio = $.urlParam('socio');
	  if (socio)
	  {
		  $('#opcion1').html('Seguir');
		  $('#opcion2').hide();
	  } else {
		  $('#opcion1').html("Subir Convocatoria");
		  $('#opcion2').html("Cerrar Sesión");
	  }


	  $("#opcion1").click(function (event) {
		  if(socio && $(this).html() == "Seguir") {
			  var direccionSeguir = "../api/1.0.0/interfaz/comunidad/seguir-empresa/";
			  var token = leerToken();
			  seguir = 1;
			  var parametrosSeguir = {token: token, socio: socio, seguir: seguir};
			  $.post(direccionSeguir,parametrosSeguir, seguirRespondio,"json").fail(seguirError);
		  } else if (socio && $(this).html() != "Seguir"){
			  var direccionSeguir = "../api/1.0.0/interfaz/comunidad/seguir-empresa/";
			  var token = leerToken();
			  seguir = 0;
			  var parametrosSeguir = {token: token, socio: socio, seguir: seguir};
			  $.post(direccionSeguir,parametrosSeguir, seguirRespondio,"json").fail(seguirError);
		  } else if (!socio) {
			  window.location.replace("subir-convocatoria.html");
		  }
	  });
	  

	  var seguirRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	if(seguir == 1) {
	        		$("#opcion2").html('Dejar De Seguir');
	        	} else {
	        		$("#opcion2").html('Seguir');
	        	}
	        } else{

	        }
	  }
	  
	    
	  function leerToken(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('token');
			} else {
				// Save as Cookie
				return leerCookie("dreamcloudtoken");
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