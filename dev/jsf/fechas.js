(function ($){
  jQuery("document").ready(function(){
	  
	  function daysInMonth(month, year) {
		  return new Date(year, month, 0).getDate();
		}
	  
	  $('#mes-nacimiento').html("<option value=''>mm</option>" +
	  		"<option value='01'>01</option>" +
	  		"<option value='02'>02</option>" +
	  		"<option value='03'>03</option>" +
	  		"<option value='04'>04</option>" +
	  		"<option value='05'>05</option>" +
	  		"<option value='06'>06</option>" +
	  		"<option value='07'>07</option>" +
	  		"<option value='08'>08</option>" +
	  		"<option value='09'>09</option>" +
	  		"<option value='10'>10</option>" +
	  		"<option value='11'>11</option>" +
	  		"<option value='12'>12</option>");
	  
	  $('#anio-nacimiento').html("<option value=''>yyyy</option>");
	  for (var i = new Date().getFullYear() ; i > 1915 ; i--) {
		  $('#anio-nacimiento').append("<option value='" + i + "'>" + i + "</option>");
	  }
	  
	  llenarDias(31);
	  
	  function llenarDias(dias){
		  $('#dia-nacimiento').html("<option value=''>dd</option>");
		  for (var i = 0 ; i <= dias ; i++) {
			  if(i < 10) {
				  $('#dia-nacimiento').append("<option value='0" + i + "'>0" + i + "</option>");
			  } else {
				  $('#dia-nacimiento').append("<option value='" + i + "'>" + i + "</option>");
			  }
		  }
	  }
	  
	  $('#anio-nacimiento, #mes-nacimiento').change(function(){
		  var dias = daysInMonth($('#mes-nacimiento').val(), $('#anio-nacimiento').val());
		  llenarDias(dias);
	  });
  });
})(jQuery);