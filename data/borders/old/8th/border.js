imgMultiMask.src = borderPath + "multiMask.png"
imgFrameMask.src = borderPath + "frameMask.png"
imgBorderMask.src = borderPath + "frameMask.png"

var titleFont = "44px matrixb"
var titleFontSpacing = "0.5px"
var titleX = 66
var titleY = 62

var manaCostRadius = 16.5
var manaCostX = 652
var manaCostY = 68

var typeFont = "37.5px matrixb"
var typeFontSpacing = "0px"
var typeX = 74
var typeY = 598

var textFont = "px mplantin"
var textFontSpacing = 1.2
var textX = 76
var textY = 656
var textWidth = 680

var ptFont = "bold 48px matrix"
var ptFontSpacing = "0.3px"
var ptTextX = 626
var ptTextY = 936
imgBorderCreature.imgValues(541, 920.5, 162, 84)

var infoY = 956

var setSymbolY = 615
var setSymbolRight = 689
var setSymbolWidth = 77
var setSymbolHeight = 44

var watermarkWidth = 520
var watermarkHeight = 208
var watermarkY = 796

var rareStampY = 958

loadColors("white-White,whiteLand-White Land,blue-Blue,blueLand-Blue Land,black-Black,blackLand-Black Land,red-Red,redLand-Red Land,green-Green,greenLand-Green Land,gold-Gold,goldLand-Gold Land,colorless-Colorless,colorlessLand-Colorless Land,artifact-Artifact,oldArtifact-Old Artifact,oldGold-Old Gold,oldGoldLand-Old Gold Land")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML

finishTemplate()

var uniqueFunctionName = "bottomInfo8th"
function bottomInfo8th() {
	card.fillStyle = document.getElementById("inputInfoColor").value
	canvas.style.letterSpacing = "1px"
	card.font = "25px matrixb"
	card.fillText(document.getElementById("inputArtist").value, 116, infoY + textBaselineShift[0] * card.font.split("px")[0])
	canvas.style.letterSpacing = "0.5px"
	card.font = "16px mplantin"
	card.fillText("CC \u2014 " + document.getElementById("inputInfo").value + " " + document.getElementById("inputNumber").value, 62, infoY + 31 + textBaselineShift[0] * card.font.split("px")[0])
}