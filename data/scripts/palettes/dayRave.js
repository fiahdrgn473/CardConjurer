rootStyles.setProperty('--site-background', '#f5f5f5 url("/data/images/site/backgrounds/lowpolyLightGreen.svg") left/cover no-repeat fixed')
rootStyles.setProperty('--site-background-filter', 'none')
rootStyles.setProperty('--layer-background', '#e4e4e4 url("/data/images/site/backgrounds/lowpolyLightGray.svg") left/cover no-repeat fixed')
rootStyles.setProperty('--layer-background-selected', '#cccccc')
rootStyles.setProperty('--interactable-unselected', '#aaaaaa')
rootStyles.setProperty('--interactable-selected', '#00aa00')
rootStyles.setProperty('--font-color', '#000000')
rootStyles.setProperty('--body-background', 'none')
setCookie('colorPalette', 'dayRave')

//Stops the hue shift when another palette is loaded
document.getElementById('inputColorPalette').addEventListener('change', removeEventListener, false)

function removeEventListener() {
	clearInterval(colorCycle)
	document.getElementById('inputColorPalette').removeEventListener('change', removeEventListener, false)
}

//Shifts the hue
var colorCycle = setInterval(shiftHue, 100)
var currentHueRotation = 0

function shiftHue() {
	rootStyles.setProperty('--site-background-filter', 'hue-rotate(' + currentHueRotation + 'deg)')
	currentHueRotation += 1
	if (currentHueRotation == 360) {
		currentHueRotation = 0
	}
}