// import LIBRARIES ++++++++++++++++++++++++++++
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import * as d3 from 'd3';

// import MODULES ++++++++++++++++++++++++++++

// import MODELS ++++++++++++++++++++++++++++++
import Shipment from '../models/shipment';
import Newshipment from '../models/newshipment';

// import VIEWs ++++++++++++++++++++++++++++++
import MapView from './map_view';


// VIEW +++++++++++++++++++++++++++++++++++++++
var CsvView = Backbone.View.extend({
  initialize: function(params){
    this.csvPopupTemplate = params.csvPopupTemplate;
    this.mapPageTemplate = params.mapPageTemplate;
  },

  render: function(){
    console.log('In CsvView RENDER');
    var self = this;
    self.$el.html(self.csvPopupTemplate);
    return this;
  },

  events: {
    'click #save-csv': 'saveCsvData',
    'click #cancel-csv': 'clearCsvForm',
  },


  clearCsvForm: function(){
    console.log('In clearCsvForm');
    this.$("#csvfile").val('');
    $('#csv').hide();
    $('#csv').empty();
  },


  getCsvFile: function(){
    var csvFile = null
    csvFile = document.getElementById("csvfile").files[0];
    if(csvFile == null){
      alert("No file selected.");
      this.clearCsvForm();
      return null;
    };
    this.clearCsvForm();
    return csvFile;
  },


  saveCsvData: function(e){
    $('#csv').hide();
    var self = this;
    var csvFile = this.getCsvFile()
    if(csvFile != null){
      var reader = new FileReader();
      reader.readAsText(csvFile);
      reader.onload = function (event) {
        var csvData = this.result;
        var parsedCSV = d3.csvParseRows(csvData);
        var addresses = []
        for (var i = 0; i < parsedCSV.length; i++){
          addresses.push(parsedCSV[i][0])
        };
        console.log(addresses);


        var newshipment = new Newshipment({
          addresses: addresses
        });
        newshipment.save(null, {
          wait: true,
          success: function (model, response){
            console.log("In success callback, response json is");
            console.log(response);
            var params = {
              mapPageTemplate: self.mapPageTemplate,
              response: response,
              el: $('#page'),
            }
            var mappage = new MapView(params);
            mappage.render();
          }
        }); // END of newshipment.save

      }; // END of reader.onload =
    }; // END of CONDITIONAL if(csvFile != null)
  } // END of saveCsvData: function(e)


});
export default CsvView;
