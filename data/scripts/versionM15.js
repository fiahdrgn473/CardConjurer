var versionM15ImageList = [
['White Frame', 'data/images/m15/m15FrameW.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Blue Frame', 'data/images/m15/m15FrameU.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Black Frame', 'data/images/m15/m15FrameB.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Red Frame', 'data/images/m15/m15FrameR.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Green Frame', 'data/images/m15/m15FrameG.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Multicolored Frame', 'data/images/m15/m15FrameM.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Artifact Frame', 'data/images/m15/m15FrameA.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Vehicle Frame', 'data/images/m15/m15FrameV.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Land Frame', 'data/images/m15/m15FrameL.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['White Nyx Nyx Frame', 'data/images/m15/m15FrameWNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Blue Nyx Frame', 'data/images/m15/m15FrameUNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Black Nyx Frame', 'data/images/m15/m15FrameBNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Red Nyx Frame', 'data/images/m15/m15FrameRNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Green Nyx Frame', 'data/images/m15/m15FrameGNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Multicolored Nyx Frame', 'data/images/m15/m15FrameMNyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
['Artifact Nyx Frame', 'data/images/m15/m15FrameANyx.png', 0, 0, 1, 1, ['Full', 'Pinline (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']]
]

var versionM15MaskList = [['Right Half', 'data/images/maskRightHalf.png'], ['Pinline (m15)', 'data/images/m15/m15MaskPinline.png'], ['Full', 'data/images/maskFull.png'], ['Border (m15)', 'data/images/m15/m15MaskBorder.png'], ['Title (m15)', 'data/images/m15/m15MaskTitle.png'], ['Type (m15)', 'data/images/m15/m15MaskType.png'], ['Rules (m15)', 'data/images/m15/m15MaskRules.png'], ['Frame (m15)', 'data/images/m15/m15MaskFrame.png']]

if (!loadedVersions.includes('m15')) {
	loadedVersions.push("m15")
	loadMaskImages(versionM15MaskList)
	loadFrameImages(versionM15ImageList)
}

loadTextOptions([
new cardText('Card Title', '', 126/1500, 187/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
new cardText('Card Type', '', 126/1500, 1263/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
new cardText('Rules Text', '', 135/1500, 1372/2100, 1230/1500, 624/2100, 'mplantin', 74/2100, 'black'),
new cardText('Power/Toughness', '', 0.1, 0.1, 0.8, 0.8, 'mplantin', 0.0177, 'black', ['oneLine=true'])
])

artX = scaleX(115 / 1500)
artY = scaleY(237 / 2100)
artWidth = scaleX(1270 / 1500)//1384
artHeight = scaleY(928 / 2100)//1164
bottomInfoFunction = 'bottomInfoM15'

manaCostXPath = '1316 - 78 * manaSymbolIndex'
manaCostYPath = '121'
manaCostDiameter = '70'
manaCostShadowOffset = '[-2, 6]'
manaCostDirection = 'reverse'

setSymbolX = [scaleX(1382/1500), 'right']
setSymbolY = [scaleY(1200/2100), 'left']
setSymbolWidth = scaleX(180/1500)
setSymbolHeight = scaleY(80/2100)

watermarkX = scaleX(0.5)
watermarkY = scaleY(0.5)
watermarkWidth = scaleX(1)
watermarkHeight = scaleY(1)

function bottomInfoM15() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	var ptBoxShift = 0
	for (var i = 0; i < cardTextList.length; i++) {
		if (cardTextList[i].name == 'Power/Toughness' && cardTextList[i].text != '') {
			ptBoxShift = 36/2100
		} else {
			// console.log(cardTextList[i].name, cardTextList[i].text)
		}
	}
	writeText(
		[
			{text: document.getElementById('inputInfoNumber').value, x: 97/1500, y: 1990/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: document.getElementById('inputInfoSet').value + '\u2605' + document.getElementById('inputInfoLanguage').value + ' {artistbrush}{up' + scaleY(36/2100) + '}' + document.getElementById('inputInfoRarity').value + '  {down' + scaleY(72/2100) + '}{up' + scaleY(36/2100) + '}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value, x: 97/1500, y: 2026/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: '{right}\u2122 & \u00a9 ' + date.getFullYear() + ' Wizards of the Coast', x: 97/1500, y: 1990/2100 + ptBoxShift, width: 1306/1500, height: 35/2100, font: 'mplantin', fontSize: 35/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: '*Not for Sale*', x: 97/1500, y: 2056/2100, width: 1306/1500, height: 30/2100, font: 'gothammedium', fontSize: 30/2100, fontColor: 'white', otherParameters: ['oneLine=true']},
			{text: '{right}CardConjurer.com', x: 97/1500, y: 2020/2100 + ptBoxShift, width: 1306/1500, height: 30/2100, font: 'mplantin', fontSize: 30/2100, fontColor: 'white', otherParameters: ['oneLine=true']}
		], bottomInfoContext)
}

bottomInfoUpdated()