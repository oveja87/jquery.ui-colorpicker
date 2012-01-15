
(function( $) {
$.widget( "ui.favourites", {
	
	options: {
	  colors: [],
	  //test test
	},
	
	_create: function(){
		var self = this;
		colors = this.options.colors;
		$.ajax({
		type: "POST",
		url: "getfavourites.php",
		data: "colors="+colors,
		dataType: "json",
		success: function(msg){
			
			if(parseInt(msg.status)==1)
			{
				 colors = new Array(msg.c1, msg.c2, msg.c3, msg.c4, msg.c5);
				 self.options.colors = colors;
				 console.log(self.options.colors);
				 
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
		alert("addHex");	
		
	},
	
	addHarm: function(event, ui){
		  alert("addHarm");
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
