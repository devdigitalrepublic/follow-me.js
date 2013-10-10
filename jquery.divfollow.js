/* jquery.divfollow
   -- version 1.3
   -- http://anthonydrakefrost.com

   Feel free to do whatever you'd like with this code.


   - Container must be an ID
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
        speed: 500
    }, options);

    return this.each(function() {
      var $container = $("#" + settings.container),
          $mark = $(this),
          markDistanceFromPageTop = $container.offset().top,
          markHeight = $mark.outerHeight(),
          containerHeight = $container.height(),
          leeway = containerHeight - markHeight;

      
      calculateScroll($mark, markDistanceFromPageTop, leeway, settings);

      $(window).scroll(function() { calculateScroll($mark, markDistanceFromPageTop, leeway, settings); });

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

          calculateScroll($mark, markDistanceFromPageTop, leeway, settings);
      });
    });
  };

  function calculateScroll($mark, markDistanceFromPageTop, leeway, settings) {
    // get our current distance from the top and how far the element has moved already
    var viewportDistanceFromPageTop = $(window).scrollTop(),
        currentPosition = parseInt($mark.css("margin-top"), 10);

    // STEP ONE: determine if we've passed the mark
    if(viewportDistanceFromPageTop > markDistanceFromPageTop) {

      // STEP TWO: determine how much to move the mark
      var amountToMove = viewportDistanceFromPageTop - markDistanceFromPageTop;

      // STEP THREE: make sure it won't move out of the container
      if(amountToMove < leeway) {
        settings.movingStart();
        $mark.stop().animate({"marginTop": amountToMove + "px"}, settings.speed, settings.movingEnd);
      }

      // YES, we have touched the bottom
      else if(currentPosition !== leeway) {
        settings.bottomStart();
        $mark.stop().animate({"marginTop": leeway + "px"}, settings.speed, settings.bottomEnd);
      }
    }

    // NO, we haven't. Move the mark to the top if it's not already there
    else if(currentPosition !== 0) {
      settings.topStart();
      $mark.stop().animate({"marginTop": "0px"}, settings.speed, settings.topEnd);
    }
  }
}(jQuery));