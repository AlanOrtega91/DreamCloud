(function ($){
  jQuery("document").ready(function(){
	  
	  if (leerToken("admin"))
	  {
		  $('#navBarAdmin').show();
		  $('#navBarUsuario').hide();
		  
	  } else if(leerToken("socio")) {
		  $('#navBarAdmin').hide();
		  $('#navBarUsuario').show();
		  $('#navBarCuentaLink').prop("href","../empresa/cuenta.html");
		  
	  } else if(leerToken("dreamer")) {
		  $('#navBarAdmin').hide();
		  $('#navBarUsuario').show();
		  $('#navBarCuentaLink').prop("href","../dreamer/cuenta.html");
		  
	  } else {
		  window.replace("http://dclouding.com");
	  }
	  
	  
	  function leerToken(nombre){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem(nombre);
			} else {
				// Save as Cookie
				return leerCookie(nombre + 'dreamcloud');
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