//Contraption Border
//Anything to do with...
//Loading Images
imgFrameMask.src = borderPath + "frameMask.png"
//Card Title
var titleFont = "40px belerenb" //40
var titleFontSpacing = "0.15px" //0.15
var titleX = 62 //62
var titleY = 56 //56 + 6
//Mana Cost
var manaCostRadius = 17.5 //17.5
var manaCostX = 658 //657
var manaCostY = 54 //59
//Card Type
var typeFont = "33.5px belerenb" //33.5
var typeFontSpacing = "-0.4px" //0.05
var typeX = 62 //62
var typeY = 647 //595 + 6
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 0.7 //0.7
var textX = 66 //66
var textY = 705 //656 + 6
var textWidth = 682 //682
//Power Toughness
var ptFont = "39px belerenb" //39
var ptFontSpacing = "0.3px" //0.3
var ptTextX = 645 //645
var ptTextY = 942 //936 + 6
imgBorderCreature.imgValues(571, 929, 137, 75)
//Bottom Info
var infoY = 996 //993 + 6
//Set Symbol
var setSymbolY = 662 //616
var setSymbolRight = 688 //693
var setSymbolWidth = 84 //77
var setSymbolHeight = 42 //44
//Watermark
var watermarkWidth = 78 //520
var watermarkHeight = 78 //250
var watermarkY = 914 //805
var watermarkX = 668
//Rare Stamp
var rareStampY = 958 //958
//Color Options
loadColors("white-White")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Things The Card Can Do
var creatureBorder = false
var thirdBorder = false
var secondBorder = false
var artX = 0
var artY = 0
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom
var uniqueFunctionName = "bottomInfoM15"