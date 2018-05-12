var map;
var cities = [];
var top_10_culture = [
    {
        "rank": 1,
        "name": "London",
        "country": "GB",
        "featureCode": "PPLC",
        "adminCode": "ENG",
        "population": 7556900,
        "lat": 51.50853,
        "lon": -0.12574
    },
    {
        "rank": 2,
        "name": "Vārānasi",
        "country": "IN",
        "featureCode": "PPL",
        "adminCode": "36",
        "population": 1164404,
        "lat": 25.31668,
        "lon": 83.01042
    },
    {
        "rank": 3,
        "name": "Shanghai",
        "country": "CN",
        "featureCode": "PPLA",
        "adminCode": "23",
        "population": 14608512,
        "lat": 31.22222,
        "lon": 121.45806
    },
    {
        "rank": 4,
        "name": "Granada",
        "country": "ES",
        "featureCode": "PPLA2",
        "adminCode": "51",
        "population": 234325,
        "lat": 37.18817,
        "lon": -3.60667,
        "muni": "18087"
    },
    {
        "rank": 5,
        "name": "Rome",
        "country": "IT",
        "featureCode": "PPLC",
        "adminCode": "07",
        "population": 2563241,
        "lat": 41.89474,
        "lon": 12.4839,
        "muni": "058091"
    },
    {
        "rank": 6,
        "name": "Kyoto",
        "country": "JP",
        "featureCode": "PPLA",
        "adminCode": "22",
        "population": 1459640,
        "lat": 35.02107,
        "lon": 135.75385
    },
    {
        "rank": 7,
        "name": "Eşfahān",
        "country": "IR",
        "featureCode": "PPLA",
        "adminCode": "28",
        "population": 1547164,
        "lat": 32.65722,
        "lon": 51.67761
    },
    {
        "rank": 8,
        "name": "New York City",
        "country": "US",
        "featureCode": "PPL",
        "adminCode": "NY",
        "population": 8175133,
        "lat": 40.71427,
        "lon": -74.00597
    },
    {
        "rank": 9,
        "name": "İstanbul",
        "country": "TR",
        "featureCode": "PPLA",
        "adminCode": "34",
        "population": 11174257,
        "lat": 41.01384,
        "lon": 28.94966
    },
    {
        "rank": 10,
        "name": "Paris",
        "country": "FR",
        "featureCode": "PPLC",
        "adminCode": "A8",
        "population": 2138551,
        "lat": 48.85341,
        "lon": 2.3488,
        "muni": "751",
        "muniSub": "75056"
    }
];
var top_10_food = [
    {
        "rank": 1,
        "name": "Donostia / San Sebastián",
        "country": "ES",
        "featureCode": "PPLA2",
        "adminCode": "59",
        "population": 185357,
        "lat": 43.31283,
        "lon": -1.97499,
        "muni": "20069"
    },
    {
        "rank": 2,
        "name": "Tokyo",
        "country": "JP",
        "featureCode": "PPLC",
        "adminCode": "40",
        "population": 8336599,
        "lat": 35.6895,
        "lon": 139.69171
    },
    {
        "rank": 3,
        "name": "New York City",
        "country": "US",
        "featureCode": "PPL",
        "adminCode": "NY",
        "population": 8175133,
        "lat": 40.71427,
        "lon": -74.00597
    },
    {
        "rank": 4,
        "name": "Barcelona",
        "country": "ES",
        "featureCode": "PPLA",
        "adminCode": "56",
        "population": 1621537,
        "lat": 41.38879,
        "lon": 2.15899,
        "muni": "08019"
    },
    {
        "rank": 5,
        "name": "Singapore",
        "country": "SG",
        "featureCode": "PPLC",
        "adminCode": "00",
        "population": 3547809,
        "lat": 1.28967,
        "lon": 103.85007
    },
    {
        "rank": 6,
        "name": "Paris",
        "country": "FR",
        "featureCode": "PPLC",
        "adminCode": "A8",
        "population": 2138551,
        "lat": 48.85341,
        "lon": 2.3488,
        "muni": "751",
        "muniSub": "75056"

    },
    {
        "rank": 7,
        "name": "Madrid",
        "country": "ES",
        "featureCode": "PPLC",
        "adminCode": "29",
        "population": 3255944,
        "lat": 40.4165,
        "lon": -3.70256,
        "muni": "28079"
    },
    {
        "rank": 8,
        "name": "Lima",
        "country": "PE",
        "featureCode": "PPLC",
        "adminCode": "LMA",
        "population": 7737002,
        "lat": -12.04318,
        "lon": -77.02824
    },
    {
        "rank": 9,
        "name": "London",
        "country": "GB",
        "featureCode": "PPLC",
        "adminCode": "ENG",
        "population": 7556900,
        "lat": 51.50853,
        "lon": -0.12574
    },
    {
        "rank": 10,
        "name": "München",
        "country": "DE",
        "featureCode": "PPLA",
        "adminCode": "02",
        "population": 1260391,
        "lat": 48.13743,
        "lon": 11.57549,
        "muni": "09162",
        "muniSub": "09162000"
    }
];
var top_10_shopping = [
    {
        "rank": 1,
        "name": "New York City",
        "country": "US",
        "featureCode": "PPL",
        "adminCode": "NY",
        "population": 8175133,
        "lat": 40.71427,
        "lon": -74.00597
    },
    {
        "rank": 2,
        "name": "Tokyo",
        "country": "JP",
        "featureCode": "PPLC",
        "adminCode": "40",
        "population": 8336599,
        "lat": 35.6895,
        "lon": 139.69171
    },
    {
        "rank": 3,
        "name": "London",
        "country": "CA",
        "featureCode": "PPL",
        "adminCode": "08",
        "population": 346765,
        "lat": 42.98339,
        "lon": -81.23304
    },
    {
        "rank": 4,
        "name": "Kuala Lumpur",
        "country": "MY",
        "featureCode": "PPLC",
        "adminCode": "14",
        "population": 1453975,
        "lat": 3.1412,
        "lon": 101.68653
    },
    {
        "rank": 5,
        "name": "Paris",
        "country": "FR",
        "featureCode": "PPLC",
        "adminCode": "A8",
        "population": 2138551,
        "lat": 48.85341,
        "lon": 2.3488,
        "muni": "751",
        "muniSub": "75056"
    },
    {
        "rank": 6,
        "name": "Hong Kong",
        "country": "HK",
        "featureCode": "PPLC",
        "adminCode": "00",
        "population": 7012738,
        "lat": 22.28552,
        "lon": 114.15769
    },
    {
        "rank": 7,
        "name": "Buenos Aires",
        "country": "AR",
        "featureCode": "PPLC",
        "adminCode": "07",
        "population": 13076300,
        "lat": -34.61315,
        "lon": -58.37723
    },
    {
        "rank": 8,
        "name": "Vienna",
        "country": "AT",
        "featureCode": "PPLC",
        "adminCode": "09",
        "population": 1691468,
        "lat": 48.20849,
        "lon": 16.37208,
        "muni": "901"
    },
    {
        "rank": 9,
        "name": "Dubai",
        "country": "AE",
        "featureCode": "PPLA",
        "adminCode": "03",
        "population": 1137347,
        "lat": 25.25817,
        "lon": 55.30472
    },
    {
        "rank": 10,
        "name": "Madrid",
        "country": "ES",
        "featureCode": "PPLC",
        "adminCode": "29",
        "population": 3255944,
        "lat": 40.4165,
        "lon": -3.70256,
        "muni": "28079"
    }
];

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
            zoom: 2,
            styles: map_styles
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
                "color": "#09a2d0"
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
