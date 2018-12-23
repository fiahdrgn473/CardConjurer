//Vanguard Border
//Anything to do with...
//Loading Images
imgFrameMask.src = borderPath + "frameMask.png"
imgBorderMask.src = borderPath + "borderMask.png"
imgRulesMask.src = borderPath + "rulesMask.png"
document.getElementById("cmmVanguard").style.display = "block"
var artX = 97
var artY = 112
//Card Title
var titleFont = "52px matrixb" //40
var titleFontSpacing = "0.15px" //0.15
var titleX = cardWidth / 2
var titleY = 56 //56
titleAlign = "center"
//Mana Cost
var manaCostRadius = 0 //17.5
var manaCostX = 657 //657
var manaCostY = 59 //59
//Card Type
var typeFont = "33.5px matrix" //33.5
var typeFontSpacing = "0.05px" //0.05
var typeX = cardWidth / 2
var typeY = 612 //612
typeAlign = "center"
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 0.7 //0.7
var textX = cardWidth / 2
var textY = 656 //656
var textWidth = 575 //682
if (document.getElementById("inputText").value == "") {
	document.getElementById("inputText").value = "<center>"
}
document.getElementById("textSize").value = 25
italicSize = 2/3
//Power Toughness
var ptFont = "39px belerenb" //39
var ptFontSpacing = "0.3px" //0.3
var ptTextX = 645 //645
var ptTextY = 936 //936
imgBorderCreature.imgValues(571, 929, 137, 75)
//Bottom Info
var infoY = 930 //930
//Set Symbol
var setSymbolY = cardHeight * 2 //616
var setSymbolRight = 693 //693
var setSymbolWidth = 84 //77
var setSymbolHeight = 44 //44
//Watermark
var watermarkWidth = 520 //520
var watermarkHeight = 250 //250
var watermarkY = 805 //805
//Color Options
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,colorless-Colorless")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Things The Card Can Do
creatureBorder = false
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom
var uniqueFunctionName = "bottomInfoVanguard"
function bottomInfoVanguard() {
	card.textAlign = "center"
	// card.fillStyle = document.getElementById("inputInfoColor").value
	canvas.style.letterSpacing = "1px"
	card.font = "20px matrix"
	card.fillText("Illus. " + document.getElementById("inputArtist").value, cardWidth / 2, infoY + textBaselineShift[1] * card.font.split("px")[0])
	canvas.style.letterSpacing = "0.5px"
	card.font = "12px mplantin"
	var vanguardInfo = "CC \u2014 " + document.getElementById("inputInfo").value
	if (vanguardInfo == "CC \u2014 " + "secretcode") {
		var date = new Date()
		var year = date.getFullYear()
		vanguardInfo = "\u2122 & \u00a9 1993-" + year + " Wizards of the Coast, Inc."
	}
	card.fillText(vanguardInfo, cardWidth / 2, infoY + 22 + textBaselineShift[0] * card.font.split("px")[0])
	//Now for the hand/life modifiers, not quite at the bottom but might as well go in this same function
	canvas.style.letterSpacing = "0px"
	card.font = "25px mplantin"
	card.fillText(document.getElementById("inputVanguardHandMod").value, 111, 886 + textBaselineShift[0] * card.font.split("px")[0])
	card.fillText(document.getElementById("inputVanguardLifeMod").value, 631, 886 + textBaselineShift[0] * card.font.split("px")[0])
}
