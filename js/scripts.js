$(function() {

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

  $('#check-bldgOil').change(function(e){
    if (this.checked) {
      bldgOilGet();
    } else {
      map.removeLayer(bldgOilLayer);
    }
  })

  $('#check-eDesig').change(function(e){
    if (this.checked) {
      eDesigGet();
    } else {
      map.removeLayer(eDesigLayer);
    }
  })

  $('#check-cso').change(function(e){
    if (this.checked) {
      csoGet();
    }  else {
      map.removeLayer(csoLayer);
    }
  })

  $('#check-three').change(function(e){
    if (this.checked) {
      threeGet();
    }  else {
      map.removeLayer(threeLayer);
    }
  })

  var bldgOilLayer;
  // Adding fuel oil building data
  var bldgOilGet = function() {
    loading.show();
    var bldgOilURL = 'https://hbk254.carto.com/api/v2/sql?q=SELECT * FROM clean_heat_data&format=geojson';

    // Defining color for each attribute
    function getStyle(primary_fuel) {
      return primary_fuel == '#4' ? ['black', 0.7] :
      primary_fuel == '#6' ? ['#a80d29', .9] : ['#FFF', 0.7]
    };

    $.getJSON(bldgOilURL, function(sitePoint) {
      bldgOilLayer = L.geoJson(sitePoint, {
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
      })
      bldgOilLayer.addTo(map);
      loading.hide();
    });
  }

  // Adding E-Designation Properties
  var eDesigLayer;
  var eDesigGet = function () {
    loading.show();
    var eDesigURL = 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/MAPPLUTO/FeatureServer/0/query?where=EDesigNum%20IS%20NOT%20NULL&outFields=Address,EDesigNum&outSR=4326&f=geojson#features/3/properties';
    $.getJSON(eDesigURL, function(sitePoint) {
      eDesigLayer = L.geoJson(sitePoint, {
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
      })
      eDesigLayer.addTo(map);
      loading.hide();
    });
  }

  // Adding CSO Outfall Locations
  var csoLayer = L.layerGroup([]);
  var csoGet = function() {
    loading.show();
    var csoURL = 'https://data.ny.gov/resource/5d4q-pk7d.json?dec_region=2';
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
        var csoPoint = L.circleMarker( [data[i].latitude, data[i].longtitude], geojsonMarkerOptions ).bindPopup(
          data[i].facility_name
        );
        csoLayer.addLayer(csoPoint);
      }
      csoLayer.addTo(map);
      loading.hide();
    });
  }

  // Adding 311 complaints data
  var threeLayer = L.layerGroup([]);
  var threeGet = function() {
    loading.show();
    var threeURL = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=DEP&$limit=800';
    $.getJSON(threeURL, function(data){
      for(var i=0; i<data.length; i++) {
        var marker = data[i];
        var geojsonMarkerOptions = {
              radius: 4,
              fillColor: '#9b42f4',
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: .9
        };
        var threePoint = L.circleMarker( [data[i].latitude, data[i].longitude], geojsonMarkerOptions ).bindPopup(
          data[i].descriptor
        );
        threeLayer.addLayer(threePoint);
      }
      threeLayer.addTo(map);
      loading.hide();
    });
  }

  // // Bulk chemical and oil storage
  // var bulkLayer = L.layerGroup([]);
  // var bulkGet = function() {
  //   loading.show();
  //   var bulkURL = 'https://data.ny.gov/resource/2324-ueu8.json';
  //   $.getJSON(bulkURL, function(data){
  //     for(var i=0; i<data.length; i++) {
  //       var marker = data[i];
  //       var geojsonMarkerOptions = {
  //             radius: 4,
  //             fillColor: '#9b42f4',
  //             color: "#000",
  //             weight: 1,
  //             opacity: 1,
  //             fillOpacity: .9
  //       };
  //       var bulkPoint = L.circleMarker( [data[i].latitude, data[i].longitude], geojsonMarkerOptions ).bindPopup(
  //         data[i].descriptor
  //       );
  //       bulkLayer.addLayer(bulkPoint);
  //     }
  //     bulkLayer.addTo(map);
  //     loading.hide();
  //   });
  // }

})