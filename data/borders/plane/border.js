//Plane Border
//Anything to do with...
//Card Size
cardWidth = 1074
cardHeight = 749
//Card Title
var titleFont = cardHeight * 0.0454 + "px belerenb" //34
var titleFontSpacing = cardWidth * 0.00014 + "px" //0.15
var titleX = cardWidth * 0.5000 //522
var titleY = cardHeight * 0.0534 //40
var titleAlign = "center"
//Mana Cost
var manaCostRadius = 0
var manaCostX = 0
var manaCostY = 0
//Card Type
var typeFont = cardHeight * 0.0347 + "px belerenb" //26
var typeFontSpacing = "0px" //0
var typeX = cardWidth * 0.5000 //522
var typeY = cardHeight * 0.6702 //502
var typeAlign = "center"
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = cardWidth * 0.0002 //0.2
var textX = cardWidth * 0.1188 //124
var textY = cardHeight * 0.7143 //535
var textWidth = cardWidth * 0.8860 //925
document.getElementById("textSize").value = Math.floor(cardHeight * 0.0348) //26
//Bottom Info
var planechaseInfo = true
//Set Symbol
var setSymbolY = cardHeight * 0.6929 //519
var setSymbolRight = cardWidth * 0.7797 //814
var setSymbolWidth = cardWidth * 0.0402 //42
var setSymbolHeight = cardHeight * 0.0320 //24
//Watermark
var watermarkWidth =  cardWidth * 0.8787 //920
var watermarkHeight = cardHeight * 0.2000 //150
var watermarkY = cardHeight * 0.8225 //616
//Color Options
loadColors("white-Regular,high-Bottom,mid-Middle,low-Top,none-Single")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Other
var creatureBorder = false
var thirdBorder = false
var secondBorder = false
var artX = cardWidth * 0.0316 //33
var artY = cardHeight * 0.0441 //33
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
	canvas.style.letterSpacing = cardWidth * -0.0002 + "px" //-0.2
	card.font = "16px matrixbsc" //16
	var artistLineWidth = (card.measureText(artist).width + cardWidth * 0.01724) / 2 //18
	drawMask(card.fillStyle, cardWidth / 2 - artistLineWidth, cardHeight * 0.9426, cardWidth * 0.0144, cardHeight * 0.0134, card, imgArtistBrush, false, false) //706, 15, 10
	card.fillText(artist, cardWidth / 2 - artistLineWidth + cardWidth * 0.01724, cardHeight * 0.9400) //18, 704
	//Left and Right side
	canvas.style.letterSpacing = "0px"
	card.font = cardHeight * 0.0187 + "px relaymedium" //14
	var firstWidth = card.measureText(bottomLineFirst).width + cardWidth * 0.0144 //15
	canvas.style.letterSpacing = cardWidth * -0.0007 + "px" //-0.7
	card.font = cardHeight * 0.0187 + "px mplantin" //14
	var secondWidth = card.measureText(bottomLineSecond).width

	canvas.style.letterSpacing = "0px"
	card.font = cardHeight * 0.0187 + "px relaymedium" //14
	card.fillText(bottomLineFirst, cardWidth / 2 - ((secondWidth + firstWidth) / 2) - cardWidth * 0.0077, cardHeight * 0.9586) //8, 718

	canvas.style.letterSpacing = cardWidth * -0.0007 + "px" //-0.7
	card.font = cardHeight * 0.0187 + "px mplantin" //14
	card.fillText(bottomLineSecond, cardWidth / 2 - ((secondWidth + firstWidth) / 2) + firstWidth - cardWidth * 0.0077, cardHeight * 0.9586) //8, 718
}