$.getScript("js/extra.js");
	var valObject = localStorage.getItem('valObj');

	var arr =JSON.parse(valObject);
	var temp = "";
  $("#displayquestion").show();		
  $("#desc").show();		
  $("#desc").show('Please type your response');		

 	$("#displayquestion").html(function(){
 
 		temp +=' <textarea name="'+arr['Name']+'" id="textarea"></textarea>';
 		 return temp;
 	});		
 	
 	$("#displayquestion").trigger("create");
 	
 		//Remove tempararily local storage   
	localStorage.removeItem('valObj');  