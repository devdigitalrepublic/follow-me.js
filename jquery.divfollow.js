/* jquery.divfollow
   -- version 1.0
   -- http://anthonydrakefrost.com

   Feel free to do whatever you'd like with this code.


   - Container must be an ID
*/

(function ($) {

  $.fn.follow = function(options) {

    var settings = $.extend({
        container: "container",
    }, options);

    return this.each(function() {
      var $container = $("#" + settings.container),
          $mark = $(this),
          markDistanceFromPageTop = $container.offset().top,
          markHeight = $mark.outerHeight(),
          containerHeight = $container.height(),
          leeway = containerHeight - markHeight;

      calculateScroll($mark, markDistanceFromPageTop, leeway);
      $(window).scroll(function() { calculateScroll($mark, markDistanceFromPageTop, leeway); });
    });
  };

  function calculateScroll($mark, markDistanceFromPageTop, leeway) {
    // get our current distance from the top
    var viewportDistanceFromPageTop = $(window).scrollTop();

    // STEP ONE: determine if we've passed the mark
    if(viewportDistanceFromPageTop > markDistanceFromPageTop) {

      // STEP TWO: determine how much to move the mark
      var amountToMove = viewportDistanceFromPageTop - markDistanceFromPageTop;

      // STEP THREE: make sure it won't move out of the container
      if(amountToMove < leeway) {
        $mark.stop().animate({"marginTop": amountToMove + "px"}, "slow" );
      }

      // YES, we have touched the bottom
      else {
        $mark.stop().animate({"marginTop": leeway + "px"}, "slow" );
      }
    }

    // NO, we haven't. Move the mark to the top.
    else {
      $mark.stop().animate({"marginTop": "0px"}, "slow" );
    }
  }
}(jQuery));