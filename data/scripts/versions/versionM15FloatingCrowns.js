var versionM15FloatingCrownsImageList = [
['White Floating Legend Crown', 'data/images/m15/m15CrownFloatingW.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Blue Floating Legend Crown', 'data/images/m15/m15CrownFloatingU.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Black Floating Legend Crown', 'data/images/m15/m15CrownFloatingB.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Red Floating Legend Crown', 'data/images/m15/m15CrownFloatingR.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Green Floating Legend Crown', 'data/images/m15/m15CrownFloatingG.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Multicolored Floating Legend Crown', 'data/images/m15/m15CrownFloatingM.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Artifact Floating Legend Crown', 'data/images/m15/m15CrownFloatingA.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Land Floating Legend Crown', 'data/images/m15/m15CrownFloatingA.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']]
]

var versionM15FloatingCrownsMaskList = []

if (!loadedVersions.includes('m15FloatingCrown')) {
	loadedVersions.push("m15FloatingCrown")
	// loadMaskImages(versionM15FloatingCrownsMaskList)
	loadFrameImages(versionM15FloatingCrownsImageList, 'frameClassM15')
}

if (currentVersion != 'm15') {
	currentVersion = 'm15'

	hideFrameImages('frameClassM15')

	loadTextOptions([
	new cardText('Card Title', '', 126/1500, 188/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
	new cardText('Card Type', '', 126/1500, 1264/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
	new cardText('Rules Text', '', 135/1500, 1370/2100, 1230/1500, 625/2100, 'mplantin', 74/2100, 'black'),
	new cardText('Power/Toughness', '', 1191/1500, 1954/2100, 205/1500, 78/2100, 'belerenbsc', 78/2100, 'black', ['oneLine=true,textAlign="center"'])
	])

	artX = scaleX(115 / 1500)
	artY = scaleY(237 / 2100)
	artWidth = scaleX(1270 / 1500)
	artHeight = scaleY(929 / 2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '121'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1382/1500), 'right']
	setSymbolY = [scaleY(1241/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(86/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoM15'

	bottomInfoUpdated()
}