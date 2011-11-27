/**
 *	
 */
;(function($) {
	$.modal = function(options) {
		var me			= {},
			emptyFn		= function() {},
			defaults	= {
				width:			300,
				height:			300,
				borderRadius:	4,
				borderColor:	'#444444',
				bgColor:		'#EEEEEE',
				maskColor:		'#FFFFFF',
				maskOpacity:	0.8,
				fadeFx:			true,
				zIndex:			10000
			};
		// merge the defaults with the supplied options
		me.options		= $.extend({},defaults,options);
		// create the elements
		me.$mask		= $('<div/>',{
			'id':		'dharyk-modal',
			'class':	'modal-mask',
			css:		{
				backgroundColor:	me.options.maskColor,
				opacity:			me.options.maskOpacity,
				zIndex:				me.options.zIndex,
			}
		});
		me.$view		= $('<div/>',{
			'class':	'modal-view',
			css:		{
				border:				'1px solid '+me.options.borderColor,
				borderRadius:		me.options.borderRadius,
				backgroundColor:	me.options.bgColor,
				zIndex:				(me.options.zIndex+10)
			}
		});
		me.$head		= $('<div/>',{
			'class':	'modal-title'
		});
		me.$icon		= $('<div/>',{
			'class':	'modal-close'
		});
		me.$html		= $('<div/>',{
			'class':	'modal-content'
		});
		me.$busy		= $('<div/>',{
			'class':	'modal-busy',
			css:		{
				backgroundColor:	me.options.maskColor,
				opacity:			me.options.maskOpacity,
				zIndex:				(me.options.zIndex+20)
			}
		});
		// function to display the modal window
		me.show			= function(opts) {
			// set the width/height, if provided
			me.options.width	= parseInt(opts.width, 10)||me.options.width;
			me.options.height	= parseInt(opts.height, 10)||me.options.height;
			// get the content from url or set it if provided
			if (opts.url) {
				me.getContent(opts.url,opts.data,opts.call);
			} else {
				me.setContent(opts.content||'');
			}
			// set the modal window's title
			me.setTitle(opts.title||'');
			// (re)position the modal window
			me.position();
			// show the modal window
			me.$mask.show();
			if (me.options.fadeFx) {
				me.$view.fadeIn(500);
			} else {
				me.$view.show();
			}
		};
		me.position		= function() {
			var w		= me.options.width,
				h		= me.options.height,
				top		= Math.round(($(window).height() - h) / 2),
				left	= Math.round(($(window).width() - w) / 2);
			// position the window & the busy mask
			me.$view.css({
				top:		top,
				left:		left,
				width:		w,
				height:		h
			});
			me.$busy.css({
				top:		top,
				left:		left,
				width:		w,
				height:		h
			});
			// position the title
			me.$head.css({
				width:		(w-30)
			});
			// position the content
			me.$html.css({
				width:		(w-10),
				height:		(h-30)
			});
		};
		// set the title
		me.setTitle		= function(title) {
			me.$head.html(title);
		};
		// set the content
		me.setContent	= function(html) {
			me.$html.html(html);
		};
		// get the content
		me.getContent	= function(url,data,callback) {
			data = data||{};
			callback = callback||emptyFn;
			me.$html.load(url,data,callback);
		};
		// show/hide the busy mask
		me.busy			= function(isBusy,message) {
			if (isBusy) {
				me.$busy.show();
			} else {
				me.$busy.hide();
			}
		};
		// function to close the modal window
		me.close		= function() {
			me.$busy.hide();
			if (me.options.fadeFx) {
				me.$view.fadeOut(500,function() {
					me.$mask.hide();
				});
			} else {
				me.$view.hide();
				me.$mask.hide();
			}
		};
		// inject the mask overlay
		me.$mask.appendTo('body');
		// inject the viewport
		me.$head.appendTo(me.$view);
		me.$icon.appendTo(me.$view);
		me.$html.appendTo(me.$view);
		me.$view.appendTo('body');
		// inject the busy overlay
		me.$busy.appendTo('body');
		// assign event handlers
		$(window).scroll(me.position);
		$(window).resize(me.position);
		me.$icon.click(me.close);
		return me;
	};
})(jQuery);