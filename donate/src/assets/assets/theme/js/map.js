(function($) {
  "use strict";

  //Run function when window finished load
  $(window).load(function() {
    $('#map-toogle').on('shown.bs.collapse', function() {
      if ($("#map").length > 0) {
        var locationLat = $("#map").data('lat'), locationLng = $("#map").data('lng');
        $("#map").gmap3({
          map: {
            options: {
              center: [locationLat, locationLng],
              zoom: 16,
              scaleControl: false,
              panControl: false,
              streetViewControl: false,
              overviewMapControl: false,
              zoomControl: true,
              scrollwheel: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: false,
              zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
              },
              mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
              }
            }
          }, marker: {
            latLng: [locationLat, locationLng],
            options: {"icon": "./assets/theme/img/pinmarker.png"}
          }
        });
      }
    })

  });




})(jQuery);

