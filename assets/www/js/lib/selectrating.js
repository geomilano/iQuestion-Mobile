
	var valObject = localStorage.getItem('valObj');
	 var arr =JSON.parse(valObject);
	$("#selectrating").show();			
	$("#selectrating").html(function(){
		temp += '<table>';
		$.each(arr['answer'], function(k, child) {
			temp += '<tr><td>'+child+'</td><td><input type="number" name="selectrating" id="selectratinginput" data-mini="true" /></td></tr>';
		});
		temp += '</table>';
		 return temp;
	});		
	$("#selectrating").trigger("create");
	
	//Remove tempararily local storage   
	localStorage.removeItem('valObj');  