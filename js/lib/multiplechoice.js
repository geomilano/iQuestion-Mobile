
	var valObject = localStorage.getItem('valObj');
	 var arr =JSON.parse(valObject);
	$("#desc").html("Please Choose:");
	$("#multiplechoice").show();
	temp ='<span class="ui-li-count ui-btn-up-c ui-btn-corner-all" style="display: none; ">0</span>';
	temp +='<select name="select-choice-10" id="select-choice-10s" multiple="multiple" data-native-menu="false" tabindex="-1">';
	temp +="<option>Choose options</option>";
	$.each(arr['answer'], function(k, child) {
			temp = temp +'<option value="'+k+'">'+child+'</option>';
	});		
	temp += '</select>';
	$("#multiplechoice").html(temp);
	$("#multiplechoice").trigger("create");
	//Remove tempararily local storage
	localStorage.removeItem('valObj');