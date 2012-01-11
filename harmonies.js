
(function( $) {
$.widget( "ui.harmonies", {
	
	options: {
		hex:"000000"
	},
	
	_create: function(){		
			var self = this,
			el = self.element,	
			div = $("<div></div>");
			
			div.clone().attr('id','colorfields_container').appendTo(el);
	},
	
	ui: function(){
		return{};
	},
	
	analog: function ( ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {harmonie: analogColors(hex)});
		self._display();
	},
	
	accentuated: function ( hex ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {harmonie: accentuatedColors(hex)});
		self._display();
	},
	
	accentuated_analog: function ( hex ){
		var self = this,
			hex = self.options.hex;		
			
		$.extend( self.ui, {harmonie: accentuatedAnalogColors(hex)});
		self._display();
	},
	
	_display: function(){
		
		var self = this,
			harm = self.ui.harmonie,		
			div = $("<div></div>");		
		
		$("#colorfields_container").html("");
		for(i=0;i<harm.length;i++) {
			div.clone().addClass("colorfield").css("background-color", "#"+ harm[i]).appendTo("#colorfields_container");
		}
		
		$("#colorfields_container").find(".colorfield").bind({
				click: function(){
					
					var color = $(this).css("background-color");
					
					var array;					
					array = color.split("(");
					array = array[1].split(")");
					array = array[0].split(",");
					
					hex = RGBtoHEX(array[0],array[1],array[2]);
					self._trigger(  'colorChange' , null, $.extend( self.ui, {color: hex} ) ) 
				}
		});
		
		self._trigger(  'harmChange' , null, {harmonie: harm} ) ;
	},
	
	_setOptions: function(){
		
	},
	
	destroy: function() { 
	  	  
	},
	
	_getHarmonies: function(){
		return ["Analog", "Accentuated", "Accentuated Analog", "Companion", "Complementary", "Complementary Plus", "Splitted Complementary", "Splitted Complementary Plus", "Monochromatic", "Quadratic", "Tetrade", "Triade", "Triade Plus" ];
	}
	
})

})( jQuery );


//BERECHNUNGEN
function analogColors(hex)
{		
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);	
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	
	for (i=0; i < 5; i++)
	{
		if (i == 0 || i == 1)
		{
			var newH = hsv[0]*360-30;
			
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
			
			harmonies[i*3+0] = newH/360;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(i-1)*0.2;
			
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
		else if (i == 2)
		{
			harmonies[i*3+0] = hsv[0];
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
		else if (i == 3 || i == 4)
		{
			var newH = hsv[0]*360+30;
			
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(3-i)*0.2;
			
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
	}
	
	var harmony = new Array("","","","","");
	
	for (i=0; i < 5; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}

function accentuatedColors(hex)
{
	var hsv = HEXtoHSB(hex);
	var harmonies = new Array("","","","","");
	
	for (i=0; i<5; i++)
	{
		if (i == 0)
		{
			harmonies[i] = HSBtoHEX(Math.round(hsv[0]),Math.round(hsv[1]),Math.round(hsv[2]));
		}
		else if (i == 1 || i == 2 || i == 3 || i == 4)
		{
			harmonies[i] = HSBtoHEX(Math.round(hsv[0]),Math.round((0.6-(0.2*(4-i)))*100),Math.round((0.1+(0.3*(4-i)))*100));
		}
	}
	
	return harmonies;
}

function accentuatedAnalogColors(hex)
{		
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		
	for (i=0; i < 5; i++)
	{
		var newH = hsv[0]*360+(-1*(2-i)*20);
		
		while (newH < 0.0 || newH > 360.0)
		{
			if (newH > 360.0)
			{
				newH -= 360;
			}
			else if (newH < 0.0)
			{
				newH += 360;
			}
		}
		
		harmonies[i*3+0] = newH/360.0;
		if (i == 2)
		{
			harmonies[i*3+1] = hsv[1];
		}
		else
		{
			harmonies[i*3+1] = hsv[1]*0.5;
		}
		
		harmonies[i*3+2] = hsv[2];
	}
				
	var harmony = new Array("","","","","");
	
	for (i=0; i < 5; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}


//BERECHNUGEN

function companionColors(hex)
{	
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		
	var companionH = (hsv[0]*360)+60;
		
	while (companionH < 0.0 || companionH > 360.0)
	{
		if (companionH > 360.0)
		{
			companionH -= 360;
		}
		else if (companionH < 0.0)
		{
			companionH += 360;
		}
	}
		
	for (i=0; i<5 ; i++)
	{
		if (i == 0)
		{
			harmonies[i*3+0] = hsv[0];
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
		else if (i == 1)
		{
			harmonies[i*3+0] = companionH/360;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
		else if (i == 2 || i == 3 || i == 4)
		{
			harmonies[i*3+0] = companionH/360;
			harmonies[i*3+1] = hsv[1]*(0.5-0.1*(i-2));
			harmonies[i*3+2] = hsv[2]*(0.4-0.1*(i-2));
		}
	}
		
	var harmony = new Array("","","","","");
	
	for (i=0; i < 5; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}

function complementaryColors(hex)
{		
	var hsv = new Array(HEXtoHSB(hex)[0],HEXtoHSB(hex)[1],HEXtoHSB(hex)[2]);
	var harmony = new Array("","");
	
	var complementary = hsv[0] + 180;
	
	if (complementary > 360)
	{
		complementary -= 360;
	}
	
	harmony[0] = hex;
	harmony[1] = HSBtoHEX(complementary, hsv[1], hsv[2]);
	
	return harmony;
}

function complementaryPlusColors(hex)
{		
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	var complementaryH = (hsv[0]*360+180);
		
	while (complementaryH < 0.0 || complementaryH > 360.0)
	{
		if (complementaryH > 360.0)
		{
			complementaryH -= 360;
		}
		else if (complementaryH < 0.0)
		{
			complementaryH += 360;
		}
	}
		
	var valueAboveColor = 1.0 - hsv[2];
	var place = 2;
	while (valueAboveColor >= 0.3)
	{
		place += 1;
		valueAboveColor -= 0.3;
	}
	
	for (i=0; i < 5; i++)
	{
		if (i == 0 || i == 1)
		{
			harmonies[i*3+0] = hsv[0];
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]-(i*0.3);
			
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
		else
		{
			harmonies[i*3+0] = complementaryH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+((place-i)*0.3);
		}
	}
	
	var harmony = new Array("","","","","");
	
	for (i=0; i < 5; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}

function splittedComplementaryColors(hex)
{		
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		
	for (i=0; i < 5; i++)
	{
		if (i == 0)
		{
			harmonies[i*3+0] = hsv[0];
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
		else if (i == 1 || i == 2)
		{
			var newH = hsv[0]*360+150;
			
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(1.0-hsv[2])/4+(1-i)*0.3;
				
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
		else if (i == 3 || i == 4)
		{
			var newH = hsv[0]*360+210;
				
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(1.0-hsv[2])/4+(3-i)*0.3;
				
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
	}
	
	var harmony = new Array("","","");
	
	harmony[0] = HSBtoHEX(Math.round(harmonies[0]*360),Math.round(harmonies[1]*100),Math.round(harmonies[2]*100));
	harmony[1] = HSBtoHEX(Math.round(harmonies[3]*360),Math.round(harmonies[4]*100),Math.round(harmonies[5]*100));
	harmony[2] = HSBtoHEX(Math.round(harmonies[9]*360),Math.round(harmonies[10]*100),Math.round(harmonies[11]*100));
	
	return harmony;
}

function splittedComplementaryPlusColors(hex)
{		
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		
	for (i=0; i < 5; i++)
	{
		if (i == 0)
		{
			harmonies[i*3+0] = hsv[0];
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
		else if (i == 1 || i == 2)
		{
			var newH = hsv[0]*360+150;
			
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(1.0-hsv[2])/4+(1-i)*0.3;
				
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
		else if (i == 3 || i == 4)
		{
			var newH = hsv[0]*360+210;
				
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(1.0-hsv[2])/4+(3-i)*0.3;
				
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
	}
	
	var harmony = new Array("","","","","");
	
	for (i=0; i < 5; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}

function monochromaticColors(hex)
{		
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		
	var valueAboveColor = 1.0 - hsv[2];
	var place = 0;
	while (valueAboveColor >= 0.2)
	{
		place += 1;
		valueAboveColor -= 0.2;
	}
	
	for (i=0; i < 5; i++)
	{
		harmonies[i*3+0] = hsv[0];
		harmonies[i*3+1] = hsv[1];
		harmonies[i*3+2] = hsv[2]+((place-i)*0.2);
	}
		
	var harmony = new Array("","","","","");
	
	for (i=0; i < 5; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}

function quadraticColors(hex)
{
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
		
	for (i=0; i<4 ; i++)
	{
		if (i == 0 || i == 1 || i == 2 || i == 3)
		{
			var tetradeH = (hsv[0]*360)+90*i;
			
			while (tetradeH < 0.0 || tetradeH > 360.0)
			{
				if (tetradeH > 360.0)
				{
					tetradeH -= 360;
				}
				else if (tetradeH < 0.0)
				{
					tetradeH += 360;
				}
			}
				
			harmonies[i*3+0] = tetradeH/360;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
	}
	
	var harmony = new Array("","","","");
	
	for (i=0; i < 4; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}

function tetradeColors(hex)
{
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
		
	for (i=0; i<4 ; i++)
	{
		if (i == 0 || i == 1)
		{
			var tetradeH = (hsv[0]*360)+20*i;
				
			while (tetradeH < 0.0 || tetradeH > 360.0)
			{
				if (tetradeH > 360.0)
				{
					tetradeH -= 360;
				}
				else if (tetradeH < 0.0)
				{
					tetradeH += 360;
				}
			}
				
			harmonies[i*3+0] = tetradeH/360;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
		else if (i == 2 || i == 3)
		{
			var tetradeH = (hsv[0]*360)+180+20*i;
				
			while (tetradeH < 0.0 || tetradeH > 360.0)
			{
				if (tetradeH > 360.0)
				{
					tetradeH -= 360;
				}
				else if (tetradeH < 0.0)
				{
					tetradeH += 360;
				}
			}
				
			harmonies[i*3+0] = tetradeH/360;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
	}
	
	var harmony = new Array("","","","");
	
	for (i=0; i < 4; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}

function triadeColors(hex)
{
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		
	for (i=0; i < 5; i++)
	{
		if (i == 0)
		{
			harmonies[i*3+0] = hsv[0];
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
		else if (i == 1 || i == 2)
		{
			var newH = hsv[0]*360+120;
				
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(1.0-hsv[2])/4+(1-i)*0.3;
				
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}

		else if (i == 3 || i == 4)
		{
			var newH = hsv[0]*360+240;
				
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(1.0-hsv[2])/4+(3-i)*0.3;
				
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
	}
		
	var harmony = new Array("","","");
	
	harmony[0] = HSBtoHEX(Math.round(harmonies[0]*360),Math.round(harmonies[1]*100),Math.round(harmonies[2]*100));
	harmony[1] = HSBtoHEX(Math.round(harmonies[3]*360),Math.round(harmonies[4]*100),Math.round(harmonies[5]*100));
	harmony[2] = HSBtoHEX(Math.round(harmonies[9]*360),Math.round(harmonies[10]*100),Math.round(harmonies[11]*100));
	
	return harmony;
}

function triadePlusColors(hex)
{
	var hsv = new Array(HEXtoHSB(hex)[0]/360.0,HEXtoHSB(hex)[1]/100.0,HEXtoHSB(hex)[2]/100.0);
	var harmonies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		
	for (i=0; i < 5; i++)
	{
		if (i == 0)
		{
			harmonies[i*3+0] = hsv[0];
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2];
		}
		else if (i == 1 || i == 2)
		{
			var newH = hsv[0]*360+120;
				
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(1.0-hsv[2])/4+(1-i)*0.3;
				
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}

		else if (i == 3 || i == 4)
		{
			var newH = hsv[0]*360+240;
				
			while (newH < 0.0 || newH > 360.0)
			{
				if (newH > 360.0)
				{
					newH -= 360;
				}
				else if (newH < 0.0)
				{
					newH += 360;
				}
			}
				
			harmonies[i*3+0] = newH/360.0;
			harmonies[i*3+1] = hsv[1];
			harmonies[i*3+2] = hsv[2]+(1.0-hsv[2])/4+(3-i)*0.3;
				
			if (harmonies[i*3+2] < 0.2)
			{
				harmonies[i*3+2] = 0.2;
			}
		}
	}
		
	var harmony = new Array("","","","","");
	
	for (i=0; i < 5; i++)
	{
		harmony[i] = HSBtoHEX(Math.round(harmonies[i*3+0]*360),Math.round(harmonies[i*3+1]*100),Math.round(harmonies[i*3+2]*100));
	}
	
	return harmony;
}



// ______________________________________________________________


function RGBtoHEX(r,g,b)
{
	r = parseInt(r, 10);
	g = parseInt(g, 10);
	b = parseInt(b, 10);
	
	r_hex = r.toString(16);
	if(r_hex < 10 || r_hex == "a" || r_hex == "b" || r_hex == "c" || r_hex == "d" || r_hex == "e" || r_hex == "f"){
		r_hex = "0"+r_hex;
	}
	
	g_hex = g.toString(16);
	if(g_hex < 10 || g_hex == "a" || g_hex == "b" || g_hex == "c" || g_hex == "d" || g_hex == "e" || g_hex == "f"){
		g_hex = "0"+g_hex;
	}
	
	b_hex = b.toString(16);
	if(b_hex < 10 || b_hex == "a" || b_hex == "b" || b_hex == "c" || b_hex == "d" || b_hex == "e" || b_hex == "f"){
		b_hex = "0"+b_hex;
	}
	
	hex = (r_hex +""+ g_hex +""+ b_hex);	
	
	return hex;	
}

function HEXtoRGB(hex)
{
	var r,g,b = 0;
	
	var add = 0;
	var counter = 0;
	var rgb = new Array(r,g,b);
		
		for (i = 0; i < 3; i++)
		{
			for (j = 0; j < 2; j++)
			{
				counter += 1;
				if (j == 0)
				{
					add = 16*parseInt(hex.charAt(counter-1), 16);
				}
				else
				{
					add += parseInt(hex.charAt(counter-1), 16);
					rgb[i] = add;
				}
			}
		}
		
		
	return rgb;		
}

function HSBtoHEX(h,s,b)
{
	var hsb = new Array(h/360,s/100,b/100);
	
	var calcRGB = new Array(0.0,0.0,0.0);
	
	if ( hsb[1] == 0 )
	{
	   calcRGB[0] = hsb[2] * 255;
	   calcRGB[1] = hsb[2] * 255;
	   calcRGB[2] = hsb[2] * 255;
	}
	else
	{
	   var var_h = hsb[0] * 6.0;
	   if ( var_h == 6 ){
		   var_h = 0;
	   }
		   
		var var_i = parseInt(var_h);
		var var_1 = hsb[2] * (1 - hsb[1]);
		var var_2 = hsb[2] * ( 1 - hsb[1] * ( var_h - var_i ) );
		var var_3 = hsb[2] * ( 1 - hsb[1] * ( 1 - ( var_h - var_i ) ) );
		   
		var var_r;
		var var_g;
		var var_b;
		   
		if (var_i == 0)
		{
		   var_r = hsb[2];
		   var_g = var_3;
		   var_b = var_1;
		}
		else if ( var_i == 1 )
		{
		   var_r = var_2;
		   var_g = hsb[2];
		   var_b = var_1;
		}
		else if ( var_i == 2 )
		{
		   var_r = var_1;
		   var_g = hsb[2];
		   var_b = var_3;
		}
		else if ( var_i == 3 )
		{
		   var_r = var_1;
		   var_g = var_2;
		   var_b = hsb[2];
		}
		else if ( var_i == 4 )
		{
		   var_r = var_3;
		   var_g = var_1;
		   var_b = hsb[2];
		}
		else
		{
		   var_r = hsb[2];
		   var_g = var_1;
		   var_b = var_2;
		}

		calcRGB[0] = var_r * 255;
		calcRGB[1] = var_g * 255;
		calcRGB[2] = var_b * 255;
	}
	
	return RGBtoHEX(calcRGB[0],calcRGB[1],calcRGB[2]);
}

function HEXtoHSB(hex)
{
	var rgb = HEXtoRGB(hex);
	
	var minRGB = rgb[0];
	var maxRGB = rgb[1];
	for (i = 0; i < 3; i++)
	{
		if (rgb[i] < minRGB)
		{
			minRGB = rgb[i];
		}
		if (rgb[i] > maxRGB)
		{
			maxRGB = rgb[i];
		}
	}
	
	//BERECHNUNG VON H
	var H = 0;
	
	if (maxRGB != minRGB)
	{
		if (maxRGB == rgb[0])
		{
			H = (0 +(rgb[1]/255.0-rgb[2]/255.0)/(maxRGB/255.0-minRGB/255.0))*60;
		}
		else if (maxRGB == rgb[1])
		{
			H = (2 +(rgb[2]/255.0-rgb[0]/255.0)/(maxRGB/255.0-minRGB/255.0))*60;
		}
		else if (maxRGB == rgb[2])
		{
			H = (4 +(rgb[0]/255.0-rgb[1]/255.0)/(maxRGB/255.0-minRGB/255.0))*60;
		}
		
		if (H < 0)
		{
			H += 360;
		}
		else if (H > 360)
		{
			H -= 360;
		}
	}
		
	//BERECHNUNG VON S
	var S = 0;
	if (maxRGB > 0)
	{
		S = ((maxRGB-minRGB)/maxRGB)*100.0;
	}
	
	//BERECHNUNG VON V
	var V = (maxRGB/255)*100;
	
	var hsv = new Array(Math.round(H),Math.round(S),Math.round(V));
	return hsv;
}

function CMYKtoHEX(c,m,y,k)
{
	var r = Math.round(( 1.0 - ((c/100.0) * (1.0 - (k/100.0)) + (k/100.0)) ) * 255.0);
	var g = Math.round(( 1.0 - ((m/100.0) * (1.0 - (k/100.0)) + (k/100.0)) ) * 255.0);
	var b = Math.round(( 1.0 - ((y/100.0) * (1.0 - (k/100.0)) + (k/100.0)) ) * 255.0);
	
	return RGBtoHEX(r,g,b);
}

function HEXtoCMYK(hex)
{
	var rgb = HEXtoRGB(hex);
	
	var cyan    = 1.0 - rgb[0]/255.0;
	var magenta = 1.0 - rgb[1]/255.0;
	var yellow  = 1.0 - rgb[2]/255.0;
	var key = 1.0;
	
	if ( cyan < key )
		key = cyan;
	if ( magenta < key )
	   	key = magenta;
	if ( yellow < key )
	   	key = yellow;
		
	if ( key == 1 ) 
	{
		cyan = 0.0;
	    magenta = 0.0;
	    yellow = 0.0;
	}
	else
	{
	    cyan = ( cyan - key ) / ( 1.0 - key );
	    magenta = ( magenta - key ) / ( 1.0 - key );
	    yellow = ( yellow - key ) / ( 1.0 - key );
	}
	
	var cmyk = new Array(Math.round(cyan*100),Math.round(magenta*100),Math.round(yellow*100),Math.round(key*100));
	return cmyk;	
}

