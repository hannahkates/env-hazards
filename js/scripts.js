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


  var mapFunctions = {
    csoGet: csoGet,
    csoRemove: csoRemove,

    bldgOilGet: bldgOilGet,
    bldgOilRemove: bldgOilRemove,

    threeGet: threeGet,
    threeRemove: threeRemove,

    eDesigGet: eDesigGet,
    eDesigRemove: eDesigRemove
  }

  function mapLayerClickFn(e) {
    var layerName = $(this).data('layer-name');
    // console.log(layerName);

    if (this.checked) {
      mapFunctions[layerName + 'Get']();
    }  else {
      mapFunctions[layerName + 'Remove']();
    }
    $('.legend').remove();
    generateLegend();
  }

  $('#check-cso').change(mapLayerClickFn)
  $('#check-bldgOil').change(mapLayerClickFn)
  $('#check-eDesig').change(mapLayerClickFn)
  $('#check-three').change(mapLayerClickFn)


  var generateLegend = function() {
    var legend = L.control({position: 'topright'});
    legend.onAdd = function (map) {
      function getColor(d) {
      return d > 1000 ? '#800026' :
        d > 500  ? '#BD0026' :
        d > 200  ? '#E31A1C' :
        d > 100  ? '#FC4E2A' :
        d > 50   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' : '#FFEDA0';
      }
      var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];
      console.log(div);
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
    };
    legend.addTo(map);
  }


  var bldgOilLayer;
  // Adding fuel oil building data
  function bldgOilGet() {
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
  function bldgOilRemove() {
    map.removeLayer(bldgOilLayer);
  }

  // Adding E-Designation Properties
  var eDesigLayer;
  function eDesigGet() {
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
  function eDesigRemove() {
    map.removeLayer(eDesigLayer);
  }

  // Adding CSO Outfall Locations
  var csoLayer = L.layerGroup([]);
  function csoGet() {
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
  function csoRemove() {
    map.removeLayer(csoLayer);
  }

  // Adding 311 complaints data
  var threeLayer = L.layerGroup([]);
  function threeGet() {
    loading.show();
    var threeURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=DEP&$limit=800&$where=complaint_type <> 'Noise' AND latitude>0";
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
  function threeRemove() {
    map.removeLayer(threeLayer);
  }

  // // Bulk chemical and oil storage
  // var bulkLayer = L.layerGroup([]);
  // function bulkGet() {
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
  // function bulkRemove() {
  //   map.removeLayer(bulkLayer);
  // }

})