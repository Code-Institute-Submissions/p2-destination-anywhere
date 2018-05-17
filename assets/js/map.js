/*
* Variables
*/

var map;
var city_markers;
var cities_cluster;

var attractions_markers;
var accommodation_markers;
var restaurants_markers;

var attractions_cluster;
var accommodation_cluster;
var restaurants_cluster;

var attractions = [];
var accommodation = [];
var restaurants = [];

// Create map
function initMap(cities_list) {

    if (typeof (cities_list) === 'undefined') {
        cities_list = "all_cities";
    }

    // Create map
    var center = { lat: 40.4165, lng: -3.70256 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 2,
        styles: map_styles
    });

    getCities(cities_list).then(function (cities) {
        // Create city markers
        createCityMarkers(cities);
    });
};

/*
* City Markers
*/

// Get cities JSON data
function getCities(cities_list) {
    switch (cities_list) {
        case 'all_cities':
            return $.getJSON("assets/data/all_cities.json").then(function (data) {
                return data;
            });
            break;
        case 'top_10_culture':
            return $.getJSON("assets/data/top_10_culture.json").then(function (data) {
                return data;
            });
            break;
        case 'top_10_food':
            return $.getJSON("assets/data/top_10_food.json").then(function (data) {
                return data;
            });
            break;
        case 'top_10_shopping':
            return $.getJSON("assets/data/top_10_shopping.json").then(function (data) {
                return data;
            });
            break;
        default:
    }
};

// Create city markers
function createCityMarkers(cities) {
    city_markers = cities.map(function (city, i) {
        var city_label;
        // Change label for Top 10 list or all cities
        cities.length > 10 ? city_label = `${city.name}` : city_label = `${city.rank}. ${city.name}`;
        return new google.maps.Marker({
            position: { lat: city.lat, lng: city.lon },
            label: city_label,
            icon: 'assets/images/marker_city.png'
        });
    });

    // Add event listners for city markers
    createCityHandlers(city_markers);

    // Create city clusters
    addCityClusters();
};

// Handle city marker click events
function createCityHandlers(markers) {
    markers.forEach(function (marker) {
        google.maps.event.addListener(marker, 'click', function () {
            map.setZoom(14);
            map.setCenter(marker.getPosition());

            // Update navigation (router.js)
            cityMarkerClicked(marker.label);

            // Get places (venues) in the city
            getPlaces(marker);

            // Create markers and populate venue-lists section
            displayPlaces();
        });
    });
};

// Add cities to map
function addCityClusters() {
    cities_cluster = new MarkerClusterer(map, city_markers,
        { imagePath: 'assets/images/clusters/m' });
    if (attractions.length > 0) {
        removePlaceMarkers();
    }; map.setZoom(2);
};


/*
* Place Markers
*/

// Request attractions, accommodation and bars & restaurants from the Places library
function getPlaces(city) {

    // Clear any existing places
    emptyArray(attractions);
    emptyArray(accommodation);
    emptyArray(restaurants);

    var types = [['lodging'], ['bar'], ['restaurant'], ['amusement_park'], ['aquarium'], ['art_gallery'], ['museum'], ['zoo']];
    service = new google.maps.places.PlacesService(map);

    types.forEach(function (type) {
        var request = {
            location: city.position,
            radius: '5000',
            type: type
        };
        service.nearbySearch(request, placesCallback);
    });
};

// Put places into arrays
function placesCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];

            // Sort places into categories
            if (place.types.includes('lodging')) {
                accommodation.push(place);
            };

            if (place.types.includes('bar') || place.types.includes('restaurant')) {
                restaurants.push(place);
            };

            if (place.types.includes('amusement_park') || place.types.includes('aquarium') || place.types.includes('art_gallery') || place.types.includes('museum') || place.types.includes('zoo')) {
                attractions.push(place);
            };
        }
    }
};

// Used to reset attractions, accommodation and resturants arrays
function emptyArray(a) {
    a.length = 0;
};

// Create places markers
function createPlacesMarkers() {

    attractions_markers = attractions.map(function (place, i) {
        return new google.maps.Marker({
            position: place.geometry.location,
            icon: 'assets/images/marker_attractions.png'
        });
    });
    accommodation_markers = accommodation.map(function (place, i) {
        return new google.maps.Marker({
            position: place.geometry.location,
            icon: 'assets/images/marker_accommodation.png'
        });
    });
    restaurants_markers = restaurants.map(function (place, i) {
        return new google.maps.Marker({
            position: place.geometry.location,
            icon: 'assets/images/marker_restaurants.png'
        });
    });

    // Add event listners for place markers
    createPlaceHandlers(attractions_markers);
    createPlaceHandlers(accommodation_markers);
    createPlaceHandlers(restaurants_markers);

    // Create clusters
    addPlaceClusters();
};

// Handle place marker click events
function createPlaceHandlers(markers) {
    markers.forEach(function (marker) {
        google.maps.event.addListener(marker, 'click', function () {

            // map.setCenter(marker.getPosition());

            console.log('place clicked');
            // Update navigation (router.js)
            venueMarkerClicked()

        });
    });
};


// Add places to map
function addPlaceClusters() {
    attractions_cluster = new MarkerClusterer(map, attractions_markers,
        { imagePath: 'assets/images/clusters/cluster_attractions_m' });
    accommodation_cluster = new MarkerClusterer(map, accommodation_markers,
        { imagePath: 'assets/images/clusters/cluster_accommodation_m' });
    restaurants_cluster = new MarkerClusterer(map, restaurants_markers,
        { imagePath: 'assets/images/clusters/cluster_restaurants_m' });
};

function removePlaceMarkers() {
    removeMarkers(attractions_markers, attractions_cluster);
    removeMarkers(accommodation_markers, accommodation_cluster);
    removeMarkers(restaurants_markers, restaurants_cluster);
};

// Remove markers from map
function removeMarkers(markers, clusterer) {
    markers.forEach(function (marker) {
        marker.setMap(null);
    });
    clusterer.clearMarkers();
};


// Called in city marker click handler
function displayPlaces() {

    setTimeout(function () {
        createPlacesMarkers();
        removeMarkers(city_markers, cities_cluster);

        addVenueList(attractions, 'attractions');
        addVenueList(accommodation, 'accommodation');
        addVenueList(restaurants, 'restaurants');

    }, 1000);

};

// Popluate venue lists section with places
function addVenueList(list, type) {

    // Clear any previous places
    $(`.venue-list-${type} .venue-list>.row`).empty();

    // Add new places
    list.forEach(function (place) {
        var place_photo = (place.photos === undefined) ? place.icon : place.photos[0].getUrl({ 'maxWidth': 60, 'maxHeight': 60 });

        $(`.venue-list-${type} .venue-list>.row`).append(
            `<div class="col-4 col-lg-6 venue-list-item">
                <div class="row no-gutters">
                    <div class="col-3 venue-list-image" style="background-image:url(${place_photo});">
                    </div>
                    <div class="col-9">
                        <p class="small">${place.name}</p>
                    </div>
                </div>
            </div>`
        );
    });
};

// Legend buttons click handler
$('.legend-btn').click(function () {
    $(this).children('i').toggleClass("invisible");
    togglePlaces($(this).siblings('.legend-label').text().toLowerCase());
});

// Show or hide place markers by category
function togglePlaces(category) {
    if (eval(category + '_cluster').markers_.length === 0) {
        eval(`${category}_cluster = new MarkerClusterer(map, ${category}_markers,
            { imagePath: 'assets/images/clusters/cluster_${category}_m' })`);
    } else {
        eval(category + '_cluster').clearMarkers();
    }
};


// Styles for map
var map_styles = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#523735"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9b2a6"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dcd2be"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ae9e90"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#93817c"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a5b076"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#447530"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fdfcf8"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f8c967"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e9bc62"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e98d58"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db8555"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#806b63"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8f7d77"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b9d3c2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#92998d"
            }
        ]
    }
];
