//Cycles through a rainbow!
setInterval(changeColor, 100)
var regularAdjust = 0//60
var lightAdjust = 64//100
var lightLead = 255
var currentColorIndex = 0
function changeColor() {
	var colors = indexToColor(currentColorIndex)
	document.documentElement.style.setProperty("--shifting-color-1", "rgb(" + parseInt(colors[0] + regularAdjust) + "," + parseInt(colors[1] + regularAdjust) + "," + parseInt(colors[2] + regularAdjust) + ")")
	var lightColors = indexToColor(currentColorIndex + lightLead)
	document.documentElement.style.setProperty("--shifting-color-1-light", "rgb(" + parseInt(lightColors[0] + lightAdjust) + "," + parseInt(lightColors[1] + lightAdjust) + "," + parseInt(lightColors[2] + lightAdjust) + ")")
	currentColorIndex += 153 / 180 //The second number is how many seconds it takes to do a full loop
}
function indexToColor(colorIndex) {
	var red = 0, green = 0, blue = 0
	var realColorIndex = colorIndex - Math.floor(colorIndex / 1530) * 1530
	var colorStage = Math.floor(realColorIndex / 255)
	switch(colorStage) {
		case 0:
			green = 255
			red = realColorIndex - Math.floor(realColorIndex / 255) * 255
			break
		case 1:
			red = 255
			green = 255 - realColorIndex + Math.floor(realColorIndex / 255) * 255
			break
		case 2:
			red = 255
			blue = realColorIndex - Math.floor(realColorIndex / 255) * 255
			break
		case 3:
			blue = 255
			red = 255 - realColorIndex + Math.floor(realColorIndex / 255) * 255
			break
		case 4:
			blue = 255
			green = realColorIndex - Math.floor(realColorIndex / 255) * 255
			break
		case 5:
			green = 255
			blue = 255 - realColorIndex + Math.floor(realColorIndex / 255) * 255
			break
	}
	return [red, green, blue]
}
