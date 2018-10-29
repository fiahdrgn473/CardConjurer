//Map Border
//Anything to do with...
//Card Title
var titleFont = "40px belerenbsc"
var titleFontSpacing = "0.1px"
var titleX = 374.5
var titleY = 52
var titleAlign = "center"
//Mana Cost
var manaCostRadius = 17.5
var manaCostX = 657
var manaCostY = 59
//Card Type
var typeFont = "33.5px belerenb"
var typeFontSpacing = "0.05px"
var typeX = 374.5
var typeY = 598
var typeAlign = "center"
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 1.1
var textX = 89
var textY = 662
var textWidth = 660
//Power Toughness
var ptFont = "32px belerenb"
var ptFontSpacing = "0.3px"
var ptTextX = 374.5
var ptTextY = 933
var ptX = 300
var ptY = 920
var ptWidth = 150
var ptHeight = 70
//Bottom Info
var eighthInfo = false
var eighthInfoY = 992
var m15Info = true
var m15InfoY = 993
//Set Symbol
var setSymbolY = 123
var setSymbolRight = 374.5
var setSymbolWidth = 66
var setSymbolHeight = 44
var centerSetSymbol = 2
//Watermark
var watermarkWidth = 520
var watermarkHeight = 250
var watermarkY = 805
//Color Options
loadColors("white-White,whiteLand-White Land,blue-Blue,blueLand-Blue Land,black-Black,blackLand-Black Land,red-Red,redLand-Red Land,green-Green,greenLand-Green Land,gold-Gold,goldLand-Gold Land,colorless-Colorless,colorlessLand-Colorless Land,artifact-Artifact")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Other
var thirdBorder = false
var artX = 30
var artY = 116
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom