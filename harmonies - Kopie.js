
(function( $) {
$.widget( "ui.harmonies", {
	
	options: {
		hex: '45ade2'
	},
	
	ui: function(){
		return{};
	},
	
	harmonie1: function ( hex ){
		var self = this;
		
		this._trigger(  'onChange' , null, $.extend( self.ui, {harmonie: self._getHarmonies()} ) ) 
	},
	
	_create: function(){		
			
	},
	
	setOptions: function(){
		
	},
	
	destroy: function() { 
	  	  
	},
	
	_getHarmonies: function(){
		return ["Analog", "Accentuated", "Accentuated Analog", "Companion", "Complementary", "Complementary Plus", "Splitted Complementary", "Splitted Complementary Plus", "Monochromatic", "Quadratic", "Tetrade", "Triade", "Triade Plus" ];
	}
	
})

})( jQuery );
