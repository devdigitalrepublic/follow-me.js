/* jquery.divfollow
   -- version 1.41
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

          // keep track of whether we're already moving (used for callbacks)
          moving = [false, false, false];
          
      moving = calculateScroll($mark, $container, settings, moving, false);

      $(window).scroll(function() { calculateScroll($mark, $container, settings, moving, true); });

      // recalculate everything
      $(window).resize(function() {

          // it's possible that when resizing
          // the mark will push the container down, increasing its height
          
          // the fix is to temporarily move the mark to the top of container
          // and then work from there
          
          var pastHeight = $mark.css("margin-top");
          $mark.css("margin-top", "0px");

          moving = calculateScroll($mark, $container, settings, moving, false);
      });
    });
  };

  function calculateScroll($mark, $container, settings, moving, animate) {
    // dynamically calculate this in case the mark or container changes size/place
    var markDistanceFromPageTop = $container.offset().top,
        markHeight = $mark.outerHeight(),
        containerHeight = $container.height(),
        leeway = containerHeight - markHeight,

        // get our current distance from the top and how far the element has moved already
        viewportDistanceFromPageTop = $(window).scrollTop() + (settings.offsetElement === "" ? settings.offset : $("#" + settings.offsetElement).height()),
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

        if(animate) {
          // resest flags after the animation ends
          $mark.stop().animate({"marginTop": amountToMove + "px"},
            settings.speed,
            function() {
              settings.movingEnd();
              moving[0] = false; moving[1] = false; moving[2] = false;
            }
          );
        }
        else $mark.css("margin-top", amountToMove + "px");
      }

      // YES, we have touched the bottom
      else if(currentPosition !== leeway) {

        // trigger move to bottom if we aren't already moving to the bottom
        if(!moving[1]) {
          moving[1] = true;
          settings.bottomStart();
        }

        if(animate) {
          // resest flags after the animation ends
          $mark.stop().animate({"marginTop": leeway + "px"},
            settings.speed,
            function() {
              settings.bottomEnd();
              moving[0] = false; moving[1] = false; moving[2] = false;
            }
          );
        }
        else $mark.css("margin-top", leeway + "px");
      }
    }

    // NO, we haven't. Move the mark to the top if it's not already there
    else if(currentPosition !== 0) {

      // trigger move to top flag if we aren't already moving to the top
      if(!moving[2]) {
        moving[2] = true;
        settings.topStart();
      }

      if(animate) {
        // resest flags after the animation ends
        $mark.stop().animate({"marginTop": "0px"},
          settings.speed,
          function() {
            settings.topEnd();
            moving[0] = false; moving[1] = false; moving[2] = false;
          }
        );
      }
      else $mark.css("margin-top", "0px");
    }

    return moving;
  }

}(jQuery));