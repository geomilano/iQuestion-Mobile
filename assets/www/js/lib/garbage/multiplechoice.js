
	var valObject = localStorage.getItem('valObj');
	 var arr =JSON.parse(valObject);
	$("#desc").html("Please Choose:");
	$("#displayquestion").show();
	temp ='<span class="ui-li-count ui-btn-up-c ui-btn-corner-all" style="display: none; ">0</span>';
	temp +='<select name="'+arr['name']+'" id="select-choice-10s" multiple="multiple" data-native-menu="false" tabindex="-1">';
	temp +="<option>Choose options</option>";
	$.each(arr['answer'], function(k, child) {
			temp = temp +'<option value="'+k+'">'+child+'</option>';
	});		
	temp += '</select>';
	$("#displayquestion").html(temp);
	$("#displayquestion").trigger("create");
	//Remove tempararily local storage
	localStorage.removeItem('valObj');