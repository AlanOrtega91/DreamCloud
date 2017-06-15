(function ($){
  jQuery("document").ready(function(){
	  //Categoria-----------------------------------------------------------------
	  var categoriasBuscar = "../api/1.0.0/interfaz/proyecto/categorias/";
	  var categorias = [];
	  var subcategorias = [];
	  var generos = [];
	  
	  var categoriaRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	categorias = datos.categorias;
	        	llenarCategorias();
	        } else{
	        	
	        }
	  }
	  
	  var categoriaError = function (datos) {
		  console.log(datos);
	  }
	  
	  function llenarCategorias() {
		  var categoriasHTML = "<option value='-1'>Selecciona una Categoría</option>";
		  $.each(categorias, function(index, value) {
			  categoriasHTML += "<option value=" + value.id + ">" + value.nombreESP + "</option>";
		  });
		  $('#categorias').html(categoriasHTML);
	  }
	  
	  $.post(categoriasBuscar, categoriaRespondio,"json").fail(categoriaError);

	  
	  
	  //SubCategoria--------------------------------------------------------------
	  var subcategoriasBuscar = "../api/1.0.0/interfaz/proyecto/subcategorias/";	  
	  
	  var subcategoriasRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	subcategorias = datos.subcategorias;
	        	llenarSubcategorias();
	        } else{
	        	
	        }
	  }
	  
	  var subcategoriasError = function (datos) {
		  console.log(datos);
	  }
	  
	  function llenarSubcategorias() {
		  var subcategoriasHTML = "<option value=n'-1'>Selecciona una Subcategoría</option>";
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
	  var generosBuscar = "../api/1.0.0/interfaz/proyecto/generos/";	  
	  
	  var generosRespondio = function (datos){
		  console.log(datos);
	        if(datos.status == "ok"){
	        	generos = datos.generos;
	        	llenarGeneros();
	        } else{
	        	
	        }
	  }
	  
	  var generosError = function (datos) {
		  console.log(datos);
	  }
	  
	  function llenarGeneros() {
		  var generosHTML = "<option value='-1'>Selecciona un Genero</option>";
		  $.each(generos, function(index, value) {
			  generosHTML += "<option value=" + value.id + ">" + value.nombreESP + "</option>";
		  });
		  $('#generos').html(generosHTML);
	  }

	  $('#proyectos').change(function (){
		  var idProyectoSeleccionado = $(this).val();
		  if (idProyectoSeleccionado == '-1') {
			  llenarCategorias();
			  llenarSubcategorias();
			  llenarGeneros();
		  }
	  });
  });
})(jQuery);