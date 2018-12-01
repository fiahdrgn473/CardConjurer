//M15 Border
//Anything to do with...
//Loading Images
var artX = 56
var artY = 125
imgMultiMask.src = borderPath + "multiMask.png"
imgFrameMask.src = borderPath + "frameMask.png"
imgLegendFrameMask.src = borderPath + "legendFrameMask.png"
imgBorderMask.src = borderPath + "borderMask.png"
//Card Title
document.getElementById("inputTitleColor").value = "#ffe886"
var titleFont = "40px belerenbsc" //40
var titleFontSpacing = "0.15px" //0.15
var titleX = 374.5 //62
var titleY = 56 //56
var titleAlign = "center"
//Mana Cost
var manaCostRadius = 17.5 //17.5
var manaCostX = 657 //657
var manaCostY = 59 //59
//Card Type
var typeFont = "33.5px belerenb" //33.5
var typeFontSpacing = "0.05px" //0.05
var typeX = 60 //62
var typeY = 713 //595
// Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 0.7 //0.7
var textX = 66 //66
var textY = 773 //656
var textWidth = 682 //682
//Power Toughness
var ptFont = "39px belerenb" //39
var ptFontSpacing = "0.3px" //0.3
var ptTextX = 645 //645
var ptTextY = 933 //936
imgBorderCreature.imgValues(571, 926, 137, 75)
//Bottom Info
var infoY = 993 //993
//Set Symbol
var setSymbolY = 734 //616
var setSymbolRight = 693 //693
var setSymbolWidth = 84 //77
var setSymbolHeight = 44 //44
//Color Options
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,colorless-Colorless,artifact-Artifact")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Things The Card Can Do
legendaryBorder = true
imgBorderLegendary.imgValues(26, 20, 697, 112, "imgSecondBorderLegendary")
nyxBorder = true
imgBorderNyx.imgValues(30, 30, 689, 643, "imgSecondBorderNyx")
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom
var uniqueFunctionName = "bottomInfoM15"