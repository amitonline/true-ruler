const IS_INCHES = true;

$(document).ready(function() {
	initRuler(true);
});


var svg=null; 
var ruleHoriz = null; var ruleVert = null; 

function initRuler(create_flag) {
	if (create_flag) {
		ruleHoriz = new TrueRuler("svgElem", IS_INCHES, false, 520,520,1520,1520);
		ruleHoriz.setDivisions(15);
		ruleHoriz.setDivisionsSmall(4);
		ruleHoriz.setDivisionHeightWidth(10,0.2);
		ruleHoriz.setDivisionSmallHeightWidthMid(3,0.1,6);
		ruleHoriz.setTextYOffset(15);
		ruleHoriz.init();
		ruleHoriz.render();
		
		
		ruleVert = new TrueRuler("svgElem", IS_INCHES, true, 520,520,1520,1520);
		ruleVert.setDivisions(15);
		ruleVert.setDivisionsSmall(4);
		ruleVert.setDivisionHeightWidth(10,0.2);
		ruleVert.setDivisionSmallHeightWidthMid(3,0.1,6);
		ruleVert.setTextYOffset(15);
		ruleVert.init();
		ruleVert.render();
		

	}

}

