(function ($){
  jQuery("document").ready(function(){
	  var direccionLeerResenas = "../api/1.0.0/interfaz/proyecto/leer-resenas/";
	  var direccionEnviarResena = "../api/1.0.0/interfaz/proyecto/enviar-resena/";
	  var enviandoCalificacion = false;
	  var calificacion = 1;
	  $('#comentarios').html('');
	  
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
	  
	  var leerResenaRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarResenas(datos.resenas);
	        } else{

	        }
	  }
	  
	  var leerResenaError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  if(admin == 1) {
		  var parametrosResena = {token: leerTokenAdmin(), idDream: id, admin: 1};
	  } else {
		  var parametrosResena = {token: leerToken(), idDream: id, admin: 0};
	  }
	  $.post(direccionLeerResenas,parametrosResena, leerResenaRespondio,"json").fail(leerResenaError);
	  
		  
	  function llenarResenas(resenas) {
		  var resenasHTML = "";
		  $.each(resenas, function(index, resena) {
			  resenasHTML += "<li>" +
			  		"<div class='dream-comment-section'>" +
			  		"<div class='main-comment w-clearfix'>" +
			  		"<h4 class='title-comment'>" + resena.titulo + "</h4>" +
			  		"<h5 class='comment-user'>@" + resena.nombreDeUsuario + "</h5>";
			  var calificacion = Math.round(resena.calificacion);
			  for (var i=0; i < calificacion; i++)
			  {
				  resenasHTML += "<img class='comment-rating' sizes='(max-width: 767px) 25px, (max-width: 991px) 3vw, 25px' src='../images/star.png' srcset='../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w' width='25'>";
			  }
			  	
			  resenasHTML += "<p class='comment-opinion'>" + resena.comentario + "</p>" +
			  		"</div>" +
			  		"<ul class='w-list-unstyled'>" +
			  		"</ul>" +
			  		"<div class='w-clearfix'>" +
			  		"<p class='subcomment-opinion'><a href='#'>Leer Mas...</a>" +
			  		"</p>" +
			  		"<p class='subcomment-add'><a href='#'>Comentar</a>" +
			  		"</p>" +
			  		"</div>" +
			  		"<div class='form-block-2 w-form'>" +
			  		"<form action='javascript:void(0);' class='form-subcomment w-clearfix' data-name='Email Form 2' id='email-form-2' name='email-form-2'>" +
			  		"<textarea class='w-input' maxlength='5000' name='field' placeholder='Comentar' required='required'></textarea>" +
			  		"<input class='comment-button w-button' data-wait='Please wait...' type='submit' value='Comentar'>" +
			  		"</form>" +
			  		"</div>" +
			  		"</div>" +
			  		"</li>";
			  
		  });
		  $('#comentarios').html(resenasHTML);
		  $('.form-block-2').hide();
	  }
	  
	  
	  
	  var enviarResenaRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	$.post(direccionLeerResenas,parametrosResena, leerResenaRespondio,"json").fail(leerResenaError);
	        	$('#enviar-resena').hide();
	        } else{

	        }
	  }
	  
	  var enviarResenaError = function (datos) {
		  console.log(datos);
	  }
	  
	  $('#forma-calificar').submit(function tokenizar(event){
		  $('#forma-boton-calificar').prop('value', 'Enviando...');
		  
		  if (enviandoCalificacion) {
			  console.log("regresa");
			  return;
		  }
		  enviandoCalificacion = true;
		  
		  var titulo = $('#titulo-comentario').val();
		  var comentario = $('#comentario').val();
		  
		  var parametros = {token: leerToken(), idDream: id, titulo: titulo, comentario: comentario, calificacion: calificacion};
		  $.post(direccionEnviarResena, parametros, enviarResenaRespondio, "json").fail(enviarResenaError);
	  });
	  
	  
	  $('#calificacion1').click(function(){
		  calificacion = 1;
		  $('#calificacion1').prop('src','../images/star.png');
		  $('#calificacion1').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion2').prop('src','../images/star-unset.png');
		  $('#calificacion2').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
		  $('#calificacion3').prop('src','../images/star-unset.png');
		  $('#calificacion3').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
		  $('#calificacion4').prop('src','../images/star-unset.png');
		  $('#calificacion4').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
		  $('#calificacion5').prop('src','../images/star-unset.png');
		  $('#calificacion5').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
	  });
	  $('#calificacion2').click(function(){
		  calificacion = 2;
		  $('#calificacion1').prop('src','../images/star.png');
		  $('#calificacion1').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion2').prop('src','../images/star.png');
		  $('#calificacion2').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion3').prop('src','../images/star-unset.png');
		  $('#calificacion3').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
		  $('#calificacion4').prop('src','../images/star-unset.png');
		  $('#calificacion4').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
		  $('#calificacion5').prop('src','../images/star-unset.png');
		  $('#calificacion5').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
	  });
	  $('#calificacion3').click(function(){
		  calificacion = 3;
		  $('#calificacion1').prop('src','../images/star.png');
		  $('#calificacion1').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion2').prop('src','../images/star.png');
		  $('#calificacion2').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion3').prop('src','../images/star.png');
		  $('#calificacion3').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion4').prop('src','../images/star-unset.png');
		  $('#calificacion4').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
		  $('#calificacion5').prop('src','../images/star-unset.png');
		  $('#calificacion5').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
	  });
	  $('#calificacion4').click(function(){
		  calificacion = 4;
		  $('#calificacion1').prop('src','../images/star.png');
		  $('#calificacion1').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion2').prop('src','../images/star.png');
		  $('#calificacion2').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion3').prop('src','../images/star.png');
		  $('#calificacion3').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion4').prop('src','../images/star.png');
		  $('#calificacion4').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion5').prop('src','../images/star-unset.png');
		  $('#calificacion5').prop('srcset','../images/star-unset-p-500.png 500w, ../images/star-unset-p-800.png 800w, ../images/star-unset-p-1080.png 1080w, ../images/star-unset.png 1211w');
	  });
	  $('#calificacion5').click(function(){
		  calificacion = 5;
		  $('#calificacion1').prop('src','../images/star.png');
		  $('#calificacion1').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion2').prop('src','../images/star.png');
		  $('#calificacion2').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion3').prop('src','../images/star.png');
		  $('#calificacion3').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion4').prop('src','../images/star.png');
		  $('#calificacion4').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
		  $('#calificacion5').prop('src','../images/star.png');
		  $('#calificacion5').prop('srcset','../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w');
	  });

	  
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