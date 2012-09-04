
	var valObject = localStorage.getItem('valObj');
	$("#displayquestion").show();					
	    var arr =JSON.parse(valObject);
      temp ='<fieldset data-role="controlgroup" >';
			$.each(arr['Items']['0']['info'], function(k, child) {
						temp = temp +'<input type="checkbox" name="'+arr['Name']+child['value']+'" id="checkbox-'+child['value']+'" class="custom" /><label for="checkbox-'+child['value']+'">'+child['text']+'</label>';
			});		
			temp +='</fieldset>';		
			
	
		$("#displayquestion").html(temp);
	
	$("#displayquestion").trigger("create");


	//Remove tempararily local storage
	localStorage.removeItem('valObj');

	
	