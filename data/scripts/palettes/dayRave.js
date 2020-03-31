rootStyles.setProperty('--background-color', '#eaeaea')
rootStyles.setProperty('--background-color-contrast', '#f5f5f5')
rootStyles.setProperty('--interactable-color', '#f5f5f5')
rootStyles.setProperty('--interactable-selected-color', '#eaeaea')
rootStyles.setProperty('--input-color', '#efefef')
rootStyles.setProperty('--input-font-color', '#000')
rootStyles.setProperty('--font-color', '#000')
rootStyles.setProperty('--font-color-contrast', '#000')
rootStyles.setProperty('--body-background', 'url(data/site/images/lowpoly.png) left/cover no-repeat fixed')
setCookie('colorPalette', 'dayRave')

//Cycles through a rainbow!
if (currentColorIndex == undefined) {
	document.getElementById('inputColorPalette').addEventListener('change', function() {
		clearInterval(raveMode)
	})
}
var raveMode = setInterval(changeColor, 250)
var regularAdjust = 0//60
var lightAdjust = 64//100
var lightLead = 255
var currentColorIndex = 0
function changeColor() {
	var colors = indexToColor(currentColorIndex)
	var lightColors = indexToColor(currentColorIndex + lightLead)
	rootStyles.setProperty('--background-color', 'linear-gradient(to bottom right, ' + "rgb(" + parseInt(colors[0] + regularAdjust) + "," + parseInt(colors[1] + regularAdjust) + "," + parseInt(colors[2] + regularAdjust) + ")" + ', ' + "rgb(" + parseInt(lightColors[0] + lightAdjust) + "," + parseInt(lightColors[1] + lightAdjust) + "," + parseInt(lightColors[2] + lightAdjust) + ")" + ') left/cover no-repeat fixed')
	currentColorIndex += 2.5 * 153 / 180 //The second number is how many seconds it takes to do a full loop
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
