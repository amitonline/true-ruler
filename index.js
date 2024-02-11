const IS_INCHES = false;

$(document).ready(function() {
	initRuler(true);
});


var svg=null; 
var ruleHoriz = null; var ruleVert = null; 

function initRuler(create_flag) {
	if (create_flag) {
		ruleHoriz = new TrueRuler("svgElem", IS_INCHES, false, 260,160,260,160);
		ruleHoriz.setDivisions(10);
		ruleHoriz.setDivisionsSmall(4);
		ruleHoriz.setDivisionHeightWidth(10,0.2);
		ruleHoriz.setDivisionSmallHeightWidthMid(3,0.1,6);
		ruleHoriz.setTextYOffset(10);
		ruleHoriz.init();
		ruleHoriz.render();
		
		
		ruleVert = new TrueRuler("svgElem", IS_INCHES, true, 260,160,260,260);
		ruleVert.setDivisions(10);
		ruleVert.setDivisionsSmall(4);
		ruleVert.setDivisionHeightWidth(10,0.2);
		ruleVert.setDivisionSmallHeightWidthMid(3,0.1,6);
		ruleVert.setTextYOffset(10);
		ruleVert.init();
		ruleVert.render();
		

	}

}

