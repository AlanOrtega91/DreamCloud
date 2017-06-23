(function ($){
  jQuery("document").ready(function(){
	  var seguir = 1;
	  var usuario = $.urlParam('usuario');
	  if (usuario)
	  {
		  $('#opcion1').html('Contactar');
		  $('#opcion2').html('Seguir');
		  $('#opcion3').hide();
	  } else {
		  $('#opcion1').html("Mis Proyectos");
		  $('#opcion2').html("Editar");
		  $('#opcion3').html("Cerrar Sesión");
	  }


	  $("#opcion2").click(function (event) {
		  if(usuario && $(this).html() == "Seguir") {
			  var direccionSeguir = "../api/1.0.0/interfaz/comunidad/seguir/";
			  var token = leerToken();
			  seguir = 1;
			  var parametrosSeguir = {token: token, usuario: usuario, seguir: seguir};
			  $.post(direccionSeguir,parametrosSeguir, seguirRespondio,"json").fail(seguirError);
		  } else if (usuario && $(this).html() != "Seguir"){
			  var direccionSeguir = "../api/1.0.0/interfaz/comunidad/seguir/";
			  var token = leerToken();
			  seguir = 0;
			  var parametrosSeguir = {token: token, usuario: usuario, seguir: seguir};
			  $.post(direccionSeguir,parametrosSeguir, seguirRespondio,"json").fail(seguirError);
		  } else if (!usuario) {
			  window.location.replace("configuracion/cuenta.html");
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
	  
	  var seguirError = function (datos) {
		  console.log(datos);
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

function dreamSeleccionado(dream) {
	window.location.replace("../dreams/dream.html?&dream="+dream.id);
}