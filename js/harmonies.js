
(function( $) {
$.widget( "ui.harmonies", {
	
	options: {
		hex:"000000",
		onChange: function(event, ui){
			
			var self = ui.self,
				el = self.element,
   				harm = self.ui.harmonie,  
   				div = $("<div></div>");   			
			
			$("#colorfields_container").remove();			
			div.clone().attr('id','colorfields_container').appendTo(el);
  			$("#colorfields_container .colorfield").unbind(event);
			for( i = 0; i < harm.length; i++ ) {
				div.clone().addClass("colorfield").css("background-color", "#"+ harm[i]).appendTo("#colorfields_container");
			}
		  	
			
		  	self._trigger(  'harmChange' , null, $.extend( self.ui, {harmomie:harm} )) ;
			
			$("#colorfields_container").find(".colorfield").bind({
				click: function(){
			 
					var color = $(this).css("background-color");
				 
					var array;     
					array = color.split("(");
					array = array[1].split(")");
					array = array[0].split(",");
				 
					hex = RGBtoHEX(array[0],array[1],array[2]);
					self._trigger(  'colorChange' , null, $.extend( self.ui, {color: hex} ) ) ;
				}
			});
		}
	},
	
	ui: function(){
		return{self:this};
	},
	
	_create: function(){					
			
	},
	
	setColor: function(hex){
		var self = this;		
		self.options.hex = hex;
	},
	
	analog: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {harmonie: analogColors(hex)});
		$.extend( self.ui, {type:"analog"});
		self._trigger(  'onChange' , null, {self:self} ) ;
	},
	
	accentuated: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {harmonie: accentuatedColors(hex)});
		$.extend( self.ui, {type:"accentuated"});
		self._trigger(  'onChange' , null, {self:self} ) ;
	},
	
	accentuated_analog: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {harmonie: accentuatedAnalogColors(hex)});
		$.extend( self.ui, {type:"accentuated_analog"});
		self._trigger(  'onChange' , null, {self:self} ) ;
	},
	
	_setOptions: function(option, value){
		$.Widget.prototype._setOption.apply( this, arguments );        
	  
        switch (option) { 
			case "hex":
				this.options.hex = value;
				break;
            case "onChange":  
                break;  
        } 
	},
	
	destroy: function() { 
	  	  
	},
	
	_getHarmonies: function(){
		return ["Analog", "Accentuated", "Accentuated Analog", "Companion", "Complementary", "Complementary Plus", "Splitted Complementary", "Splitted Complementary Plus", "Monochromatic", "Quadratic", "Tetrade", "Triade", "Triade Plus" ];
	}
	
})

})( jQuery );

