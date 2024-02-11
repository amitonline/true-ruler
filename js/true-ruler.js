
var TrueRuler = function(svgElem, inches=false, vertical=false, pw=100,ph=100,vw=100,vh=100,hdiv=10,hdivsmall=10) {
	
	var PIXEL_WIDTH = pw;
	var PIXEL_HEIGHT = ph;
	var TOTAL_WIDTH_PIXELS = vw; 		// virtual width
	var TOTAL_HEIGHT_PIXELS = vh;		// virtual height
	var TO_INCHES = false;			// flag for display in inches
	const INCH_TO_PIXELS = 96;
	var IS_VERTICAL = vertical;		// flag for vertical ruler
	
	var multXFactor = 1;			// pixel space between successive divisions
	var hdivisions = hdiv;			// no.of divisions in horiz ruler
	var hdivisionsSmall = hdivsmall;	// no.of subdivisions between two divisions
	var hdivisionsSmallMid = parseInt(hdivisionsSmall)/2;	//which element will be the mid point in subdivisions
	
	var svg = document.getElementById(svgElem);
	var xpos=0, ypos=0;			// curr.x and y pos for divisions
	var xposText=0, yposText = 0;		// curr.x and y pos for text labels
	var height = 20; var width = 0.5;	// height and width in pixels for divisions
	var textXOffset = hdivisions/2;		// x offset for labels
	var textYOffset = 26;			// y offset for labels

	var pixelPerDiv = parseInt(PIXEL_WIDTH) / parseInt(hdivisions);	// pixel ratio per division
	var heightSmall = 8; var widthSmall = 0.5; var heightSmallMid = 16; // height in pixels for subdivisions
	var xposSmall = 0; yposSmall = 0;	//curr.x and y pos for subdivisions
	var pixelPerDivSmall = 0;		// pixel width to use for each subdivision
	
	var arrDivisions = [];			// track all division objects created
	var arrSubDivisions = [];		// track all subdivision objects created
	var arrLabels = [];			// track all text labels created
	

	//
	// Set virtual dimensions
	//
	this.setVirtualSizeInPixels = function(w, h) {
		TOTAL_WIDTH_PIXELS = w;
		TOTAL_HEIGHT_PIXELS = h;
	};
	
	//
	// Set actual dimensions
	//
	this.setActualSizeInPixels = function(w, h) {
		PIXEL_WIDTH = w;
		PIXEL_HEIGHT = h;
	};

	//setter functions for other params
	
	this.toInches = function(flag) { TO_INCHES = flag;};
	
	this.setDivisions = function(hdiv) { hdivisions = hdiv;}
	this.setDivisionsSmall = function(hdivs) { hdivisionsSmall = hdivs}
	this.setDivisionHeightWidth = function(h,w) { height = h; width=w;}
	this.setDivisionSmallHeightWidthMid  = function(h,w,m) { 
			heightSmall = h; widthSmall = w; heightSmallMid = m;
	}
	this.setTextYOffset = function(offset) { textYOffset = offset };

	this.isVertical = function(flag) { IS_VERTICAL = flag;};
	
	//
	//Initialize the ruler object
	//
	this.init = function () {
		xpos=0; ypos=0;
		xposText=0; yposText = 0;
		xposSmall = 0; yposSmall = 0;
		pixelPerDivSmall = 0;
		hdivisionsSmallMid = parseInt(hdivisionsSmall)/2;
		textXOffset = hdivisions/2;

		yposText = parseInt(ypos) + parseInt(textYOffset);
		pixelPerDiv = parseInt(PIXEL_WIDTH) / parseInt(hdivisions);

		pixelPerDivSmall = parseInt(pixelPerDiv) / parseInt(hdivisionsSmall);
		multXFactor = parseFloat(TOTAL_WIDTH_PIXELS) / parseFloat(PIXEL_WIDTH);

		this.reset();
	};

	//
	//Display the ruler object
	//
	this.render = function() {
		var grp= document.getElementById("grpTop");
		if (IS_VERTICAL)
			grp = document.getElementById("grpLeft");
		var subdivCounter = 0;
		var idPrefix = "divh";
		var idSmallPrefix = "subdivh";
		var idTextPrefix = "texth";
		
		if (IS_VERTICAL) {
			idPrefix = "divv";
			idTextPrefix = "textv";
			idSmallPrefix = "subdivv";
		}
		for (var i=0; i <= parseInt(hdivisions); i++) {
			xposText = parseInt(xpos) - parseInt(textXOffset);
			var elem = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
			elem.setAttribute("x",xpos + "px"); 
			elem.setAttribute("id",idPrefix + i); 
			elem.setAttribute("y",ypos + "px"); 
			elem.setAttribute("height",height + "px"); 
			elem.setAttribute("width",width + "px"); 
			elem.style.stroke = "gray"; 
			elem.style.strokeWidth = width + "px"; 
			grp.appendChild(elem);
			arrDivisions.push(elem);
			
			var markerText = (parseInt(xpos) * parseFloat(multXFactor)).toFixed(0);
			if (TO_INCHES) {
				markerText = (parseInt(markerText) / parseInt(INCH_TO_PIXELS)).toFixed(0);
			}
			var telem = document.createElementNS("http://www.w3.org/2000/svg", 'text');
			if (i == 0)
				telem.setAttribute("x",xpos + "px"); 
			else if (i == parseInt(hdivisions)) {
				telem.setAttribute("x",(parseInt(xposText)-parseInt(textXOffset)) + "px"); 
			} else
				telem.setAttribute("x",xposText + "px"); 
			telem.setAttribute("y",yposText + "px"); 
			telem.setAttribute("text-anchor","center"); 	
			telem.setAttribute("id",idTextPrefix + i); 

			telem.setAttribute('class', 'svg_label_text');
			telem.innerHTML = markerText;
			grp.appendChild(telem);
			arrLabels.push(telem);
			
			//draw subdivisions
			if (i < parseInt(hdivisions)) {
				yposSmall = ypos;
				xposSmall = xpos;
				for (var j=1; j < parseInt(hdivisionsSmall); j ++) {
				 xposSmall += parseInt(pixelPerDivSmall);
				 var elemS = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
				 elemS.setAttribute("x",xposSmall + "px"); 
				 elemS.setAttribute("y",yposSmall + "px"); 
				 if (parseInt(j) == parseInt(hdivisionsSmallMid))
					elemS.setAttribute("height",heightSmallMid + "px"); 
				 else
					elemS.setAttribute("height",heightSmall + "px"); 
				 elemS.setAttribute("width",widthSmall + "px"); 
				 elemS.setAttribute("id",idSmallPrefix + subdivCounter); 
				 elemS.style.stroke = "gray"; 
				 elemS.style.strokeWidth = "0.5px"; 
				 grp.appendChild(elemS);
				 arrSubDivisions.push(elemS);
				 subdivCounter ++;
				}
			}
			xpos += parseInt(pixelPerDiv);
		} // 	for (var i=0; i <= parseInt(hdivisions); i++) {

		if (IS_VERTICAL)
			grp.setAttribute("transform", "rotate(90) translate(30,-60)"); 
	}; // render() {

	//
	//Clear the ruler display and reset all related data
	//
	this.reset = function() {

   		for(var i =0; i < arrDivisions.length;i++) {
			var elem = svg.getElementById(arrDivisions[i].id);
	   		elem.remove();
   		}
   		arrDivisions = [];

		for(var i =0; i < arrSubDivisions.length;i++) {
			var elem = svg.getElementById(arrSubDivisions[i].id);
	   		elem.remove();
   		}
   		arrSubDivisions = [];

		for(var i =0; i < arrLabels.length;i++) {
			var elem = svg.getElementById(arrLabels[i].id);
	   		elem.remove();
   		}
   		arrLabels = [];

		if (IS_VERTICAL) {
			var grpLeft = document.getElementById("grpLeft");
			grpLeft.setAttribute("transform", "translate(60,0)"); 
		}

	};

	/////////////////////////////////////////////////////////////////
	TO_INCHES = inches;
	IS_VERTICAL = vertical;
	this.init();
	this.render();

} // end of class TrueRuler



