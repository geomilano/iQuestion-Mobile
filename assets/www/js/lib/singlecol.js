
	var valObject = localStorage.getItem('valObj');
	console.log(valObject );
	$("#displayquestion").show();					
	var arr =JSON.parse(valObject);
	temp ='<fieldset data-role="controlgroup">';
		
			for(i=0; i <= 1; i++){
				if(arr['Items'][i]['coordinate'] == 'x'){
					temp +='<table ><tr><td width="100px">&nbsp;</td>';	
					$.each(arr['Items'][i]['info'], function(k, child) {
						
							temp += '<td width="100px" align="right">'+child['text']+"</td>";
						
					});	
					temp +='</tr></table>';	
				}
			}

			for(j=0; j <= 1; j++){
				if(arr['Items'][j]['coordinate'] == 'y'){
					temp +='<table border ="1">';	
					$.each(arr['Items'][j]['info'], function(k, child) {
						
							temp += '<tr><td width="100px">'+child['text']+'</td><td width="100px"></td><td width="100px"></td><td width="100px"></td></tr>';
						
					});	
					temp +='</table>';	
				}
			}
			
			
			
			temp +='</fieldset>';		
			
	 	console.log(temp);
	
		$("#displayquestion").html(temp);
	
	$("#displayquestion").trigger("create");


	//Remove tempararily local storage
	localStorage.removeItem('valObj');

	
	