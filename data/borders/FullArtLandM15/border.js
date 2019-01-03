//Regular Full Art Basic Land Border
//Anything to do with...
//Loading Images
imgFrameMask.src = borderPath + "frameMask.png"
imgBorderMask.src = borderPath + "borderMask.png"
//Card Title
var titleFont = "40px belerenb" //40
var titleFontSpacing = "0.15px" //0.15
var titleX = 62 //62
var titleY = 61 //56 + 6
//Mana Cost
var manaCostRadius = 17.5 //17.5
var manaCostX = 658 //657
var manaCostY = 59 //59
//Card Type
var typeFont = "33.5px belerenb" //33.5
var typeFontSpacing = "0.05px" //0.05
var typeX = 60 //60
var typeY = 868 //868
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 0.7
var textX = 89
var textY = 123
var textWidth = 660
//Power Toughness
var ptFont = "39px belerenb" //39
var ptFontSpacing = "0.3px" //0.3
var ptTextX = 645 //645
var ptTextY = 939 //939
imgBorderCreature.imgValues(571, 926, 137, 75)
//Bottom Info
var infoY = 999 //999
//Set Symbol
var setSymbolY = 886 //616
var setSymbolRight = 686 //693
var setSymbolWidth = 84 //77
var setSymbolHeight = 42 //44
//Watermark
var watermarkWidth = 108
var watermarkHeight = 108
var watermarkY = 880
//Color Options
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,colorless-Colorless")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Other
var thirdBorder = false
var creatureBorder = false
var artX = 0
var artY = 0
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom
var uniqueFunctionName = "bottomInfoM15"