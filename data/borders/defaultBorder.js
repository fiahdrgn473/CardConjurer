//Default Border
//Fixes images
imgMultiGradient.src = "data/borders/multiGradient.png"
//card size
var cardWidth = 749
var cardHeight = 1044
document.getElementsByClassName("mainGrid")[0].classList.remove("plane")
//Sets the correct values to anything that may have been changed from an out of the ordinary border
var planechaseInfo = false
var legendaryBorder = false
var nyxBorder = false
var miracleBorder = false
var stampBorder = false
var flipBorder = false
var creatureBorder = true
var thirdBorder = true
var secondBorder = true
var transparentBorder = false
var artifactBorder = false
//Shifted text
titleRightShift = 0
typeRightShift = 0
//Aligned text
var titleAlign = "left"
var typeAlign = "left"
var italicSize = 1
//Regular font colors
document.getElementById("inputTitleColor").value = "#000000"
document.getElementById("inputTypeColor").value = "#000000"
document.getElementById("inputRulesColor").value = "#000000"
document.getElementById("inputCreatureColor").value = "#000000"
//Image alignment
var centerSetSymbol = 1 //1=not centered, 2=centered
var artX = 58
var artY = 118
//Loads the correct border data
borderPath = "data/borders/" + document.getElementById("borderSelection").value
loadScript(borderPath + "border.js")