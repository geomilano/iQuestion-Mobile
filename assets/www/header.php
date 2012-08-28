<?php 
	$logged_in = isset($_COOKIE['logged_in']) ? $_COOKIE['logged_in'] : ""; 
	$home_naming = "Home";
	
	if($logged_in == true){
		if(isset($_COOKIE['usr_name'])){ 
			$usr_name = $_COOKIE['usr_name']; 
			$home_naming = "$usr_name's Home";  
		}
	} 
	 
	$nav = array(  
		'1' => array('name'=>'Survey','url'=>'survey.php'), 
		'2' => array('name'=>'Search','url'=>'search.php'), 
	);
	array_unshift($nav, array('name'=>$home_naming,'url'=>'index.php')); 
?>

<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"> 
	<meta name="HandheldFriendly" content="true" /> 
	<meta name="apple-mobile-web-app-capable" content="yes" /> 
	<meta http-equiv="cleartype" content="on">
	<title>iQuestion</title>
		<link rel="stylesheet" type="text/css" href="jquery.mobile-1.0b2.min.css" />
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
		<script type="text/javascript" src="jquery-1.6.2.min.js"></script>

		<script type="text/javascript" src="jquery.mobile-1.0b2.min.js"></script>
		<script type="text/javascript" src="jquery.ui.map.full.min.js"></script>
		<script type="text/javascript" src="jquery.ui.map.extensions.js"></script>
	 
<script type="text/javascript"> 
				$('#map').live("pageshow", function() {
				$('#map_canvas_1').gmap('refresh');
				$('#map_canvas_1').gmap('getCurrentPosition', function(position, status) {
					if ( status === 'OK' ) {
						var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
						$('#map_canvas_1').gmap('get', 'map').panTo(latlng);
						$('#map_canvas_1').gmap('search', { 'location': latlng }, function(results, status) {
							if ( status === 'OK' ) {
								$('#from').val(results[0].formatted_address);
							}
						});
					} else {
						alert('Unable to get current position');
					}
				});
			});
			
			$('#map').live("pagecreate", function() {
				$('#map_canvas_1').gmap({'center': '59.3426606750, 18.0736160278'});
				$('#submit').click(function() {
					$('#map_canvas_1').gmap('displayDirections', { 'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(response, status) {
						if ( status === 'OK' ) {
							$('#results').show();
						} else {
							$('#results').hide();
						}
					});
					return false;
				});
			});
 
		</script> 
	 <style> 
			 dl>dt{
			 padding:5px;
			 background-color:white;
			 }
			 dd{
			 
			 padding:5px;
			 margin-left:-3px;
			 }
			 dt{ 
			 width:100%;
			 background-color:red;
			 }
	 </style>
</head>