// Add console.log to check to see if our code is working.
console.log("working");

// Add GeoJSON data a FeatureCollection object that has properties and geometry for SFO.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};



// initialize a map object and set up a center and zoom level
let map = L.map("mapid").setView([37.5, -122.5], 10);

// Grabbing GeoJSON data.
// Using the pointToLayer function to add functionality to the marker
// L.geoJson(sanFranAirport, {
//     // Turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng).bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//     }
//   }).addTo(map);

// Using the onEachFeature function
// L.geoJson(data, {
//     onEachFeature: function(feature, layer) {
//		 console.log(layer);
//       layer.bindPopup();
//      }
// });

// create a street tile layer based on Leatlet by mapbox style API 

let streetsTile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: API_KEY});

// Create the dark view tile layer that will be an option for the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
    });

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [30, 30],
zoom: 2,
	layers: [streets]
});

// Pass map layers into layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let airportData = "https://raw.githubusercontent.com/ddmarchlewski/Mapping_Earthquakes_GISH/Mapping_GeoJSON_Points/majorAirports.json";


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
	console.log(data);
	// Creating a GeoJSON layer with the retrieved data.
	L.geoJson(data, {
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<h2>Airport code: " + feature.properties.icao + "</h2> <hr> <h3>Airport name: " + feature.properties.name + "</h3>");
  		}
     }).addTo(map);
});

// add 'greymap' tile layer to map object
streetsTile.addTo(mymap);