/* jquery.follow-me.js 1.0.13 | 0x0049 | http://0x0049.link/followmejs | MIT license */
/* global jQuery */
;(function ($, window) {

	// Defaults.
	var pluginName = 'follow';
	var defaults = {
		container: 'container',
		topStart: function() {},
		topEnd: function() {},
		bottomStart: function() {},
		bottomEnd: function() {},
		movingStart: function() {},
		movingEnd: function() {},
		speed: 500,
		offset: 0,
		offsetElement: null,
		min: null,
		max: null
	};

	// Plugin constructor.
	function Plugin (element, options) {
		this.$mark = $(element);
		this.settings = $.extend({}, defaults, options);
		this.initialize();
	}

	// Avoid Plugin.prototype conflicts.
	$.extend(Plugin.prototype, {
		calculateScroll: function (animate) {
			// Lets us reference 'this', the plugin, when it would otherwise mean something else.
			var plugin = this;

			// Don't do anything if we're at the disable limit, or if the browser is shorter than the mark.
			var markHeight = plugin.$mark.outerHeight();
			if((plugin.settings.min !== null && window.innerWidth <= plugin.settings.min) || (plugin.settings.max !== null && window.innerWidth >= plugin.settings.max) || (window.innerHeight <= markHeight)) {
				plugin.$mark.removeAttr('style');
				return;
			}

			// Dynamically calculate the leeway in case the mark or container changes size/place.
			// The leeway is how much the mark can move within the container.
			var startScrolling = plugin.$container.offset().top;
			var leeway = plugin.$container.height() - markHeight; // Must NOT be outerHeight().

			// Get our current distance from the top and how far the element has moved already.
			var viewportDistanceFromPageTop = $(window).scrollTop() + (plugin.settings.offsetElement === null ? plugin.settings.offset : $('#' + plugin.settings.offsetElement).height());
			var currentPosition = parseInt(plugin.$mark.css('margin-top'), 10);

			// STEP ONE: Determine if we've passed the mark.
			if(viewportDistanceFromPageTop > startScrolling) {

				// STEP TWO: Determine how much to move the mark.
				var amountToMove = viewportDistanceFromPageTop - startScrolling;

				// STEP THREE: Make sure it won't move out of the container.
				if(amountToMove < leeway) {

					// Trigger the start movement only if we aren't already moving.
					if(!plugin.moving[0]) {
						plugin.moving[0] = true;
						plugin.settings.movingStart();
					}

					if(animate) {
						// Reset flags after the animation ends.
						plugin.$mark.stop().animate({'marginTop': amountToMove + 'px'},
							plugin.settings.speed,
							function() {
								plugin.settings.movingEnd();
								plugin.moving[0] = false; plugin.moving[1] = false; plugin.moving[2] = false;
							}
						);
					}
					else {
						plugin.$mark.css('margin-top', amountToMove + 'px');
					}
				}

				// YES, we would move out of the container. Move the mark to the bottom if it's not already there.
				else if(currentPosition !== leeway) {

					// Trigger move to bottom if we aren't already moving to the bottom.
					if(!plugin.moving[1]) {
						plugin.moving[1] = true;
						plugin.settings.bottomStart();
					}

					if(animate) {
						// Reset flags after the animation ends.
						plugin.$mark.stop().animate({'marginTop': leeway + 'px'},
							plugin.settings.speed,
							function() {
								plugin.settings.bottomEnd();
								plugin.moving[0] = false; plugin.moving[1] = false; plugin.moving[2] = false;
							}
						);
					}
					else {
						plugin.$mark.css('margin-top', leeway + 'px');
					}
				}
			}

			// NO, we haven't passed the mark. Move the mark to the top if it's not already there.
			else if(currentPosition !== 0) {

				// Trigger move to top flag if we aren't already moving to the top.
				if(!plugin.moving[2]) {
					plugin.moving[2] = true;
					plugin.settings.topStart();
				}

				if(animate) {
					// Reset flags after the animation ends.
					plugin.$mark.stop().animate({'marginTop': '0px'},
						plugin.settings.speed,
						function() {
							plugin.settings.topEnd();
							plugin.moving[0] = false; plugin.moving[1] = false; plugin.moving[2] = false;
						}
					);
				}
				else {
					plugin.$mark.css('margin-top', '0px');
				}
			}
		},

		initialize: function () {
			// Lets us reference 'this', the plugin, when it would otherwise mean something else.
			var plugin = this;

			plugin.$container = $('#' + plugin.settings.container);

			// Keep track of whether we're already moving (used for callbacks).
			plugin.moving = [false, false, false];

			plugin.calculateScroll(false);

			$(window).scroll(function() { plugin.calculateScroll(true); });

			// Recalculate everything when resizing.
			$(window).resize(function() {
					// It's possible that when resizing the mark will push the container down, increasing its height.
					// The fix is to temporarily move the mark to the top of container and then work from there.
					plugin.$mark.css('margin-top', '0px');
					plugin.calculateScroll(false);
			});
		}
	});

	// Wrapper around constructor preventing multiple instantiations.
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};
}(jQuery, window));
