(function($) {
  "use strict";
  var win_h = $(window).outerHeight();

  //Run function when document ready
  $(document).ready(function() {
    initWinHeight();
    initClick();
    initHold();
    initLightBox();
    initBtnFile();
    initMestisMenu();
    initSlider();
    initTooltip();
  });

  //Run function when finished load
  $(window).on('load', function() {
    initIsotope();
  });

  //Run function when window scroll
  $(window).on('scroll', function() {
    initScroll();
  });

  //Run function when window resize
  $(window).resize(function() {
    win_h = $(window).height();
    initWinHeight();
  });

  //init SLider
  function initSlider() {
    $('#header-gslider1-total').text($('#header-gslider1 .item').length);
    $('#header-gslider1-current').text($('#header-gslider1 .item.active').data('index'));
    $('#header-gslider1').on('slid.bs.carousel', function() {
      $('#header-gslider1-current').text($('#header-gslider1 .item.active').data('index'));
    });
  }

  //init Tooltip
  function initTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  function initWinHeight() {
    $('.wrap-window').css('min-height', win_h);
  }

  //init Menu
  function initMestisMenu() {
    $('#menu').metisMenu();
    $('#menu').on('activate.bs.scrollspy', function() {
      var active_id = $(this).find('li.active>a').attr('href');
      $('.nav-mini li').removeClass('active');
      $('.nav-mini a[href="' + active_id + '"]').closest('li').addClass('active');
    });
  }
  
  //init Hold Style
  function initHold() {
    $('[data-holdwidth]').each(function(index, el) {
      var width = $(el).data('holdwidth');
      $(el).css('width', width);
    });
    $('[data-holdbg]').each(function(index, el) {
      var bg = $(el).data('holdbg');
      $(el).css('background-image', 'url(' + bg + ')');
    });
  }

  //init Scroll
  function initScroll() {
    var window_height = $('#main-header').height() - ($('#site-description').height() + 1);
    var stopWindow = Math.round($(window).scrollTop());

    if (stopWindow >= window_height) {
      if (!$('.wrapper').hasClass('push')) {
        $('.nav-mini').addClass('show');
      }
      $('#site-description').removeClass('f_bottom').addClass('fixed');
    } else {
      $('.nav-mini').removeClass('show');
      $('#site-description').addClass('f_bottom').removeClass('fixed');
    }

  }
  
  
  //init Click
  function initClick() {
    $('.toogle-menu').on("click",function() {
      var window_height = $('#main-header').height() - ($('#site-description').height() + 1);
      $('.wrapper').toggleClass('push');
      if ($('.wrapper').hasClass('push')) {
        $('.nav-mini').removeClass('show');
        $('.wrapper,  #site-description').animate({left: "-300"}, 300, function() {
          $('.over-fly-push').fadeIn(300);

        });
      } else {

        $('.over-fly-push').fadeOut(300, function() {
          $('.wrapper, #site-description').animate({left: "0"}, 300, function() {
            if (Math.round($(window).scrollTop() >= window_height)) {
              $('.nav-mini').addClass('show');
            }
          });

        });
      }

      return false;
    });

    $('.over-fly-push').on("click",function() {
      $('.toogle-menu').click();
    });

    $('.inner-link').on("click",function() {
      var target = this.hash, $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - $('#site-description').height()
      }, 1000, 'easeInOutCirc', function() {
        //window.location.hash = target;
      });
      return false;
    });

    $('.back-to-top').on("click",function() {
      var target = this.hash, $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': 0
      }, 2000, 'easeInOutCirc', function() {
        //window.location.hash = target;
      });
      return false;
    });

    $('.ammount_val').on("click",function() {
      if ($(this).val() == 'other') {
        $('#other_amount').removeClass('hidden');
      } else {
        $('#other_amount').addClass('hidden');
      }
    });
  }

  //Lightbox (popup)
  function initLightBox() {
    $('.image-popup').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    });

    $('.galery-popup-area').each(function(index) {
      $(this).magnificPopup({
        delegate: 'a.galery-popup',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function(item) {
            return item.el.attr('title');
          }
        }
      });
    });


    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });

    $('.find-close-galery').on("click", function() {
      $(this).closest('div.galery-popup-area').find('a.galery-popup')[0].click();
      return false;
    });
  }

  // init Isotope
  function initIsotope() {
    if ($('.galery-box').length > 0) {
      var $grid = $('.galery-box').isotope({
        itemSelector: '.item-box',
        layoutMode: 'fitRows'
      });

      $('.list-filter a').on("click",function() {
        var $this = $(this), el_li = $this.closest("li");
        $('.list-filter li').removeClass('active');
        $(el_li).addClass('active');
        $grid.isotope({filter: $(el_li).data('filter')});
        return false;
      });
    }
  }

  //Tigger Custom Btn FIle
  function initBtnFile() {
    $(document).on('change', '.btn-file :file', function() {
      var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);

    });

    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
      var input = $(this).parents('.input-group').find(':text'),
              log = numFiles > 1 ? numFiles + ' files selected' : label;
      console.log(input)
      if (input.length) {
        input.val(log);
      } else {
        if (log) {
          console.log(log);
        }
      }
    });
  }

})(jQuery);









