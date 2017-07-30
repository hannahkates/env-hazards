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
  var topHeight = 90;
  var h = window.innerHeight - topHeight;
  $('#mapContainer').css({'height':h});
  $('#sidebar').css({'height':h});
  var map = L.map('mapContainer').setView([40.729830, -73.961549], 13);

  $( window ).resize(function() {
    h = window.innerHeight - topHeight;
    $('#mapContainer').css({'height':h});
    $('#sidebar').css({'height':h});
  });

  // Adding a light basemap from carto's free basemaps
  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  }).addTo(map);

  // Change color of info button when hovered over
  $('.glyphicon-info-sign').hover(
    function() {
      $( this ).css({color:'#3B99FC'})
    },
    function() {
      $( this ).css({color:'black'})
    }
  )

  // Functions to run when a layer checkbox is clicked
  function mapLayerClickFn(e) {
    var layerName = $(this).data('layer-name');

    if (this.checked) {
      if(layers[layerName].type == 'nonGeo'){
        getNonGeo(layerName);
      } else if (layers[layerName].markerType == 'point'){
        getGeoPoint(layerName);
      } else {
        getGeoPolygon(layerName);        
      }
    } else {
      Remove(layerName);
    }
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

        // Popup content
        var popupData = {};
        for(key in layers[layerName].popupFields) {
          var fieldName = layers[layerName].popupFields[key];
          popupData[fieldName] = data[i][fieldName];
        }        
        var source = layers[layerName].popupTemplate;
        var template = Handlebars.compile(source);
        var popupContent = template(popupData);
        
        // Markers
        var marker = data[i];
        var geojsonMarkerOptions  = layers[layerName].markerStyle;
        var point = L.circleMarker( [data[i][lat], data[i][long]], geojsonMarkerOptions ).bindPopup(popupContent);
        point.on('mouseover', function (e) {
            this.openPopup();
        });
        point.on('mouseout', function (e) {
            this.closePopup();
        });
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
          var geojsonMarkerOptions = layers[layerName].markerStyle;
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function(feature, layer) {
          var data = feature.properties;
          // Popup content
          var popupData = {};
          for(key in layers[layerName].popupFields) {
            var fieldName = layers[layerName].popupFields[key];
            popupData[fieldName] = data[fieldName];
          }        
          var source = layers[layerName].popupTemplate;
          var template = Handlebars.compile(source);
          var popupContent = template(popupData);
          layer.bindPopup(popupContent);
          layer.on('mouseover', function (e) {
            this.openPopup();
          });
          layer.on('mouseout', function (e) {
              this.closePopup();
          });
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
        style: layers[layerName].markerStyle,
        onEachFeature: function(feature, layer) {
          var data = feature.properties;
          // Popup content
          var popupData = {};
          for(key in layers[layerName].popupFields) {
            var fieldName = layers[layerName].popupFields[key];
            popupData[fieldName] = data[fieldName];
          }        
          var source = layers[layerName].popupTemplate;
          var template = Handlebars.compile(source);
          var popupContent = template(popupData);
          layer.bindPopup(popupContent);
          layer.on('mouseover', function (e) {
            this.openPopup();
          });
          layer.on('mouseout', function (e) {
              this.closePopup();
          });
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
})