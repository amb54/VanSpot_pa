// /src/app/app.js

// import LIBRARIES ++++++++++++++++++++++++++++
// import MODULES ++++++++++++++++++++++++++++
// import MODELS ++++++++++++++++++++++++++++++
// import VIEWs ++++++++++++++++++++++++++++++
// VIEW +++++++++++++++++++++++++++++++++++++++
//-------------------------------------------------------------------------

// import LIBRARIES ++++++++++++++++++++++++++++
import $ from 'jquery';
import _ from 'underscore';

// import MODULES ++++++++++++++++++++++++++++

// import MODELS ++++++++++++++++++++++++++++++
import ShipmentList from './app/collections/shipment_list';

// import VIEWs ++++++++++++++++++++++++++++++
import ShipmentListView from './app/views/shipment_list_view';
import HomePageView from './app/views/home_page_view';
import CsvView from './app/views/csv_view';



// Declare TEMPLATE variables
var homePageTemplate;
var aboutPageTemplate;
var mapPageTemplate;
var csvPopupTemplate;
var shipmentTemplate;

var previouShipments = function(){
  console.log('In previouShipments function');
  var shipmentsList = new ShipmentList(); // the COLLECTION shipment_list.js
  shipmentsList.fetch();
  console.log(shipmentsList);
  var shipments_params = {
    shipmentTemplate: shipmentTemplate,
    mapPageTemplate: mapPageTemplate,
    el: $('#page'),
    model: shipmentsList
  };
  var application = new ShipmentListView(shipments_params);
  application.render();
}


// DOCUMENT-READY
$(document).ready(function() {
  console.log( "In document.ready!" );
  homePageTemplate = _.template($('#home-page-template').html());
  aboutPageTemplate = _.template($('#about-page-template').html());
  mapPageTemplate = _.template($('#map-template').html());
  csvPopupTemplate = _.template($('#csv-template').html());
  shipmentTemplate = _.template($('#shipment-template').html());

  // INITIAL VIEW
  $('#csv').hide();

  var params = {
    homePageTemplate: homePageTemplate,
    el: $('#page'),
  }
  var homepage = new HomePageView(params);
  homepage.render();

  // BUTTONS IN THE HEADER
  $('#home-button').click(function(event) {
    $('#csv').hide();
    homepage.render();
  });

  $('#about-button').click(function(event) {
    $('#csv').hide();
    $('#page').html(aboutPageTemplate);
  });


  var csv_params = {
    csvPopupTemplate: csvPopupTemplate,
    mapPageTemplate: mapPageTemplate,
    el: $('#csv'),
  };
  var csvpage = new CsvView(csv_params);
  $('#newshipment-button').click(function(event) {
    $('#csv').show();
    csvpage.render();
  });


  $('#previous-shipment-button').click(function(event) {
    $('#csv').hide();
    previouShipments();
  });



}); // END of $(document).ready(function()
