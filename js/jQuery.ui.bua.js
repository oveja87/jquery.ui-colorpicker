
(function( $) {
$.widget( 'ui.bua', {
	
	options: {
		colorChange: function( event, ui ) {
		}
	},
	
	_create: function() {
		var self = this
		  ,	el = self.element
		  ,	div = $( '<div></ div>' )
		  
		  ,	colorwheel = div
		  		.clone()
				.attr( 'id', 'wheelcontainer' )
				.appendTo( el )
				
		  ,	dot = div.clone()
		  		.attr( 'id', 'wheeldrag' )
				.css( { position: 'relative' } )
				.appendTo( colorwheel )
		  ;
		
		$(dot).hide();		
			
		var w = $( colorwheel ).width()
		  ,	h = $( colorwheel ).height()		   
		  ;		
		
		$( '<canvas></canvas>' )
			.attr( { id: 'canvas', width: w, height: h } )
			.appendTo( colorwheel )
		;
			
			
		var imageObj = new Image() ;
			imageObj.src = 'img/colorwheel.png' ;
			
			
		$( imageObj ).load( function( e ){
        	self._image( imageObj, self ) ;
        })
		;
			
			
	},
	
	ui: function(){
		return{ self: this };
	},
	
	hide: function(){
		$( '#wheeldrag' ).hide();
	},
	
	_image:function( imageObj, context ){	
		var canvas = document.getElementById( 'canvas' );
		var ctx = canvas.getContext( '2d' );
		
		ctx.drawImage( imageObj, 0, 0, canvas.width, canvas.height );
		
		$( '#canvas' ).bind({
			click: function( event, ui ){				
				var x = event.pageX-$( '#canvas' ).position().left
				  , y = event.pageY-$( '#canvas' ).position().top
				  , imageData = ctx.getImageData( x, y, 1, 1 )
				  , data = imageData.data
				  , hex = RGBtoHEX( data[ 0 ], data[ 1 ], data[ 2 ] )
				  ;
				
				$('#wheeldrag').show();
				$('#wheeldrag').offset({
					left:event.pageX-7
				  , top:event.pageY-7
				})
				;
				context._trigger(  'colorChange' , null, $.extend( context.ui, { color: hex } ) ) ;
			} 
		});
	},
	
	
	
	_setOptions: function( option, value ){
		$.Widget.prototype._setOption.apply( this, arguments );        
	  
        switch( option ) { 
			case 'hex':
				var self = this;
				break; 
        } 
	},
	
	destroy: function() { 
	
		$( '#canvas' ).unbind();
		
		$.ui.BundA.prototype.destroy.call( this );
	}
	
})

})( jQuery );
