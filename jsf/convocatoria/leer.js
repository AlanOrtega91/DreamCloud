(function ($){
  jQuery("document").ready(function(){
	  var direccionDream = "../api/1.0.0/interfaz/convocatoria/leer/";
	  
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
	  var admin = $.urlParam('admin');
	  
	  var leerDreamRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarConvocatoria(datos.convocatoria);
	        } else{

	        }
	  }
	  
	  var leerDreamError = function (datos) {
		  console.log(datos);
		  mostrarError("Error con el servidor");
	  }
	  
	  var parametrosDream = {id: id};
	  $.post(direccionDream,parametrosDream, leerDreamRespondio,"json").fail(leerDreamError);
	  

	  
	  function llenarConvocatoria(convocatoria)
	  {
		  $('#tema').html(convocatoria.tema);
		  if(admin == 1) {
			  $('#titulo').html(convocatoria.titulo + " (" + convocatoria.idConvocatoria + ")");
			  $('#nombre').html(convocatoria.nombre + " " + convocatoria.apellido + " (" + convocatoria.idUsuario + ")");
			  $('#nombreUsuario').html("@" + convocatoria.nombreDeUsuario + " (" + convocatoria.email + ")");
		  } else {
			  $('#titulo').html(convocatoria.titulo);
			  $('#nombre').html(convocatoria.nombre);
			  $('#nombreUsuario').html("@" + convocatoria.nombreDeUsuario);
		  }
		  $('#categoria').html(convocatoria.categoria);
		  $('#subcategoria').html(convocatoria.subcategoria);
		  $('#genero').html(convocatoria.genero);
		  if(convocatoria.imagen) {
			  $('#imagen').prop('src','../recursos/convocatorias/' + convocatoria.imagen);
			  $('#imagen').prop('srcset','');
		  } else {
			  $('.dream').hide();
		  }
		  if(convocatoria.avatar) {
			  $('#imagen-perfil').prop('src','../recursos/socios/' + convocatoria.avatar);
			  $('#imagen-perfil').prop('srcset','');
		  }
		  $('#participar').prop('href','../dreams/subir.html')
	  }	  
  });
})(jQuery);