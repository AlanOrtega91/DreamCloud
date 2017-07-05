(function ($){
  jQuery("document").ready(function(){
	  
	  $('#dreamsList').html('');
	//SubCategoria--------------------------------------------------------------
	  var subcategoriasBuscar = "../api/1.0.0/interfaz/proyecto/subcategorias/";	  
	  
	  var subcategoriasRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	var subcategorias = datos.subcategorias;
	        	llenarSubcategorias(subcategorias);
	        } else{
	        	
	        }
	  }
	  
	  var subcategoriasError = function (datos) {
		  console.log(datos);
	  }
	  
	  function llenarSubcategorias(subcategorias) {
		  var subcategoriasHTML = "<option value='-1'>Subcategoría</option>";
		  $.each(subcategorias, function(index, value) {
			  subcategoriasHTML += "<option value=" + value.id + ">" + value.nombreESP + "</option>";
		  });
		  $('#subcategorias').html(subcategoriasHTML);
	  }
	  
	  //Generos--------------------------------------------------------------
	  var generosBuscar = "../api/1.0.0/interfaz/proyecto/generos/";	  
	  
	  var generosRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	var generos = datos.generos;
	        	llenarGeneros(generos);
	        } else{
	        	
	        }
	  }
	  
	  var generosError = function (datos) {
		  console.log(datos);
	  }
	  
	  function llenarGeneros(generos) {
		  var generosHTML = "<option value='-1'>Genero</option>";
		  $.each(generos, function(index, value) {
			  generosHTML += "<option value=" + value.id + ">" + value.nombreESP + "</option>";
		  });
		  $('#generos').html(generosHTML);
	  }
	  
	  var parametros = {idCategoria: 1};
	  $.post(subcategoriasBuscar, parametros, subcategoriasRespondio,"json").fail(subcategoriasError);
	  $.post(generosBuscar, parametros, generosRespondio,"json").fail(generosError);
	  
	  var direccionDreams = "../api/1.0.0/interfaz/proyecto/buscar-dreams/";
	  
	  var dreamsRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarDreams(datos.proyectos);
	        } else{
	        	
	        }
	  }
	  
	  var dreamsError = function (datos) {
		  console.log(datos);
	  }
	  
	  $('#forma').submit(function (event){

		  
		  var idSubcategoria = $('#subcategorias').val();
		  var idGenero = $('#generos').val();
		  var extra = $('#extra').val();
		  var texto = $('#texto').val();
		  
		  var parametros = {categoria: 1, subcategoria: idSubcategoria, genero: idGenero, extra: extra, texto: texto, admin: 0};
		  $.post(direccionDreams, parametros, dreamsRespondio, "json").fail(dreamsError);
	  });
	  
	  
	  
	  function llenarDreams(dreams)
	  {
        var dreamsHTML = "";
		  $.each(dreams, function(index, dream) {          
	            
			  
			  dreamsHTML += "<li id='" + dream.idDream + "' class='list-item' onclick='dreamSeleccionado(this)' style='cursor: pointer; cursor: hand;'>" +
			  		"<div class='blue list-row w-row'>" +
			  		"<div class='list-colum-left w-clearfix w-col w-col-9'>" +
			  		"<div class='list-left-block w-clearfix'>" +
			  		"<h3 class='dream-list-title'>"+ dream.titulo + "</h3>";

			  var calificacion = Math.round(dream.calificacion);
			  for (var i=0; i < calificacion; i++)
			  {
				  dreamsHTML += "<img height='25' sizes='(max-width: 767px) 25px, (max-width: 991px) 3vw, 25px' src='../images/star.png' srcset='../images/star-p-500.png 500w, ../images/star-p-800.png 800w, ../images/star-p-1080.png 1080w, ../images/star.png 1211w' width='25'>";
			  }

      
			  
			  dreamsHTML += "<p class='dream-list-description'>"+ dream.sinopsis +"</p>" +
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

		  });
		  $('#dreamsList').html(dreamsHTML);
	  }
	  
  });
})(jQuery);

function dreamSeleccionado(dream) {
	window.location.replace("../dreams/dream.html?&dream="+dream.id);
}