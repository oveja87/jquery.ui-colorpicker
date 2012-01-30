
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
			var container = div.clone().attr('id','picker_bar').appendTo(el),			
				colorfield = div.clone().attr('id','hsb_colorfield').appendTo(container),
				draggable = div.clone().attr('id','draggable').appendTo(colorfield).draggable({containment: "parent"}),
				colorbar = div.clone().attr('id','hsb_colorbar').appendTo(container).slider({max:360, orientation: "vertical"});			
			
			//eventhandler
			
			colorbar.bind('slide', {context:this}, this._colorbarChanged);	
		}
		else if(type == 'circle'){
			var circle = div.clone().attr('id','hsb_circle').appendTo(el),
				container = div.clone().attr('id','picker_circle').appendTo(el),
				circledrag = div.clone().attr('id','circledrag').css({position: "relative"}).appendTo(circle)
				colorfield = div.clone().attr('id','hsb_colorfield').appendTo(container),
				draggable =	div.clone().attr('id','draggable').appendTo(colorfield).draggable({containment: "parent"});
			
			//eventhandler
			
			circle.bind({
				mousedown: function(event, ui){	
					$.extend( self.ui, {
						down: true
					});
				}
			});
		
			$(document).bind({
				mouseup: function(){
					$.extend( self.ui, {
						down: false
					});
				}
			});
			
			$(document).bind('mousemove', {context:this}, this._circlemove);
		}
		
		draggable.bind('drag', {context:this}, this._colorfieldChanged);
		
		colorfield.bind('mousedown', {context:this}, this._graphicDown);
		
		$.extend( self.ui, {
			hex: hex, 			
			rgb:rgb,			
			hsb:hsb,			
			cmyk:cmyk,
			down: false
		} ) ;
		
		self._update('hex', self.options.hex);
	},
	
	ui: function(){
		return{self:this};
	},
	
	_circlemove:function(event, ui){
		
		var self = $(this),
			ctx = event.data.context,
			down = ctx.ui.down,
			circle = $("#hsb_circle"),
			h = 0,
			s = ctx.ui.hsb[1],
			b = ctx.ui.hsb[2],
		 	k_x, k_y, r_x1, r_y1, r1, alpha, r_x2, r_y2, p_x, p_y, 
			m_x = circle.width()/2,
			m_y = circle.height()/2,
		
			r = m_x - 12;
		
		if(down){
			k_x = event.pageX-circle.position().left;
			k_y = event.pageY-circle.position().top;
								
			r_x1 = k_x - m_x;
			r_y1 = k_y - m_y;
									
			r1 = Math.sqrt(r_x1*r_x1+r_y1*r_y1);
									
			alpha = Math.asin(r_x1/r1);
									
			r_x2 = Math.sin(alpha) * r;
			r_y2 = Math.cos(alpha) * r;
									
			p_x = r_x2 + m_x + circle.position().left - 8;
									
			if(r_y1 > 0){
				p_y = r_y2 + m_y + circle.position().top - 8;
			}else{
				p_y = -r_y2 + m_y + circle.position().top - 8;
			}
			
			$("#circledrag").offset({left:p_x,top:p_y});
								
			if(r_y1 < 0 && r_x1 > 0){
				h = Math.round(alpha / Math.PI / 2 * 361);
			}else if(r_y1 > 0 && r_x1 > 0){
				h = 180-(Math.round(alpha / Math.PI / 2 * 361));
			}else if(r_y1 > 0 && r_x1 < 0){
				h = 180-(Math.round(alpha / Math.PI / 2 * 361));
			}else if(r_y1 < 0 && r_x1 < 0){
				h = 360+(Math.round(alpha / Math.PI / 2 * 361));
			}
			
			$.extend( ctx.ui, {hsb: [h,s,b]});		
			ctx._update('hsb', [h,s,b]);
		}
	},
	
	_graphicDown:function(e){
		var ctx = e.data.context;
		
		$("#hsb_colorfield").unbind();
		$("#draggable").offset({left:e.pageX-7,top:e.pageY-7});	
		$("#draggable").trigger(e);
		$("#hsb_colorfield").bind('mousedown', {context:ctx}, ctx._graphicDown);
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
			//s = parseInt((self.position().left - self.parent().position().left)/(self.parent().width()-self.width())*100),
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
		
		
		// hintergrundfarbe der Grafik ändern
			var bgColor = "#" + HSBtoHEX(hsb[0], 100, 100);
			$("#hsb_colorfield").css("backgroundColor", bgColor);
			
		// Position auf Grafik ändern	
			var d = $("#draggable"),
				l = (hsb[1]  *(d.parent().width()-d.width())/100) + parseInt(d.parent().offset().left) ,
				r = d.parent().height() - d.height() - (hsb[2]  *(d.parent().height()-d.height())/100) + parseInt(d.parent().offset().top);
			
			d.offset({left: l, top: r});
			
		if(self.options.type == 'bar')
		{//Slider anpassen
			$("#hsb_colorbar").slider({value:hsb[0]});
		}
		
		if(self.options.type == 'circle')
		{
			//Slider anpassen
			
			var circle = $("#hsb_circle"),
				m_x = circle.width()/2,
				m_y = circle.height()/2,
		
				r = m_x - 12,
			
				alpha = hsb[0] * Math.PI * 2 / 360,
			
				r_x2 = Math.sin(alpha) * r,
				r_y2 = Math.cos(alpha) * r,
									
				p_x = r_x2 + m_x + circle.position().left - 8,
				p_y = -r_y2 + m_y + circle.position().top - 8;
			
				$("#circledrag").offset({left:p_x,top:p_y});
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
