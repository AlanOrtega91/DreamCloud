(function ($){
  jQuery("document").ready(function(){
	  var direccionDreams = "../api/1.0.0/interfaz/usuario/newsfeed/";
	  var news = [];
	  var newsfeed = false;
	  var PERSONAL = 1;
	  var EXTERNO = 2;
	  var tipo = PERSONAL;
	  var parametrosDreams = {token: leerToken()};
	  $('#lista-proyectos').html('');
	  
	  var leerDreamsRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	news = datos.news;
	        	llenarNewsFeed();
	        } else{
	        	
	        }
	  }
	  
	  var leerDreamsError = function (datos) {
		  console.log(datos);
	  }
	  
	  $.post(direccionDreams,parametrosDreams, leerDreamsRespondio,"json").fail(leerDreamsError);

	  $("#opcion1").click(function (event){
		  if(tipo != EXTERNO && newsfeed){
			  $.post(direccionDreams,parametrosDreams, leerDreamsRespondio,"json").fail(leerDreamsError);
			  newsfeed = false;
			  $(this).html('Mis Proyectos');
		  } else {
			  newsfeed = true;
		  }
	  });
	  
	  function llenarNewsFeed()
	  {
        var dreamsHTML = "";
		  $.each(news, function(index, dream) {
			  
			  dreamsHTML += "<li id='" + dream.idDream + "' class='list-item' onclick='dreamSeleccionado(this)' style='cursor: pointer; cursor: hand;'>";
			  switch (dream.categoria) 
			  {
			  case "Guiones":
				  dreamsHTML += "<div class='blue list-row w-clearfix'>";
				  break;
			  case "Literatura":
				  dreamsHTML += "<div class='green list-row w-clearfix'>";
				  break;
			  case "Periodismo":
				  dreamsHTML += "<div class='orange list-row w-clearfix'>";
				  break;
			  default:
				  dreamsHTML += "<div class='list-row w-clearfix'>";
			  
			  }
			  dreamsHTML += "<div class='w-row'>" +
			  		"<div class='w-clearfix w-col w-col-10'>";
			  if (dream.aprobado == '1') 
			  {
				  dreamsHTML += "<h3 class='dream-list-title'>"+ dream.titulo + "</h3>";
			  } else {
				  if (dream.revisando == '1'){
					  dreamsHTML += "<h3 class='dream-list-title'>"+ dream.titulo + " (En revision)</h3>";
				  } else {
					  dreamsHTML += "<h3 class='dream-list-title'>"+ dream.titulo + " (En espera)</h3>";
				  }
			  }
			  var calificacion = Math.round(dream.calificacion);
			  for (var i=0; i < calificacion; i++)
			  {
				  dreamsHTML += "<img height='25' sizes='(max-width: 767px) 25px, (max-width: 991px) 3vw, 25px' src='../images/star.png' srcset='../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w' width='25'>";
			  }
			  dreamsHTML += "</div>";
			  dreamsHTML += "<div class='w-clearfix w-col w-col-2'>";
			  dreamsHTML +="</div></div>";
			  dreamsHTML += "<p class='dream-list-description'>"+ dream.sinopsis +"</p>";
			  
			  		
			  dreamsHTML += "</div></li>";

		  });
		  $('#lista-proyectos').html(dreamsHTML);
	  }
	  
	  
	  function leerToken(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('dreamer');
			} else {
				// Save as Cookie
				return leerCookie("dreamerdreamcloud");
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