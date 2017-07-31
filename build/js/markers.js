module.exports = {

  icon_image: function(shape, ind){


    if(shape == 'pin'){
      if(ind == 0){
        var g_pin = 'https://docs.google.com/uc?id=0B-P53A7R7CKISWJyanpvY2lMaE0'
      };
      if(ind == 1){
        var g_pin = 'https://docs.google.com/uc?id=0B-P53A7R7CKIMzlOWXV2dGtSMmc'
      };
      if(ind == 2){
        var g_pin = 'https://docs.google.com/uc?id=0B-P53A7R7CKIU0o5ZW9TV2RHdjA'
      };
      // return pin;
      return g_pin
    }; // END of PIN

    if(shape == 'bullet'){
      if(ind == 0){
        var g_bullet = 'https://docs.google.com/uc?id=0B-P53A7R7CKIOXpjUXJhdS1YQzQ'// google RED BULLET
      };
      if(ind == 1){
        var g_bullet = 'https://docs.google.com/uc?id=0B-P53A7R7CKIWHdTU3Y4OEdpdkE' // google BLUE BULLET
      };
      if(ind == 2){
        var g_bullet = 'https://docs.google.com/uc?id=0B-P53A7R7CKIcTRUZXQ0LUlKUkk' // google GREEN BULLET
      };
      return g_bullet;
    }; // END of BULLET


  },


}//END of MODULE
