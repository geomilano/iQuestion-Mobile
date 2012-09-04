
	var valObject = localStorage.getItem('valObj');
	 var arr =JSON.parse(valObject);
	$("#displayquestion").show();			
	$("#displayquestion").html(function(){
		temp += '<table>';
		$.each(arr['Items']['0']['info'], function(k, child) {
			temp += '<tr><td>'+child['text']+'</td><td><input type="number" name="'+arr['Name']+child['value']+'" id="selectratinginput" data-mini="true" /></td></tr>';
		});
		temp += '</table>';
		 return temp;
	});		
	$("#displayquestion").trigger("create");
	
	//Remove tempararily local storage   
	localStorage.removeItem('valObj');  