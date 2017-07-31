import Backbone from 'backbone';
import Shipment from '../models/shipment';
import $ from 'jquery';
import _ from 'underscore';

var ShipmentList = Backbone.Collection.extend({
  model: Shipment,
  url: 'http://localhost:8000/shipments',

  parse: function(data) { // The parsing migth not be needed in this case
    return data;
  },

  comparator: function (model) {
        return -model.get("pk");
  }

});


export default ShipmentList;
