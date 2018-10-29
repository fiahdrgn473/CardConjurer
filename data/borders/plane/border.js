//Plane Border
//Anything to do with...
//Card Title
var titleFont = "34px belerenb"
var titleFontSpacing = "0.15px"
var titleX = 522
var titleY = 40
var titleAlign = "center"
//Mana Cost
var manaCostRadius = 0
var manaCostX = 1000
var manaCostY = 1000
//Card Type
var typeFont = "26px belerenb"
var typeFontSpacing = "0px"
var typeX = 522
var typeY = 502
var typeAlign = "center"
//Rules/Flavor Text
var textFont = "px mplantin"
var textFontSpacing = 0.3
var textX = 125
var textY = 535
var textWidth = 925
document.getElementById("textSize").value = 26
// //Power Toughness
// var ptFont = "39px belerenb"
// var ptFontSpacing = "0.3px"
// var ptTextX = 645
// var ptTextY = 936
// var ptX = 571
// var ptY = 929
// var ptWidth = 137
// var ptHeight = 75
//Bottom Info
var eighthInfo = false
var eighthInfoY = 992
var m15Info = true
var m15InfoY = 993
//Set Symbol
var setSymbolY = 519
var setSymbolRight = 814
var setSymbolWidth = 42
var setSymbolHeight = 24
//Watermark
var watermarkWidth =  0 //520
var watermarkHeight = 0 //250
var watermarkY = 600
// //Rare Stamp
// var rareStampY = 958
//Color Options
loadColors("white-Regular,high-Bottom,mid-Middle,low-Top,none-Single")
document.getElementById("secondColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
document.getElementById("thirdColorSelection").innerHTML = document.getElementById("colorSelection").innerHTML
//Other
canvas.width = 1044
canvas.height = 749
borderCanvas.width = 1044
borderCanvas.height = 749
var creatureBorder = false
var thirdBorder = false
var secondBorder = false
var artX = 33
var artY = 33
transparentBorder = true
//With all the new values in place, the program will update it's border images
finishTemplate()
//Any special functions go at the bottom