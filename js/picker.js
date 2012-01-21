
(function( $) {
$.widget( "ui.picker", {
	
	options: {
		hex: '000000',
		type: 'bar'
	},
	
	_create: function(){
		var self = this,
			o = self.options,
			hex = o.hex,
			type = o.type,
				
			el = self.element,
			div = $("<div></ div>"),
			
			hex = self.options.hex,
			
			rgb = HEXtoRGB(hex),
			hsb = HEXtoHSB(hex),
			cmyk = HEXtoCMYK(hex);	
			
			
		if(type == 'bar'){
			var container = div.clone().attr('id','picker_bar').appendTo(el);
			
			var colorfield = div.clone().attr('id','hsb_colorfield').appendTo(container);
			div.clone().attr('id','draggable').appendTo(colorfield).draggable({containment: "parent"});
			
			div.clone().attr('id','hsb_colorbar').appendTo(container).slider({max:360, orientation: "vertical"});
			
			
			//eventhandler
			
			$("#draggable").bind('drag', {context:this}, this._colorfieldChanged);			
			
			$( "#hsb_colorbar" ).bind('slide', {context:this}, this._colorbarChanged);				
			
			$("#hsb_colorfield").bind({
				mousedown: this._graphicDown,
				mouseup: this._graphicUp
			});
			
		}
		else if(type == 'circle'){
			container = div.clone().attr('id','picker_circle').appendTo(el);
		}
		
		
		$.extend( self.ui, {
			hex: hex, 			
			rgb:rgb,			
			hsb:hsb,			
			cmyk:cmyk
		} ) ;
		
		self._update('hex', self.options.hex);
	},
	
	ui: function(){
		return{self:this};
	},
	
	_graphicDown:function(e){
		if(down == false)
		{
			down = true;
			$("#draggable").offset({left:e.pageX-7,top:e.pageY-7});			
		}
		$("#draggable").trigger(e);
	},	
	
	_graphicUp:function(e){
		down = false;
	},
	
	_colorbarChanged:function(event, ui){
		
		var self = $(this),
			ctx = event.data.context,	
			h = self.slider("value"),
			s = ctx.ui.hsb[1],
			b = ctx.ui.hsb[2];
			
		$.extend( ctx.ui, {hsb: [h,s,b]});		
		ctx._update('hsb', [h,s,b]);
		
		
	},
	
	_colorfieldChanged:function(event, ui){
		
		var self = $(this),
			ctx = event.data.context,
			h = ctx.ui.hsb[0],
			s = parseInt((self.position().left - self.parent().position().left)/(self.parent().width()-self.width())*100),
			b = parseInt(100-(self.position().top - self.parent().position().top)/(self.parent().height()-self.height())*100);
		
		ctx._update('hsb', [h,s,b]);
		
	},
	
	hexChanged: function(hex){
		var self = this;
		
		// EINGABE ÜBERPRÜFEN
		
		if(hex.length == 6)
		{
			self._update('hex', hex);
		}
	},
	
	rgbChanged: function(rgb){
		var self = this;
		
		// EINGABE ÜBERPRÜFEN		
		
		self._update('rgb', rgb);
	},
	
	hsbChanged: function(hsb){
		var self = this;
		
		// EINGABE ÜBERPRÜFEN	
		
		self._update('hsb', hsb);
	},
	
	cmykChanged: function(cmyk){
		var self = this;
		
		// EINGABE ÜBERPRÜFEN
		
		self._update('cmyk', cmyk);
		
	},
	
	_update: function(type, value){
		var self = this;
			hex = '000000',
			rgb = [0,0,0],
			hsb = [0,0,0],
			cmyk = [0,0,0,0];
		
		//neue Werte errechnen
		switch (type){
			case 'rgb':
				var rgb = value,
					hex = RGBtoHEX(rgb[0],rgb[1],rgb[2]),
					hsb = HEXtoHSB(hex),
					cmyk = HEXtoCMYK(hex);
				break; 
			case 'hsb':
				var hsb = value,
					hex = HSBtoHEX(hsb[0],hsb[1],hsb[2]),
					rgb = HEXtoRGB(hex),
					cmyk = HEXtoCMYK(hex);
				break;
			case 'cmyk':
				var cmyk = value,
					hex = CMYKtoHEX(cmyk[0],cmyk[1],cmyk[2],cmyk[3]),
					rgb = HEXtoRGB(hex),
					hsb = HEXtoHSB(hex);
				break;
			case 'hex':
				var hex = value,
					rgb = HEXtoRGB(hex),
					hsb = HEXtoHSB(hex),
					cmyk = HEXtoCMYK(hex);
				break;
		}
		
		if(self.options.type == 'bar' || self.options.type == 'circle')
		{
			// hintergrundfarbe der Grafik ändern
			var bgColor = "#" + HSBtoHEX(hsb[0], 100, 100);
			$("#hsb_colorfield").css("backgroundColor", bgColor);
			
			// Position auf Grafik ändern	
			var d = $("#draggable"),
				l = (hsb[1]  *(d.parent().width()-d.width())/100) + parseInt(d.parent().offset().left) ,
				r = d.parent().height() - d.height() - (hsb[2]  *(d.parent().height()-d.height())/100) + parseInt(d.parent().offset().top);
			
			d.offset({left: l, top: r});
			
			//Slider anpassen
			$("#hsb_colorbar").slider({value:hsb[0]});
		}
		
		//neue Werte setzen und zurückgeben
		self._trigger(  'colorChange' , null, $.extend( self.ui, {
			hex: hex, 			
			rgb:rgb,			
			hsb:hsb,			
			cmyk:cmyk
		} ) );
		
	},
	
	_setOptions: function(option, value){
		$.Widget.prototype._setOption.apply( this, arguments );        
	  
        switch (option) { 
			case "hex":
				var self = this;
				self._update('hex', self.options.hex);
				break; 
        } 
	},
	
	destroy: function() { 
	  	  
	}
	
})

})( jQuery );
