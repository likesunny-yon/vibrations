function initMap(locations){

	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 0,
	  center: new google.maps.LatLng(0,0),
	  styles: mapStyle
	})

	bounds = new google.maps.LatLngBounds()
	infowindow = new google.maps.InfoWindow({
		maxWidth: 300
	})

	infowindow.addListener('closeclick', function(){
			infowindowOpen = false
			page('/')
	})

	for (var i = 0; i < locations.length; i++) {

	  var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(locations[i].lat, locations[i].long),
	    icon: {
	    	path: google.maps.SymbolPath.CIRCLE,
	    	fillColor: 'orange',
	    	fillOpacity: 0.4,
			scale: 10,
	    	strokeColor: 'orange',
	    	strokeOpacit: 0.6,
	    	strokeWeight: 2
	    },
	    map: map
	  })
	  markers[locations[i].slug] = marker

	  bounds.extend(marker.position)
		
		marker.addListener('click', (function(marker, i) {
			return function(pushRoute){
				infowindow.setContent('<p><span style="font-weight: bold">'+locations[i].title+'</span><br>'+locations[i].date+'<br>'+locations[i].time+'</p><iframe width="100%" height="20" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+locations[i].id+'&amp;color=ff9900&amp;inverse=false&amp;auto_play=false&amp;show_user=false"></iframe>')
				infowindow.open(map, marker)
				infowindowSlug = locations[i].slug
				infowindowOpen = true

				pushRoute = !!pushRoute
				if (pushRoute) { markerClicked(locations[i].slug) }
			}
		})(marker, i))

	}

	map.fitBounds(bounds)
	
	mapExists = true

}