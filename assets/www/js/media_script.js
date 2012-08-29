
/* Audio player */
var audio = null;
var audioTimer = null;
var pausePos = 0;

/* play audio file */
function playAudio(file){	
	if (!audio) { 
		audio = new Media(file, function(){}, function(error){ // error callback
    	audio.stop();
	    audio.release();
    });
  }
   
    audioDuration();
    // play audio
    audio.play();

    audio.seekTo(pausePos*1000);

    // update audio position every second
    if (audioTimer == null) {
        audioTimer = setInterval(function() {
            // get audio position
            audio.getCurrentPosition(
            
                function(position) { // get position success
                    if (position > -1) {
                        setAudioPosition(position);
                    }
                }, function(e) { // get position error
                    //setAudioPosition(duration);
                }
            );
        }, 300);
    }
}

/* get audio duration*/
function audioDuration(){
    var duration = audio.getDuration();
    
    // set slider data
    if( duration > 0 ){
	    //$('#slider').attr( 'max', Math.round(duration) );
	    $('#slider').attr( 'max', '100' );
	    $('#slider').slider('refresh');
    }
}

/* pause audio */
function pauseAudio() {
    if (audio) {
        audio.pause();
    }
}

/* stop audio */
function stopAudio() {
    if (audio) {
        audio.stop();
        audio.release();
    }
    clearInterval(audioTimer);
    audioTimer = null;
    pausePos = 0;
}

/* set audio position */
function setAudioPosition(position) {
	
	var duration = audio.getDuration();
	position = Math.round(position);
	duration = Math.round(duration);
	if((duration > 0) && (position >= duration)){
		 audio.stop();
	   audio.release();
		 $('#slider').val(0);
		 $('#play').attr('value','Play');
     $('#play').attr('data-icon','audio-play');
     $('#play').children().children().next().removeClass('ui-icon-audio-pause').addClass('ui-icon-audio-play');
	}
	
	pposition = position / duration * 100;
	pausePos = position;
	
	pposition = Math.round(pposition);
	// Total Minutes
	var tm = duration /60;
	tmmin = Math.floor(tm);
	tmsec = duration %60;
	if(tmsec < 10){
		tmsec = "0"+tmsec;
	}
	tmmin_str = tmmin+":"+tmsec; 
	//Current Minutes played
  var xa = position /60;
	minute = Math.floor(xa);
	sec = position %60;
	if(sec < 10){
		sec = "0"+sec;
	}
	min_str = minute+":"+sec;
	
	if(tmmin > 0){
		$('#audioLabel').html(min_str+" / "+tmmin_str);
	}
  $('#slider').val(pposition);
  $('#slider').slider('refresh');
}

