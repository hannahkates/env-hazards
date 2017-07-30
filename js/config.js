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
        <span data-toggle="modal" data-target="#bldgOil" class="glyphicon glyphicon-info-sign"></span>
        <div class="circle" style="background:black;"></div>
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
              <p>"New Yorkers burn more than 1 billion gallons of heating oil every year which accounts for nearly 14% of fine particulate matter pollutants emitted into our air; <b>more PM2.5 emissions than all cars and trucks in the city combined</b>. This particulate matter contains many pollutants that are associated with respiratory and cardiac diseases."<br>- <a href="http://www.nyc.gov/html/dep/html/air/buildings_heating_oil.shtml">NYC Dept. of Environmental Protection</a><p>
              <p>This dataset provideds a comprehensive list of all buildings that still burn heavy heating oil. Any building burning #6 oil is in violation of NYC <a href="http://www.nyc.gov/html/dep/pdf/air/ll43.pdf">Local Law 43</a>.</p>
              <p><b>Data Source</b>: <a href="https://www.nyccleanheat.org/spot-the-soot">NYC Retrofit Accelerator</a></b><br><b>Date of Last Update</b>: November 2015. </p>
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
        <div class="circle" style="background:#FFA500;"></div>
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
              <p></p>
              <p>"Sometimes, during heavy rain and snow storms, combined sewers receive higher than normal flows. Treatment plants are unable to handle flows that are more than twice design capacity and when this occurs, a <b>mix of excess stormwater and untreated wastewater</b> discharges directly into the City’s waterways at certain outfalls. This is called a combined sewer overflow (CSO). We are concerned about CSOs because of their effect on water quality and recreational uses."<br>- <a href="http://www.nyc.gov/html/dep/html/stormwater/combined_sewer_overflow.shtml">NYC Dept of Environmental Protection</a><p>
              <p>This dataset captures combined sewer outfall locations. The frequency of overflow events at each location is not reported.</p>
              <p><b>Data Source</b>: <a href="https://data.ny.gov/Energy-Environment/Combined-Sewer-Overflows-CSOs-Map/i8hd-rmbi/data">New York State Dept of Environmental Conservation</a><br><b>Date of Last Update</b>: Aug 28, 2016.</p>
            </div>
          </div>              
        </div>
      </div>`
  },
  remediation: {
    url: 'https://hbk254.carto.com/api/v2/sql?q=SELECT * FROM remediation_site_borders&format=geojson',
    type: 'geo',
    category: 'contaminated',
    markerType: 'polygon',
    markerStyle: {
      color: '#1e9974',
      weight: 2,
      opacity: 1
    },
    popupTemplate: 
      `<h5>{{sitename}}</h5>
      <h5>Program: {{program}}</h5>
      <h5>{{address}}</h5>`
    ,
    popupFields: {
      sitename: 'sitename',
      program: 'program',
      address: 'address'
    },
    divContent:
      `<div>
        <input type="checkbox" data-layer-name="remediation">
        <span data-toggle="modal" data-target="#remediation" class="glyphicon glyphicon-info-sign"></span>
        <div class="square" style="background:#1e9974;"></div>
        Remediation Site Boundaries
      </div>
      <div class="modal fade" id="remediation" role="dialog">
        <div class="modal-dialog">     
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Remediation Site Boundaries</h4>
            </div>
            <div class="modal-body">
              <img src="https://farm5.staticflickr.com/4039/5079822331_7f7f78226c_b.jpg" width=100%>
              <i>Brooklyn Navy Yard. <a href="https://www.flickr.com/photos/wallyg/5079822331/in/photostream/">Credit</a></i>
              <p></p>
              <p>This dataset includes mapped site borders within the NYC area for environmental remediation sites managed by New York State Dept of Environmental Conservation - including the State Superfund, Environmental Restoration, Brownfield Cleanup, and Voluntary Cleanup Programs.</p>
              <p><b>Data Source</b>: <a href="http://www.dec.ny.gov/chemical/102009.html">New York State Dept of Environmental Conservation</a><br><b>Date of Last Update</b>: Updated Nightly</p>
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
        <div class="square" style="background:#4f1111;"></div>
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
              <p></p>
              <p>"An E-Designation is a NYC zoning map designation that indicates the presence of an environmental requirement pertaining to potential Hazardous Materials Contamination, Window/Wall Noise Attenuation, or Air Quality impacts on a particular tax lot." - <a href="http://www.nyc.gov/html/oer/html/e-designation/about.shtml">NYC Office of Environmental Remediation</a><p>
              <p>This dataset captures all tax lots with an E-Designation.</p>
              <p><b>Data Source</b>: <a href="http://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">MapPLUTO (NYC Dept of City Planning)</a><br><b>Date of Last Update</b>: September 2016</p>
            </div>
          </div>              
        </div>
      </div>`
  },
  three: {
    // url: "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=DEP&$limit=800&$where=complaint_type <> 'Noise' AND latitude>0",
    url: 'https://data.cityofnewyork.us/resource/p37e-sdhx.json?$where=latitude>0',
    type: 'nonGeo',
    lat: 'latitude', 
    long: 'longitude',
    category: 'spills',
    markerType: 'point',
    markerStyle: {
      radius: 4,
      fillColor: '#9b42f4',
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: .9
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
        <span data-toggle="modal" data-target="#three" class="glyphicon glyphicon-info-sign"></span>
        <div class="circle" style="background:#9b42f4;"></div>
        Oil and Chemical Spills (NYC 311)
      </div>
      <div class="modal fade" id="three" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Oil and Chemical Spills Complaints to NYC 311</h4>
            </div>
            <div class="modal-body">
              <img src="http://68.media.tumblr.com/30f5d2f94670a738b294cd6a2330b406/tumblr_inline_mwvue3lahX1qa99h4.jpg">
              <p></p>
              <p><a href="http://www1.nyc.gov/nyc-resources/categories/environment.page">More info on 311 environmental complaint and service request categories is available here.</a></p>
              <p>This dataset captures the oil and chemical spill complaints and service requests submitted to 311.</p>
              <p><b>Data Source</b>: <a href="https://nycopendata.socrata.com/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9">311</a><br><b>Date of Last Update</b>: Updated Daily</p>
            </div>
          </div>              
        </div>
      </div>`
  },
  floodplain: {
    url: 'https://data.cityofnewyork.us/resource/inra-wqx3.geojson',
    type: 'geo',
    category: 'flood',
    markerType: 'polygon',
    markerStyle: {
      color: '#4286f4',
      weight: 2,
      opacity: 1
    },
    popupTemplate: 
      `<h5>E-Designation Number:</h5>
      <h5>{{floodplainNum}}</h5>`
    ,
    popupFields: {
      floodplainNum: 'floodplainNum'
    },
    divContent:
      `<div>
        <input type="checkbox" data-layer-name="floodplain">
        <span data-toggle="modal" data-target="#floodplain" class="glyphicon glyphicon-info-sign"></span>
        <div class="square" style="background:#4286f4;"></div>
        2020 Sea Level Rise 100-yr Flood
      </div>
      <div class="modal fade" id="floodplain" role="dialog">
        <div class="modal-dialog">     
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">2020 Projected Sea Level Rise 100-yr Floodplain</h4>
            </div>
            <div class="modal-body">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Sandy_West_St_underpass_flooding_CU_7_33PM_140mm-0212_%288158800855%29.jpg" width=100%>
            </div>
          </div>              
        </div>
      </div>`
  },
  solidWaste: {
    url: `https://cartoprod.capitalplanning.nyc/user/cpp/api/v2/sql?q=SELECT * FROM facdb_facilities WHERE facgroup = 'Solid Waste'&format=geojson`,
    type: 'geo',
    category: 'solid',
    markerType: 'point',
    markerStyle: {
      radius: 4,
      fillColor: '#cc470e',
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7
    },
    popupTemplate:
      `<h5>{{facname}}</h5>
      <h5>{{address}}</h5>
      <h5>Facility Category: {{facsubgrp}}</h5>
      <h5>Operator: {{opname}}</h5>`,
    popupFields: {
      facname: 'facname',
      address: 'address',
      facsubgrp: 'facsubgrp',
      opname: 'opname'
    },
    divContent:
      `<div>
        <input type="checkbox" data-layer-name="solidWaste">
        <div class="circle" style="background:#cc470e;"></div>
        <span data-toggle="modal" data-target="#solidWaste" class="glyphicon glyphicon-info-sign"></span>
        Solid Waste Transfer and Processing
      </div>
      <div class="modal fade" id="solidWaste" role="dialog">
        <div class="modal-dialog">         
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Solid Waste Transfer and Processing</h4>
            </div>
            <div class="modal-body">
              <img src="https://c2.staticflickr.com/4/3133/2722868111_180e32d2c8_z.jpg?zz=1" width='100%'>
              <p><i><a href="https://c2.staticflickr.com/4/3133/2722868111_180e32d2c8_z.jpg?zz=1">Credit</a></i></p>
              <p><b>Data Source</b>: <a href="https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-selfac.page">NYC Facilities Database (NYC Dept of City Planning)</a></b><br><b>Date of Last Update</b>: May 2017. </p>
            </div>
          </div>     
        </div>
      </div>`
  }
}