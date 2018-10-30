//Plane Border
//Anything to do with...
//Card Title
var titleFont = "34px belerenb"
var titleFontSpacing = "0.15px"
var titleX = 522
var titleY = 40
var titleAlign = "center"
//Mana Cost
var manaCostRadius = 0
var manaCostX = 1000
var manaCostY = 1000
//Card Type
var typeFont = "26px belerenb"
var typeFontSpacing = "0px"
var typeX = 522
var typeY = 502
var typeAlign = "center"
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 0.2
var textX = 124
var textY = 535
var textWidth = 925
document.getElementById("textSize").value = 26
//Bottom Info
var planechaseInfo = true
//Set Symbol
var setSymbolY = 519
var setSymbolRight = 814
var setSymbolWidth = 42
var setSymbolHeight = 24
//Watermark
var watermarkWidth =  0 //520
var watermarkHeight = 0 //250
var watermarkY = 600
// //Rare Stamp
// var rareStampY = 958
//Color Options
loadColors("white-Regular,high-Bottom,mid-Middle,low-Top,none-Single")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Other
canvas.width = 1044
canvas.height = 749
borderCanvas.width = 1044
borderCanvas.height = 749
var creatureBorder = false
var thirdBorder = false
var secondBorder = false
var artX = 33
var artY = 33
transparentBorder = true
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom
function bottomInfoPlanechase() {
	card.textAlign = "left"
	if (document.getElementById("checkboxArtistColor").checked == true) {
		card.fillStyle = "black"
	} else {
		card.fillStyle = "white"
	}
	var bottomLineFirst = document.getElementById("inputNumber").value + " " + document.getElementById("inputSet").value + " \u00b7 " + document.getElementById("inputLanguage").value
	var bottomLineSecond
	var artistBrushShift = 0
	if (document.getElementById("inputInfo").value != "") {
		bottomLineSecond = "CC \u2014 " + document.getElementById("inputInfo").value
		if (bottomLineSecond == "CC \u2014 secretcode") {
			var date = new Date()
			var year = date.getFullYear()
			bottomLineSecond = "\u2122 & \u00a9 " + year + " Wizards of the Coast"
		}
	}
	var artist = document.getElementById("inputArtist").value
	//Artist
	canvas.style.letterSpacing = "-0.2px"
	card.font = "16px matrixbsc"
	var artistLineWidth = (card.measureText(artist).width + 18) / 2
	drawMask(card.fillStyle, canvas.width / 2 - artistLineWidth, 706, 15, 10, card, imgArtistBrush, false, false)
	card.fillText(artist, canvas.width / 2 - artistLineWidth + 18, 704)
	//Left and Right side
	canvas.style.letterSpacing = "0px"
	card.font = "16px relaymedium"
	var firstWidth = card.measureText(bottomLineFirst).width + 15
	canvas.style.letterSpacing = "-0.7px"
	card.font = "13px mplantin"
	var secondWidth = card.measureText(bottomLineSecond).width

	canvas.style.letterSpacing = "0px"
	card.font = "16px relaymedium"
	card.fillText(bottomLineFirst, canvas.width / 2 - ((secondWidth + firstWidth) / 2) - 8, 717)

	canvas.style.letterSpacing = "-0.7px"
	card.font = "14px mplantin"
	card.fillText(bottomLineSecond, canvas.width / 2 - ((secondWidth + firstWidth) / 2) + firstWidth - 8, 718)
}