// import LIBRARIES ++++++++++++++++++++++++++++
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

// import MODULES ++++++++++++++++++++++++++++

// import MODELS ++++++++++++++++++++++++++++++
import Shpment from '../models/shipment.js';

// import VIEWs ++++++++++++++++++++++++++++++
import MapView from './map_view';
import ShipmentView from './shipment_view';


// VIEW +++++++++++++++++++++++++++++++++++++++
var ShipmentListView = Backbone.View.extend({
  initialize: function(params){
    this.shipmentTemplate = params.shipmentTemplate
    this.mapPageTemplate = params.mapPageTemplate
    this.listenTo(this.model, 'update' , this.render)
  },

  render: function(){
    console.log('In shipment_list_View RENDER-------');
    var self = this;
    self.$el.empty();
    self.model.each(function(shipment){
      // console.log(shipment);
      var shipmentView = new ShipmentView({
        model: shipment,
        shipmentTemplate: self.shipmentTemplate
      });
      self.$el.append(shipmentView.render().$el);
      self.listenTo(shipmentView, 'getmap' , self.fetchShipment)
    });
  },

  events: {
  },

  fetchShipment: function(selectedShipment){
   console.log(selectedShipment.model.toJSON().pk);
   var self = this;
   selectedShipment.model.fetch({
     url: 'http://localhost:8000/shipments/' + selectedShipment.model.toJSON().pk,
     success: function (model, response){
       console.log('In SUCCESS for fetchShipment');
       console.log(response);
       var params = {
         mapPageTemplate: self.mapPageTemplate,
         response: response,
         el: $('#page'),
       }
       var mappage = new MapView(params);
       mappage.render();
     }
   });
  }


});
export default ShipmentListView;
