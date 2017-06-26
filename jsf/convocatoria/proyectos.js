(function ($){
  jQuery("document").ready(function(){
	  var direccionLeerProyectos = "../api/1.0.0/interfaz/socios/leer-dreams/";

	  $('#proyectos').html('');
	  
	  $.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return decodeURI(results[1]) || 0;
		    }
		}
	  
	  var id = $.urlParam('convocatoria');
	  
	  var leerProyectosRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarDreams(datos.proyectos);
	        } else{

	        }
	  }
	  
	  var leerProyectosError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  
	  var parametrosProyectos = {id: id};
	 
	  $.post(direccionLeerProyectos,parametrosProyectos, leerProyectosRespondio,"json").fail(leerProyectosError);
	  
		  
	  function llenarDreams(dreams) {
		  var dreamsHTML = "";
		  $.each(dreams, function(index, dream) {

			  dreamsHTML += "<li id='" + dream.idDream + "' class='list-item' onclick='dreamSeleccionado(this)' style='cursor: pointer; cursor: hand;'>";
			  switch (dream.categoria) 
			  {
			  case "Guiones":
				  dreamsHTML += "<div class='list-row blue w-row'>";
				  break;
			  case "Literatura":
				  dreamsHTML += "<div class='list-row green w-row'>";
				  break;
			  case "Periodismo":
				  dreamsHTML += "<div class='list-row orange w-row'>";
				  break;
			  default:
				  dreamsHTML += "<div class='list-row w-clearfix'>";
			  
			  }
			  dreamsHTML += "<div class='blue list-colum-left w-clearfix w-col w-col-9'>" +
			  		"<div class='list-left-block w-clearfix'>" +
			  		"<h3 class='dream-list-title'>"+ dream.titulo + "</h3>";
			  		
			  		var calificacion = Math.round(dream.calificacion);
					  for (var i=0; i < calificacion; i++)
					  {
						  dreamsHTML += "<img class='dream-list-rating' sizes='100px' src='../images/rating.jpg' srcset='../images/rating-p-500x183.jpeg 500w, ../images/rating-p-800x293.jpeg 800w, ../images/rating-p-1080x396.jpeg 1080w, ../images/rating-p-1600x586.jpeg 1600w, ../images/rating-p-2000x732.jpeg 2000w, ../images/rating-p-2600x952.jpeg 2600w, ../images/rating-p-3200x1171.jpeg 3200w, ../images/rating.jpg 6200w' width='100'><img class='dream-list-bookmark' src='../images/bookmark_1.png' width='45'>";
					  }
			  		
					  dreamsHTML += "<p class='dream-list-description'>"+ dream.sinopsis +"</p>" +
			  		"</div>" +
			  		"</div>" +
			  		"<div class='dream-list-profile-column w-col w-col-3'>" +
			  		"<div class='dream-list-profile-image'><img class='dream-list-profile-image' src='../images/default_profile.png' width='90'>" +
			  		"</div>" +
			  		"<h3 class='name-account'>" + dream.nombre + " " + dream.apellido + "</h3>" +
			  		"<h5 class='name-username'>@" + dream.nombreDeUsuario + "</h5>" +
			  		"</div>" +
			  		"</div>" +
			  		"</li>";
			  
		  });
		  $('#proyectos').html(dreamsHTML);
	  }
	  
	  
  });
})(jQuery);
function dreamSeleccionado(dream) {
	window.location.replace("../dreams/dream.html?&dream="+dream.id);
}