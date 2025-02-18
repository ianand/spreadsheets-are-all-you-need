/*!
 * jQuery Bully Plugin v0.1.3
 * Examples and documentation at http://pixelgrade.github.io/rellax/
 * Copyright (c) 2016 PixelGrade http://www.pixelgrade.com
 * Licensed under MIT http://www.opensource.org/licenses/mit-license.php/
 */
(function ($, window, document, undefined) {
	var $window = $(window),
		windowHeight = $window.height(),
		elements = [],
		$bully,
		lastScrollY =
			(window.pageYOffset || document.documentElement.scrollTop) -
			(document.documentElement.clientTop || 0),
		current = 0,
		inversed = false,
		frameRendered = true;

	$bully = $('<div class="c-bully">').appendTo("body");
	if (Onepress_Bully.disable_mobile) {
		$bully.addClass('c-bully-hide-on-mobile');
	}

	$current = $(
		'<div class="c-bully__bullet c-bully__bullet--active">'
	).appendTo($bully);

	(function update() {
		if (frameRendered !== true) {
			var count = 0;

			var lastItemId = false;

			// Ty to to find item that bully over
			var _bt = $bully.offset().top;
			var _bh = $bully.height();
			var _bb = _bh + _bt;

			if ($("#masthead").hasClass("is-sticky")) {
				_bb -= $("#masthead").height();
			}
			if ($("#wpadminbar").length) {
				_bb -= $("#wpadminbar").height();
			}

			$.each(Onepress_Bully.sections, function (id, arg) {
				var element = $("#" + id);

				if (element.length) {
					var _et = element.offset().top;
					var _eh = element.height();
					var _eb = _eh + _et;

					if (_et <= _bt || _bb >= _eb || (_bb >= _et && _eb > _bb)) {
						lastItemId = id;
						if (arg.enable) {
							count = count + 1;
						}
					}
				}
			});

			// New insverse
			if (
				lastItemId &&
				typeof Onepress_Bully.sections[lastItemId] !== "undefined"
			) {
				if (Onepress_Bully.sections[lastItemId].inverse) {
					$bully.addClass("c-bully--inversed");
				} else {
					$bully.removeClass("c-bully--inversed");
				}
			}

			if (count !== current) {
				var activeBullet = $bully.find("#bully__" + lastItemId);
				var bullyOffset = $bully.offset();
				var offset = 0;
				if (activeBullet.length > 0) {
					offset = activeBullet.offset().top - bullyOffset.top;
				}

				var offset = $bully.children('.c-bully__bullet').not('.c-bully__bullet--active').first().outerHeight(true) * (count - 1);

				$current.removeClass("c-bully__bullet--squash");
				setTimeout(function () {
					$current.addClass("c-bully__bullet--squash");
				});
				$current.css("top", offset);
				current = count;

				$bully
					.find(".c-bully__bullet--pop")
					.removeClass("c-bully__current");
				activeBullet.addClass("c-bully__current");
			}
		}

		window.requestAnimationFrame(update);
		frameRendered = true;
	})();

	function reloadAll() {
		$.each(elements, function (i, element) {
			element._reloadElement();
		});
	}

	function staggerClass($elements, classname, timeout) {
		$.each($elements, function (i, obj) {
			obj.$bullet.addClass(classname);
			/*
				var stagger = i * timeout;

				setTimeout( function() {
					obj.$bullet.addClass( classname );
				}, stagger );
				*/
		});
	}

	$window.on("load", function (e) {
		staggerClass(elements, "c-bully__bullet--pop", 400);
		frameRendered = false;
	});

	$window.on("scroll", function (e) {
		if (frameRendered === true) {
			lastScrollY =
				(window.pageYOffset || document.documentElement.scrollTop) -
				(document.documentElement.clientTop || 0);
		}
		frameRendered = false;
	});

	$window.on("load resize", function () {
		reloadAll();
	});

	$(document).on("hero_ready", function () {
		reloadAll();
	});

	function Bully(element, options) {
		this.element = element;
		this.options = $.extend({}, $.fn.bully.defaults, options);

		var label = "";
		var id = element.id;

		var self = this,
			$bullet = $('<div id="bully__' + id + '" class="c-bully__bullet">');

		if (Onepress_Bully.enable_label) {
			if (id && typeof Onepress_Bully.sections[id] !== "undefined") {
				label = Onepress_Bully.sections[id].title;
			}
			if (label) {
				$bullet.append(
					'<div class="c-bully__title">' + label + "</div>"
				);
			}
		}

		$bullet.data("bully-data", self).appendTo($bully);
		$bullet.on("click", function (event) {
			event.preventDefault();
			event.stopPropagation();

			self.onClick();
		});

		this.$bullet = $bullet;

		self._reloadElement();
		elements.push(self);
		current = 0;
	}

	Bully.prototype = {
		constructor: Bully,
		_reloadElement: function () {
			this.offset = $(this.element).offset();
			this.height = $(this.element).outerHeight();
		},
		_calcTop: function (top) {
			// check if has sticky
			if ($("#masthead").hasClass("is-sticky")) {
				top -= $("#masthead").height();
			}
			if ($("#wpadminbar").length) {
				top -= $("#wpadminbar").height();
			}

			return top;
		},
		onClick: function () {
			var self = this,
				$target = $("html, body");

			if (self.options.scrollDuration == 0) {
				$target.scrollTop(this._calcTop(self.offset.top));
				return;
			}

			if (self.options.scrollDuration === "auto") {
				var duration =
					Math.abs(lastScrollY - self.offset.top) /
					(self.options.scrollPerSecond / 1000);
				$target.animate(
					{ scrollTop: this._calcTop(self.offset.top) },
					duration
				);
				return;
			}

			$target.animate(
				{ scrollTop: this._calcTop(self.offset.top) },
				self.options.scrollDuration
			);
		}
	};

	$.fn.bully = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + Bully)) {
				$.data(this, "plugin_" + Bully, new Bully(this, options));
			}
		});
	};

	$.fn.bully.defaults = {
		scrollDuration: "auto",
		scrollPerSecond: 4000,
		sections: {}
	};

	$window.on("rellax load", reloadAll);

	$.each(Onepress_Bully.sections, function (id, args) {
		if (args.enable) {
			const section = $("#" + id);
			if (section.length) {
				section.bully({
					scrollPerSecond: 3000
				});
			}
		}
	});

})(jQuery, window, document);
