// import LIBRARIES ++++++++++++++++++++++++++++
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
// import MODULES ++++++++++++++++++++++++++++

// import MODELS ++++++++++++++++++++++++++++++
import Shipment from '../models/shipment.js';

// import VIEWs ++++++++++++++++++++++++++++++


// VIEW +++++++++++++++++++++++++++++++++++++++
var ShipmentView = Backbone.View.extend({
  tagName: 'table',
  initialize: function(params){
    this.shipmentTemplate = params.shipmentTemplate;
    // this.shipmentTemplate = _.template($('#shipment-template').html());
    this.listenTo(this.model, "change", this.render);
  },

  render: function(){
    console.log('In shipment_view RENDER');
    // console.log(this.model);
    // console.log(this.model.toJSON());
    // console.log(this.model.toJSON().pk);
    var self = this;
    var compiledTemplate = this.shipmentTemplate({
      shipment: self.model.toJSON()
    });
    this.$el.html(compiledTemplate);
    return this; // returns this to the
  },

  events: {
    "click #shipment-map": "getShipmentMap"
  },

  getShipmentMap: function(e){
    console.log("In getShipmentMap");
    this.trigger('getmap',this)
  },


}); //END of VIEW
export default ShipmentView;
