
	var valObject = localStorage.getItem('valObj');
	 var arr =JSON.parse(valObject);
	$("#displayquestion").show();			
	$("#displayquestion").html(function(){
		temp += '<table>';
		$.each(arr['answer'], function(k, child) {
			temp += '<tr><td>'+child+'</td><td><input type="number" name="'+arr['name']+k+'" id="selectratinginput" data-mini="true" /></td></tr>';
		});
		temp += '</table>';
		 return temp;
	});		
	$("#displayquestion").trigger("create");
	
	//Remove tempararily local storage   
	localStorage.removeItem('valObj');  