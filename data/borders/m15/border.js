//M15 Border
//Anything to do with...
//Loading Images
imgMultiMask.src = borderPath + "multiMask.png"
imgFrameMask.src = borderPath + "frameMask.png"
imgLegendFrameMask.src = borderPath + "legendFrameMask.png"
imgRareStampMask.src = borderPath + "rareStampMask.png"
imgBorderMask.src = borderPath + "borderMask.png"
//Card Title
var titleFont = "40px belerenb" //40
var titleFontSpacing = "0.15px" //0.15
var titleX = 62 //62
var titleY = 56 //56
//Mana Cost
var manaCostRadius = 17.5 //17.5
var manaCostX = 657 //657
var manaCostY = 59 //59
//Card Type
var typeFont = "33.5px belerenb" //33.5
var typeFontSpacing = "0.05px" //0.05
var typeX = 62 //62
var typeY = 595 //595
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 0.7 //0.7
var textX = 66 //66
var textY = 656 //656
var textWidth = 682 //682
//Power Toughness
var ptFont = "39px belerenb" //39
var ptFontSpacing = "0.3px" //0.3
var ptTextX = 645 //645
var ptTextY = 936 //936
imgBorderCreature.imgValues(571, 929, 137, 75)
//Bottom Info
var infoY = 993 //993
//Set Symbol
var setSymbolY = 616 //616
var setSymbolRight = 693 //693
var setSymbolWidth = 84 //77
var setSymbolHeight = 44 //44
//Watermark
var watermarkWidth = 520 //520
var watermarkHeight = 250 //250
var watermarkY = 805 //805
//Rare Stamp
var rareStampY = 958 //958
//Color Options
loadColors("white-White,whiteLand-White Land,blue-Blue,blueLand-Blue Land,black-Black,blackLand-Black Land,red-Red,redLand-Red Land,green-Green,greenLand-Green Land,gold-Gold,goldLand-Gold Land,colorless-Colorless,colorlessLand-Colorless Land,artifact-Artifact,vehicle-Vehicle")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Things The Card Can Do
legendaryBorder = true
imgBorderLegendary.imgValues(20, 20, 714, 186, "imgSecondBorderLegendary")
nyxBorder = true
imgBorderNyx.imgValues(30, 30, 690, 586, "imgSecondBorderNyx")
miracleBorder = true
imgBorderMiracle.imgValues(30, 30, 689, 511, "imgSecondBorderMiracle")
flipBorder = true
imgBorderFlipCircle.imgValues(26, 44, 78, 71)
imgBorderFlippedDark.imgValues(44, 50, 661, 915, "imgSecondBorderFlippedDark")
imgBorderFlipTip.imgValues(685, 877, 36, 48)
stampBorder = true
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom
var uniqueFunctionName = "bottomInfoM15"