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
	  var admin = $.urlParam('admin');
	  
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
	  
	  if(admin == 1) {
		  var parametrosDream = {token: leerTokenAdmin(), idDream: id, admin: 1};
	  } else {
		  var parametrosDream = {token: leerToken(), idDream: id, admin: 0};
	  }
	  $.post(direccionDream,parametrosDream, leerDreamRespondio,"json").fail(leerDreamError);
	  var token = leerToken();
	  var tokenAdmin = leerTokenAdmin();
	  if(!token && !tokenAdmin) {
		  $('#bookmark').hide();
		  $('#forma-calificar').hide();
	  }

	  
	  function llenarDream(dream)
	  {
		  $('#frameDream').attr('src', '../recursos/trabajos/' + dream.direccion);
		  $('#frameCertificado').attr('src', '../recursos/certificados/' + dream.direccionCertificado);
		  $('#sinopsis').html(dream.sinopsis);
		  if(dream.avatar) {
      		$('#imagen').prop('src','../recursos/usuarios/' + dream.avatar);
		  }
		  if(admin == 1) {
			  $('#certificadoDiv').show();
			  $('#divAdmin').show();
			  if(dream.revisando == 1) {
				  $('#revision').hide();
			  }
			  if (dream.aprobado == 1) {
				  $('#aprobar').hide();
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
	  
	  function leerTokenAdmin(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('tokenAdmin');
			} else {
				// Save as Cookie
				return leerCookie("dreamcloudAdmin");
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