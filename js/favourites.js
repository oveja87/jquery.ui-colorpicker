
(function( $) {
$.widget( "ui.favourites", {
	
	options: {
	  colors: [],
	  index: 0
	},
	
	_create: function(){
		var self = this;
		colors = this.options.colors;
		$.ajax({
		type: "POST",
		url: "getfavourites.php",
		dataType: "json",
		success: function(msg){
			
			if(parseInt(msg.status)==1)
			{
				 if(msg.colors.length == 0)
					return false;
				 i = 0;
				 console.log(msg.colors);
				 colors = msg.colors.split(',');
				 for(i = 0; i<colors.length; i++)
					self.addHex(colors[i], self.ui);
				 
			}
			else if(parseInt(msg.status)==0)
			{
				console.log("error");
			}
			
		}
	  	  
		});
		
	},
	
	ui: function(){
		return{};
	},
	
	addHex: function(event, ui){
		var self = this,
			el = self.element,
			fav = self.ui.favourites,  
			div = $("<div></div>"),
			color = event;
		
		
		self.options.colors[self.options.index] = color;
		
		if(self.options.index == 5)
			self.options.index = 0;
		
		
		console.log(self.options.colors);
		container = div.clone().addClass('favourite_container').attr('index',self.options.index).appendTo(el);
		colorbox = div.clone().addClass('favourite_color').appendTo(container);
		colorbox.css('background-color','#'+color);
		trash = div.clone().addClass('remove_favourite').appendTo(container);
		trash.click(function() {
			
			index = $(this).parent().attr('index');
			console.log('removing element '+index);
			self.options.colors.splice(index,1);
			$(this).parent().remove();
			console.log(self.options.colors);
		});
		self.options.index++;
		
	},
	
	addHarm: function(event, ui){
		  i = 0;
		  colors = event;
		  for(i = 0; i<colors.length; i++)
			this.addHex(colors[i], self.ui);
	},
	
	setOptions: function(option, value){
		$.Widget.prototype._setOption.apply( this, arguments );        
        switch (option) { 
			case "colors":
				this.options.colors = value;
				break; 
        } 
	},
	
	destroy: function() { 
		colors = this.options.colors;
		$.ajax({
		type: "POST",
		url: "savefavourite.php",
		data: "colors="+colors,
		dataType: "json",
		success: function(msg){
			
			if(parseInt(msg.status)==1)
			{
				 console.log("success");
			}
			else if(parseInt(msg.status)==0)
			{
				console.log("error");
			}
			
		}
	  	  
		});
	}
	
})

})( jQuery );
