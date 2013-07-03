;(function ( $, window, document, undefined ) {

		var pluginName = "typo",
			defaults = {
				speed: 400,
				cursor: '',
				accuracy: 1.0,
				natural: false,
				keepCursor: false,
				callback: function(){},
				wipeCallback: function(){}
			};

		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.alphabet = this.createAlphabet();
				this.init();
		}

		Plugin.prototype = {
				init: function () {
						this.$element = $(this.element);
						this.finalText = this.$element.html();
						this.$element.html("").show();
						this.typeNextCharacter(0);
				},
				
				typeNextCharacter: function (i) {
					if (this.finalText.length > i) {
						
						this.$element.html(this.$element.html().substr(0,i) + this.getNextCharacter(i) + this.settings.cursor);	
						
						var delay;
						if (this.settings.natural) {
							delay = Math.random() * this.settings.speed * 1.5 + (this.settings.speed/2);
						} else {
							delay = this.settings.speed;
						}

						var self = this;
						if (self.$element.html() != self.finalText.substr(0, i+1) + self.settings.cursor) {
							setTimeout(function () {
								self.$element.html( self.$element.html().substr(0, i) + self.settings.cursor );
								setTimeout(function () {
									self.$element.html( self.finalText.substr(0, i+1) + self.settings.cursor );
									setTimeout(function (argument) {
										self.typeNextCharacter(i+1);	
									}, delay);
								}, delay);
							}, delay);
						} else {
							setTimeout(function () {
								self.typeNextCharacter(i+1);
							}, delay);
						}

					} else {

						if (this.settings.keepCursor) {
							this.$element.html(this.finalText + this.settings.cursor);	
						} else {
							this.$element.html(this.finalText);
						}
						if (this.settings.callback !== undefined) {
							this.settings.callback(this);
						}
					}

				},

				getNextCharacter: function (i) {
					var currentChar = this.finalText.substr(i, 1);
					if (currentChar.toLowerCase() !== undefined) currentChar = currentChar.toLowerCase();

					var nextChar = this.alphabet[currentChar][Math.floor(Math.random() * this.alphabet[currentChar].length)];
					if (nextChar.toUpperCase() === this.finalText.substr(i, 1)) {
						nextChar = nextChar.toUpperCase();
					}

					return (nextChar); 
				},

				createAlphabet: function () {

					// Generate alphabet
					var alpha = {};

					alpha['q'] = ['q','w','a','s'];
					alpha['w'] = ['w','q','a','s','e'];
					alpha['e'] = ['e','w','s','d','r'];
					alpha['r'] = ['r','e','d','f','t'];
					alpha['t'] = ['t','r','f','g','y'];
					alpha['y'] = ['y','t','h','u'];
					alpha['u'] = ['u','y','h','j','i'];
					alpha['i'] = ['i','u','j','k','o'];
					alpha['o'] = ['o','i','l','p'];
					alpha['p'] = ['p','o',';','l','['];

					alpha['a'] = ['a','q','s','z'];
					alpha['s'] = ['s','w','a','z','x','d','e'];
					alpha['d'] = ['d','e','s','x','c','f','r'];
					alpha['f'] = ['f','r','d','c','v','g'];
					alpha['g'] = ['g','t','f','v','b','h'];
					alpha['h'] = ['h','y','g','j','n'];
					alpha['j'] = ['j','u','h','k','n'];
					alpha['k'] = ['k','l','j',',','i'];
					alpha['l'] = ['l',';','k','o','p','.'];

					alpha['z'] = ['z','a','s','x'];
					alpha['x'] = ['x','z','s','d','c'];
					alpha['c'] = ['c','v','f','d','x'];
					alpha['v'] = ['v','c','b','f','g'];
					alpha['b'] = ['b','v','n','g','h'];
					alpha['n'] = ['n','b','m','j','h'];
					alpha['m'] = ['m','n',',','k','j'];
					alpha[','] = [',','.','m','l','k'];
					alpha['.'] = ['.',',','/',';','l'];
					
					alpha['1'] = ['1','2','q','`'];
					alpha['2'] = ['2','1','3','w','q'];
					alpha['3'] = ['3','2','4','w','e'];
					alpha['4'] = ['4','3','5','e','r'];
					alpha['5'] = ['5','4','6','r','t'];
					alpha['6'] = ['6','5','7','t','y'];
					alpha['7'] = ['7','6','8','y','u'];
					alpha['8'] = ['8','7','9','u','i'];
					alpha['9'] = ['9','8','0','i','o'];
					alpha['0'] = ['0','9','-','o','p'];

					alpha[' '] = [' '];
					alpha['-'] = ['-', '=', '0'];
					alpha['"'] = [';','[',']'];
					alpha['\''] = [';','/','[',']'];

					alpha['!'] = ['!','1','`','~','@'];
					alpha['@'] = ['@','2','#','3','!','1'];
					alpha['#'] = ['#','3','$','4','@','2'];
					alpha['$'] = ['$','4','%','5','#','3'];
					alpha['%'] = ['%','5','^','6','$','4'];
					alpha['^'] = ['^','6','&','7','%','5'];
					alpha['&'] = ['&','7','*','8','^','6'];
					alpha['*'] = ['*','8','(','9','&','7'];
					alpha['('] = ['(','9',')','0','*','8'];
					alpha[')'] = [')','0','_','-','(','9'];
					alpha['_'] = ['_','-','=','0',')'];


					// Generate weights based on accuracy
					var weights = {};
					var weightedAlpha = {};
					
					for (i in alpha) {
						if (alpha.hasOwnProperty(i)) {
							weightedAlpha[i] = [];
							for (j in alpha[i]) {
								if (alpha[i].hasOwnProperty(j)) {
									weights[i] = {};		
									if (alpha[i][j] === alpha[i][0]) {
										weights[i][j] = this.settings.accuracy;
									} else {
										 weights[i][j] = (1.0 - this.settings.accuracy) / (Object.keys(alpha[i]).length-1);
									}
									for (var k=0; k<weights[i][j]*100; k++) {
										weightedAlpha[i].push(alpha[i][j]);
									}
								}
							}
						}
					}

					// Return weighted alphabet
					return weightedAlpha;
				},

				wipe: function ($element, i) {
					i = i || 1;
					var length = $element.html().length;
					if (length > 1) {
						var self = this;
						setTimeout(function() {
							$element.html( $element.html().substr(0, length-i) + self.settings.cursor);
							self.wipe($element, i+1);
						}, this.settings.speed);
					} else {
						$element.html("");
						if (this.settings.wipeCallback !== undefined) {
							this.settings.wipeCallback(this);
						}
					}
				},

				bind: function() {  },
  
				destroy: function() {
					this.$element.unbind("destroyed", 
						this.teardown);
					this.teardown();
				},

				teardown: function() {
					$.removeData(this.$element[0], this.name);
					this.$element.removeClass(this.name);
					this.unbind();
					this.element = null;
				},

				unbind: function() {  }

		};

		
		// Plug-in wrapper (preventing multiple instantiations)
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
