$.getScript("js/extra.js");
	var valObject = localStorage.getItem('valObj');

	var arr =JSON.parse(valObject);
	var temp = "";
  $("#displayquestion").show();			
 	$("#displayquestion").html(function(){
 		 return "";
 	});		
 	
 	$("#displayquestion").trigger("create");
 	
 		//Remove tempararily local storage   
	localStorage.removeItem('valObj');  