import Backbone from 'backbone';

var Newshipment = Backbone.Model.extend({
  defaults : {
    'addresses': []
  },

  url: 'http://localhost:8000/newshipment',

  initialize:  function(params){
    // console.log("Shipment initialized: " + this.get("title"));
    console.log('In Newshipment Model');
  }
});

export default Newshipment;
