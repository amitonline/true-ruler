const IS_INCHES = false;

$(document).ready(function() {
	initRuler(true);
	initImage();
});


var svg=null; 
var ruleHoriz = null; var ruleVert = null; 

var BOX_WIDTH = 560;
var BOX_HEIGHT = 560;
const IMAGE_WIDTH = 5211;
const IMAGE_HEIGHT = 3474;
const IMAGE_X = 60; 	//orig x and y pos of image
const IMAGE_Y = 30;
const INCH_TO_PIXEL = 96;
var TOTAL_WIDTH_PIXELS = 0;
const DEFAULT_WIDTH_PIXELS = 560;
var TOTAL_HEIGHT_PIXELS = 0;
const DEFAULT_HEIGHT_PIXELS = 560;
const DEFAULT_WIDTH_INCHES = 60;
const DEFAULT_HEIGHT_INCHES = 60;
TOTAL_WIDTH_PIXELS = parseInt(DEFAULT_WIDTH_INCHES) * parseInt(INCH_TO_PIXEL);
TOTAL_HEIGHT_PIXELS = parseInt(DEFAULT_HEIGHT_INCHES) * parseInt(INCH_TO_PIXEL);
		
var svg=null; 
var ruleHoriz = null; var ruleVert = null; var unitsConv = null;
var scaleWidth = parseInt(TOTAL_WIDTH_PIXELS) / parseInt(DEFAULT_WIDTH_PIXELS);
var scaleHeight = parseInt(TOTAL_HEIGHT_PIXELS) / parseInt(DEFAULT_HEIGHT_PIXELS);
var imageWidth = IMAGE_WIDTH;
var imageHeight = IMAGE_HEIGHT;
var scaledImageWidth = 0;
var scaledImageHeight = 0;


function initRuler(create_flag) {
	if (create_flag) {
		ruleHoriz = new TrueRuler("svgElem", IS_INCHES, false, 520,520,5720,5720);
		ruleHoriz.setDivisions(15);
		ruleHoriz.setDivisionsSmall(4);
		ruleHoriz.setDivisionHeightWidth(10,0.2);
		ruleHoriz.setDivisionSmallHeightWidthMid(3,0.1,6);
		ruleHoriz.setTextYOffset(15);
		ruleHoriz.init();
		ruleHoriz.render();
		
		
		ruleVert = new TrueRuler("svgElem", IS_INCHES, true, 520,520,5720,5720);
		ruleVert.setDivisions(15);
		ruleVert.setDivisionsSmall(4);
		ruleVert.setDivisionHeightWidth(10,0.2);
		ruleVert.setDivisionSmallHeightWidthMid(3,0.1,6);
		ruleVert.setTextYOffset(15);
		ruleVert.init();
		ruleVert.render();
	}

}

function initImage() {

	//maintain aspect ratio with emphasis on width
	var aspectRatio = parseInt(imageWidth) / parseInt(imageHeight);
	imageHeight = parseInt(imageHeight) * parseFloat(aspectRatio);
	
	console.log("aspect ratio=" + aspectRatio);
	if (IS_INCHES) {
		console.log("==image to inches");
		var totalWScale = parseInt(DEFAULT_WIDTH_PIXELS) / parseInt(TOTAL_WIDTH_PIXELS);
		var totalHScale = parseInt(DEFAULT_HEIGHT_PIXELS) / parseInt(TOTAL_HEIGHT_PIXELS);
		console.log("totalhscale=" + totalHScale +", totalwscale=" + totalWScale);
		scaledImageWidth = parseInt(imageWidth) * parseFloat(totalWScale);
		scaledImageHeight = parseInt(imageHeight) * parseFloat(totalHScale);

		console.log("image_width=" + imageWidth +", image height=" + imageHeight);
		console.log("scaled image_width=" + scaledImageWidth +", scaled image height=" + scaledImageHeight);
	} else {
		scaledImageWidth =  parseInt(IMAGE_WIDTH) / parseFloat(scaleWidth);
		scaledImageHeight = parseInt(IMAGE_HEIGHT) / parseFloat(scaleHeight);

		console.log("scaled image_width=" + scaledImageWidth +", scaled image height=" + scaledImageHeight);
	
	} 
	$('#img').attr("width", scaledImageWidth);
	$('#img').attr("height", scaledImageHeight);
}

