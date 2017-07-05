(function ($){
  jQuery("document").ready(function(){
	  var direccionDream = "../api/1.0.0/interfaz/proyecto/leer/";
	  
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
	  var admin = false;
	  
	  var leerDreamRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarDream(datos.dream);
	        } else{

	        }
	  }
	  
	  var leerDreamError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  var token = '';
	  if((token = leerToken('dreamer')) != null) {
		  var parametrosDream = {id: id, token: token, usuario: 0};
		  $('#bookmark').show();
		  
	  } else if ((token = leerToken('socio')) != null) {
		  var parametrosDream = {id: id, token: token, usuario: 1};
		  $('#bookmark').hide();
		  
	  } else {
		  token = leerToken('admin');
		  admin = true;
		  var parametrosDream = {id: id, token: token, usuario: 2};
		  $('#bookmark').hide();
		  
	  }
	  
	  $.post(direccionDream,parametrosDream, leerDreamRespondio,"json").fail(leerDreamError);

	  
	  function llenarDream(dream)
	  {
		  $('#frameDream').attr('src', '../recursos/trabajos/' + dream.direccion);
		  $('#frameCertificado').attr('src', '../recursos/certificados/' + dream.direccionCertificado);
		  $('#sinopsis').html(dream.sinopsis);
		  if(dream.avatar) {
      		$('#imagen').prop('src','../recursos/usuarios/' + dream.avatar);
		  }
		  if(admin) {
			  $('#certificadoDiv').show();
			  $('#divAdmin').show();
			  if(dream.revisando == 1) {
				  $('#revision').hide();
			  }
			  if (dream.aprobado == 1) {
				  $('#aprobar').hide();
				  $('#revision').hide();
			  }
			  $('#titulo').html(dream.titulo + " (" + dream.idTrabajo + ")");
			  $('#nombre').html(dream.nombre + " " + dream.apellido + " (" + dream.idUsuario + ")");
			  $('#nombreUsuario').html("@" + dream.nombreDeUsuario + " (" + dream.email + ")");
		  } else {
			  $('#certificadoDiv').hide();
			  $('#divAdmin').hide();
			  $('#titulo').html(dream.titulo);
			  $('#nombre').html(dream.nombre + " " + dream.apellido);
			  $('#nombreUsuario').html("@" + dream.nombreDeUsuario);
		  }
		  
		  
		  switch (Math.round(dream.calificacion)) 
		  {
		  	case 1:
		  		$('#estrella1').show();
				$('#estrella2').hide();
				$('#estrella3').hide();
				$('#estrella4').hide();
				$('#estrella5').hide(); 
		  		break;
		  	case 2:
		  		$('#estrella1').show();
				$('#estrella2').show();
				$('#estrella3').hide();
				$('#estrella4').hide();
				$('#estrella5').hide(); 
		  		break;
		  	case 3:
		  		$('#estrella1').show();
				$('#estrella2').show();
				$('#estrella3').show();
				$('#estrella4').hide();
				$('#estrella5').hide(); 
		  		break;
		  	case 4:
		  		$('#estrella1').show();
				$('#estrella2').show();
				$('#estrella3').show();
				$('#estrella4').show();
				$('#estrella5').hide(); 
		  		break;
		  	case 5:
		  		$('#estrella1').show();
				$('#estrella2').show();
				$('#estrella3').show();
				$('#estrella4').show();
				$('#estrella5').show(); 
		  		break;
			default:
				$('#estrella1').hide();
				$('#estrella2').hide();
				$('#estrella3').hide();
				$('#estrella4').hide();
				$('#estrella5').hide(); 
		  
		  }
	  }
	  
	  function leerToken(nombre){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem(nombre);
			} else {
				// Save as Cookie
				return leerCookie(nombre + "dreamcloud");
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