
	var valObject = localStorage.getItem('valObj');
	console.log(valObject );
	$("#displayquestion").show();					
	    var arr =JSON.parse(valObject);
			temp ='<fieldset data-role="controlgroup">';
			$.each(arr['Items']['0']['info'], function(k, child) {
				temp += '<input type="radio" id="radio-choice-'+child['value']+'" name="'+arr['Name']+'" value="'+child['value']+'" />';
			  temp += '<label for="radio-choice-'+child['value']+'">'+child['text']+'</label>';
			});	
			temp +='</fieldset>';		
			
	
		$("#displayquestion").html(temp);
	
	$("#displayquestion").trigger("create");


	//Remove tempararily local storage
	localStorage.removeItem('valObj');

	
	