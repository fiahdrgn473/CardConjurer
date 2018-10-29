//Default Border
//Sets the correct values to anything that may have been changed from an out of the ordinary border
var eighthInfo = false
var m15Info = false
var legendaryBorder = false
var nyxBorder = false
var miracleBorder = false
var stampBorder = false
var flipBorder = false
var creatureBorder = true
var thirdBorder = true
var secondBorder = true
var transparentBorder = false
//Shifted text
titleRightShift = 0
typeRightShift = 0
//Aligned text
var titleAlign = "left"
var typeAlign = "left"
//Image alignment
var centerSetSymbol = 1 //1=not centered, 2=centered
var artX = 58
var artY = 118
//card size
canvas.width = 749
canvas.height = 1044
borderCanvas.width = 749
borderCanvas.height = 1044
//Loads the correct border data
borderPath = "data/borders/" + document.getElementById("borderSelection").value
loadScript(borderPath + "border.js")