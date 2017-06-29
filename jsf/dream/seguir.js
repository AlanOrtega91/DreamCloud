(function ($){
  jQuery("document").ready(function(){
	  var direccionSiguiendo = "../api/1.0.0/interfaz/proyecto/siguiendo/";
	  var siguiendo = false;
	  
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
	  
	  var siguiendoRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	if(datos.siguiendo) {
	        		$('#bookmark').prop('src','../images/bookmark-activo.png');
	        		siguiendo = true;
	        	} else {
	        		$('#bookmark').prop('src','../images/bookmark.png');
	        		siguiendo = false;
	        	}
	        } else{

	        }
	  }
	  
	  var siguiendoError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  var token = leerToken();
	  var parametrosSiguiendo = {token: token, idDream: id};
	  $.post(direccionSiguiendo,parametrosSiguiendo, siguiendoRespondio,"json").fail(siguiendoError);
	  
	  $('#bookmark').click(function(){
		  var direccionSeguir = "../api/1.0.0/interfaz/proyecto/seguir/";
		  siguiendo = !siguiendo;
		  var parametrosSeguir = {token: leerToken(), idDream: id, seguir: siguiendo};
		  $.post(direccionSeguir,parametrosSeguir, seguirRespondio,"json").fail(seguirError);
	  });
	  
	  var seguirRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	if(siguiendo) {
	        		$('#bookmark').prop('src','../images/bookmark-activo.png');
	        	} else {
	        		$('#bookmark').prop('src','../images/bookmark.png');
	        	}
	        } else{
	        	siguiendo = !siguiendo;
	        }
	  }
	  
	  var seguirError = function (datos) {
		  console.log(datos);
		  siguiendo = !siguiendo;
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