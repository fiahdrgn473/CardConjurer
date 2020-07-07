var cardMasterList = new Array()
var uniqueNumberTracker = 0
var frameImageList = new Array()
var maskImageList = new Array()
var maskNameList = new Array()
var canvasList = new Array()
var contextList = new Array()
var loadedVersions = new Array()
var currentVersion
var cardMaster = document.getElementById('cardMaster')
var selectedFrameImage
var selectedMaskImage = 0
var selectedCardMasterElement = -1
var selectedTextObject
var cardTextList = new Array()
var manaSymbolCodeList = []
var manaSymbolImageList = []
var deletingCardObject = false
date = new Date()
var cornerCutout = new Image()
cornerCutout.src = '/data/images/cardImages/cornerCutout.png'

function addToManaSymbolList(folderPath, newManaSymbolList) {
	for (var i = 0; i < newManaSymbolList.length; i ++) {
		manaSymbolCodeList.push(newManaSymbolList[i])
		manaSymbolImageList.push(new Image())
		manaSymbolImageList[manaSymbolImageList.length - 1].src = folderPath + newManaSymbolList[i] + '.png'
	}
}

addToManaSymbolList('/data/images/cardImages/manaSymbols/', ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "w", "u", "b", "r", "g", "2w", "2u", "2b", "2r", "2g", "pw", "pu", "pb", "pr", "pg", "wu", "wb", "ub", "ur", "br", "bg", "rg", "rw", "gw", "gu", "x", "s", "c", "t","untap", "e", "y", "z", "half", "inf", "chaos", "plane", "l+", "l-", "l0", "oldtap", "artistbrush", "bar", "whiteBrush", "blackBrush"])

function newCanvas(name) {
	window[name + 'Canvas'] = document.createElement('canvas')
	window[name + 'Canvas'].width = cardWidth
	window[name + 'Canvas'].height = cardHeight
	canvasList.push(window[name + 'Canvas'])
	window[name + 'Context'] = window[name + 'Canvas'].getContext('2d')
	contextList.push(window[name + 'Context'])
}
function resizeCanvases(newCardWidth, newCardHeight) {
	canvasList.forEach(element => {element.width = newCardWidth; element.height = newCardHeight})
}

var previewCanvas = document.getElementById('previewCanvas')
previewCanvas.width = 750
previewCanvas.height = 1050
var previewContext = previewCanvas.getContext('2d')
newCanvas('main')
newCanvas('frameMasks')
newCanvas('textLine')
newCanvas('textParagraph')
newCanvas('text')
newCanvas('bottomInfo')
newCanvas('manaCost')
newCanvas('watermark')
newCanvas('temp')
newCanvas('autoCrop')

var artWidth = cardWidth, artHeight = cardHeight
var setSymbolDrawX, setSymbolDrawY, setSymbolDrawWidth, setSymbolDrawHeight
var watermarkDrawX = 0, watermarkDrawY = 0, watermarkDrawWidth = 0, watermarkDrawHeight = 0
var cardArt = new Image()
cardArt.src = '/data/images/cardImages/blank.png'
var setSymbol = new Image()
var watermark = new Image()
cardArt.crossOrigin = "anonymous"
setSymbol.crossOrigin = "anonymous"
watermark.crossOrigin = "anonymous"
cardArt.onload = function() {
	cardMasterList[0].width = this.width / cardWidth
	cardMasterList[0].height = this.height / cardHeight
    if (this.width / this.height > artWidth / artHeight) {
        document.getElementById('inputCardArtZoom').value = artHeight / this.height * 100
    } else {
        document.getElementById('inputCardArtZoom').value = artWidth / this.width * 100
    }
    document.getElementById('inputCardArtX').value = artX
    document.getElementById('inputCardArtY').value = artY
	cardArtUpdated()
}
function setSymbolFromGatherer() {
	if (document.getElementById('inputSetCode').value.toLowerCase() == 'cc') {
		var newSetSymbolSource = 'https://cardconjurer.com/data/images/cardImages/misc/cc-' + document.getElementById('inputSetRarity').value.toLowerCase()
		if (document.getElementById('inputSetRarity').value == '') {
			newSetSymbolSource += 'c'
		}
		setSymbol.src = newSetSymbolSource + '.png'
	} else {
		autoCrop(setSymbol, 'https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=' + document.getElementById('inputSetCode').value + '&size=large&rarity=' + document.getElementById('inputSetRarity').value)
	}
}
setSymbol.onload = function() {
	if (setSymbol.width / setSymbol.height > setSymbolWidth / setSymbolHeight) {
		setSymbolDrawWidth = setSymbolWidth
		setSymbolDrawHeight = setSymbolWidth * setSymbol.height / setSymbol.width
	} else {
		setSymbolDrawHeight = setSymbolHeight
		setSymbolDrawWidth = setSymbolHeight * setSymbol.width / setSymbol.height
	}
	setSymbolDrawX = setSymbolX[0]
	if (setSymbolX[1] == 'right') {
		setSymbolDrawX -= setSymbolDrawWidth
	} else if (setSymbolX[1] == 'center') {
		setSymbolDrawX -= setSymbolDrawWidth / 2
	}
	setSymbolDrawY = setSymbolY[0]
	if (setSymbolY[1] == 'center') {
		setSymbolDrawY -= setSymbolDrawHeight / 2
	}
	drawCardObjects()
}
watermark.onload = function() {
	watermarkUpdated()
}

class cardPlaceholder {
	constructor(displayName, whatToDraw, x = 0, y = 0, width = 1, height = 1, zoom = 1) {
		this.name = displayName
		this.whatToDraw = whatToDraw
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.zoom = zoom
		this.uniqueNumber = uniqueNumberTracker
		uniqueNumberTracker += 1
	}
	draw() {
		if (this.whatToDraw == textCanvas) {
			if (currentVersion == 'planeswalker') {
				mainContext.drawImage(planeswalkerCanvas, 0, 0, cardWidth, cardHeight)
			}
			mainContext.globalAlpha = parseInt(document.getElementById('inputWatermarkOpacity').value) / 100
			mainContext.drawImage(watermarkCanvas, 0, 0, cardWidth, cardHeight)
			mainContext.globalAlpha = 1
			mainContext.drawImage(manaCostCanvas, 0, 0, cardWidth, cardHeight)
		} else {
			mainContext.globalAlpha = 1
		}
        mainContext.drawImage(this.whatToDraw, scaleX(this.x), scaleY(this.y), scaleX(this.width) * this.zoom, scaleY(this.height) * this.zoom)
	}
	cardMasterElement() {
		var temporaryElement = document.createElement('div')
		temporaryElement.id = 'uniqueNumber' + this.uniqueNumber
		temporaryElement.classList.add('cardMasterElement')
		temporaryElement.innerHTML = '<span class="handle">|||</span><div style="grid-column: 2 / 4">' + this.name + '</div><span></span>'
		return temporaryElement
	}
}
class cardImage {
	constructor(displayName = 'cardImage', imageSource = '', x = 0, y = 0, width = 1, height = 1, opacity = 1, masks = [], erase = false) {
		this.name = displayName
		this.image = new Image()
		this.image.src = imageSource
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.opacity = opacity
		this.masks = masks
		this.erase = erase
		this.uniqueNumber = uniqueNumberTracker
		uniqueNumberTracker += 1
	}
	draw() {
		if (this.masks.length > 0) {
			frameMasksContext.clearRect(0, 0, cardWidth, cardHeight)
			frameMasksContext.drawImage(maskImageList[maskNameList.indexOf(this.masks[0])], 0, 0, cardWidth, cardHeight)
			frameMasksContext.globalCompositeOperation = 'source-in'
			for (var i = 1; i < this.masks.length; i++) {
				frameMasksContext.drawImage(maskImageList[maskNameList.indexOf(this.masks[i])], 0, 0, cardWidth, cardHeight)
			}
			frameMasksContext.drawImage(this.image, scaleX(this.x), scaleY(this.y), scaleX(this.width), scaleY(this.height))
			frameMasksContext.globalCompositeOperation = 'source-over'
		} else {
			frameMasksContext.drawImage(this.image, scaleX(this.x), scaleY(this.y), scaleX(this.width), scaleY(this.height))
		}
		mainContext.globalAlpha = this.opacity
		if (this.erase) {
			mainContext.globalCompositeOperation = 'destination-out'
		} else {
			mainContext.globalCompositeOperation = 'source-over'
		}
		mainContext.drawImage(frameMasksCanvas, 0, 0, cardWidth, cardHeight)
		// mainContext.globalCompositeOperation = 'source-over'
	}
	cardMasterElement() {
		var temporaryElement = document.createElement('div')
		temporaryElement.id = 'uniqueNumber' + this.uniqueNumber
		temporaryElement.classList.add('cardMasterElement')
		temporaryElement.innerHTML = '<div class="handle">|||</div><div><img src="' + this.image.src + '"><img src="' + maskImageList[maskNameList.indexOf(this.masks[0])].src + '"></div><div>' + this.name + ' - ' + this.masks.toString().replace(',', ', ') + '</div><span class="delete" onclick="deleteCardObject(event)">X</span>'
		temporaryElement.onclick = function() {
			if (document.getElementById('cardMasterElementEditor').classList.contains('hidden') && !deletingCardObject) {
				document.getElementById('cardMasterElementEditor').classList.remove('hidden')
			} else {
				deletingCardObject = false
			}
			selectedCardMasterElement = parseInt(this.id.replace('uniqueNumber', ''))
			var selectedObject = cardMasterList[selectedCardMasterElement]
			document.getElementById('cardMasterElementEditorX').value = scaleX(selectedObject.x)
			document.getElementById('cardMasterElementEditorY').value = scaleY(selectedObject.y)
			document.getElementById('cardMasterElementEditorScale').value = scaleX(selectedObject.width)
			document.getElementById('cardMasterElementEditorOpacity').value = selectedObject.opacity * 100
			document.getElementById('cardMasterElementEditorErase').checked = selectedObject.erase
			Array.from(document.getElementById('cardMaster').children).forEach(element => element.classList.remove('cardMasterElementSelected'))
			this.classList.add('cardMasterElementSelected')
		}
		return temporaryElement
	}
}
class cardText {
	constructor(displayName, text, x, y, width, height, font, fontSize, fontColor, other = []) {
		this.name = displayName
		this.text = text
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.font = font
		this.fontSize = fontSize
		this.fontColor = fontColor
		this.otherParameters = other
	}
}

function scaleX(xToScale) {
	return xToScale * cardWidth
}
function scaleY(yToScale) {
	return yToScale * cardHeight
}

function drawCardObjects() {
	mainContext.clearRect(0, 0, cardWidth, cardHeight)
	previewContext.clearRect(0, 0, cardWidth, cardHeight)
	var cardMasterChildren = cardMaster.children
	for (var i = cardMasterChildren.length - 1; i >= 0; i--) {
		var uniqueNumber = parseInt(cardMasterChildren[i].id.replace('uniqueNumber', ''))
		for (var n = 0; n < cardMasterList.length; n++) {
			if (cardMasterList[n].uniqueNumber == uniqueNumber) {
				cardMasterList[n].draw()
			}
		}
	}
	mainContext.drawImage(setSymbol, setSymbolDrawX, setSymbolDrawY, setSymbolDrawWidth, setSymbolDrawHeight)
	mainContext.drawImage(bottomInfoCanvas, 0, 0, cardWidth, cardHeight)
	mainContext.globalCompositeOperation = 'destination-over'
    mainContext.drawImage(cardArt, scaleX(cardMasterList[0].x), scaleY(cardMasterList[0].y), scaleX(cardMasterList[0].width) * cardMasterList[0].zoom, scaleY(cardMasterList[0].height) * cardMasterList[0].zoom)
	mainContext.globalCompositeOperation = 'destination-out'
	//draw the corner cutters
	mainContext.drawImage(cornerCutout, 0, 0, scaleX(59/1500), scaleX(59/1500))
	mainContext.rotate(Math.PI / 2)
	mainContext.drawImage(cornerCutout, 0, -cardWidth, scaleX(59/1500), scaleX(59/1500))
	mainContext.rotate(Math.PI / 2)
	mainContext.drawImage(cornerCutout, -cardWidth, -cardHeight, scaleX(59/1500), scaleX(59/1500))
	mainContext.rotate(Math.PI / 2)
	mainContext.drawImage(cornerCutout, -cardHeight, 0, scaleX(59/1500), scaleX(59/1500))
	mainContext.rotate(Math.PI / 2)
	//preview the card
	mainContext.globalCompositeOperation = 'source-over'
	previewContext.drawImage(mainCanvas, 0, 0, previewCanvas.width, previewCanvas.height)
}

class frameImage {
	constructor(displayName = 'custom', imageSource = '', x = 0, y = 0, width = 1, height = 1, masks = [], frameImageListIndex, frameClass) {
		this.name = displayName
		this.image = new Image()
		if (this.name == 'custom') {
			this.image.crossOrigin = 'anonymous'
		}
		this.image.src = imageSource
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.masks = masks
		this.framePickerElement = document.createElement('div')
        this.framePickerElement.id = 'frameIndex' + frameImageListIndex
        this.framePickerElement.classList.add(frameClass)
        this.framePickerElement.onclick = this.frameOptionClicked
        this.framePickerElement.innerHTML = '<img src=' + this.image.src + '>'
        document.getElementById('framePicker').appendChild(this.framePickerElement)
	}
	frameOptionClicked() {
		Array.from(document.getElementById('framePicker').children).forEach(element => element.classList.remove('frameOptionSelected'))
		this.classList.add('frameOptionSelected')
		if (parseInt(this.id.replace('frameIndex', '')) != selectedFrameImage) {
			selectedFrameImage = parseInt(this.id.replace('frameIndex', ''))
			document.getElementById('maskPicker').innerHTML = ''
			frameImageList[parseInt(this.id.replace('frameIndex', ''))].masks.forEach(array => document.getElementById('maskPicker').innerHTML += '<div id="maskOption' + maskNameList.indexOf(array) + '" onclick="maskOptionClicked(event)"><img src="' + maskImageList[maskNameList.indexOf(array)].src + '">' + array + '</div>')
			document.getElementById('maskPicker').children[0].classList.add('maskOptionSelected')
			selectedMaskImage = parseInt(document.getElementById('maskPicker').children[0].id.replace('maskOption', ''))
		}
	}
}
function maskOptionClicked(event) {
	Array.from(document.getElementById('maskPicker').children).forEach(element => element.classList.remove('maskOptionSelected'))
	if (event.target.nodeName == 'IMG') {
		event.target.parentElement.classList.add('maskOptionSelected')
		selectedMaskImage = parseInt(event.target.parentElement.id.replace('maskOption', ''))
	} else {
		event.target.classList.add('maskOptionSelected')
		selectedMaskImage = parseInt(event.target.id.replace('maskOption', ''))
	}
}

function loadFramePackOptions(listOfFramePacks) {
	var framePackHTML = ''
	for (var i = 0; i < listOfFramePacks.length; i++) {
		framePackHTML += '<option value="' + listOfFramePacks[i][0] + '">' + listOfFramePacks[i][1] + '</option>'
	}
	document.getElementById('inputFramePack').innerHTML = framePackHTML
	loadScript('/data/scripts/versions/' + document.getElementById('inputFrameVersion').value + '/regular.js')
}
function loadMaskImages(listOfMasks) {
	for (var i = 0; i < listOfMasks.length; i++) {
		if (!maskNameList.includes(listOfMasks[i][0])) {
			var maskImage = new Image()
			maskImage.src = listOfMasks[i][1]
			maskImageList.push(maskImage)
			maskNameList.push(listOfMasks[i][0])
		}
		
	}
}
function loadFrameImages(listOfFrames, frameClass) {
    var firstFrameIndex = 0
	for (var i = 0; i < listOfFrames.length; i++) {
        if (i == 0) {
            firstFrameIndex = frameImageList.length
        }
		frameImageList.push(new frameImage(...listOfFrames[i], frameImageList.length, frameClass))
	}
    frameImageList[firstFrameIndex].framePickerElement.click()
}

//Loads up anything that uses Sortable.js
var sortable = Sortable.create(cardMaster, {animation: 150, ghostClass: 'cardMasterElementMoving', handle: '.handle'})

function deleteCardObject(event) {
	var isItPT = event.target.parentElement.children[2].innerHTML.includes('Power/Toughness')
	cardMaster.removeChild(document.getElementById('uniqueNumber' + parseInt(event.target.parentElement.id.replace('uniqueNumber', ''))))
	selectedCardMasterElement = -1
	if (isItPT) {
		bottomInfoUpdated()
	} else {
		drawCardObjects()
	}
	deletingCardObject = true
	document.getElementById('cardMasterElementEditor').classList.add('hidden')
}

function addSelectedFrame(additionalMasks = []) {
	var selectedFrameObject = frameImageList[selectedFrameImage]
	var masksToUse = additionalMasks
	masksToUse.unshift(maskNameList[selectedMaskImage])
	var objectToInsert = cardMasterList.push(new cardImage(selectedFrameObject.name, selectedFrameObject.image.src, selectedFrameObject.x, selectedFrameObject.y, selectedFrameObject.width, selectedFrameObject.height, 1, masksToUse, false))
	cardMaster.insertBefore(cardMasterList[objectToInsert - 1].cardMasterElement(), cardMaster.children[1])
	if (selectedFrameObject.name.includes('Power/Toughness')) {
		bottomInfoUpdated()
	} else {
		drawCardObjects()
	}
	// setTimeout(drawCardObjects, 100)
}

function cardMasterElementEdited() {
	var selectedObject = cardMasterList[selectedCardMasterElement]
	selectedObject.x = getFloat('cardMasterElementEditorX') / cardWidth
	selectedObject.y = getFloat('cardMasterElementEditorY') / cardHeight
	selectedObject.height = selectedObject.height / selectedObject.width * getFloat('cardMasterElementEditorScale') / cardWidth
	selectedObject.width = getFloat('cardMasterElementEditorScale') / cardWidth
	selectedObject.opacity = getFloat('cardMasterElementEditorOpacity') / 100
	selectedObject.erase = document.getElementById('cardMasterElementEditorErase').checked
	drawCardObjects()
}

function getFloat(input) {
	return parseFloat(document.getElementById(input).value)
}

function loadTextOptions(textArray) {
	document.getElementById('textPicker').innerHTML = ''
	cardTextList = textArray
	cardTextList.forEach((item, index) => document.getElementById('textPicker').innerHTML += '<div id="' + index + '" onclick="textOptionClicked(event, ' + index + ')">' + item.name + '</div>')
	document.getElementById('textPicker').children[0].click()
}
function textOptionClicked(event, index) {
	Array.from(document.getElementById('textPicker').children).forEach(element => element.classList.remove('selectedText'))
	event.target.classList.add('selectedText')
	selectedTextObject = cardTextList[index]
	document.getElementById('textEditorText').value = selectedTextObject.text
	document.getElementById('textEditorX').value = scaleX(selectedTextObject.x)
	document.getElementById('textEditorY').value = scaleY(selectedTextObject.y)
	document.getElementById('textEditorWidth').value = scaleX(selectedTextObject.width)
	document.getElementById('textEditorHeight').value = scaleY(selectedTextObject.height)
}
function cardTextEdited() {
	selectedTextObject.text = document.getElementById('textEditorText').value
	selectedTextObject.x = document.getElementById('textEditorX').value / cardWidth
	selectedTextObject.y = document.getElementById('textEditorY').value / cardHeight
	selectedTextObject.width = document.getElementById('textEditorWidth').value / cardWidth
	selectedTextObject.height = document.getElementById('textEditorHeight').value / cardHeight
	drawCardText()
	if (selectedTextObject.name == 'Power/Toughness') {
		bottomInfoUpdated()
	}
}
function drawCardTextReal() {
	textContext.clearRect(0, 0, cardWidth, cardHeight)
	writeText(cardTextList, textContext)
}
function drawCardText() {
    clearTimeout(updateTextDelay)
    updateTextDelay = setTimeout(drawCardTextReal, 250)
}
function writeText(textObjectList, targetContext) {
	var textCanvasBuffer = 100
	var rewritingLine = false
	var textSize, textFont
	var savedTextX = 0
	outerloop:
	for (var i = 0; i < textObjectList.length; i++) {
		if (!rewritingLine) {
			textSize = scaleY(textObjectList[i].fontSize)
		} else {
			textSize -= 1
		}
		rewritingLine = false
		textLineCanvas.width = scaleX(textObjectList[i].width) + 2 * textCanvasBuffer
		textLineCanvas.height = textSize + 2 * textCanvasBuffer
		textParagraphCanvas.width = scaleX(textObjectList[i].width) + 2 * textCanvasBuffer
		textParagraphCanvas.height = scaleY(textObjectList[i].height) + 2 * textCanvasBuffer
		textLineContext.clearRect(0, 0, textLineCanvas.width, textLineCanvas.height)
		textParagraphContext.clearRect(0, 0, textParagraphCanvas.width, textParagraphCanvas.height)
		var outline, shadow = 0, oneLine = false, outlineThickness = 2, textAlign = 'left', finishLine = false, paragraphSpace = 0, permanentLineShift = 0, temporaryLineShift = 0, fontStyle = '', manaCost = false, canWriteText = true
		textObjectList[i].otherParameters.forEach(item => eval(item))
		textLineContext.strokeStyle = outline
		textLineContext.lineWidth = outlineThickness
		textFont = textObjectList[i].font
		textLineContext.font = fontStyle + textSize + 'px ' + textFont
		var currentFontColor = textObjectList[i].fontColor
		textLineContext.fillStyle = currentFontColor
		var textX = textCanvasBuffer
		var textY = 0
		var currentLineWidth = 0
		var splitText = textObjectList[i].text.replace(/\n/g, '{line}').replace(/{/g, 'fh48a3h2{').replace(/}/g, '}fh48a3h2').replace(/ /g, 'fh48a3h2 fh48a3h2').split('fh48a3h2')
		if (manaCost) {
			splitText = '{' + textObjectList[i].text.replace(/\n/g, '').replace(/{/g, ' ').replace(/}/g, ' ').replace(/ /g, '}fh48a3h2{right4}fh48a3h2{') + '}'
			splitText = splitText.split('fh48a3h2')
		}
		splitText.push('')
		innerloop:
		for (var n = 0; n < splitText.length; n++) {
			if (splitText[n] != '' || n == splitText.length - 1) {
				wordToWrite = ''
				if (splitText[n][0] == '{' && splitText[n][splitText[n].length - 1] == '}') {
					var possibleCodeLower = splitText[n].substr(1, splitText[n].length - 2).toLowerCase()
					if (possibleCodeLower == 'line' && !oneLine) {
						finishLine = true
						paragraphSpace += textSize * 0.35
					} else if (possibleCodeLower == 'linenospace' && !oneLine) {
						finishLine = true
					} else if ((possibleCodeLower == 'bar' || possibleCodeLower == 'flavor') && !oneLine) {
						finishLine = true
						var barWidth = scaleX(textObjectList[i].width) * 0.95
						var barHeight = scaleY(0.001)
						textLineContext.drawImage(manaSymbolImageList[63], textCanvasBuffer + (scaleX(textObjectList[i].width) - barWidth) / 2, textSize * 1.6 + textCanvasBuffer, barWidth, barHeight)
						paragraphSpace += textSize * 0.8
						if (possibleCodeLower == 'flavor' && !fontStyle.includes('italic')) {
							fontStyle += 'italic '
							textLineContext.font = fontStyle + (textSize * 0.92) + 'px ' + textFont
						}
					} else if (possibleCodeLower == 'i' && !fontStyle.includes('italic')) {
						fontStyle += 'italic '
						textLineContext.font = fontStyle + textSize + 'px ' + textFont
					} else if (possibleCodeLower == '/i') {
						fontStyle = fontStyle.replace('italic ', '')
						textLineContext.font = fontStyle + textSize + 'px ' + textFont
					} else if (possibleCodeLower.includes('fontsize')) {
						textSize += parseInt(possibleCodeLower.slice(8, possibleCodeLower.length))
						textLineContext.font = fontStyle + textSize + 'px ' + textFont
					} else if (possibleCodeLower == 'left') {
						textAlign = 'left'
					} else if (possibleCodeLower == 'center') {
						textAlign = 'center'
					} else if (possibleCodeLower == 'right') {
						textAlign = 'right'
					} else if (possibleCodeLower.includes('right')) {
						textX += parseInt(possibleCodeLower.replace('right', ''))
						currentLineWidth += parseInt(possibleCodeLower.replace('right', ''))
						permanentLineShift += parseInt(possibleCodeLower.replace('right', ''))
					} else if (possibleCodeLower.includes('left')) {
						textX -= parseInt(possibleCodeLower.replace('left', ''))
						currentLineWidth -= parseInt(possibleCodeLower.replace('left', ''))
						permanentLineShift -= parseInt(possibleCodeLower.replace('left', ''))
					} else if (possibleCodeLower.includes('up')) {
						finishLine = true
						paragraphSpace -= parseInt(possibleCodeLower.replace('up', '')) + textSize
						temporaryLineShift += currentLineWidth
					} else if (possibleCodeLower.includes('down')) {
						finishLine = true
						paragraphSpace += parseInt(possibleCodeLower.replace('down', '')) - textSize
						temporaryLineShift += currentLineWidth
					} else if (possibleCodeLower == 'savetextx') {
						savedTextX = textX
					} else if (possibleCodeLower == 'loadtextx') {
						textX = savedTextX
					} else if (possibleCodeLower.includes('outline:')) {
	                    outline = true
	                    textLineContext.strokeStyle = possibleCodeLower.replace('outline:', '').split(',')[0]
	                    textLineContext.lineWidth = parseInt(possibleCodeLower.replace('outline:', '').split(',')[1])
	                } else if (possibleCodeLower.includes('shadow')) {
	                    shadow = parseInt(possibleCodeLower.replace('shadow', ''))
	                } else if (possibleCodeLower.includes('fontcolor')) {
	                	currentFontColor = possibleCodeLower.slice(9, possibleCodeLower.length)
	                	textLineContext.fillStyle = currentFontColor
	                } else if (possibleCodeLower == 'artistbrush') {
	                	var artistBrushWidth = textSize * 1.2
						textLineContext.drawImage(manaSymbolImageList[62], textX, textCanvasBuffer + textSize - artistBrushWidth * 0.58, artistBrushWidth, artistBrushWidth * 13 / 21)
						textX += artistBrushWidth * 1.1
						currentLineWidth += artistBrushWidth * 1.1
	                } else if (possibleCodeLower == 'oldartistbrush') {
	                    var artistBrushWidth = textSize * 2.4
	                    if (textLineContext.fillStyle == '#ffffff' || textLineContext.fillStyle == 'white') {
	                        textLineContext.drawImage(manaSymbolImageList[64], textX, textCanvasBuffer + textSize - artistBrushWidth * 13 / 63, artistBrushWidth, artistBrushWidth * 13 / 63);
	                    } else {
	                        textLineContext.drawImage(manaSymbolImageList[65], textX, textCanvasBuffer + textSize - artistBrushWidth * 13 / 63, artistBrushWidth, artistBrushWidth * 13 / 63);
	                    }
	                    textX += artistBrushWidth * 1.1
	                    currentLineWidth += artistBrushWidth * 1.1
	                } else if (possibleCodeLower.includes('font')) {
						textFont = possibleCodeLower.replace('font', '')
						textLineContext.font = fontStyle + textSize + 'px ' + textFont
					} else if (manaSymbolCodeList.includes(possibleCodeLower.split('/').join(''))) {
						//THIS HAS TO BE THE LAST ONE
						var manaSymbolDiameter = textSize * 0.77
						if (manaCost && manaCostShadowOffset != 'none') {
							var shadowOffset = eval(manaCostShadowOffset)
							textLineContext.beginPath()
							textLineContext.arc(textX + manaSymbolDiameter / 2 + shadowOffset[0], textCanvasBuffer + textSize - manaSymbolDiameter * 0.45 + shadowOffset[1], manaSymbolDiameter / 2, 0, 2 * Math.PI)
							textLineContext.fill()
						}
						textLineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(possibleCodeLower.split('/').join(''))], textX, textCanvasBuffer + textSize - manaSymbolDiameter * 0.95, manaSymbolDiameter, manaSymbolDiameter)
						currentLineWidth += manaSymbolDiameter * 1.02
						textX += manaSymbolDiameter * 1.02
					} else {
						wordToWrite = splitText[n]
					}
				} else {
					wordToWrite = splitText[n]
				}
				if (!canWriteText) {
					wordToWrite = ''
				}
				if (wordToWrite != '' || n == splitText.length - 1 || finishLine) {
					var currentWordWidth = textLineContext.measureText(wordToWrite).width
					if (currentWordWidth + currentLineWidth > scaleX(textObjectList[i].width) || n == splitText.length - 1 || finishLine) {
						if (oneLine && currentWordWidth + currentLineWidth > scaleX(textObjectList[i].width) && textSize > 0) {
							rewritingLine = true
							i -= 1
							continue outerloop
						}
						var textAlignShift = 0
						if (textAlign == 'center') {
							textAlignShift = (scaleX(textObjectList[i].width) - currentLineWidth) / 2
						} else if (textAlign == 'right') {
							textAlignShift = scaleX(textObjectList[i].width) - currentLineWidth
						}
						textParagraphContext.drawImage(textLineCanvas, 0 + textAlignShift, textY, textLineCanvas.width, textLineCanvas.height)
						if (n != splitText.length - 1) {
							textLineContext.clearRect(0, 0, textLineCanvas.width, textLineCanvas.height)
							textX = textCanvasBuffer + permanentLineShift + temporaryLineShift
							currentLineWidth = 0 + permanentLineShift + temporaryLineShift
							textY += textSize + paragraphSpace
							paragraphSpace = 0
							temporaryLineShift = 0
							finishLine = false
							if (wordToWrite == " ") {
								continue innerloop
							}
						}
					}
					if (shadow > 0) {
	                    textLineContext.fillStyle = 'black'
	                    textLineContext.fillText(wordToWrite, textX + shadow, textCanvasBuffer + textSize + shadow)
	                    textLineContext.fillStyle = currentFontColor
					}
					if (outline != undefined) {
						textLineContext.strokeText(wordToWrite, textX, textCanvasBuffer + textSize)
					}
					textLineContext.fillText(wordToWrite, textX, textCanvasBuffer + textSize)
					currentLineWidth += currentWordWidth
					textX += currentWordWidth
				}
			}
			if (n == splitText.length - 1) {
				targetContext.drawImage(textParagraphCanvas, scaleX(textObjectList[i].x) - textCanvasBuffer, scaleY(textObjectList[i].y) - textCanvasBuffer - textSize + (scaleY(textObjectList[i].height) - textY - textSize) / 2, textParagraphCanvas.width, textParagraphCanvas.height)
			}
		}
	}
	drawCardObjects()
}

function uploadImage(event, destination) {
	var input = event.target
	var reader = new FileReader()
	reader.onload = function() {
		var dataURL = reader.result
		destination.src = dataURL
	}
	reader.readAsDataURL(input.files[0])
}

function cardArtUpdated() {
	cardMasterList[0].x = getFloat('inputCardArtX') / cardWidth
	cardMasterList[0].y = getFloat('inputCardArtY') / cardHeight
	cardMasterList[0].zoom = getFloat('inputCardArtZoom') / 100
	drawCardObjects()
}

var savedArtList = [], cardArtUrlList = [], cardArtArtistList = []
function inputCardArtName(cardArtNameInput) {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			savedArtList = this.responseText.split('"art_crop":"')
			savedArtList.splice(0, 1)
			document.getElementById('inputCardArtNameNumber').max = savedArtList.length
			document.getElementById('inputCardArtNameNumber').value = 1
			for (i = 0; i < savedArtList.length; i ++) {
				cardArtUrlList[i] = savedArtList[i].split('","border_crop":')[0]
			}
			for (i = 0; i < savedArtList.length; i ++) {
				cardArtArtistList[i] = savedArtList[i].slice(savedArtList[i].indexOf('"artist":"') + 10, savedArtList[i].indexOf('","artist_id'))
			}
			inputCardArtNameNumber(1)
		} else if (this.readyState == 4 && this.status == 404) {
			notify("Sorry, but we can't seem to find any art for '" + cardArtNameInput + "'", '#ffffaae0')
		}
	}
	xhttp.open('GET', 'https://api.scryfall.com/cards/search?order=released&unique=art&q=name%3D' + cardArtNameInput.replace(/ /g, '_'), true)
	xhttp.send()
}
function inputCardArtNameNumber(cardArtNameNumberInput) {
	cardArt.src = cardArtUrlList[cardArtNameNumberInput - 1]
	document.getElementById('inputInfoArtist').value = cardArtArtistList[cardArtNameNumberInput - 1]
	bottomInfoUpdated()
}

function initialize() {
	//Card stuff
	cardMasterList.push(new cardPlaceholder('Card Art Placeholder', cardArt))
	cardMasterList.push(new cardPlaceholder('Text Placeholder', textCanvas))
	cardMaster.insertBefore(cardMasterList[0].cardMasterElement(), cardMaster.children[0])
	cardMaster.insertBefore(cardMasterList[1].cardMasterElement(), cardMaster.children[0])
	document.getElementById('inputInfoNumber').value = date.getFullYear()
	window.updateTextDelay = setTimeout(drawCardTextReal, 250)
	setTimeout(bottomInfoUpdated, 500)
	textCodeReference()
}

function bottomInfoUpdated() {
	window[bottomInfoFunction]()
}

function uploadLocalFrameImage(event) {
	var input = event.target
	var reader = new FileReader()
	reader.onload = function() {
		addUploadedFrameImage(reader.result)
	}
	reader.readAsDataURL(input.files[0])
}

function addUploadedFrameImage(imageSource) {
	frameImageList.push(new frameImage('custom', imageSource, 0, 0, 1, 1, maskNameList, frameImageList.length, 'frameClassCustom'))
}

function manaCostUpdated() {
	manaCostContext.clearRect(0, 0, cardWidth, cardHeight)
	var manaCostList = document.getElementById('inputManaCost').value.toLowerCase().replace(/{/g, ' ').replace(/}/g, ' ').split('/').join('').split(' ')
	var manaSymbolIndex = -1
	manaCostCanvas.fillStyle = 'black'
	if (manaCostDirection == 'reverse') {
		manaCostList.reverse()
	}
	for (var i = 0; i < manaCostList.length; i++) {
		if (manaSymbolCodeList.includes(manaCostList[i])) {
			manaSymbolIndex += 1
			var x = eval(manaCostXPath)
			var y = eval(manaCostYPath)
			var diameter = eval(manaCostDiameter)
			if (manaCostShadowOffset != 'none') {
				var shadowOffset = eval(manaCostShadowOffset)
				manaCostContext.beginPath()
				manaCostContext.arc(x + diameter / 2 + shadowOffset[0], y + diameter / 2 + shadowOffset[1], diameter / 2, 0, 2 * Math.PI)
				manaCostContext.fill()
			}
			manaCostContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(manaCostList[i])], x, y, diameter, diameter)
		}
	}
	drawCardObjects()
}



function watermarkUpdated() {
	if (document.getElementById('inputWatermarkPrimary').value != 'none') {
		watermarkContext.clearRect(0, 0, cardWidth, cardHeight)
		if (watermarkWidth / watermarkHeight < watermark.width / watermark.height) {
			watermarkDrawWidth = watermarkWidth
			watermarkDrawHeight = watermarkWidth / watermark.width * watermark.height
		} else {
			watermarkDrawHeight = watermarkHeight
			watermarkDrawWidth = watermarkHeight / watermark.height * watermark.width
		}
		watermarkDrawX = cardWidth / 2 - watermarkDrawWidth / 2
		watermarkDrawY = watermarkY - watermarkDrawHeight / 2
		watermarkContext.drawImage(watermark, watermarkDrawX, watermarkDrawY, watermarkDrawWidth, watermarkDrawHeight)
		watermarkContext.globalCompositeOperation = 'source-in'
		if (document.getElementById('inputWatermarkPrimary').value != 'default') {
			watermarkContext.fillStyle = document.getElementById('inputWatermarkPrimary').value
			watermarkContext.fillRect(0, 0, cardWidth, cardHeight)
		}
		if (document.getElementById('inputWatermarkSecondary').value != 'none') {
			watermarkContext.globalCompositeOperation = 'source-atop'
			tempContext.clearRect(0, 0, cardWidth, cardHeight)
			tempContext.drawImage(maskImageList[maskNameList.indexOf('Right Half')], 0, 0, cardWidth, cardHeight)
			tempContext.globalCompositeOperation = 'source-in'
			if (document.getElementById('inputWatermarkSecondary').value == 'default') {
				tempContext.drawImage(watermark, watermarkDrawX, watermarkDrawY, watermarkDrawWidth, watermarkDrawHeight)
			} else {
				tempContext.fillStyle = document.getElementById('inputWatermarkSecondary').value
				tempContext.fillRect(0, 0, cardWidth, cardHeight)
			}
			tempContext.globalCompositeOperation = 'source-over'
			watermarkContext.drawImage(tempCanvas, 0, 0, cardWidth, cardHeight)
		}
		watermarkContext.globalCompositeOperation = 'source-over'
	} else {
		watermarkContext.clearRect(0, 0, cardWidth, cardHeight)
	}
    drawCardObjects()
}

var savedImportResponse = ''
function inputCardNameTextImport(cardName) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            savedImportResponse = this.responseText.split('{"object":"card"')
            inputCardNameNumberTextImport(1)
            document.getElementById('inputCardNameNumberTextImport').max = savedImportResponse.length - 1
            document.getElementById('inputCardNameNumberTextImport').value = 1
        } else if (this.readyState == 4 && this.status == 404) {
            savedImportResponse = ''
            notify("Sorry, but we can't seem to find any card named '" + cardName + "'", '#ffffaae0')
        }
    }
    xhttp.open('GET', 'https://api.scryfall.com/cards/search?order=released&q=name%3D' + cardName.replace(/ /g, '+'), true)
    xhttp.send()
}
function inputCardNameNumberTextImport(index) {
    var importCardTextResponse = savedImportResponse[index]
    importText(beforeAfter(importCardTextResponse, '"name":"', '",'), 'Card Title')
    importText(beforeAfter(importCardTextResponse, '"type_line":"', '",'), 'Card Type')
    importText(beforeAfter(importCardTextResponse, '"oracle_text":"', '",').replace(/\\n/g, '\n').replace(/ \\"/g, ' \u201C').replace(/\\"/g, '\u201D').replace(/\(/g, '{i}(').replace(/\)/g, '){/i}'), 'Rules Text')
    if (importCardTextResponse.includes('"power":"')) {
        importText(beforeAfter(importCardTextResponse, '"power":"', '",') + '/' + beforeAfter(importCardTextResponse, '"toughness":"', '",'), 'Power/Toughness')
    } else {
        importText('', 'Power Toughness')
    }
    if (importCardTextResponse.includes('"loyalty":"') && currentVersion == 'planeswalker') {
        importText(beforeAfter(importCardTextResponse, '"loyalty":"', '",'), 'Loyalty')
        var abilityList = beforeAfter(importCardTextResponse, '"oracle_text":"', '",').replace(/ \\"/g, ' \u201C').replace(/\\"/g, '\u201D').split(/\\n/g)
        for (var i = 0; i < abilityList.length; i++) {
            if (abilityList[i].slice(0, 4).includes(':')) {
                importText(abilityList[i].split(/: (.+)?/)[1], 'Ability ' + (i+1))
                document.getElementById('inputPlaneswalker' + (i + 1) + 'Icon').value = abilityList[i].split(/: (.+)?/)[0]
            } else {
                importText('{left' + parseInt(scaleX(24/750)) + '}' + abilityList[i], 'Ability ' + (i+1))
                document.getElementById('inputPlaneswalker' + (i + 1) + 'Icon').value = ''
            }
            if (document.getElementById('inputPlaneswalker' + (i + 1)).value < 1) {
                document.getElementById('inputPlaneswalker' + (i + 1)).value = 1
            }
        }
        planeswalkerAbilities()
    }
    document.getElementById('inputManaCost').value = beforeAfter(importCardTextResponse, '"mana_cost":"', '",')
    document.getElementById('inputCardArtName').value = beforeAfter(importCardTextResponse, '"name":"', '",')
    document.getElementById('inputSetCode').value = beforeAfter(importCardTextResponse, '"set":"', '",')
    document.getElementById('inputSetRarity').value = beforeAfter(importCardTextResponse, '"rarity":"', '",')[0]
    setSymbolFromGatherer()
    // autoCrop(setSymbol, 'https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=' + document.getElementById('inputSetCode').value + '&size=large&rarity=' + document.getElementById('inputSetRarity').value)
    inputCardArtName(beforeAfter(importCardTextResponse, '"name":"', '",'))
    manaCostUpdated()
    drawCardText()
}
function importText(text, target) {
    for (var i = 0; i < cardTextList.length; i++) {
        if (cardTextList[i].name == target) {
        	cardTextList[i].text = text
        }
    }
    document.getElementById('textPicker').children[0].click()
    drawCardObjects()
}
function beforeAfter(targetString, beforeString, afterString) {
    if (targetString.includes(beforeString) && targetString.includes(afterString)) {
        return targetString.split(beforeString)[1].split(afterString)[0]
    } else {
        return ''
    }
}

function toggleTabs(clickedElement, targetId) {
	Array.from(clickedElement.parentElement.children).forEach(element => element.classList.remove('tabOptionSelected'))
	clickedElement.classList.add('tabOptionSelected')
	Array.from(document.getElementById(targetId).parentElement.children).forEach(element => element.classList.add('hidden'))
	document.getElementById(targetId).classList.remove('hidden')
}

function downloadCardImage(linkElement) {
	if (document.getElementById("inputInfoArtist").value.replace(/ /g, "") != "") {
		linkElement.download = cardTextList[0].text.toLowerCase().replace(/ /g, "_") + ".png"
		if (linkElement.download == ".png") {
			linkElement.download = "card.png"
		}
	} else {
		event.preventDefault()
		notify("You must properly credit an artist before downloading!", '#ffaaaae0')
	}
	var cardImageData = mainCanvas.toDataURL()
	if (cardImageData == undefined) {
		notify("Sorry, but it seems that you cannot download your card. Please try using a different browser/device.", '#ffffaae0')
	}
	linkElement.href = cardImageData
}

function hideFrameImages(frameClass) {
	Array.from(document.getElementById('framePicker').children).forEach(element => {
		if (!element.classList.contains(frameClass)) {
			element.classList.add('hidden')
		} else {
			element.classList.remove('hidden')
		}
	})
}

function autoCrop(targetImage, source = targetImage.src) {
	var autoCropImage = new Image()
	autoCropImage.crossOrigin = 'anonymous'
	autoCropImage.src = source
	autoCropImage.onload = function() {
		var width = this.width
		var height = this.height
		autoCropCanvas.width = width
		autoCropCanvas.height = height
		autoCropContext.drawImage(this, 0, 0,)
		var pixels = {x:[], y:[]}
		var imageData = autoCropContext.getImageData(0, 0, width, height)
		var x, y, index
		if (imageData.data.length > 4) {
			for (y = 0; y < height; y++) { //scans from left to right, top to bottom
				for (x = 0; x < width; x++) {
					index = (y * width + x) * 4 + 3 //calculuates the alpha value index
					if (imageData.data[index] > 0) {
						pixels.x.push(x)
						pixels.y.push(y) //stores visible pixel coordinates
					}
				}
			}
			pixels.x.sort(function(a, b){return a - b})
			pixels.y.sort(function(a, b){return a - b})
			var n = pixels.x.length - 1
			width = pixels.x[n] - pixels.x[0]
			height = pixels.y[n] - pixels.y[0]
			var cropped = autoCropContext.getImageData(pixels.x[0], pixels.y[0], width + 1, height + 1)
			autoCropCanvas.width = width + 1
			autoCropCanvas.height = height + 1
			autoCropContext.putImageData(cropped, 0, 0)
			setTimeout(function(){targetImage.src = autoCropCanvas.toDataURL()}, 100)
		}
	}
}

var textCodeReferenceArray = [
['Code', 'Result'],
['{linenospace}', 'Moves to the next line without an extra space'],
['{bar}', 'Moves to the next line and draws the flavor text bar'],
['{flavor}', 'Moves to the next line, draws the flavor text bar, and italicizes the text'],
['{i}', 'Italicizes the text'],
['{/i}', 'Removes italicization'],
['{fontsize#}', 'Changes the font size by # pixels'],
['{fontcolor#}', 'Changes the font color to #'],
['{left}', 'Aligns the text to the left'],
['{center}', 'Aligns the text to the center'],
['{right}', 'Aligns the text to the right'],
['{left#}', 'Shifts the following text # pixels to the left'],
['{right#}', 'Shifts the following text # pixels to the right'],
['{up#}', 'Shifts the following text # pixels up'],
['{down#}', 'Shifts the following text # pixels down'],
['{outline*,#}', 'Outlines the following text by # pixels in * color'],
['{shadow#}', 'Adds a shadow # pixels away from the following text']
]
function textCodeReference() {
	textCodeReferenceArray.forEach(item => document.getElementById('textCodeReference').innerHTML += '<div>' + item[0] + '</div><div>' + item[1] + '</div>')
}

function notify(message, color) {
	document.getElementsByClassName('notificationContainer')[0].innerHTML += `
	<div class='notification' style='background-color: ` + color + `'>
		<div>` + message + `</div>
		<div class='deleteNotification' onclick='this.parentElement.parentNode.removeChild(this.parentElement)'>X</div>
	</div>
	`
}//notify('MessageGoesHere', '#aaffaadd')

//Must run last:
initialize()

//Redundant
function loadScript(scriptPath){
  var script = document.createElement('script')
  script.setAttribute('type','text/javascript')
  script.setAttribute('src', scriptPath)
  if (typeof script != 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}