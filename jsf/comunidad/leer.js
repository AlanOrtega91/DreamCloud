(function ($){
  jQuery("document").ready(function(){
	  var direccion = "../api/1.0.0/interfaz/comunidad/leer/";

	  $('#comunidadLista').html('');
	  
	  
	  var respondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarComunidad(datos.comunidad);
	        } else{
	        	
	        }
	  }
	  
	  var error = function (datos) {
		  console.log(datos);
	  }
	  
	  var token = '';
	  if((token = leerToken('dreamer')) != null) {
		  var parametros = {token: token, usuario: 0};
		  $('#admin').hide();
	  } else if ((token = leerToken('socio')) != null) {
		  var parametros = {token: token, usuario: 1};
		  $('#admin').hide();
	  } else {
		  token = leerToken('admin');
		  var parametros = {token: token, usuario: 2};
		  $('#admin').show();
	  }
	  
	  $.post(direccion, parametros, respondio,"json").fail(error);

	  
	  function llenarComunidad(comunidad)
	  {
        var comunidadHTML = "";
		  $.each(comunidad, function(index, evento) {
			  if(evento.tipo == 0) {
				  comunidadHTML += llenarConvocatoria(evento);
			  } else {
				  comunidadHTML += llenarDream(evento);
			  }
		  });
		  $('#comunidadLista').html(comunidadHTML);
	  }
	  
	  
	  function llenarConvocatoria(convocatoria)
	  {
		  var convocatoriasHTML = '';
		  convocatoriasHTML += "<li class='list-item'>" +
	  		"<div class='list-row red w-row'>" +
	  		"<div class='list-colum-left w-clearfix w-col w-col-9'>" +
	  		"<div class='list-left-block'>" +
	  		"<h3>" + convocatoria.titulo + "</h3>" +
	  		"<div class='w-clearfix'>" +
	  		"<div class='convocatoria-dato'>" + convocatoria.categoria + "</div>" +
	  		"<div class='convocatoria-dato'>" + convocatoria.subcategoria + "</div>" +
	  		"<div class='convocatoria-dato'>" + convocatoria.genero + "</div>" +
	  		"</div>" +
	  		"<p class='convocatoria-tema'>" + convocatoria.info + "</p>";
	  
	  var fechaLimite = Date.parse(convocatoria.fechaLimite);
	  
	  if(convocatoria.idProyectoGanador) {
		  
		  convocatoriasHTML += "<div><strong>Fecha Límite:</strong> Ganador Seleccionado</div>";
	  } else if (fechaLimite < new Date()){
		  
		  convocatoriasHTML += "<div><strong>Fecha Límite:</strong> Vencida</div>";
	  } else {
		  
		  convocatoriasHTML += "<div><strong>Fecha Límite:</strong> " + convocatoria.fechaLimite.split(' ')[0] + "</div>";
	  }
	  
	  convocatoriasHTML += "</div>" +
	  		"</div>";
	  if (convocatoria.avatar) {
		  convocatoriasHTML += "<div class='column-3 w-col w-col-3'><div><img class='image-9' src='../recursos/socios/" + dream.avatar + "' '>";
	  } else {
		  convocatoriasHTML += "<div class='column-3 w-col w-col-3'><div><img class='image-9' src='../images/default_profile.png'>";
	  }
	  convocatoriasHTML += "<h3>" + convocatoria.nombre + "</h3>" +
	  		"</div>" +
	  		"<a class='w-button' href='empresa/convocatoria.html?convocatoria=" + convocatoria.id +"'>Revisar</a>" +
	  		"</div>" +
	  		"</div>" +
	  		"</li>";
	  		return convocatoriasHTML;
	  }
	  
	  function llenarDream(dream)
	  {
		  var dreamsHTML = "<li id='" + dream.id + "' class='list-item' onclick='dreamSeleccionado(this)' style='cursor: pointer; cursor: hand;'>" +
	  		"<div class='blue list-row w-row'>" +
	  		"<div class='list-colum-left w-clearfix w-col w-col-9'>" +
	  		"<div class='list-left-block w-clearfix'>" +
	  		"<h3 class='dream-list-title'>"+ dream.titulo + "</h3>";

	  var calificacion = Math.round(dream.calificacion);
	  for (var i=0; i < calificacion; i++)
	  {
		  dreamsHTML += "<img height='25' sizes='(max-width: 767px) 25px, (max-width: 991px) 3vw, 25px' src='../images/star.png' srcset='../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w' width='25'>";
	  }


	  
	  dreamsHTML += "<p class='dream-list-description'>"+ dream.info +"</p>" +
	  		"</div>" +
	  		"</div>" +
	  		"<div class='dream-list-profile-column w-col w-col-3'>" + 
	  		"<div class='dream-list-profile-image'>";
	  
	  if(dream.avatar) {
		  dreamsHTML += "<img class='dream-list-profile-image' src='../../recursos/usuarios/" + dream.avatar + "' width='90'>";
	  } else {
		  dreamsHTML += "<img class='dream-list-profile-image' src='../images/default_profile.png' width='90'>";
	  }
	  dreamsHTML += "</div><h3 class='name-account'>" + dream.nombre + " " + dream.apellido + "</h3>" +
	  		"<h5 class='name-username'>@" + dream.nombreDeUsuario + "</h5>" +
	  		"</div>" +
	  		"</div>" +
	  		"</li>";
		  return dreamsHTML;
	  }
	  
	  
	  function leerToken(nombre){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem(nombre);
			} else {
				// Save as Cookie
				return leerCookie(nombre);
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
function dreamSeleccionado(dream) {
	window.location.replace("../dreams/dream.html?&dream="+dream.id);
}