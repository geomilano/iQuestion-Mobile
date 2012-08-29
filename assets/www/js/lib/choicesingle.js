
	var valObject = localStorage.getItem('valObj');
	$("#displayquestion").show();					
	    var arr =JSON.parse(valObject);
			temp ='<fieldset data-role="controlgroup">';
			$.each(arr['answer'], function(k, child) {
				temp += '<input type="radio" id="radio-choice-'+k+'" name="'+arr['name']+'" value="'+k+'" />';
			  temp += '<label for="radio-choice-'+k+'">'+child+'</label>';
			});	
			temp +='</fieldset>';		
			
	
		$("#displayquestion").html(temp);
	
	$("#displayquestion").trigger("create");


	//Remove tempararily local storage
	localStorage.removeItem('valObj');

	
	