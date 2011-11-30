jQuery Modal plugin
=====

jQuery plugin to display a custom popup

Usage:
-----
	/* INITIALIZATION */
	var Modal	= $.modal({
		width:			300,		// the initial width of the popup
		height:			300,		// the initial height of the popup
		borderWeight:	1,			// the border weight of the popup
		borderRadius:	4,			// the border radius of the popup
		borderColor:	'#444444',	// the border colour of the popup
		bgColor:		'#EEEEEE',	// the popup's background colour
		maskColor:		'#FFFFFF',	// the background colour of the overlay placed below the popup
		maskOpacity:	0.8,		// opacity of the overlay placed below the popup
		fadeFx:			true,		// fade in/out?
		zIndex:			10000		// the base z-index to use
	});
	
	/* TO SHOW A POPUP */
	modal.show({
		width:		500,			// the width of the popup (optional)
		height:		400,			// the height of the popup (optional)
		title:		'Modal Window',	// the title for the popup window
		// [either]
		url:		'',				// the url where the content should be retrieved
		data:		{},				// the data to pass to the url above
		// [or]
		content:	'',				// the html to display as the main content
		// [end]
		callback:	function() {}	// function to call after the popup is shown
	});
	
	/* DISABLE THE POPUP AND DISPLAY A BUSY MESSAGE WHILE DOING SOMETHING ELSE */
	modal.busy(true,'Please wait...');
	
	/* ENABLE THE POPUP AGAIN */
	modal.busy(false);