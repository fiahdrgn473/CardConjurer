rootStyles.setProperty('--site-background', '#3a3838 url("/data/images/site/backgrounds/lowpolyDarkGreen.svg") left/cover no-repeat fixed')
rootStyles.setProperty('--site-background-filter', 'none')
rootStyles.setProperty('--layer-background', '#242424 url("/data/images/site/backgrounds/lowpolyDarkGray.svg") left/cover no-repeat fixed')
rootStyles.setProperty('--layer-background-selected', '#1d1d1d')
rootStyles.setProperty('--interactable-unselected', '#666666')
rootStyles.setProperty('--interactable-selected', '#99ee99')
rootStyles.setProperty('--font-color', '#efefef')
rootStyles.setProperty('--body-background', 'none')
setCookie('colorPalette', 'nightRave')

//Stops the hue shift when another palette is loaded
if (document.getElementById('inputColorPalette') != null) {
	document.getElementById('inputColorPalette').addEventListener('change', removeEventListener, false)
} else {
	setTimeout(function() {document.getElementById('inputColorPalette').addEventListener('change', removeEventListener, false)}, 1000)
}

function removeEventListener() {
	if (document.getElementById('inputColorPalette').value != 'nightRave') {
		clearInterval(colorCycle)
		document.getElementById('inputColorPalette').removeEventListener('change', removeEventListener, false)
	}
}

//Shifts the hue
var colorCycle = setInterval(shiftHue, 200)
var currentHueRotation = 0

function shiftHue() {
	rootStyles.setProperty('--site-background-filter', 'hue-rotate(' + currentHueRotation + 'deg)')
	currentHueRotation += 1
	if (currentHueRotation == 360) {
		currentHueRotation = 0
	}
}