  /** Load when the phonegap is ready **/
  document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		
		/* Set play function when play button is triggered*/
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
		
		/* Set stop function when play button is triggered*/
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
	  /* Set audio slider when action is triggered */
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
	
	/** external functions **/
	
	/* Change the audio position when audio is swipe or click*/
	function changeAudioPosition(){
		audiopos = $("#slider").val();			 
		var duration = audio.getDuration();
		var position = audiopos/ 100 * Math.round(duration);
		pausePos = Math.round(position);
		pauseAudio();
		playAudio(audiofile);
	}
	
	/* Check if has/have extra request when display the question*/
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
				audiofile = arr['extra']['audio'];
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
	
	/* Download file when system detect media file. Placed at device cache folder */
		function download(downloadFile) {
		     var remoteFile = downloadFile;
		     var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
		     var localPath;
		     window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fileSystem) {
		         fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
		             localPath = fileEntry.fullPath;
		            
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
    
    /* Success handler for download*/
		function successdownload(fileEntry){
		 	 localPath = fileEntry.fullPath;
       if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
          localPath = localPath.substring(7);
       }
       tmplocalpath = localPath;
       return tmplocalpath;
		 }
		
		/* Fail handler for download*/
		function faildownload(error) {
		   console.log(error.code);
		}
		
		/* Reset div when the page is changed or refresh*/
		function reset_div(){
			$("#desc").html("");
			$("#displayquestion").html("");

			if (audio) {
				audio.stop();
        audio.release();
			}
		}