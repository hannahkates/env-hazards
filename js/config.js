var layers = {
  bldgOil: {
    url: 'https://hbk254.carto.com/api/v2/sql?q=SELECT * FROM clean_heat_data&format=geojson',
    type: 'geo',
    category: 'air',
    markerType: 'point',
    markerStyle: {
      radius: 4,
      fillColor: 'black',
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7
    },
    legendStyle: {

    },
    popupTemplate: 
      `<h5>{{street_address}}</h5>
      <h5>Fuel: {{primary_fuel}}</h5>
      <h5>Estimated Retirement Year: {{est_retirement_year}} </h5>
      <h5>Owner: {{owner}}</h5>`,
    popupFields: {
      street_address: 'street_address',
      primary_fuel: 'primary_fuel',
      est_retirement_year: 'est_retirement_year',
      owner: 'owner'
    },
    divContent:
      `<div>
        <input type="checkbox" data-layer-name="bldgOil">
        <span class="circle" style:{background=#f00, width=200px, height=200px, border-radius=50%}></span>
        <span data-toggle="modal" data-target="#bldgOil" class="glyphicon glyphicon-info-sign"></span>
        Buildings Burning Fuel Oil #4 and #6
      </div>
      <div class="modal fade" id="bldgOil" role="dialog">
        <div class="modal-dialog">            
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Buildings Burning Fuel Oil #4 and #6</h4>
            </div>
            <div class="modal-body">
              <img src="https://raw.githubusercontent.com/hannahkates/env-hazards/master/img/spotthesoot.jpg" width='100%'>
              <p><i>View of 26 Broadway in Manhattan, the <a href="https://en.wikipedia.org/wiki/26_Broadway">Standard Oil Building</a></i></p>
              <p>"New Yorkers burn more than 1 billion gallons of heating oil every year which accounts for nearly 14% of fine particulate matter pollutants emitted into our air; more PM2.5 emissions than all cars and trucks in the city combined. This particulate matter contains many pollutants that are associated with respiratory and cardiac diseases."<br>- <a href="http://www.nyc.gov/html/dep/html/air/buildings_heating_oil.shtml">NYC Dept. of Environmental Protection</a><p>
              <p>This dataset provideds a comprehensive list of all buildings that still burn heavy heating oil. Any building burning #6 oil is in violation of NYC <a href="http://www.nyc.gov/html/dep/pdf/air/ll43.pdf">Local Law 43</a>. Data was last updated November 2015. Data Source: <a href="https://www.nyccleanheat.org/spot-the-soot">NYC Retrofit Accelerator</a></p>
            </div>
          </div>              
        </div>
      </div>`
  },
  cso: {
    url: 'https://data.ny.gov/resource/5d4q-pk7d.json?dec_region=2',
    type: 'nonGeo',
    lat: 'latitude', 
    long: 'longtitude',
    category: 'water',
    markerType: 'point',
    markerStyle: {
      radius: 4,
      fillColor: '#FFA500',
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9
    },
    legendStyle: {

    },
    popupTemplate:
      `<h5>Wastewater Treatment Catchment:</h5>
      <h5>{{facility_name}}</h5>`,
    popupFields: {
      facility_name: 'facility_name'
    },
    divContent:
      `<div>
        <input type="checkbox" data-layer-name="cso">
        <span data-toggle="modal" data-target="#cso" class="glyphicon glyphicon-info-sign"></span>
        Combined Sewer Outfalls
      </div>
      <div class="modal fade" id="cso" role="dialog">
        <div class="modal-dialog">            
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Combined Sewer Overflow (CSO) Outfalls</h4>
            </div>
            <div class="modal-body">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/CSO_diagram_US_EPA.jpg" width="100%">
              <p>"An E-Designation is a NYC zoning map designation that indicates the presence of an environmental requirement pertaining to potential Hazardous Materials Contamination, Window/Wall Noise Attenuation, or Air Quality impacts on a particular tax lot."<br>- <a href="http://www.nyc.gov/html/oer/html/e-designation/about.shtml">NYC Office of Environmental Remediation</a><p>
              <p>This dataset captures all tax lots with an E-Designation. Data was last updated September 2016. Data Source: <a href="http://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">MapPLUTO</a></p>
            </div>
          </div>              
        </div>
      </div>`
  },
  eDesig: {
    url: 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/MAPPLUTO/FeatureServer/0/query?where=EDesigNum%20IS%20NOT%20NULL&outFields=Address,EDesigNum&outSR=4326&f=geojson#features/3/properties',
    type: 'geo',
    category: 'contaminated',
    markerType: 'polygon',
    markerStyle: {
      color: '#4f1111',
      weight: 2,
      opacity: 1
    },
    legendStyle: {

    },
    popupTemplate: 
      `<h5>E-Designation Number:</h5>
      <h5>{{EDesigNum}}</h5>`
    ,
    popupFields: {
      EDesigNum: 'EDesigNum'
    },
    divContent:
      `<div>
        <input type="checkbox" data-layer-name="eDesig">
        <span data-toggle="modal" data-target="#eDesig" class="glyphicon glyphicon-info-sign"></span>
        E-Designation Sites
      </div>
      <div class="modal fade" id="eDesig" role="dialog">
        <div class="modal-dialog">     
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">E-Designation Sites</h4>
            </div>
            <div class="modal-body">
              <img src="http://www.nyc.gov/html/oer/includes/site_images/misc/E%20Logo%20100%20x%20100.jpg">
              <p>"An E-Designation is a NYC zoning map designation that indicates the presence of an environmental requirement pertaining to potential Hazardous Materials Contamination, Window/Wall Noise Attenuation, or Air Quality impacts on a particular tax lot."<br>- <a href="http://www.nyc.gov/html/oer/html/e-designation/about.shtml">NYC Office of Environmental Remediation</a><p>
              <p>This dataset captures all tax lots with an E-Designation. Data was last updated September 2016. Data Source: <a href="http://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">MapPLUTO</a></p>
            </div>
          </div>              
        </div>
      </div>`
  },
  three: {
    url: "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=DEP&$limit=800&$where=complaint_type <> 'Noise' AND latitude>0",
    type: 'nonGeo',
    lat: 'latitude', 
    long: 'longitude',
    category: 'complaints',
    markerType: 'point',
    markerStyle: {
      radius: 4,
      fillColor: '#9b42f4',
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: .9
    },
    legendStyle: {

    },
    popupTemplate:
      `<h5>311 Complaint Category:<h5>
      <h5>{{descriptor}}</h5>`,
    popupFields: {
      descriptor: 'descriptor'
    },
    divContent:
      `<div>
        <input type="checkbox" data-layer-name="three">
        <span data-toggle="modal" data-target="" class="glyphicon glyphicon-info-sign"></span>
        Complaints to DEP - Most recent 800
      </div>`
  }
}


          // <div>
          //   <input id="" type="checkbox">
          //   <span data-toggle="modal" data-target="" class="glyphicon glyphicon-info-sign"></span>
          //   ( Soon! ) Wastewater Treatment Plant Discharge Locations
          // </div>

          // <div>
          //   <input id="" type="checkbox">
          //   <span data-toggle="modal" data-target="" class="glyphicon glyphicon-info-sign"></span>
          //   ( Soon! ) Brownfields
          // </div>
          // <div>
          //   <input id="" type="checkbox">
          //   <span data-toggle="modal" data-target="" class="glyphicon glyphicon-info-sign"></span>
          //   ( Soon! ) Chemical Remediation Sites
          // </div>
         
          // <div>
          //   <input id="" type="checkbox">
          //   ( Soon! ) Large Oil Spills
          // </div>
          // <div>
          //   <input id="" type="checkbox">
          //   ( Soon! ) Oil and Chemical Spills
          // </div>
          // <div>
          //   <input id="" type="checkbox">
          //   ( Soon! ) Bulk Chemical and Oil Storage
          // </div>
          // <div>
          //   <input id="" type="checkbox">
          //   ( Soon! ) Toxics Release Inventory
          // </div>

          // <div>
          //   <input id="" type="checkbox">
          //   ( Soon! ) Waste Processing
          // </div>
          // <div>
          //   <input id="" type="checkbox">
          //   ( Soon! ) Waste Carter Sites
          // </div>
          // <div>
          //   <input id="" type="checkbox">
          //   ( Soon! ) Waste Transfer Stations
          // </div>

          // <div>
          //   <input id="" type="checkbox">
          //   ( Soon! ) 2020s Sea Level Rise 100-yr Floodplain
          // </div>


