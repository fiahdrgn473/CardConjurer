var versionFutureImageList = [
['White Frame', 'data/images/future/futureFrameW.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['Blue Frame', 'data/images/future/futureFrameU.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['Black Frame', 'data/images/future/futureFrameB.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['Red Frame', 'data/images/future/futureFrameR.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['Green Frame', 'data/images/future/futureFrameG.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['Multicolored Frame', 'data/images/future/futureFrameM.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['Artifact Frame', 'data/images/future/futureFrameA.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['Clear Frame', 'data/images/future/futureFrameC.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['Land Frame', 'data/images/future/futureFrameL.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
['White Power/Toughness', 'data/images/future/futurePTW.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['Blue Power/Toughness', 'data/images/future/futurePTU.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['Black Power/Toughness', 'data/images/future/futurePTB.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['Red Power/Toughness', 'data/images/future/futurePTR.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['Green Power/Toughness', 'data/images/future/futurePTG.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['Multicolored Power/Toughness', 'data/images/future/futurePTM.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['Artifact Power/Toughness', 'data/images/future/futurePTA.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['Clear Power/Toughness', 'data/images/future/futurePTC.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['Land Power/Toughness', 'data/images/future/futurePTL.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
['White Icon', 'data/images/future/futureWhite.png', 49/744, 49/1039, 32/744, 32/1039, ['Artifact Icon (future)', 'Creature Icon (future)', 'Enchantment Icon (future)', 'Instant Icon (future)', 'Land Icon (future)', 'Multitype Icon (future)', 'Sorcery Icon (future)']],
['Gray Icon', 'data/images/future/futureGray.png', 49/744, 49/1039, 32/744, 32/1039, ['Artifact Icon (future)', 'Creature Icon (future)', 'Enchantment Icon (future)', 'Instant Icon (future)', 'Land Icon (future)', 'Multitype Icon (future)', 'Sorcery Icon (future)']]
]

var versionFutureMaskList = [['Border (future)', 'data/images/future/futureMaskBorder.png'], ['Artifact Icon (future)', 'data/images/future/futureMaskArtifact.png'], ['Creature Icon (future)', 'data/images/future/futureMaskCreature.png'], ['Enchantment Icon (future)', 'data/images/future/futureMaskEnchantment.png'], ['Instant Icon (future)', 'data/images/future/futureMaskInstant.png'], ['Land Icon (future)', 'data/images/future/futureMaskLand.png'], ['Multitype Icon (future)', 'data/images/future/futureMaskMulti.png'], ['Sorcery Icon (future)', 'data/images/future/futureMaskSorcery.png']]

if (!loadedVersions.includes('future')) {
	loadedVersions.push('future')
	loadMaskImages(versionFutureMaskList)
	loadFrameImages(versionFutureImageList, 'frameClassFuture')
}

if (currentVersion != 'future') {
	currentVersion = 'future'

	hideFrameImages('frameClassFuture')

	loadTextOptions([
	new cardText('Card Title', '', 264/1500, 195/2100, 1248/1500, 91/2100, 'matrixb', 91/2100, 'white', ['oneLine=true']),
	new cardText('Card Type', '', 182/1500, 1261/2100, 1248/1500, 75/2100, 'matrixb', 75/2100, 'white', ['oneLine=true']),
	new cardText('Rules Text', '', 154/1500, 1313/2100, 1211/1500, 670/2100, 'mplantin', 73/2100, 'black'),
	new cardText('Power/Toughness', '', 1160/1500, 1960/2100, 210/1500, 83/2100, 'mplantin', 83/2100, 'white', ['oneLine=true,textAlign="center"'])
	])

	artX = scaleX(129 / 1500)
	artY = scaleY(177 / 2100)
	artWidth = scaleX(1307 / 1500)
	artHeight = scaleY(1229 / 2100)

	manaCostXPath = '[scaleX(91/744), scaleX(61/744), scaleX(46/744), scaleX(46/744), scaleX(59/744), scaleX(106/744)][manaSymbolIndex]'
	manaCostYPath = '[scaleY(140/1039), scaleY(207/1039), scaleY(281/1039), scaleY(356/1039), scaleY(437/1039), scaleY(512/1039)][manaSymbolIndex]'
	manaCostDiameter = 'scaleX(59/744)'
	manaCostShadowOffset = '[0, 0]'
	manaCostDirection = 'forward'

	setSymbolX = [scaleX(1367/1500), 'center']
	setSymbolY = [scaleY(1249/2100), 'center']
	setSymbolWidth = scaleX(80/1500)
	setSymbolHeight = scaleY(80/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1593/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoFuture'

	bottomInfoUpdated()
}

function bottomInfoFuture() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	var ptBoxShift = 0
	var copyrightFillColor = 'white'
	for (var i = 0; i < cardTextList.length; i++) {
		if (cardTextList[i].name == 'Power/Toughness' && cardTextList[i].text != '') {
			ptBoxShift = -1/6
		}
	}
	var cardMasterChildren = cardMaster.children
	for (var i = cardMasterChildren.length - 1; i >= 0; i--) {
		var uniqueNumber = parseInt(cardMasterChildren[i].id.replace('uniqueNumber', ''))
		for (var n = 0; n < cardMasterList.length; n++) {
			if (cardMasterList[n].uniqueNumber == uniqueNumber) {
				if (cardMasterList[n].name.includes('White Frame') || cardMasterList[n].name.includes('Artifact Frame') || cardMasterList[n].name.includes('Colorless Frame')) {
					copyrightFillColor = 'black'
				}
			}
		}
	}
	writeText(
		[
			{text: '{right}{oldartistbrush}' + document.getElementById('inputInfoArtist').value, x: 141/1500, y: 1938/2100, width: 1216/1500 + ptBoxShift, height: 52/2100, font: 'matrixb', fontSize: 52/2100, fontColor: copyrightFillColor, otherParameters: ['oneLine=true']},
			{text: '{right}\u2122 & \u00a9 ' + date.getFullYear() + ' Wizards of the Coast', x: 141/1500, y: 1980/2100, width: 1216/1500 + ptBoxShift, height: 36/2100, font: 'mplantin', fontSize: 36/2100, fontColor: copyrightFillColor, otherParameters: ['oneLine=true']},
			{text: '{right}*Not for Sale*   CardConjurer.com', x: 141/1500, y: 2012/2100, width: 1216/1500 + ptBoxShift, height: 28/2100, font: 'mplantin', fontSize: 28/2100, fontColor: copyrightFillColor, otherParameters: ['oneLine=true']}
		], bottomInfoContext)
}