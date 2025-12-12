var map;

async function fetchRemoteFile(remoteFile) {
    var response = await fetch(remoteFile);
    return response.json();
}

async function initMap() {

    var center = {lat: 45.5650, lng: -73.5900};

    const remoteFile = '/assets/js/map-style.json';
    const styles = await fetchRemoteFile(remoteFile);

    map = new google.maps.Map(document.getElementById('liftSchoolMap'), {
        zoom: 11,
        center: center,
        styles: styles
    });

    const schools = [
        'John F. Kennedy High-School',
        'Rosemount High-School',
        'Laurier Mac Donald High-School',
        'Lester B. Pearson High-School',
        'Lauren Hill Academy Senior',
        'École secondaire Jeanne Mance'
    ];

    schools.forEach(function(school) {
        var request = {
            location: map.getCenter(),
            radius: '500',
            query: school
        };

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    });

}

// Checks that the PlacesServiceStatus is OK, and adds a marker
// using the place ID and location from the PlacesService.
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var marker = new google.maps.Marker({
      map: map,
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
      },
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      }
    });
    var infowindowContent = generateInfoWindowContent(results[0].name,results[0].formatted_address);
    var infowindow = new google.maps.InfoWindow({
        content: infowindowContent
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
  }
}

function reallyInitMap() {
    google.maps.event.addDomListener(window, 'load', initMap);
}


function generateInfoWindowContent(name,formatted_address) {

    const contentString = '<div id="content">'+
    '<div id="bodyContent">'+
    '<p style="margin-bottom: 0;line-height: 1.5;">'+
    '<b>'+ name + '</b>' +
    '<br/>' + formatted_address +
    '</p>'+
    '</div>'+
    '</div>';

    return contentString
}
