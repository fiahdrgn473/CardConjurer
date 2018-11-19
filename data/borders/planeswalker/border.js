//Planeswalker Border
//Anything to do with...
//Loading Images
imgMultiGradient.src = borderPath + "multiGradient.png"
imgMultiMask.src = borderPath + "multiMask.png"
imgFrameMask.src = borderPath + "frameMask.png"
imgRareStampMask.src = borderPath + "rareStampMask.png"
imgBorderMask.src = borderPath + "borderMask.png"
imgAbilityLineOdd.src = borderPath + "abilityLineOdd.png"
imgAbilityLineEven.src = borderPath + "abilityLineEven.png"
imgLoyaltyUp.src = borderPath + "loyaltyUp.png"
imgLoyaltyDown.src = borderPath + "loyaltyDown.png"
imgLoyaltyZero.src = borderPath + "loyaltyZero.png"
document.getElementById("textSize").value = 33
//Card Title
var titleFont = "40px belerenb" //40
var titleFontSpacing = "-0.1px" //-0.1
var titleX = 62 //62
var titleY = 42 //42
//Mana Cost
var manaCostRadius = 17.5 //17.5
var manaCostX = 657 //657
var manaCostY = 46 //46
//Card Type
var typeFont = "33.5px belerenb" //33.5
var typeFontSpacing = "0.05px" //0.05
var typeX = 62 //62
var typeY = 596 //596
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = -0.4 //-0.4
var textX = 134 //134
var textY = 650 //650
var textWidth = 682 //682
//Power Toughness
var ptFont = "39px belerenb" //39
var ptFontSpacing = "0.3px" //0.3
var ptTextX = 655 //655
var ptTextY = 935 //935
var ptX = 598 //598
var ptY = 920 //920
var ptWidth = 118 //1318
var ptHeight = 75 //75
//Bottom Info
var infoY = 993 //993
//Set Symbol
var setSymbolY = 615 //615
var setSymbolRight = 695 //695
var setSymbolWidth = 90 //90
var setSymbolHeight = 42 //42
//Watermark
var watermarkWidth = 520 //520
var watermarkHeight = 250 //250
var watermarkY = 805 //805
//Rare Stamp
var rareStampY = 955 //955
//Color Options
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,colorless-Colorless,artifact-Artifact")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//"Being a Planeswalker is being able to do what a card do"
// —Unknown AP English Student
stampBorder = true
var artX = 52
var artY = 106
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom
var uniqueFunctionName = "planeswalkerCustomFunction"

function planeswalkerCustomFunction() {
	//Bottom info is important
	bottomInfoM15()
	//But now it has to draw/write the loyalty things!
	var abilityLineY = 650
	for (i = 0; i < abilityLines.length; i ++) {
		var loyaltyValue = document.getElementById("abilityValue" + i).value
		if (loyaltyValue != "") {
			card.fillStyle = "white"
			card.textAlign = "center"
			card.font = "31px belerenbsc"
			if (loyaltyValue.charAt(0) == "-" && imgLoyaltyDown.width > 0) {
				card.drawImage(imgLoyaltyDown, 34, abilityLineY + abilityLines[i] / 2 - 28, 84, 64)
				card.fillText(loyaltyValue, 76, abilityLineY + abilityLines[i] / 2 - 22)
			} else if (loyaltyValue.charAt(0) == "+" && imgLoyaltyUp.width > 0) {
				card.drawImage(imgLoyaltyUp, 34, abilityLineY + abilityLines[i] / 2 - 38, 82, 62)
				card.fillText(loyaltyValue, 74, abilityLineY + abilityLines[i] / 2 - 24)
			} else if (imgLoyaltyZero.width > 0) {
				card.drawImage(imgLoyaltyZero, 34, abilityLineY + abilityLines[i] / 2 - 28, 82, 56)
				card.fillText(loyaltyValue, 74, abilityLineY + abilityLines[i] / 2 - 21)
			}
			card.font = "37px mplantin"
			card.fillStyle = "black"
			card.fillText(":", 124, abilityLineY + abilityLines[i] / 2 - 28)
		}
		abilityLineY += abilityLines[i]
	}
}

var savedFrameMask = new Image()
savedFrameMask.src = borderPath + "frameMask.png"
var abilityLineCanvas = document.createElement("canvas")
abilityLineCanvas.width = cardWidth
abilityLineCanvas.height = cardHeight
var abilityLineContext = abilityLineCanvas.getContext("2d")
var abilityLines = []
function planeswalkerAbilityLines() {
	abilityLines = []
	if (document.getElementById("abilityLine1").value > 0) {abilityLines[abilityLines.length] = parseInt(document.getElementById("abilityLine1").value)}
	if (document.getElementById("abilityLine2").value > 0) {abilityLines[abilityLines.length] = parseInt(document.getElementById("abilityLine2").value)}
	if (document.getElementById("abilityLine3").value > 0) {abilityLines[abilityLines.length] = parseInt(document.getElementById("abilityLine3").value)}
	if (document.getElementById("abilityLine4").value > 0) {abilityLines[abilityLines.length] = parseInt(document.getElementById("abilityLine4").value)}
	abilityLineContext.clearRect(0, 0, cardWidth, cardHeight)
	var abilityLineY = 645
	for (i = 0; i < abilityLines.length; i ++) {
		if (i == abilityLines.length - 1) {
			// abilityLines[i] += cardHeight - abilityLines[i]
			if (i % 2 === 0) {
				abilityLineContext.fillStyle = "#95959595"
			} else {
				abilityLineContext.fillStyle = "#6a6a6a6a"
			}
			abilityLineContext.fillRect(50, abilityLineY + 5, cardWidth - 100, cardHeight - abilityLineY - 90)
		} else {
			if (i % 2 === 0) {
				abilityLineContext.fillStyle = "#95959595"
				abilityLineContext.drawImage(imgAbilityLineOdd, 93, abilityLineY + abilityLines[i] - 5, 596, 10)
			} else {
				abilityLineContext.fillStyle = "#6a6a6a6a"
				abilityLineContext.drawImage(imgAbilityLineEven, 93, abilityLineY + abilityLines[i] - 5, 596, 10)
			}
			abilityLineContext.fillRect(50, abilityLineY + 5, cardWidth - 100, abilityLines[i] - 10)
		}
		abilityLineY += abilityLines[i]
	}
	abilityLineContext.drawImage(savedFrameMask, 0, 0, cardWidth, cardHeight)
    imgFrameMask.src = abilityLineCanvas.toDataURL()
    imgFrameMask.hasToLoad = true
}
imgFrameMask.onload = function() {
	if (imgFrameMask.hasToLoad == true) {
		imgFrameMask.hasToLoad = false
		createBorder()
	}
}
//Reveals the planeswalker card manipulation menu section
document.getElementById("cmmPlaneswalker").style.display = "block"
//After a second the first ability lines will be generated
setTimeout(function(){if (document.getElementById("borderSelection").value == "planeswalker/") {planeswalkerAbilityLines()}}, 1000)