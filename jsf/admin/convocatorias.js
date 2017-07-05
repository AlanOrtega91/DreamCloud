(function ($){
  jQuery("document").ready(function(){
	  var direccionConvocatorias = "../api/1.0.0/interfaz/admin/leer-convocatorias/";
	  $('#convocatoriasList').html('');

	  
	  var leerConvocatoriasRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarConvocatorias(datos.convocatorias);
	        } else{
	        	
	        }
	  }
	  
	  var error = function (datos) {
		  console.log(datos);
	  }
	  var parametros = {token: leerToken()};
	  $.post(direccionConvocatorias,parametros, leerConvocatoriasRespondio,"json").fail(error);

	  
	  function llenarConvocatorias(convocatorias)
	  {
        var convocatoriasHTML = "";
		  $.each(convocatorias, function(index, convocatoria) {
			  convocatoriasHTML += "<li class='contact-user list-item'>" +
			  		"<h2>" + convocatoria.titulo + "</h2>" +
			  				"<div class='list-row w-row'>" +
			  				"<div class='blue list-colum-left w-col w-col-6'>" +
			  				"<h2>Ganador</h2>" +
			  				"<div class='dream-list-profile-image'>";
			  if (convocatoria.avatarUsuario) {
				  convocatoriasHTML += "<img class='dream-list-profile-image' src='../../recursos/usuarios/" + convocatoria.avatarUsuario + "' width='90'>";
			  } else {
				  convocatoriasHTML += "<img class='dream-list-profile-image' src='../images/default_profile.png' width='90'>";
			  }
			  convocatoriasHTML += "</div>" +
			  		"<h3 class='name-account'>" + convocatoria.nombreUsuario + " " + convocatoria.apellidoUsuario + "</h3>" +
			  		"<h5 class='name-username'>" + convocatoria.emailUsuario + "</h5>" +
			  		"</div>" +
			  		"<div class='dream-list-profile-column w-col w-col-6'>" +
			  		"<h2>Empresa</h2>" +
			  		"<div class='dream-list-profile-image'>";
			  if (convocatoria.avatarEmpresa) {
				  convocatoriasHTML += "<img class='dream-list-profile-image' src='../../recursos/usuarios/" + convocatoria.avatarEmpresa + "' width='90'>";
			  } else {
				  convocatoriasHTML += "<img class='dream-list-profile-image' src='../images/default_profile.png' width='90'>";
			  }
			  convocatoriasHTML += "</div>" +
			  		"<h3 class='name-account'>" + convocatoria.nombreEmpresa + "</h3>" +
			  		"<h5 class='name-username'>" + convocatoria.emailEmpresa + "</h5>" +
			  		"</div>" +
			  		"</div>" +
			  		"</li>";
		  });
		  $('#convocatoriasList').html(convocatoriasHTML);
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