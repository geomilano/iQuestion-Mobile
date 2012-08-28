document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		$('#play').click(function(){

 		var names = $('#play').attr('value');
			if(names == 'Play'){
				playAudio(audiofile);
				$('#play').attr('value','Pause');
				$('#play').attr('data-icon','audio-pause');
        $('#play').children().children().next().removeClass('ui-icon-audio-play').addClass('ui-icon-audio-pause');
			}else{
				pauseAudio();
				$('#play').attr('value','Play');
				$('#play').attr('data-icon','audio-play');
				$('#play').children().children().next().removeClass('ui-icon-audio-pause').addClass('ui-icon-audio-play');
			}
		});
		
		$('#stop').click(function(){
			stopAudio();
			// reset slider
			$('#slider').val(0);
			$('#slider').slider('refresh');
			
		  $('#pause').button('disable');
			$('#play').attr('value','Play');
			$('#play').attr('data-icon','audio-play');
			$('#play').children().children().next().removeClass('ui-icon-audio-pause').addClass('ui-icon-audio-play');
		});
		

	  var audiopos = 0 ;
		$('#audioPosition').bind('swiperight', function(){
			changeAudioPosition();
    });
    
    $('#audioPosition').bind('swipeleft', function(){			
			 changeAudioPosition();
    });
    
		$('#audioPosition').live('touchend', function() {
			changeAudioPosition();
		});
	}
	
	
	function changeAudioPosition(){
		audiopos = $("#slider").val();			 
		var duration = audio.getDuration();
		var position = audiopos/ 100 * Math.round(duration);
		pausePos = Math.round(position);
		pauseAudio();
		playAudio(audiofile);
	}
	
	function checkExtra(arr){		
		str = ""; 
		if("extra" in arr){
			if("audio_local" in arr['extra']){ 				
				audiofile = arr['extra']['audio_local'];//'/android_asset/www/test.mp3';
				str += '<div id="audioPosition"><input type="range" name="slider" id="slider" value="0" min="0" max="100" data-highlight="true" /></div>';
			  str += '<br/><div id="audioLabel"></div>';
				str += '<div data-role="controlgroup" data-type="horizontal" class="ui-corner-all ui-controlgroup ui-controlgroup-horizontal"><div class="ui-controlgroup-controls">'; 
				str += '<a href="#" id="play" data-role="button" data-icon="audio-play" data-iconpos="notext" data-theme="a" value="Play"></a>';
				str += '<a href="#" id="stop" data-role="button" data-icon="audio-stop" data-iconpos="notext" data-theme="a" value="Stop"></a>';
			  str += '</div></div>'; 
			}
			else if("audio" in arr['extra']){	
				audiofile = arr['extra']['audio'];//
				str += '<div id="audioPosition"><input type="range" name="slider" id="slider" value="0" min="0" max="100" data-highlight="true" /></div>';
			  str += '<br/><div id="audioLabel"></div>';
				str += '<div data-role="controlgroup" data-type="horizontal" class="ui-corner-all ui-controlgroup ui-controlgroup-horizontal"><div class="ui-controlgroup-controls">'; 
				str += '<a href="#" id="play" data-role="button" data-icon="audio-play" data-iconpos="notext" data-theme="a" value="Play"></a>';
				str += '<a href="#" id="stop" data-role="button" data-icon="audio-stop" data-iconpos="notext" data-theme="a" value="Stop"></a>';
			  str += '</div></div>'; 
			}
		}

		return str;
	}
	
		function download(downloadFile) {
		     var remoteFile = downloadFile;
		     var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
		     var localPath;
		     window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fileSystem) {
		         fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
		             localPath = fileEntry.fullPath;//'file:///android_asset/www/tmp/'+localFileName;//
		            
		             if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
		                 localPath = localPath.substring(7);
		             }
		             console.log("After  = " +localPath);
		             var ft = new FileTransfer();
		             ft.download(remoteFile,
		                 localPath, successdownload, faildownload);
		                 
		         }, faildownload);
		     }, faildownload);
		 }

		function successdownload(fileEntry){
		 	 localPath = fileEntry.fullPath;
       if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
          localPath = localPath.substring(7);
       }
       tmplocalpath = localPath;
       return tmplocalpath;
		 }
		
		 function faildownload(error) {
		   console.log(error.code);
		 }
		 
		function reset_div(){
			$("#desc").html("");
			$("#desc").hide();
			$("#multiplechoice").hide();
			$("#multiplecheck").hide();
			$("#singlechoice").hide();
			$("#textinput").hide();
			$("#selectrating").hide();
			if (audio) {
				audio.stop();
        audio.release();
			}
		}