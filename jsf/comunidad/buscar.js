(function ($){
  jQuery("document").ready(function(){
	  
	  var direccionComunidad = "api/1.0.0/interfaz/comunidad/buscar/";
	  $('#usuarios-lista').html('');
	  
	  var comunidadRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarBusqueda(datos.usuarios);
	        } else{
	        	
	        }
	  }
	  
	  var comunidadError = function (datos) {
		  console.log(datos);
	  }
	  
	  $('#buscar').keypress(function(){

		  
		  var nombreUsuario = $(this).val().replace('@','');
		  
		  var parametros = {nombreUsuario: nombreUsuario};
		  $.post(direccionComunidad, parametros, comunidadRespondio, "json").fail(comunidadError);
	  });
	  
	  
	  
	  function llenarBusqueda(usuarios)
	  {
        var usuariosHTML = "";
		  $.each(usuarios, function(index, usuario) {          
	            
			  
			  usuariosHTML += "<li id='" + usuario.id + "' class='comunidad-buscar-item' onclick='usuarioSeleccionado(this)'  style='cursor: pointer; cursor: hand;'>" +
			  		"<div>@" + usuario.nombreDeUsuario + "</div>" +
			  		"</li>";
		  });
		  $('#usuarios-lista').html(usuariosHTML);
	  }
	  
	  
  });
})(jQuery);

function usuarioSeleccionado(usuario) {
	window.location.replace("dreamer/cuenta.html?&usuario="+usuario.id);
}