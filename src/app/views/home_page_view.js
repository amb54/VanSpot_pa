// import LIBRARIES ++++++++++++++++++++++++++++
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

// import MODULES ++++++++++++++++++++++++++++

// import MODELS ++++++++++++++++++++++++++++++

// import VIEWs ++++++++++++++++++++++++++++++


// VIEW +++++++++++++++++++++++++++++++++++++++
var HomePageView = Backbone.View.extend({
  initialize: function(params){
    this.homePageTemplate = params.homePageTemplate;
  },

  render: function(){
    console.log('In HomePageView RENDER');
    var self = this;
    self.$el.html(self.homePageTemplate);
    return this
  },

});



export default HomePageView;
