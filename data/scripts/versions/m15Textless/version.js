if (!loadedVersions.includes('m15Textless')) {
	loadedVersions.push('m15Textless')
	loadMaskImages([['Border (m15 Textless)', 'data/images/m15Textless/m15TextlessMaskBorder.png'], ['Pinline (m15 Textless)', 'data/images/m15Textless/m15TextlessMaskPinline.png'], ['Type (m15 Textless)', 'data/images/m15Textless/m15TextlessMaskType.png'], ['Invention (m15 Textless)', 'data/images/m15Textless/m15TextlessMaskInvention.png']])
}

if (currentVersion != 'm15Textless') {
	currentVersion = 'm15Textless'

	loadTextOptions([
	new cardText('Card Title', '', 126/1500, 188/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
	new cardText('Card Type', '', 126/1500, 1827/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
	new cardText('Power/Toughness', '', 1191/1500, 1954/2100, 205/1500, 78/2100, 'belerenbsc', 78/2100, 'black', ['oneLine=true,textAlign="center"'])
	])

	artX = scaleX(60 / 1500)
	artY = scaleY(60 / 2100)
	artWidth = scaleX(1380 / 1500)
	artHeight = scaleY(1888 / 2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '121'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1382/1500), 'right']
	setSymbolY = [scaleY(1804/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(86/2100)

	watermarkX = 0
	watermarkY = 0
	watermarkWidth = scaleX(1/1500)
	watermarkHeight = scaleY(1/2100)

	bottomInfoFunction = 'bottomInfoM15'

	bottomInfoUpdated()
}

loadFramePackOptions([['regular', 'Regular'], ['floatingCrowns', 'Floating Crowns'], ['innerCrowns', 'Inner Crowns']])

function bottomInfoM15() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	var ptBoxShift = 0
	for (var i = 0; i < cardTextList.length; i++) {
		if (cardTextList[i].name == 'Power/Toughness' && cardTextList[i].text != '') {
			ptBoxShift = 36/2100
		}
	}
	writeText(
		[
			{text: document.getElementById('inputInfoSet').value + '{right' + scaleX(0.005) + '}\u2605{right' + scaleX(0.005) + '}' + document.getElementById('inputInfoLanguage').value + ' {saveTextX}{artistbrush}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value, x: 97/1500, y: 2026/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: document.getElementById('inputInfoNumber').value + '{loadTextX}' + document.getElementById('inputInfoRarity').value, x: 97/1500, y: 1990/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: '{right}\u2122 & \u00a9 ' + date.getFullYear() + ' Wizards of the Coast', x: 97/1500, y: 1990/2100 + ptBoxShift, width: 1306/1500, height: 35/2100, font: 'mplantin', fontSize: 35/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: 'NOT FOR SALE', x: 97/1500, y: 2058/2100, width: 1306/1500, height: 30/2100, font: 'gothammedium', fontSize: 30/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: '{right}CardConjurer.com', x: 97/1500, y: 2022/2100 + ptBoxShift, width: 1306/1500, height: 30/2100, font: 'mplantin', fontSize: 30/2100, fontColor: 'white', otherParameters: ['oneLine=true']}
		], bottomInfoContext)
}