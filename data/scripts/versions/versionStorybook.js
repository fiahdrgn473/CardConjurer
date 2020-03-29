var versionStorybookImageList = [
['White Frame', 'data/images/storybook/storybookFrameW.png', 0, 0, 1, 1, ['Full']],
['Blue Frame', 'data/images/storybook/storybookFrameU.png', 0, 0, 1, 1, ['Full']],
['Black Frame', 'data/images/storybook/storybookFrameB.png', 0, 0, 1, 1, ['Full']],
['Red Frame', 'data/images/storybook/storybookFrameR.png', 0, 0, 1, 1, ['Full']],
['Green Frame', 'data/images/storybook/storybookFrameG.png', 0, 0, 1, 1, ['Full']],
['Colorless Frame', 'data/images/storybook/storybookFrameC.png', 0, 0, 1, 1, ['Full']]
]

var versionStorybookMaskList = [['Storybook Right Half', 'data/images/storybook/maskStorybookRightHalf.png']]

if (!loadedVersions.includes('storybook')) {
	loadedVersions.push('storybook')
	// loadMaskImages(versionStorybookMaskList)
	loadFrameImages(versionStorybookImageList, 'frameClassStorybook')
}

if (currentVersion != 'storybook') {
	currentVersion = 'storybook'

	hideFrameImages('frameClassStorybook')

	loadTextOptions([
		new cardText('Card Title', '', 222/1500, 187/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
		new cardText('Card Type', '', 345/1500, 1268/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
		new cardText('Rules Text', '', 124/1500, 1348/2100, 600/1500, 624/2100, 'mplantin', 74/2100, 'black'),
		new cardText('Rules Text (Right)', '', 780/1500, 1348/2100, 600/1500, 624/2100, 'mplantin', 74/2100, 'black'),
		new cardText('Power/Toughness', '', 1190/1500, 1950/2100, 210/1500, 78/2100, 'belerenbsc', 78/2100, 'black', ['oneLine=true,textAlign="center"'])
	])

	artX = scaleX(50/1500)
	artY = scaleY(54/2100)
	artWidth = scaleX(1405/1500)
	artHeight = scaleY(1175/2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '121'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1328/1500), 'center']
	setSymbolY = [scaleY(1245/2100), 'center']
	setSymbolWidth = scaleX(74/1500)
	setSymbolHeight = scaleY(74/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoStorybook'

	bottomInfoUpdated()
}

function bottomInfoStorybook() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	var ptBoxShift = 0
	for (var i = 0; i < cardTextList.length; i++) {
		if (cardTextList[i].name == 'Power/Toughness' && cardTextList[i].text != '') {
			ptBoxShift = 36/2100
		}
	}
	writeText(
		[
			{text: document.getElementById('inputInfoSet').value + '{right' + scaleX(0.005) + '}\u2605{right' + scaleX(0.005) + '}' + document.getElementById('inputInfoLanguage').value + ' {saveTextX}{artistbrush}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value, x: 97/1500, y: 2036/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: document.getElementById('inputInfoNumber').value + '{loadTextX}' + document.getElementById('inputInfoRarity').value, x: 97/1500, y: 2000/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: '{right}\u2122 & \u00a9 ' + date.getFullYear() + ' Wizards of the Coast', x: 97/1500, y: 2000/2100 + ptBoxShift, width: 1306/1500, height: 35/2100, font: 'mplantin', fontSize: 35/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: '*Not for Sale*', x: 97/1500, y: 2066/2100, width: 1306/1500, height: 30/2100, font: 'gothammedium', fontSize: 30/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: '{right}CardConjurer.com', x: 97/1500, y: 2030/2100 + ptBoxShift, width: 1306/1500, height: 30/2100, font: 'mplantin', fontSize: 30/2100, fontColor: 'white', otherParameters: ['oneLine=true']}
		], bottomInfoContext)
}