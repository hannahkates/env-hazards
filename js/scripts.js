$(function() {
  
  // Rendering data layers list in left pane
  for (var key in layers) {
    var obj = layers[key];
    $('#'+layers[key].category).append($(layers[key].divContent));
  }

  // Hiding loading gif
  var loading = $('#loading');
  loading.hide();

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

  // Functions to run when a layer checkbox is clicked
  function mapLayerClickFn(e) {
    var layerName = $(this).data('layer-name');
    console.log(layers[layerName].url);

    if (this.checked) {
      if(layers[layerName].type == 'nonGeo') {
        getNonGeo(layerName);
      } else if (layers[layerName].type == 'point'){
        getGeoPoint(layerName);
      } else {
        getGeoPolygon(layerName);        
      }
      // mapFunctions[layerName + 'Get']();
    }  else {
      Remove(layerName);
      // mapFunctions[layerName + 'Remove']();
    }
    $('.legend').remove();
    // generateLegend();
  }

  // Checking if a checkbox gets clicked
  $('input').change(mapLayerClickFn);

  // Function for getting NON-geojson layers
  function getNonGeo(layerName) {
    loading.show();
    layers[layerName].layer = L.layerGroup([]);
    var lat = layers[layerName].lat; // Gets field name for latitude (inconsistent across datasets)
    var long = layers[layerName].long; // Gets field name for longitude (inconsistent across datasets)
    var url = layers[layerName].url;
    $.getJSON(url, function(data){
      for(var i=0; i<data.length; i++) {
        var marker = data[i];
        var popupContent = layers[layerName].popupContent[0];
        console.log(popupContent);
        for(var j=1; j<layers[layerName].popupContent.length; j++){
          popupContent += data[layers[layerName].popupContent[j]];
        }
        var geojsonMarkerOptions  = layers[layerName].markerStyle;
        var point = L.circleMarker( [data[i][lat], data[i][long]], geojsonMarkerOptions ).bindPopup(popupContent);
        layers[layerName].layer.addLayer(point);
      }
      layers[layerName].layer.addTo(map);
      loading.hide();
    });
  }

  // Function for getting geojson POINT layers
  function getGeoPoint(layerName) {
    loading.show();
    layers[layerName].layer = L.geoJson();
    var url = layers[layerName].url;

    $.getJSON(url, function(sitePoint) {
      layers[layerName].layer = L.geoJson(sitePoint, {
        pointToLayer: function (feature, latlng) {
            var d = feature.properties; 
            var geojsonMarkerOptions = layers[layerName].markerStyle;
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
      })
      layers[layerName].layer.addTo(map);
      loading.hide();
    });
  }

  // Function for getting geojson POLYGON layers
  function getGeoPolygon(layerName) {
    loading.show();
    layers[layerName].layer = L.geoJson();
    var url = layers[layerName].url;

    $.getJSON(url, function(sitePoint) {
      layers[layerName].layer = L.geoJson(sitePoint, {
        style: layers['eDesig'].markerStyle,
        onEachFeature: function(feature, layer) {
            var d = feature.properties;   
            var popupText = d.Address + '<br />'
              + 'E-Designation Number: ' + d.EDesigNum;
            layer.bindPopup(popupText);
          }
      })
      layers[layerName].layer.addTo(map);
      loading.hide();
    });
  }

  // Remove any layer
  function Remove(layerName){
    map.removeLayer(layers[layerName].layer);
  }

  // function csoRemove() {
  //   map.removeLayer(csoLayer);
  // }


  // Adding CSO Outfall Locations
  // var csoLayer = L.layerGroup([]);
  // function csoGet() {
  //   loading.show();
  //   var csoURL = 'https://data.ny.gov/resource/5d4q-pk7d.json?dec_region=2';
  //   $.getJSON(csoURL, function(data){
  //     for(var i=0; i<data.length; i++) {
  //       var marker = data[i];
  //       var geojsonMarkerOptions  = layers['cso'].markerStyle;
  //       var csoPoint = L.circleMarker( [data[i].latitude, data[i].longtitude], geojsonMarkerOptions ).bindPopup(
  //         data[i].facility_name
  //       );
  //       csoLayer.addLayer(csoPoint);
  //     }
  //     csoLayer.addTo(map);
  //     loading.hide();
  //   });
  // }
  // function csoRemove() {
  //   map.removeLayer(csoLayer);
  // }

  // var bldgOilLayer;
  // // Adding fuel oil building data
  // function bldgOilGet() {
  //   loading.show();
  //   var bldgOilURL = 'https://hbk254.carto.com/api/v2/sql?q=SELECT * FROM clean_heat_data&format=geojson';

  //   $.getJSON(bldgOilURL, function(sitePoint) {
  //     bldgOilLayer = L.geoJson(sitePoint, {
  //       pointToLayer: function (feature, latlng) {
  //           var d = feature.properties; 
  //           var geojsonMarkerOptions = layers['bldgOil'].markerStyle;
  //           return L.circleMarker(latlng, geojsonMarkerOptions);
  //       },
  //       onEachFeature: function(feature, layer) {
  //           var d = feature.properties;   
  //           var popupText = d.street_address + '<br />'
  //             + 'Fuel: ' + d.primary_fuel + '<br />'
  //             + 'Estimated Retirement Year: ' + d.est_retirement_year + '<br />'  
  //             + 'Owner: ' + d.owner;
  //           layer.bindPopup(popupText);
  //       }
  //     })
  //     bldgOilLayer.addTo(map);
  //     loading.hide();
  //   });
  // }
  // function bldgOilRemove() {
  //   map.removeLayer(bldgOilLayer);
  // }

  // // Adding E-Designation Properties
  // var eDesigLayer;
  // function eDesigGet() {
  //   loading.show();
  //   var eDesigURL = 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/MAPPLUTO/FeatureServer/0/query?where=EDesigNum%20IS%20NOT%20NULL&outFields=Address,EDesigNum&outSR=4326&f=geojson#features/3/properties';
  //   $.getJSON(eDesigURL, function(sitePoint) {
  //     eDesigLayer = L.geoJson(sitePoint, {
  //       style: layers['eDesig'].markerStyle,
  //       onEachFeature: function(feature, layer) {
  //           var d = feature.properties;   
  //           var popupText = d.Address + '<br />'
  //             + 'E-Designation Number: ' + d.EDesigNum;
  //           layer.bindPopup(popupText);
  //         }
  //     })
  //     eDesigLayer.addTo(map);
  //     loading.hide();
  //   });
  // }
  // function eDesigRemove() {
  //   map.removeLayer(eDesigLayer);
  // }

  // // Adding 311 complaints data
  // var threeLayer = L.layerGroup([]);
  // function threeGet() {
  //   loading.show();
  //   var threeURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=DEP&$limit=800&$where=complaint_type <> 'Noise' AND latitude>0";
  //   $.getJSON(threeURL, function(data){
  //     for(var i=0; i<data.length; i++) {
  //       var marker = data[i];
  //       var geojsonMarkerOptions = layers['three'].markerStyle;
  //       var threePoint = L.circleMarker( [data[i].latitude, data[i].longitude], geojsonMarkerOptions ).bindPopup(
  //         data[i].descriptor
  //       );
  //       threeLayer.addLayer(threePoint);
  //     }
  //     threeLayer.addTo(map);
  //     loading.hide();
  //   });
  // }
  // function threeRemove() {
  //   map.removeLayer(threeLayer);
  // }

  // var generateLegend = function() {
  //   var legend = L.control({position: 'topright'});
  //   legend.onAdd = function (map) {
  //     function getColor(d) {
  //     return d > 1000 ? '#800026' :
  //       d > 500  ? '#BD0026' :
  //       d > 200  ? '#E31A1C' :
  //       d > 100  ? '#FC4E2A' :
  //       d > 50   ? '#FD8D3C' :
  //       d > 20   ? '#FEB24C' :
  //       d > 10   ? '#FED976' : '#FFEDA0';
  //     }
  //     var div = L.DomUtil.create('div', 'info legend'),
  //       grades = layers,
  //       labels = [];
  //     // loop through our density intervals and generate a label with a colored square for each interval
  //     for (var i = 0; i < layers.length; i++) {
  //         div.innerHTML +=
  //           '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
  //           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  //     }
  //     return div;
  //   };
  //   legend.addTo(map);
  // }
})