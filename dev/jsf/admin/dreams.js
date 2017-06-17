(function ($){
  jQuery("document").ready(function(){
	  var direccionDreams = "../api/1.0.0/interfaz/admin/leer-dreams/";

	  
	  var leerDreamsRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarDreams(datos.proyectos);
	        } else{
	        	
	        }
	  }
	  
	  var leerDreamsError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  var parametrosDreams = {token: leerToken()};
	  $.post(direccionDreams,parametrosDreams, leerDreamsRespondio,"json").fail(leerDreamsError);

	  
	  function llenarDreams(dreams)
	  {
        var dreamsHTML = "";
		  $.each(dreams, function(index, dream) {
			  
			  dreamsHTML += "<li id='" + dream.idDream + "' class='list-item' onclick='dreamSeleccionado(this)' style='cursor: pointer; cursor: hand;'>";
			  switch (dream.categoria) 
			  {
			  case "Guiones":
				  dreamsHTML += "<div class='blue list-row w-row'>";
				  break;
			  case "Literatura":
				  dreamsHTML += "<div class='green list-row w-row'>";
				  break;
			  case "Periodismo":
				  dreamsHTML += "<div class='orange list-row w-row'>";
				  break;
			  default:
				  dreamsHTML += "<div class='list-row w-row'>";
			  
			  }
			  dreamsHTML += "<div class='list-colum-left w-clearfix w-col w-col-9'>" +
			  			"<div class='list-left-block w-clearfix'>";
			  if (dream.revisando == '1')
			  {
				  dreamsHTML += "<h3 class='dream-list-title'>"+ dream.titulo + " ("+ dream.idDream + ") (En revision)</h3>";
			  } else 
			  {
				  dreamsHTML += "<h3 class='dream-list-title'>"+ dream.titulo + " ("+ dream.idDream + ") (En espera)</h3>";
			  }
			
      
			  //TODO: Agregar la imagen correcta
			  dreamsHTML += "<p class='dream-list-description'>"+ dream.sinopsis +"</p>" +
			  		"</div>" +
			  		"</div>" +
			  		"<div class='dream-list-profile-column w-col w-col-3'>" + 
			  		"<div class='dream-list-profile-image'><img class='dream-list-profile-image' src='../images/default_profile.png' width='90'>" +
			  		"</div><h3 class='name-account'>" + dream.nombre + " " + dream.apellido + "(" + dream.idUsuario + ")</h3>" +
			  		"<h5 class='name-username'>@" + dream.nombreDeUsuario + "(" + dream.email + ")</h5>" +
			  		"</div>" +
			  		"</div>" +
			  		"</li>";

		  });
		  $('#dreamsList').html(dreamsHTML);
	  }
	  
	  
	  function leerToken(){
		  if (typeof(Storage) !== "undefined") {
			  //HTML5 Web Storage
			  return localStorage.getItem('tokenAdmin');
			} else {
				// Save as Cookie
				return leerCookie("dreamcloudAdmin");
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
	window.location.replace("../dreams/dream.html?dream="+dream.id+"&admin=1");
}