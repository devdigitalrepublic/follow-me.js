/* jquery.divfollow
   -- version 1.4
   -- http://github.com/lordkai/DivFollow

   Feel free to do whatever you'd like with this code.
*/

(function ($) {

  $.fn.follow = function(options) {

    var settings = $.extend({
        container: "container",
        topStart: function() {},
        topEnd: function() {},
        bottomStart: function() {},
        bottomEnd: function() {},
        movingStart: function() {},
        movingEnd: function() {},
        speed: 500,
        offset: 0,
        offsetElement: ""
    }, options);

    return this.each(function() {

      var $container = $("#" + settings.container),
          $mark = $(this),
          markDistanceFromPageTop = $container.offset().top,
          markHeight = $mark.outerHeight(),
          containerHeight = $container.height(),
          leeway = containerHeight - markHeight,

          // keep track of whether we're already moving (used for callbacks)
          moving = [false, false, false];
          
      moving = calculateScroll($mark, markDistanceFromPageTop, leeway, settings, moving);

      $(window).scroll(function() { calculateScroll($mark, markDistanceFromPageTop, leeway, settings, moving); });

      // recalculate everything
      $(window).resize(function() {

          // it's possible that when resizing
          // the mark will push the container down, increasing its height
          
          // the fix is to temporarily move the mark to the top of container
          // and then move it either back or to the bottom if it's too far
          
          var pastHeight = $mark.css("margin-top");
          $mark.css("margin-top", "0px");

          markDistanceFromPageTop = $container.offset().top;
          markHeight = $mark.outerHeight();
          containerHeight = $container.height();
          leeway = containerHeight - markHeight;

          if(pastHeight > leeway) $mark.css("margin-top", leeway);
          else $mark.css("margin-top", pastHeight);

          moving = calculateScroll($mark, markDistanceFromPageTop, leeway, settings, moving);
      });
    });
  };

  function calculateScroll($mark, markDistanceFromPageTop, leeway, settings, moving) {
    // get our current distance from the top and how far the element has moved already
    var viewportDistanceFromPageTop = $(window).scrollTop() + (settings.offsetElement === "" ? settings.offset : $("#" + settings.offsetElement).height()),
        currentPosition = parseInt($mark.css("margin-top"), 10);

    // STEP ONE: determine if we've passed the mark
    if(viewportDistanceFromPageTop > markDistanceFromPageTop) {

      // STEP TWO: determine how much to move the mark
      var amountToMove = viewportDistanceFromPageTop - markDistanceFromPageTop;

      // STEP THREE: make sure it won't move out of the container
      if(amountToMove < leeway) {

        // trigger the start movement only if we aren't already moving
        if(!moving[0]) {
          moving[0] = true;
          settings.movingStart();
        }

        // resest flags after the animation ends
        $mark.stop().animate({"marginTop": amountToMove + "px"},
          settings.speed,
          function() {
            settings.movingEnd();
            moving[0] = false; moving[1] = false; moving[2] = false;
          }
        );
      }

      // YES, we have touched the bottom
      else if(currentPosition !== leeway) {

        // trigger move to bottom if we aren't already moving to the bottom
        if(!moving[1]) {
          moving[1] = true;
          settings.bottomStart();
        }

        // resest flags after the animation ends
        $mark.stop().animate({"marginTop": leeway + "px"},
          settings.speed,
          function() {
            settings.bottomEnd();
            moving[0] = false; moving[1] = false; moving[2] = false;
          }
        );
      }
    }

    // NO, we haven't. Move the mark to the top if it's not already there
    else if(currentPosition !== 0) {

      // trigger move to top flag if we aren't already moving to the top
      if(!moving[2]) {
        moving[2] = true;
        settings.topStart();
      }

      // resest flags after the animation ends
      $mark.stop().animate({"marginTop": "0px"},
        settings.speed,
        function() {
          settings.topEnd();
          moving[0] = false; moving[1] = false; moving[2] = false;
        }
      );
    }

    return moving;
  }

}(jQuery));