//Cycles through a rainbow!
setInterval(changeColor, 100)
var colorShiftingClock = 0
var colorFrequency = 2 * Math.PI / 600
var numberOfColors = 1
var lightness = 120
var lightAdjust = 120
function changeColor() {
	for (var i = 1; i <= numberOfColors; i ++) {
		var rgbValues = indexToColor(colorShiftingClock + ((i - 1) * 2 * Math.PI / numberOfColors / colorFrequency), colorFrequency)
		document.documentElement.style.setProperty("--shifting-color-" + i, "rgb(" + rgbValues[0] + "," + rgbValues[1] + "," + rgbValues[2] + ")")
	}
	var rgbLightValues = indexToColor(colorShiftingClock + ((i - 1) * 2 * Math.PI / numberOfColors / colorFrequency), colorFrequency)
	document.documentElement.style.setProperty("--shifting-color-1-light", "rgb(" + parseInt(rgbLightValues[0] + lightAdjust) + "," + parseInt(rgbLightValues[1] + lightAdjust) + "," + parseInt(rgbLightValues[2] + lightAdjust) + ")")
	colorShiftingClock += 1
}
function indexToColor(colorIndex, frequency) {
	var red = Math.sin(colorIndex * frequency + 0) * (255 - lightness) + lightness
	var green = Math.sin(colorIndex * frequency + 2 * Math.PI / 3) * (255 - lightness) + lightness
	var blue = Math.sin(colorIndex * frequency + 4 * Math.PI / 3) * (255 - lightness) + lightness
	return [red, green, blue]
}