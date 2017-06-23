(function ($){
  jQuery("document").ready(function(){
	  
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


	  $("#opcion1").click(function (event){
		  if(tipo == EXTERNO) {
			  
		  } else if (newsfeed){
			  $.post(direccionDreams,parametrosDreams, leerDreamsRespondio,"json").fail(leerDreamsError);
			  newsfeed = false;
			  $(this).html('Mis Proyectos');
		  } else {
			  newsfeed = true;
		  }
	  });

	  
	  
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