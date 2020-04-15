var versionM15NyxImageList = [
['White Nyx Frame', 'data/images/m15/m15FrameWNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)', 'Pinline Super (m15)']],
['Blue Nyx Frame', 'data/images/m15/m15FrameUNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)', 'Pinline Super (m15)']],
['Black Nyx Frame', 'data/images/m15/m15FrameBNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)', 'Pinline Super (m15)']],
['Red Nyx Frame', 'data/images/m15/m15FrameRNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)', 'Pinline Super (m15)']],
['Green Nyx Frame', 'data/images/m15/m15FrameGNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)', 'Pinline Super (m15)']],
['Multicolored Nyx Frame', 'data/images/m15/m15FrameMNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)', 'Pinline Super (m15)']],
['Artifact Nyx Frame', 'data/images/m15/m15FrameANyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)', 'Pinline Super (m15)']],
['White Nyx Legend Crown', 'data/images/m15/m15InnerCrownWNyx.png', 246/1500, 50/2100, 1008/1500, 50/2100, ['Full']],
['Blue Nyx Legend Crown', 'data/images/m15/m15InnerCrownUNyx.png', 246/1500, 50/2100, 1008/1500, 50/2100, ['Full']],
['Black Nyx Legend Crown', 'data/images/m15/m15InnerCrownBNyx.png', 246/1500, 50/2100, 1008/1500, 50/2100, ['Full']],
['Red Nyx Legend Crown', 'data/images/m15/m15InnerCrownRNyx.png', 246/1500, 50/2100, 1008/1500, 50/2100, ['Full']],
['Green Nyx Legend Crown', 'data/images/m15/m15InnerCrownGNyx.png', 246/1500, 50/2100, 1008/1500, 50/2100, ['Full']],
['Multicolored Nyx Legend Crown', 'data/images/m15/m15InnerCrownMNyx.png', 246/1500, 50/2100, 1008/1500, 50/2100, ['Full']],
['Artifact Nyx Legend Crown', 'data/images/m15/m15InnerCrownANyx.png', 246/1500, 50/2100, 1008/1500, 50/2100, ['Full']]
]

var versionM15NyxMaskList = []

if (!loadedVersions.includes('m15Nyx')) {
	loadedVersions.push("m15Nyx")
	// loadMaskImages(versionM15NyxMaskList)
	loadFrameImages(versionM15NyxImageList, 'frameClassM15')
}

if (currentVersion != 'm15') {
	currentVersion = 'm15'

	hideFrameImages('frameClassM15')

	loadTextOptions([
	new cardText('Card Title', '', 126/1500, 188/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
	new cardText('Card Type', '', 126/1500, 1264/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
	new cardText('Rules Text', '', 135/1500, 1375/2100, 1230/1500, 625/2100, 'mplantin', 74/2100, 'black'),
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