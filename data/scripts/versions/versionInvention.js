var versionInventionImageList = [
['Invention Frame', 'data/images/invention/inventionFrame.png', 0, 0, 1, 1, ['Full', 'Pinline Super (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Invention Power/Toughness', 'data/images/invention/inventionPT.png', 1142/1500, 1856/2100, 287/1500, 157/2100, ['Full']]
]

var versionInventionMaskList = []

if (!loadedVersions.includes('invention')) {
	loadedVersions.push("invention")
	// loadMaskImages(versionM15InventionMaskList)
	loadFrameImages(versionInventionImageList, 'frameClassM15')
}

if (currentVersion != 'invention') {
	currentVersion = 'invention'

	hideFrameImages('frameClassM15')

	loadTextOptions([
	new cardText('Card Title', '', 126/1500, 187/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
	new cardText('Card Type', '', 126/1500, 1263/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
	new cardText('Rules Text', '', 135/1500, 1372/2100, 1230/1500, 624/2100, 'mplantin', 74/2100, 'black'),
	new cardText('Power/Toughness', '', 1190/1500, 1950/2100, 210/1500, 78/2100, 'belerenbsc', 78/2100, 'black', ['oneLine=true,textAlign="center"'])
	])

	artX = scaleX(60/1500)
	artY = scaleY(60/2100)
	artWidth = scaleX(1440/1500)
	artHeight = scaleY(1888/2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '121'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1382/1500), 'right']
	setSymbolY = [scaleY(1240/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(80/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoM15'

	bottomInfoUpdated()
}