/* Initialize */
$('#prev').addClass('ui-disabled');
$('#next').addClass('ui-disabled');
var audiofile;
var tmplocalpath;
var page; 

document.addEventListener("deviceready", onDeviceReady, false);

/** System loaded when the phone is ready **/
	function onDeviceReady() {
		//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		
		getdata();
		$('#prev').removeClass('ui-disabled');
		$('#next').removeClass('ui-disabled');
		goQuestion("1",'');
	}
	
	/** Function **/   
	function getdata(){				
		  /* Load question from server*/
			$.getJSON('http://beta.completemr.com/ilink/mytest/index.php', function(data) {
				var lquestionObj = localStorage.getItem("questionObj");
				if(lquestionObj){
					localStorage.removeItem('questionObj');
				}				

				$.each(data, function(key, val) {
					if("extra" in val){
						if("audio" in val['extra']){ 
							/** Download to local if detect audio is available **/
							download(val['extra']['audio']);	
							
							loopcheck=  setInterval(function() {
				         if(tmplocalpath === undefined){
				         		//Waiting for downloading end
				         }else{
				         	clearInterval(loopcheck);
				         	data[key]['extra']['audio_local'] = tmplocalpath;		
				         	localStorage.removeItem('questionObj');	
				         	localStorage.setItem('questionObj', JSON.stringify(data));				         
				        }
				       }, 1000);
						}
					}
				});
				
				localStorage.setItem('questionObj', JSON.stringify(data));			
			});			
	}
	
	  function goQuestion(quest_num,loadtype){
			// Set Page
			if(quest_num != ""){
				page =quest_num;
				page = parseInt(page);
			}
			// Set Navigation
			if(loadtype != ""){
				if(loadtype == "prev"){
					page -= 1;
				}else{
					page += 1;
				}
			}
			
			//Retrieve object from local Storage
			checkobj=  setInterval(function() {
				var retrievedObject = localStorage.getItem('questionObj');
			   if(retrievedObject === null){
			   		getdata();
			   }else{
				  clearInterval(checkobj);
				  reset_div();
				  $.each(JSON.parse(retrievedObject), function(key, val) {				  	
				  	if(page == key){
				  		localStorage.setItem('valObj', JSON.stringify(val));
				  		localStorage.setItem('curQuest', val['name']);
				  		if(page == '1'){
					  		$('#prev').addClass('ui-disabled');
					  	}else{
					  		$('#prev').removeClass('ui-disabled');	
					  	}
				  	
				  		if(val["to"] == 'end'){
					  		$('#next').addClass('ui-disabled');
					  	}else{
					  		$('#next').removeClass('ui-disabled');
					  	}
					  	
					  	//Display Question title
					  	$("#question").html(val["question"]);
					  	temp ="";	
					  	//Question Type : multiplechoice
					  	if(val['type'] == "multiplechoice"){	  		
								$.getScript("js/lib/multiplechoice.js");
					  	}
					  	
					  	//Question Type : multiplecheck
					  	if(val['type'] == "multiplecheck"){	  		
								$.getScript("js/lib/multiplecheck.js");
					  	}						
					  	
					  	//Question Type : choicesingle
					  	if(val['type'] == "choicesingle"){
									$.getScript("js/lib/choicesingle.js");
					  	}
					  	
					  	//Question Type : textinput
					  	if(val['type'] == "textinput"){
								$.getScript("js/lib/textinput.js");
					  	}
					  	
					  	//Question Type : selectrating
					  	if(val['type'] == "selectrating"){
								$.getScript("js/lib/selectrating.js");
					  	}
					  }
				  });
			  }
			 }, 1000);
		
		}
						
		function submitAnswer(loadtype){
			// get answer 
			var curQuest = localStorage.getItem('curQuest');
			var ans = $("form").serialize();
			var err = "0";
		//	var ans = $("input:[type=name]"+curQuest).attr("value");
		  var geo = ans.split("&");
		  
		  var keys=new Array();
		  
			for(var i=0; i < geo.length ; i++){
				var qa = geo[i].split("=");
				var res = qa[0].split("_");
				keys[i] = res[0]+"_";
			}

			for(var i=0; i < geo.length ; i++){
				var qa = geo[i].split("=");

				if(jQuery.inArray(curQuest,keys) == "-1"){
					localStorage.setItem('errMsg', "Oops! You have not made a selection. Please try again");
					err = "1";
				}else{
					var chkchild = qa[0].indexOf(curQuest);
					
					if(chkchild == 0){
						var child = qa[0].split("_");
						
						if((curQuest == child[0]+"_") && (qa[1] == "")){
							localStorage.setItem('errMsg', "Opps, please fill in the answer!");
							err = "1";
						}
					}
					
					else if((curQuest == qa[0]) && (qa[1] == "")){
						localStorage.setItem('errMsg', "Opps, you must select an answer!");
						err = "1";
					}
				}
				
			}
			
			//proceed to next question
			if(err == "0"){
				goQuestion('',loadtype);
			}else if(err == "1"){
				var errMsg = localStorage.getItem('errMsg');
				alert(errMsg);
			}
			
		}