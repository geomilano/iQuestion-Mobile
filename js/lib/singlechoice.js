
	var valObject = localStorage.getItem('valObj');
	$("#singlechoice").show();					
	    var arr =JSON.parse(valObject);
			temp ='<fieldset data-role="controlgroup">';
			$.each(arr['answer'], function(k, child) {
				temp += '<input type="radio" name="radio-choice-1" id="radio-choice-'+k+'" value="'+k+'" />';
			  temp += '<label for="radio-choice-'+k+'">'+child+'</label>';
			});	
			temp +='</fieldset>';		
			
	
		$("#singlechoice").html(temp);
	
	$("#singlechoice").trigger("create");


	//Remove tempararily local storage
	localStorage.removeItem('valObj');

	
	