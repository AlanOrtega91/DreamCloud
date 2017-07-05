(function ($){
  jQuery("document").ready(function(){
	  var direccionDreams = "../api/1.0.0/interfaz/admin/cambiar-estado-dream/";
	  var estado = 0;

	  
	  var leerDreamsRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	if(estado == 1) {
	        		$('#revision').hide();
	        		$('#aprobar').show();
	        	} if (estado == 2) {
	        		$('#aprobar').hide();
	        		$('#revision').hide();
	        	} else if (estado == 3) {
	        		
	        	}
	        } else{
	        	
	        }
	  }
	  
	  var leerDreamsError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }

	  $('#revision').click(function (event){
		  estado = 1;
		  mandarCambio();
	  });
	  
	  $('#aprobar').click(function (event){
		  estado = 2;
		  mandarCambio();
	  });
	  
	  $('#rechazar').click(function (event){
		  estado = 3;
		  mandarCambio();
	  });
	  
	  function mandarCambio(){
		  var parametrosDreams = {token: leerToken(), id: id, estado: estado};
		  $.post(direccionDreams,parametrosDreams, leerDreamsRespondio,"json").fail(leerDreamsError);
	  }
	  
	  
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
	  
	  $.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return decodeURI(results[1]) || 0;
		    }
		}
	  
	  var id = $.urlParam('dream');
	  
  });
})(jQuery);

function dreamSeleccionado(dream) {
	window.location.replace("../dreams/dream.html?dream="+dream.id+"&admin=1");
}