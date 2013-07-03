# jQuery Typo
A simple jQuery plugin that helps to recreate a believable typewriting effect, complete with typographical errors and speed variance.

### Typos & Variance
This very early version of the plug-in uses a basic multidimensional data structure for most of the typeable keys on a US QWERTY-style keyboard layout. Adjacent keys are mapped to each character.

#### Accuracy
You can affect the **accuracy** of the typewriting by specifying a floating point value between 0.0 and 1.0.  1.0 will produce a 100% accurate typing animation (no mistakes), while 0.0 will make for a 0% success rate when trying to type out the text.

#### Speed
The **natural** boolean property makes for a small amount of variance in the **speed** of the typing animation – this, hopefully, creates a slightly more realistic-looking effect.

### Usage
See the demo at [http://sarith.github.io/jquery-typo/demo](http://sarith.github.io/jquery-typo/demo) for an example of setting up the plugin, but in short:

	$("#element").typo({
		speed: 150, // Speed in milliseconds
		cursor: '_', // Cursor trailing the typing   
		natural: true, // Natural-looking variance (or not) 
		accuracy: 0.7, // 0.0 - 1.0 range of accuracy
		callback: function(e) { // Callback function
			$(e.element).css('color', 'cyan');
			setTimeout(function() {
				e.wipe(e.$element); // Animated erasure of text
			}, 3000);
	});

### License
MIT License: [http://sarith.mit-license.org/](http://sarith.mit-license.org/)
 