(function ($){
  jQuery("document").ready(function(){
	  var direccionConvocatorias = "../api/1.0.0/interfaz/socios/leer-convocatorias/";

	  $('#lista-convocatorias').html('');
	  
	  
	  
	  var leerConvocatoriasRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarDreams(datos.proyectos);
	        } else{
	        	
	        }
	  }
	  
	  var leerConvocatoriasError = function (datos) {
		  console.log(datos);
	  }

	  
	  function llenarConvocatorias(convocatorias)
	  {
        var convocatoriasHTML = "";
		  $.each(convocatorias, function(index, convocatoria) {

		  });
		  $('#lista-convocatorias').html(convocatoriasHTML);
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
	  
	  var id = $.urlParam('socio');
	  if (id)
	  {
		  var parametrosConvocatorias = {id: id};
		  
	  } else {
		  var parametrosConvocatorias = {token: leerTokenSocio()};
	  }
	  
	  $.post(direccionConvocatorias,parametrosConvocatorias, leerConvocatoriasRespondio,"json").fail(leerConvocatoriasError);
	  
	  
	  function leerTokenSocio(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('tokenSocio');
			} else {
				// Save as Cookie
				return leerCookie("dreamcloudtokenSocio");
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