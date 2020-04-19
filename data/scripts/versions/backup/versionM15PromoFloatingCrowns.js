var versionM15PromoFloatingCrownImageList = [
['White Floating Legend Crown', 'data/images/m15/m15CrownFloatingW.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Blue Floating Legend Crown', 'data/images/m15/m15CrownFloatingU.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Black Floating Legend Crown', 'data/images/m15/m15CrownFloatingB.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Red Floating Legend Crown', 'data/images/m15/m15CrownFloatingR.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Green Floating Legend Crown', 'data/images/m15/m15CrownFloatingG.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Multicolored Floating Legend Crown', 'data/images/m15/m15CrownFloatingM.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Artifact Floating Legend Crown', 'data/images/m15/m15CrownFloatingA.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
['Land Floating Legend Crown', 'data/images/m15/m15CrownFloatingA.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']]
]

var versionM15PromoFloatingCrownMaskList = []

if (!loadedVersions.includes('m15PromoFloatingCrown')) {
	loadedVersions.push("m15PromoFloatingCrown")
	// loadMaskImages(versionM15PromoFloatingCrownMaskList)
	loadFrameImages(versionM15PromoFloatingCrownImageList, 'frameClassM15Promo')
}

if (currentVersion != 'm15Promo') {
	currentVersion = 'm15Promo'

	hideFrameImages('frameClassM15Promo')

	loadTextOptions([
	new cardText('Card Title', '', 126/1500, 188/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'white', ['oneLine=true']),
	new cardText('Card Type', '', 126/1500, 1439/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'white', ['oneLine=true']),
	new cardText('Rules Text', '', 135/1500, 1545/2100, 1230/1500, 450/2100, 'mplantin', 74/2100, 'white'),
	new cardText('Power/Toughness', '', 1191/1500, 1954/2100, 205/1500, 78/2100, 'belerenbsc', 78/2100, 'white', ['oneLine=true,textAlign="center"'])
	])

	artX = 0
	artY = 0
	artWidth = scaleX(1)
	artHeight = scaleY(1936 / 2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '121'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1382/1500), 'right']
	setSymbolY = [scaleY(1416/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(86/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoM15'

	bottomInfoUpdated()
}