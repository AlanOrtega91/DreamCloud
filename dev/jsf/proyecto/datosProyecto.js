(function ($){
  jQuery("document").ready(function(){
	  //Categoria-----------------------------------------------------------------
	  var categoriasBuscar = "http://dclouding.com/dev/api/1.0.0/interfaz/proyecto/categorias/";	  
	  
	  var categoriaRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarCategorias(datos.categorias);
	        } else{
	        	
	        }
	  }
	  
	  var categoriaError = function (datos) {
		  console.log(datos);
	  }
	  
	  function llenarCategorias(categorias) {
		  var categoriasHTML = "<option value=no>Selecciona una Categoría</option>";
		  $.each(categorias, function(index, value) {
			  categoriasHTML += "<option value=" + value.id + ">" + value.nombreESP + "</option>";
		  });
		  $('#categorias').html(categoriasHTML);
	  }
	  
	  $.post(categoriasBuscar, categoriaRespondio,"json").fail(categoriaError);

	  
	  
	  //SubCategoria--------------------------------------------------------------
	  var subcategoriasBuscar = "http://dclouding.com/dev/api/1.0.0/interfaz/proyecto/subcategorias/";	  
	  
	  var subcategoriasRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarSubategorias(datos.subcategorias);
	        } else{
	        	
	        }
	  }
	  
	  var subcategoriasError = function (datos) {
		  console.log(datos);
	  }
	  
	  function llenarSubategorias(subcategorias) {
		  var subcategoriasHTML = "<option value=no>Selecciona una Subcategoría</option>";
		  $.each(subcategorias, function(index, value) {
			  subcategoriasHTML += "<option value=" + value.id + ">" + value.nombreESP + "</option>";
		  });
		  $('#subcategorias').html(subcategoriasHTML);
	  }
	  
	  $('#categorias').change(function (){
		  var idCategoria = $(this).val();
		  var parametros = {idCategoria: idCategoria};
		  $.post(subcategoriasBuscar, parametros, subcategoriasRespondio,"json").fail(subcategoriasError);
		  $.post(generosBuscar, parametros, generosRespondio,"json").fail(generosError);
	  });
	  
	  //Generos--------------------------------------------------------------
	  var generosBuscar = "http://dclouding.com/dev/api/1.0.0/interfaz/proyecto/generos/";	  
	  
	  var generosRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	llenarGeneros(datos.generos);
	        } else{
	        	
	        }
	  }
	  
	  var generosError = function (datos) {
		  console.log(datos);
	  }
	  
	  function llenarGeneros(generos) {
		  var generosHTML = "<option value=no>Selecciona un Genero</option>";
		  $.each(generos, function(index, value) {
			  generosHTML += "<option value=" + value.id + ">" + value.nombreESP + "</option>";
		  });
		  $('#generos').html(generosHTML);
	  }

	  
  });
})(jQuery);