var map;
var cities = [];

function initMap() {

    // Get cities array
    $.getJSON("assets/data/cities.json", function (data) {
        data.forEach(function (city) {
            cities.push(city);
        });

        // Create map
        var madrid = { lat: 40.4165, lng: -3.70256 };
        map = new google.maps.Map(document.getElementById('map'), {
            center: madrid,
            zoom: 2
        });

        /// Create city markers
        var markers = cities.map(function (city, i) {
            return new google.maps.Marker({
                position: { lat: city.lat, lng: city.lon },
                label: city.name
            });
        });

        // Create clusters
        var markerCluster = new MarkerClusterer(map, markers,
            { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    });
}
