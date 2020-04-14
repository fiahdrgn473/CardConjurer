var versionM15NicknameImageList = [
['Base Nickname Frame', 'data/images/m15/m15NicknameTextboxes.png', 0, 0, 1, 1, ['Full', 'Title (m15)', 'Type (m15)', 'Rules (m15)']],
['White Nickname Frame', 'data/images/m15/m15NicknameFrameW.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Border (m15)']],
['Blue Nickname Frame', 'data/images/m15/m15NicknameFrameU.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Border (m15)']],
['Black Nickname Frame', 'data/images/m15/m15NicknameFrameB.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Border (m15)']],
['Red Nickname Frame', 'data/images/m15/m15NicknameFrameR.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Border (m15)']],
['Green Nickname Frame', 'data/images/m15/m15NicknameFrameG.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Border (m15)']],
['Multicolored Nickname Frame', 'data/images/m15/m15NicknameFrameM.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Border (m15)']],
['Artifact Nickname Frame', 'data/images/m15/m15NicknameFrameA.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Border (m15)']],
['Land Nickname Frame', 'data/images/m15/m15NicknameFrameL.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Border (m15)']],
['White Nickname Legend Crown', 'data/images/m15/m15NicknameCrownW.png', 36/1500, 36/2100, 1428/1500, 270/2100, ['Full', 'Nickname Legend Crown (m15)']],
['Blue Nickname Legend Crown', 'data/images/m15/m15NicknameCrownU.png', 36/1500, 36/2100, 1428/1500, 270/2100, ['Full', 'Nickname Legend Crown (m15)']],
['Black Nickname Legend Crown', 'data/images/m15/m15NicknameCrownB.png', 36/1500, 36/2100, 1428/1500, 270/2100, ['Full', 'Nickname Legend Crown (m15)']],
['Red Nickname Legend Crown', 'data/images/m15/m15NicknameCrownR.png', 36/1500, 36/2100, 1428/1500, 270/2100, ['Full', 'Nickname Legend Crown (m15)']],
['Green Nickname Legend Crown', 'data/images/m15/m15NicknameCrownG.png', 36/1500, 36/2100, 1428/1500, 270/2100, ['Full', 'Nickname Legend Crown (m15)']],
['Multicolored Nickname Legend Crown', 'data/images/m15/m15NicknameCrownM.png', 36/1500, 36/2100, 1428/1500, 270/2100, ['Full', 'Nickname Legend Crown (m15)']],
['Artifact Nickname Legend Crown', 'data/images/m15/m15NicknameCrownA.png', 36/1500, 36/2100, 1428/1500, 270/2100, ['Full', 'Nickname Legend Crown (m15)']],
['Land Nickname Legend Crown', 'data/images/m15/m15NicknameCrownL.png', 36/1500, 36/2100, 1428/1500, 270/2100, ['Full', 'Nickname Legend Crown (m15)']]
]

var versionM15NicknameMaskList = [['Nickname Legend Crown (m15)', 'data/images/m15/m15MaskNicknameLegendCrownStrokeless.png']]

if (!loadedVersions.includes('m15Nickname')) {
	loadedVersions.push("m15Nickname")
	loadMaskImages(versionM15NicknameMaskList)
	loadFrameImages(versionM15NicknameImageList, 'frameClassM15')
}

if (currentVersion != 'm15Nickname') {
	currentVersion = 'm15Nickname'

	hideFrameImages('frameClassM15')

	loadTextOptions([
	new cardText('Card Nickname', '', 126/1500, 188/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'white', ['oneLine=true']),
	new cardText('Card Title', '', 210/1500, 276/2100, 1080/1500, 48/2100, 'belerenb', 48/2100, 'white', ['oneLine=true', 'textAlign="center"', 'fontStyle="italic "']),
	new cardText('Card Type', '', 126/1500, 1264/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'white', ['oneLine=true']),
	new cardText('Rules Text', '', 135/1500, 1375/2100, 1230/1500, 625/2100, 'mplantin', 74/2100, 'white'),
	new cardText('Power/Toughness', '', 1190/1500, 1957/2100, 205/1500, 78/2100, 'belerenbsc', 78/2100, 'white', ['oneLine=true,textAlign="center"'])
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