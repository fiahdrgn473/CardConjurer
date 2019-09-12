//Cycles through a rainbow!
setInterval(changeColor, 100)
var colorShiftingClock = 0
var colorFrequency = 2 * Math.PI / 600
var numberOfColors = 1
function changeColor() {
	for (var i = 1; i <= numberOfColors; i ++) {
		var rgbValues = indexToColor(colorShiftingClock + ((i - 1) * 2 * Math.PI / numberOfColors / colorFrequency), colorFrequency)
		document.documentElement.style.setProperty("--shifting-color-" + i, "rgb(" + rgbValues[0] + "," + rgbValues[1] + "," + rgbValues[2] + ")")
	}
	var rgbLightValues = indexToColor(colorShiftingClock + ((i - 1) * 2 * Math.PI / numberOfColors / colorFrequency), colorFrequency)
	document.documentElement.style.setProperty("--shifting-color-1-light", "rgb(" + parseInt(rgbLightValues[0] + 150) + "," + parseInt(rgbLightValues[1] + 150) + "," + parseInt(rgbLightValues[2] + 150) + ")")
	colorShiftingClock += 1
}
function indexToColor(colorIndex, frequency) {
	var red = Math.sin(colorIndex * frequency + 0) * 127 + 128
	var green = Math.sin(colorIndex * frequency + 2 * Math.PI / 3) * 127 + 128
	var blue = Math.sin(colorIndex * frequency + 4 * Math.PI / 3) * 127 + 128
	return [red, green, blue]
}