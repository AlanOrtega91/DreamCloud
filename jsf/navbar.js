(function ($){
  jQuery("document").ready(function(){
	  
	  if (leerToken("tokenAdmin", "dreamcloudtokenAdmin"))
	  {
		  $('#navBarAdmin').show();
		  $('#navBarUsuario').hide();
		  
	  } else if(leerToken("tokenEmpresa", "dreamcloudtokenEmpresa")) {
		  $('#navBarAdmin').hide();
		  $('#navBarUsuario').show();
		  $('#navBarCuentaLink').prop("href","http://dclouding.com/empresa/cuenta.html");
		  
	  } else if(leerToken("token", "dreamcloudtoken")) {
		  $('#navBarAdmin').hide();
		  $('#navBarUsuario').show();
		  $('#navBarCuentaLink').prop("href","http://dclouding.com/dreamer/cuenta.html");
		  
	  } else {
		  window.replace("http://dclouding.com");
	  }
	  
	  
	  function leerToken(storage, cookie){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem(storage);
			} else {
				// Save as Cookie
				return leerCookie(cookie);
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