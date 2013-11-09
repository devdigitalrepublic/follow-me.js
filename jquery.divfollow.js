/* jquery.divfollow
	 -- version 1.51
	 -- http://korobu.com/divfollow

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
				offsetElement: "",
				min: null,
				max: null
		}, options);

		return this.each(function() {

			var $container = $("#" + settings.container),
					$mark = $(this),

					// must calculate this only once since the mark's position will change
					markDistanceFromContainerTop =  $mark.offset().top - $container.offset().top,

					// keep track of whether we're already moving (used for callbacks)
					moving = [false, false, false];

			moving = calculateScroll($mark, $container, markDistanceFromContainerTop, settings, moving, false);

			$(window).scroll(function() { calculateScroll($mark, $container, markDistanceFromContainerTop, settings, moving, true); });

			// recalculate everything
			$(window).resize(function() {

					// it's possible that when resizing
					// the mark will push the container down, increasing its height

					// the fix is to temporarily move the mark to the top of container
					// and then work from there

					var pastHeight = $mark.css("margin-top");
					$mark.css("margin-top", "0px");

					moving = calculateScroll($mark, $container, markDistanceFromContainerTop, settings, moving, false);
			});
		});
	};

	function calculateScroll($mark, $container, markDistanceFromContainerTop, settings, moving, animate) {

		// don't do anything if we're at the disable limit, or if the browser is shorter than the mark
		var markHeight = $mark.outerHeight();
		if((settings.min !== null && window.innerWidth <= settings.min) || (settings.max !== null && window.innerWidth >= settings.max) || (window.innerHeight <= markHeight)) {
			$mark.css("margin-top", markDistanceFromContainerTop + "px");
			return moving;
		}

		// dynamically calculate this in case the mark or container changes size/place
		var containerDistanceFromPageTop = $container.offset().top,
				startScrolling = containerDistanceFromPageTop + markDistanceFromContainerTop,
				containerHeight = $container.height(),
				leeway = containerHeight - markHeight,

				// get our current distance from the top and how far the element has moved already
				viewportDistanceFromPageTop = $(window).scrollTop() + (settings.offsetElement === "" ? settings.offset : $("#" + settings.offsetElement).height()),
				currentPosition = parseInt($mark.css("margin-top"), 10);

		// STEP ONE: determine if we've passed the mark
		if(viewportDistanceFromPageTop > startScrolling) {

			// STEP TWO: determine how much to move the mark
			var amountToMove = viewportDistanceFromPageTop - containerDistanceFromPageTop;

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
		else if(currentPosition !== markDistanceFromContainerTop) {

			// trigger move to top flag if we aren't already moving to the top
			if(!moving[2]) {
				moving[2] = true;
				settings.topStart();
			}

			if(animate) {
				// resest flags after the animation ends
				$mark.stop().animate({"marginTop": markDistanceFromContainerTop + "px"},
					settings.speed,
					function() {
						settings.topEnd();
						moving[0] = false; moving[1] = false; moving[2] = false;
					}
				);
			}
			else $mark.css("margin-top", markDistanceFromContainerTop + "px");
		}

		return moving;
	}

}(jQuery));