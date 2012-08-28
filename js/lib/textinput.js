$.getScript("js/extra.js");
	var valObject = localStorage.getItem('valObj');

	var arr =JSON.parse(valObject);
	var temp = "";
  $("#textinput").show();			
 	$("#textinput").html(function(){
  
		temp += checkExtra(arr);
		
 		temp +='<input type="text" name="name" id="basic" data-mini="true" />';
 		 return temp;
 	});		
 	
 	$("#textinput").trigger("create");
 	
 		//Remove tempararily local storage   
	localStorage.removeItem('valObj');  