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
		goQuestion("q1_",'');
	}
	
	/** Function **/   
	function getdata(){				
		  /* Load question from server
		     Demo Link: http://beta.completemr.com/ilink/mytest/index.php
		  */
		 
			$.getJSON('http://beta.completemr.com/ilink/iquestion_mobile_api-1.0/index.php?p=getsurvey&survey_id=Q941404', function(data) {
				var lquestionObj = localStorage.getItem("questionObj");
				if(lquestionObj){
					localStorage.removeItem('questionObj');
				}				

//				$.each(data['ProjectContent'], function(key, val) {
//					if(val['Type'] == 'audio'){
//							/** Download to local if detect audio is available **/
//							download(val['QAudio']);	
//							
//							loopcheck=  setInterval(function() {
//				         if(tmplocalpath === undefined){
//				         		//Waiting for downloading end
//				         }else{
//				         	clearInterval(loopcheck);
//				         	data[key]['QAudio_local'] = tmplocalpath;		
//				         	localStorage.removeItem('questionObj');	
//				         	localStorage.setItem('questionObj', JSON.stringify(data['ProjectContent']));				         
//				        }
//				       }, 1000);
//						
//					}
//				});
				
				localStorage.setItem('questionObj', JSON.stringify(data['ProjectContent']));			
			});			
	}
	
	  function goQuestion(quest_num,loadtype){
			// Set Page
			if(quest_num != ""){
				page =quest_num;
			//	page = parseInt(page);
			}
			// Set Navigation
			if(loadtype != ""){
				if(loadtype == "prev"){
					var prevQuest = localStorage.getItem('prevQuest');
					page = prevQuest;
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
				  		localStorage.setItem('curQuest', val['Name']);
				  		if(page == 'q1_'){
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
					  	$("#question").html(val["Query"]);
					  	temp ="";	
					  	//Question Type : multiplechoice
					  	if(val['Type'] == "multiplechoice"){	  		
								$.getScript("js/lib/multiplechoice.js");
					  	}
					  	
					  	//Question Type : choicemultiple
					  	if(val['Type'] == "choicemultiple"){	  		
								$.getScript("js/lib/choicemultiple.js");
					  	}
					  	
					  	//Question Type : choicemultiple
					  	if(val['Type'] == "choiceopen"){	  		
								$.getScript("js/lib/choiceopen.js");
					  	}
					  	
					  	//Question Type : comment
					  	if(val['Type'] == "comment"){	  		
								$.getScript("js/lib/comment.js");
					  	}
					  	
					  	//Question Type : intro
					  	if(val['Type'] == "intro"){	  		
								$.getScript("js/lib/intro.js");
					  	}
					  	
					  	//Question Type : singlecol
					  	if(val['Type'] == "singlecol"){	  		
								$.getScript("js/lib/singlecol.js");
					  	}
					  	
					  	//Question Type : multiplecheck
					  	if(val['Type'] == "multiplecheck"){	  		
								$.getScript("js/lib/multiplecheck.js");
					  	}						
				
					  	//Question Type : choicesingle
					  	if(val['Type'] == "choicesingle"){
									$.getScript("js/lib/choicesingle.js");
					  	}
					  	
					  	//Question Type : textinput
					  	if(val['Type'] == "textinput"){
								$.getScript("js/lib/textinput.js");
					  	}
					  	
					  	//Question Type : ranking
					  	if(val['Type'] == "ranking"){
								$.getScript("js/lib/ranking.js");
					  	}
					  }
				  });
			  }
			 }, 1000);
		
		}
						
		function submitAnswer(loadtype){
			// get answer 
			var curQuest = localStorage.getItem('curQuest');			
			var retrievedObject = localStorage.getItem('questionObj');
			var ans = $("form").serialize();
			var err = "0";
			var nextQuest = "";
			var Qtype = "";
			$.each(JSON.parse(retrievedObject), function(key, val) {	
				 if(curQuest == key){
				 	
				  	nextQuest =	 val['Next'];
				  	Qtype =	 val['Type'];
				  		
				 }
			});

//			if(Qtype != "intro"){
//			  var geo = ans.split("&");
//			  
//			  var keys=new Array();
//			  
//				for(var i=0; i < geo.length ; i++){
//					var qa = geo[i].split("=");
//					var res = qa[0].split("_");
//					keys[i] = res[0]+"_";
//				}
//	
//				for(var i=0; i < geo.length ; i++){
//					var qa = geo[i].split("=");
//	
//					if(jQuery.inArray(curQuest,keys) == "-1"){
//						localStorage.setItem('errMsg', "Oops! You have not made a selection. Please try again");
//						err = "1";
//					}else{
//						var chkchild = qa[0].indexOf(curQuest);
//						
//						if(chkchild == 0){
//							var child = qa[0].split("_");
//							
//							if((curQuest == child[0]+"_") && (qa[1] == "")){
//								localStorage.setItem('errMsg', "Opps, please fill in the answer!");
//								err = "1";
//							}
//						}
//						
//						else if((curQuest == qa[0]) && (qa[1] == "")){
//							localStorage.setItem('errMsg', "Opps, you must select an answer!");
//							err = "1";
//						}
//					}
//				}
//			}
			//proceed to next question
			
			if(err == "0"){
				localStorage.setItem('prevQuest',curQuest);
				goQuestion(nextQuest,'');
			}else if(err == "1"){
				var errMsg = localStorage.getItem('errMsg');
				alert(errMsg);
			}
			
		}