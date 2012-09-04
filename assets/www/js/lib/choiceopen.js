$.getScript("js/extra.js");
	var valObject = localStorage.getItem('valObj');

	var arr =JSON.parse(valObject);
	var temp = "<table>";
  $("#displayquestion").show();			
 	$("#displayquestion").html(function(){
	 	$.each(arr['Items']['0']['info'], function(k, child) {
	 		temp += "<tr><td>"+child['text'] + '</td><td><input type="text" name="'+arr['Name']+'" id="basic" data-mini="true" /></td></td>';
	 	});	
	 	
	 	temp += "</table>";
 		 return temp;
 	});		
 	
 	$("#displayquestion").trigger("create");
 	
 		//Remove tempararily local storage   
	localStorage.removeItem('valObj');  