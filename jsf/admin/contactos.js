(function ($){
  jQuery("document").ready(function(){
	  var direccionContactos = "../api/1.0.0/interfaz/admin/leer-contactos/";
	  $('#contactosList').html('');

	  
	  var leerContactosRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarContactos(datos.contactos);
	        } else{
	        	
	        }
	  }
	  
	  var leerContactoError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  var parametrosContactos = {token: leerToken()};
	  $.post(direccionContactos,parametrosContactos, leerContactosRespondio,"json").fail(leerContactoError);

	  
	  function llenarContactos(contactos)
	  {
        var contactosHTML = "";
		  $.each(contactos, function(index, contacto) {
			  contactosHTML += "<ul class='w-list-unstyled' id='contactosList'>" +
			  		"<li class='contact-user list-item'>" +
			  		"<div class='list-row w-row'>" +
			  		"<div class='blue list-colum-left w-col w-col-6'>" +
			  		"<h2>Emisor</h2>" +
			  		"<div class='dream-list-profile-image'><img class='dream-list-profile-image' src='../images/default_profile.png' width='90'>" +
			  		"</div>" +
			  		"<h3 class='name-account'>" + contacto.emisorNombre + " " + contacto.emisorApellido + "(" + contacto.emisorId + ")</h3>" +
			  		"<h5 class='name-username'>@" + contacto.emisorNombreDeUsuario + " (" + contacto.emisorEmail + ")</h5>" +
			  		"</div>" +
			  		"<div class='dream-list-profile-column w-col w-col-6'>" +
			  		"<h2>Remitente</h2>" +
			  		"<div class='dream-list-profile-image'><img class='dream-list-profile-image' src='../images/default_profile.png' width='90'>" +
			  		"</div>" +
			  		"<h3 class='name-account'>" + contacto.remisorNombre + " " + contacto.remisorApellido + "(" + contacto.remisorId + ")</h3>" +
			  		"<h5 class='name-username'>@" + contacto.remisorNombreDeUsuario + " (" + contacto.remisorEmail + ")</h5>" +
			  		"</div>" +
			  		"</div>" +
			  		"<p class='dream-list-description'>" + contacto.mensaje + "</p>" +
			  		"<div><a class='boton-autorizar w-button' href='#' id='auto" + contacto.id + "'>Autorizar</a><a class='boton-rechazar w-button' href='#' id='rech" + contacto.id + "'>Rechazar</a>" +
			  		"</div>" +
			  		"</li>" +
			  		"</ul>";
		  });
		  $('#contactosList').html(contactosHTML);
		  
		  $('.boton-autorizar').click(function(){
			  var id = $(this).attr('id').replace('auto','');
			  var direccionAutorizar = "../api/1.0.0/interfaz/admin/autorizar-contacto/";
			  var parametrosContactoAutorizar = {id: id, token: leerToken()};
			  $.post(direccionAutorizar, parametrosContactoAutorizar, autorizarRespondio,"json").fail(autorizarError);
		  });
		  $('.boton-rechazar').click(function(){
			  var id = $(this).attr('id').replace('rech','');
			  var direccionRechazar = "../api/1.0.0/interfaz/admin/rechazar-contacto/";
			  var parametrosContactoRechazar = {id: id, token: leerToken()};
			  $.post(direccionRechazar, parametrosContactoRechazar, rechazarRespondio,"json").fail(rechazarError);
		  });
	  }
	  
	  var autorizarRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	$.post(direccionContactos,parametrosContactos, leerContactosRespondio,"json").fail(leerContactoError);
	        } else{
	        	
	        }
	  }
	  
	  var autorizarError = function (datos) {
		  console.log(datos);
		  
	  }
	  
	  var rechazarRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	$.post(direccionContactos,parametrosContactos, leerContactosRespondio,"json").fail(leerContactoError);
	        } else{
	        	
	        }
	  }
	  
	  var rechazarError = function (datos) {
		  console.log(datos);
		  
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
	  
  });
})(jQuery);