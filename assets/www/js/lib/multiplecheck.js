
	var valObject = localStorage.getItem('valObj');
	var arr =JSON.parse(valObject);
  $("#desc").html("Please Choose:");
	$("#displayquestion").show();
	
	temp ='<fieldset data-role="controlgroup" data-type="horizontal">';

	$.each(arr['answer'], function(k, child) {
				temp = temp +'<input type="checkbox" name="'+arr['name']+k+'" id="checkbox-'+k+'" class="custom" /><label for="checkbox-'+k+'">'+child+'</label>';
	});		
	temp +='</fieldset>';	
	$("#displayquestion").html(temp);
	$("#displayquestion").trigger("create");
	
	//Remove tempararily local storage   
	localStorage.removeItem('valObj');   
