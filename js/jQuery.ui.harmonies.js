
(function( $) {
$.widget( 'ui.harmonies', {
	
	options: {
		hex: '000000'
	  , onChange: function( event, ui ){
			
			var self = ui.self,
				el = self.element,
   				harm = self.ui.harmonie,  
   				div = $( '<div></div>' );   			
			
			$( '#colorfields_container' ).remove();			
			div.clone().attr( 'id', 'colorfields_container' ).appendTo( el );
  			$( '#colorfields_container .colorfield' ).unbind( event );
			for( i = 0; i < harm.length; i++ ) {
				div.clone().addClass( 'colorfield' ).css( 'background-color', '#' + harm[i] ).appendTo( '#colorfields_container' );
			}
		  	
			
		  	self._trigger(  'harmChange' , null, $.extend( self.ui, { harmomie: harm } ) ) ;
			
			$( '#colorfields_container' ).find( '.colorfield' ).bind({
				click: function(){
			           
					var color = $( this ).css( 'background-color' );
				 
					var array;     
					array = color.split( '(' );
					array = array[ 1 ].split( ')' );
					array = array[ 0 ].split( ',' );
				 
					hex = RGBtoHEX( array[ 0 ], array[ 1 ], array[ 2 ] );
					self._trigger(  'colorChange' , null, $.extend( self.ui, { color: hex} ) ) ;
				}
			});
		}
		
	  , harmChange: function( event, ui ) {
	  	}
		
	  , colorChange: function( event, ui ) {
	  	}
	},
	
	ui: function(){
		return{ self: this };
	},
	
	_create: function(){					
			
	},
	
	setColor: function( hex ){
		var self = this;		
		self.options.hex = hex;
	},
	
	analog: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, { 
			harmonie: analogColors( hex ) 
		} )
		;
		$.extend( self.ui, { 
			type: 'analog' 
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	accentuated: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, { 
			harmonie: accentuatedColors( hex ) 
		} )
		;
		$.extend( self.ui, { 
			type: 'accentuated' 
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	accentuated_analog: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {
			harmonie: accentuatedAnalogColors(hex)
		} )
		;
		$.extend( self.ui, {
			type: 'accentuated_analog'
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	companion: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, { 
			harmonie: companionColors( hex ) 
		} )
		;
		$.extend( self.ui, { 
			type: 'companion' 
		} );
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	complementary: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, { 
			harmonie: complementaryColors( hex ) 
		} )
		;
		$.extend( self.ui, { 
			type: 'complementary' 
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	complementary_plus: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {
			harmonie: complementaryPlusColors( hex )
		} )
		;
		$.extend( self.ui, { 
			type: 'complementary_plus'
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	splitted_complementary: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {
			harmonie: splittedComplementaryColors( hex )
		} )
		;
		$.extend( self.ui, {
			type: 'splitted_complementary'
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	splitted_complementary_plus: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {
				harmonie: splittedComplementaryPlusColors( hex )
		} )
		;
		$.extend( self.ui, {
			type: 'splitted_complementary_plus'
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	monochromatic: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {
				harmonie: monochromaticColors( hex )
		} )
		;
		$.extend( self.ui, {
			type: 'monochromatic'
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	quadratic: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {
				harmonie: quadraticColors( hex )
		} )
		;
		$.extend( self.ui, {
			type: 'quadratic'
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	tetrade: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {
				harmonie: tetradeColors( hex )
		} )
		;
		$.extend( self.ui, {
			type: 'tetrade'
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	triade: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {
				harmonie: triadeColors( hex )
		} )
		;
		$.extend( self.ui, {
			type: 'triade'
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	triade_plus: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, { 
			harmonie: triadePlusColors( hex )
		} )
		;
		$.extend( self.ui, { 
			type: 'triade_plus' 
		} )
		;
		self._trigger( 'onChange' , null, { self: self } ) ;
	},
	
	_setOptions: function( option, value ){		
		$.Widget.prototype._setOption.apply( this, arguments );        
	  
        switch ( option ) { 
			case 'hex':
				this.options.hex = value;
				break;
            case 'onChange':  
                break;  
        } 
	},
	
	destroy: function() { 
		$( '#colorfields_container' ).find( '.colorfield' ).unbind();
	  	  $.ui.harmonies.prototype.destroy.call( this );
	}
	
})

})( jQuery );

