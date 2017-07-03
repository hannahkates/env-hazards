// Instantiating the map object and setting the height based on window height
var h = window.innerHeight - 80;
$('#mapContainer').css('height',h);
$('#sidebar').css('height',h);
var map = L.map('mapContainer').setView([40.729830, -73.961549], 13);

// Adding a light basemap from carto's free basemaps
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

// Defining color for each attribute
function getStyle(primary_fuel) {
  return primary_fuel == '#4' ? ['black', 0.7] :
  primary_fuel == '#6' ? ['#a80d29', .9] : ['#FFF', 0.7]
};

// Adding fuel oil building data
var bldgOilURL = 'https://hbk254.carto.com/api/v2/sql?q=SELECT * FROM clean_heat_data&format=geojson';
$.getJSON(bldgOilURL, function(sitePoint) {
  L.geoJson(sitePoint, {
    pointToLayer: function (feature, latlng) {
        var d = feature.properties; 
        var geojsonMarkerOptions = {
            radius: 4,
            fillColor: getStyle(d.primary_fuel)[0],
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: getStyle(d.primary_fuel)[1]
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function(feature, layer) {
        var d = feature.properties;   
        var popupText = d.street_address + '<br />'
          + 'Fuel: ' + d.primary_fuel + '<br />'
          + 'Estimated Retirement Year: ' + d.est_retirement_year + '<br />'  
          + 'Owner: ' + d.owner;
        layer.bindPopup(popupText);
      }
  }).addTo(map);
});

// Adding 311 complaints data
// var siteURL = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=DEP&$limit=5000&format=geojson';

// Adding E-Designation Properties
var eDesigURL = 'http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/MAPPLUTO/FeatureServer/0/query?where=EDesigNum%20IS%20NOT%20NULL&outFields=Address,EDesigNum&outSR=4326&f=geojson#features/3/properties'
$.getJSON(eDesigURL, function(sitePoint) {
  L.geoJson(sitePoint, {
    pointToLayer: function (feature, latlng) {
        var d = feature.properties; 
        var geojsonMarkerOptions = {
            color: '#1a7042',
            weight: 1,
            opacity: 1
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function(feature, layer) {
        var d = feature.properties;   
        var popupText = d.Address + '<br />'
          + 'E-Designation Number: ' + d.EDesigNum;
        layer.bindPopup(popupText);
      }
  }).addTo(map);
});

// Adding CSO Outfall Locations
var csoURL = 'https://data.ny.gov/resource/5d4q-pk7d.json?dec_region=2'
$.getJSON(csoURL, function(data){
  for(var i=0; i<data.length; i++) {
    var marker = data[i];
    var geojsonMarkerOptions = {
          radius: 4,
          fillColor: '#FFA500',
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: .9
    };
    L.circleMarker( [data[i].latitude, data[i].longtitude], geojsonMarkerOptions )
    .bindPopup(
      data[i].facility_name
    )
    .addTo(map);
  }
});
