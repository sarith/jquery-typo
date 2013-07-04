$(function() {
	$(".type-me").typo({
		// Speed in milliseconds between each character
		speed: 150,
		// Cursor trailing the typing   
		cursor: '_',
		// natural (a boolean value) will introduce variance to the speed property, making for a slightly more natural-looking typing animation 
		natural: true,
		// 0.0 - 1.0 range of accuracy. 1.0 will never make mistakes, 0.0 will make mistakes on every character (likely will not get past the first character) 
		accuracy: 0.7
	});
});