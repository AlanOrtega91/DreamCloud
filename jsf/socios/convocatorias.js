(function ($){
  jQuery("document").ready(function(){
	  var direccionConvocatorias = "../api/1.0.0/interfaz/socios/leer-convocatorias/";

	  $('#lista-convocatorias').html('');
	  
	  
	  
	  var leerConvocatoriasRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarConvocatorias(datos.convocatorias);
	        } else{
	        	
	        }
	  }
	  
	  var leerConvocatoriasError = function (datos) {
		  console.log(datos);
	  }

	  
	  function llenarConvocatorias(convocatorias)
	  {
        var convocatoriasHTML = "";
		  $.each(convocatorias, function(index, convocatoria) {

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
			  		"<p class='convocatoria-tema'>" + convocatoria.tema + "</p>";
			  
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
			  		if (id) {
			  			if (fechaLimite > new Date() && !(convocatoria.idProyectoGanador != null)) {
			  				convocatoriasHTML += "<div class='column-3 w-col w-col-3'><a class='w-button' href='../dreams/subir.html?convocatoria=" + convocatoria.id +"'>Participar</a>";
			  			} else {
			  				convocatoriasHTML += "<div class='column-3 w-col w-col-3'><a class='w-button' href='convocatoria.html?convocatoria=" + convocatoria.id +"'>Revisar</a>";
			  			}
			  		} else {
			  			convocatoriasHTML += "<div class='column-3 w-col w-col-3'><a class='w-button' href='convocatoria.html?convocatoria=" + convocatoria.id +"'>Revisar</a>";
			  		}
			  		
			  		convocatoriasHTML += "</div>" +
			  		"</div>" +
			  		"</li>";
		  });
		  $('#lista-convocatorias').html(convocatoriasHTML);
	  }
	  
	  $.urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results==null){
		       return null;
		    }
		    else{
		       return decodeURI(results[1]) || 0;
		    }
		}
	  
	  var id = $.urlParam('socio');
	  var token = '';
	  if((token = leerToken('socio')) != null) {
		  var parametrosConvocatorias = {token: token, usuario: 0};
		  
	  } else {
		  var parametrosConvocatorias = {id: id, usuario: 1};
	  }
	  
	  $.post(direccionConvocatorias,parametrosConvocatorias, leerConvocatoriasRespondio,"json").fail(leerConvocatoriasError);
	  
	  
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

function dreamSeleccionado(dream) {
	window.location.replace("../dreams/dream.html?&dream="+dream.id);
}