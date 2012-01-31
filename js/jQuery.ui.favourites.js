
(function( $) {
$.widget( 'ui.favourites', {
	
	options: {
		colors: []
	  ,	index: 0	  
		
	  , colorChange: function( event, ui ) {
	  	}
		
	  ,	loadColors: function( event, ui ){		  
			var	self = ui.self
			  ,	colors = ui.colors
			  ;
			  
			$.ajax({
				type: 'POST'
			  ,	url: 'getfavourites.php'
			  ,	dataType: 'json'
			  ,	success: function( msg ){
					
					if( parseInt( msg.status ) ==1 ){
										 
						if( msg.colors.length == 0 ){
							return false;
						}
						 
						var i = 0
						  ,	colors = msg.colors.split( ',' )
						  ;
							
						for( i = 0; i < colors.length; i++ ){
							self.addHex( colors[i], self.ui ) ;
						}				 
					}
				}
			})
			;
		}
	  ,	saveColors: function( event, ui ){ 	   
	  		var colors = ui.colors;
	  
			$.ajax({
			type: 'POST',
			url: 'savefavourite.php',
			data: 'colors='+colors,
			dataType: 'json',
			success: function( msg ){			
				if( parseInt( msg.status ) == 1 )
				{
				}
				else if( parseInt( msg.status ) == 0 )
				{
				}			
			}
		})
		;
	  }
	},
	
	_create: function(){
		var	self = this
		  ,	colors = this.options.colors
		  ;
		  
		self.options.loadColors( null, { self: self, colors: colors } ) ;
	},
	
	ui: function(){
		return{};
	},
	
	addHex: function( event, ui ){
		var self = this
		  ,	el = self.element
		  ,	fav = self.ui.favourites 
		  ,	div = $( '<div></div>' )
		  ,	color = event
		  ;
		
		self.options.colors[ self.options.index ] = color;
		
		if( self.options.index == 5 ){
			self.options.index = 0;
		}
		
		var container = div
			.clone()
			.addClass( 'favourite_container' )
			.attr( 'index', self.options.index )
			.appendTo(el)
			
		   ,colorbox = div.clone()
		   		.addClass( 'favourite_color' )
				.css( 'background-color', '#' + color )
				.appendTo( container )
				
		   ,trash = div.clone()
		   		.addClass( 'remove_favourite' )
				.appendTo( container )
		   ;
		
		trash.click( function() {
			var index = $( this ).parent().attr( 'index' );
			self.options.colors.splice( index, 1 );
			$( this ).parent().remove();
		})
		;
		
		colorbox.click( function() {
			var color = $( this ).css( 'background-color' )
				,array
				,hex
				;     
			
			array = color.split( '(' );
			array = array[ 1 ].split( ')' );
			array = array[ 0 ].split( ',' );
				 
			hex = RGBtoHEX( array[ 0 ], array[ 1 ], array[ 2 ] );
			
			self._trigger( 'colorChange' , null, $.extend( self.ui, {color: hex} ) ) ;
		})
		;
		
		self.options.index++;
		
	},
	
	addHarm: function( event, ui ){
		var i = 0
		   ,colors = event;
		   
		for(i = 0; i < colors.length; i++ ){
			this.addHex( colors[ i ], self.ui );
		}
	},
	
	_setOptions: function( option, value ){
		$.Widget.prototype._setOption.apply( this, arguments );        
        switch( option ) { 
			case 'colors':
				this.options.colors = value;
				break; 
        } 
	},
	
	destroy: function() { 
		var colors = this.options.colors;
		
		self.options.saveColors( null, { colors: colors } ) ;
		
		$.ui.favourites.prototype.destroy.call( this );
	}
	
})

})( jQuery );
