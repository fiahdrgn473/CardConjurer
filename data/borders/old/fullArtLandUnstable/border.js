//Unstable Full Art Basic Land Border
//Anything to do with...
//Loading Images
imgFrameMask.src = borderPath + "frameMask.png"
imgBorderMask.src = borderPath + "borderMask.png"
//Card Title
document.getElementById("inputTitleColor").value = "#ffffff"
var titleFont = "40px belerenb"
var titleFontSpacing = "0.1px"
var titleX = cardWidth / 2
var titleY = 17
var titleAlign = "center"
//Mana Cost
var manaCostRadius = 17.5
var manaCostX = 657
var manaCostY = 17
//Card Type
var typeFont = "33.5px belerenb"
var typeFontSpacing = "0.05px"
var typeX = cardWidth / 2
var typeY = 1000
var typeAlign = "center"
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 0.7
var textX = 89
var textY = 123
var textWidth = 660
//Bottom Info
var infoY = 999
//Set Symbol
var setSymbolY = 82
var setSymbolRight = cardWidth / 2
var setSymbolWidth = 66
var setSymbolHeight = 44
var centerSetSymbol = 2
//Watermark
var watermarkWidth = 520
var watermarkHeight = 250
var watermarkY = 805
//Color Options
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,colorless-Colorless")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Other
var thirdBorder = false
var creatureBorder = false
var stampBorder = true
var transparentBorder = true
var artX = 0
var artY = 0
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom
var uniqueFunctionName = "bottomInfoM15"