// import LIBRARIES ++++++++++++++++++++++++++++
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

// import MODULES ++++++++++++++++++++++++++++
// var iconImg = require('./markers');
var iconImg = require('../../../build/js/markers');

// import MODELS ++++++++++++++++++++++++++++++

// import VIEWs ++++++++++++++++++++++++++++++


// VIEW +++++++++++++++++++++++++++++++++++++++
var MapView = Backbone.View.extend({
  tagName: 'section',
  id:'page',

  initialize: function(params){
    this.mapPageTemplate = params.mapPageTemplate;
    this.response = params.response;
    console.log('In MapView initialize');
    console.log(this.response );
  },

  events: {

  },

  initMap: function(resp = null) {
    console.log(resp);

    // MAP  -------------------
    var myLatlng = new google.maps.LatLng(47.6263926,-122.3383157);//MOHAI
    // var myLatlng = new google.maps.LatLng(47.6363567,-122.3595802);//Queen Anne
    // var myLatlng = new google.maps.LatLng(47.6108514, -122.3366236);//Seattle
    var mapOptions = {
      center: myLatlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.$el.find('#map-canvas1')[0], mapOptions);


    if (resp != null){
      // add  PINs for each ADDRESSS on the map  -------------------
      console.log('IN (resp != null)');
      var vans = ['Van 1', 'Van 2', 'Van 3']
      console.log('ADDRESS BULLETS');
      console.log(resp.addresses.length);
      for (var ia=0; ia < resp.addresses.length; ia++){
        console.log(ia);
        var img = iconImg.icon_image('bullet', ia)
        console.log(iconImg.icon_image('bullet', ia));
        console.log('---------');
        for (var j=0; j < resp.addresses[ia].length; j++){
          var addressLatLng = new google.maps.LatLng(resp.addresses[ia][j].lat, resp.addresses[ia][j].lng);
          var marker = new google.maps.Marker({
            position: addressLatLng,
            map: this.map,
            icon: img
          });
        };// END of j
      };// END of i  (and  BULLET markers)

      // add  PINs for each VAN on the map  -------------------
      console.log('PIN BULLETS');
      for (var iv=0; iv < resp.vans.length; iv++){
        var contentString = vans[iv] + "<br> "+ "( "+ resp.vans[iv].lat + ", "+ resp.vans[iv].lng + ")";
        console.log('-------');
        var titleText = [vans[iv], resp.vans[iv].lat, resp.vans[iv].lng].join();
        console.log(titleText);
        var vanLatLng = new google.maps.LatLng(resp.vans[iv].lat, resp.vans[iv].lng);
        console.log(iconImg.icon_image('pin', iv));
        var marker = new google.maps.Marker({
          position: vanLatLng,
          map: this.map,
          title: titleText,
          icon: iconImg.icon_image('pin', iv)
        });

        // add  INFO_WINDOWS for each VAN on the map  -------------------
        var self = this;
        var infowindow = new google.maps.InfoWindow({});
        google.maps.event.addListener(marker,'click', (function(marker,contentString,infowindow){
          return function() {
            infowindow.setContent(contentString);
            infowindow.open(self.map, marker);
          };
        })(marker,contentString,infowindow));
      };// END of PIN markers

    }; //END of  if(resp != null)
  },  // END of  initMap: function(resp = null)

  resize: function() {
        google.maps.event.trigger(this.map, 'resize');
  },

  render: function () {
    console.log('In MapView RENDER');
    console.log(this.response);
    var self = this;
    var compiledTemplate = this.mapPageTemplate({
      shipment_id: this.response['shipment'].pk
    });
    // self.$el.html(this.mapPageTemplate);
    self.$el.html(compiledTemplate);
    self.initMap(this.response);
  },

});  // END of VIEW  var MapView = Backbone.View.extend(

export default MapView;
