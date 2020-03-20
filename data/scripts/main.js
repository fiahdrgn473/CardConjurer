var cardMasterList = new Array()
var uniqueNumberTracker = 0
var frameImageList = new Array()
var maskImageList = new Array()
var maskNameList = new Array()
var canvasList = new Array()
var contextList = new Array()
var cardWidth = 1500, cardHeight = 2100
var loadedVersions = new Array()
var cardMaster = document.getElementById('cardMaster')
var selectedFrameImage
var selectedMaskImage = 0
var selectedCardMasterElement
var selectedTextObject
var cardTextList = new Array()

function newCanvas(name) {
	window[name + 'Canvas'] = document.createElement('canvas')
	window[name + 'Canvas'].width = cardWidth
	window[name + 'Canvas'].height = cardHeight
	canvasList.push(window[name + 'Canvas'])
	window[name + 'Context'] = window[name + 'Canvas'].getContext('2d')
	contextList.push(window[name + 'Context'])
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

var artWidth = cardWidth, artHeight = cardHeight
cardArt = new Image()
setSymbol = new Image()
watermark = new Image()
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
setSymbol.onload = function() {
	//updateSetSymbol()
}
watermark.onload = function() {
	//updateWatermark()
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
		console.log(this)
		mainContext.drawImage(this.whatToDraw, scaleX(this.x), scaleY(this.y), scaleX(this.width) * this.zoom, scaleY(this.height) * this.zoom)
	}
	cardMasterElement() {
		var temporaryElement = document.createElement('div')
		temporaryElement.id = 'uniqueNumber' + this.uniqueNumber
		temporaryElement.classList.add('cardMasterElement')
		temporaryElement.innerHTML = '<span class="handle">|||</span><div>' + this.name + '</div><span></span>'
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
		temporaryElement.innerHTML = '<span class="handle">|||</span><div>' + this.name + ' (' + this.masks.toString().replace(',', ', ') + ')</div><span class="delete" onclick="deleteCardObject(event)">X</span>'
		temporaryElement.onclick = function() {
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
	//draw art
	//collector's info function
	previewContext.drawImage(mainCanvas, 0, 0, previewCanvas.width, previewCanvas.height)
}

class frameImage {
	constructor(displayName = 'custom', imageSource = '', x = 0, y = 0, width = 1, height = 1, masks = [], frameImageListIndex) {
		this.name = displayName
		this.image = new Image()
		this.image.src = imageSource
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.masks = masks
		this.framePickerElement = document.createElement('div')
        this.framePickerElement.id = 'frameIndex' + frameImageListIndex
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
	} else {
		event.target.classList.add('maskOptionSelected')
	}
	selectedMaskImage = parseInt(event.target.id.replace('maskOption', ''))
}

function loadMaskImages(listOfMasks) {
	for (var i = 0; i < listOfMasks.length; i++) {
		var maskImage = new Image()
		maskImage.src = listOfMasks[i][1]
		maskImageList.push(maskImage)
		maskNameList.push(listOfMasks[i][0])
	}
}
function loadFrameImages(listOfFrames) {
	for (var i = 0; i < listOfFrames.length; i++) {
		frameImageList.push(new frameImage(...listOfFrames[i], frameImageList.length))
	}
}

//Loads up anything that uses Sortable.js
var sortable = Sortable.create(cardMaster, {animation: 150, ghostClass: 'cardMasterElementMoving', handle: '.handle'});

function deleteCardObject(event) {
	cardMaster.removeChild(document.getElementById('uniqueNumber' + parseInt(event.target.parentElement.id.replace('uniqueNumber', ''))))
	drawCardObjects()
}

function addSelectedFrame(additionalMasks = []) {
	var selectedFrameObject = frameImageList[selectedFrameImage]
	var masksToUse = additionalMasks
	masksToUse.unshift(maskNameList[selectedMaskImage])
	var objectToInsert = cardMasterList.push(new cardImage(selectedFrameObject.name, selectedFrameObject.image.src, selectedFrameObject.x, selectedFrameObject.y, selectedFrameObject.width, selectedFrameObject.height, 1, masksToUse, false))
	cardMaster.insertBefore(cardMasterList[objectToInsert - 1].cardMasterElement(), cardMaster.children[1])
	drawCardObjects()
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
}
function drawCardText() {
	textContext.clearRect(0, 0, cardWidth, cardHeight)
	writeText(cardTextList, textContext)
}
function writeText(textObjectList, targetContext) {
	var textCanvasBuffer = 100
	for (var i = 0; i < textObjectList.length; i++) {
		textLineContext.clearRect(0, 0, textLineCanvas.width, textLineCanvas.height)
		textParagraphContext.clearRect(0, 0, textParagraphCanvas.width, textParagraphCanvas.height)
		var textSize = scaleY(textObjectList[i].fontSize)
		textLineContext.font = textSize + 'px ' + textObjectList[i].font
		textLineContext.fillStyle = textObjectList[i].fontColor
		var textX = textCanvasBuffer
		var textY = 0
		var currentLineWidth = 0
		var textAlign = 'left'
		textLineContext.width = scaleX(textObjectList[i].width) + 2 * textCanvasBuffer
		textLineContext.height = textSize + 2 * textCanvasBuffer
		textParagraphContext.width = scaleX(textObjectList[i].width) + 2 * textCanvasBuffer
		textParagraphContext.height = scaleY(textObjectList[i].height) + 2 * textCanvasBuffer
		var mustFinishLine = false
		var splitText = textObjectList[i].text.replace(/\n/g, '{line}').replace(/{/g, 'fh48a3h2{').replace(/}/g, '}fh48a3h2').replace(/ /g, ' fh48a3h2').split('fh48a3h2')
		splitText.push('')
		for (var n = 0; n < splitText.length; n++) {
			if (splitText[n] != 0 || n == splitText.length - 1) {
				wordToWrite = ''
				if (splitText[n][0] == '{' && splitText[n][splitText[n].length - 1] == '}') {
					var possibleCodeLower = splitText[n].substr(1, splitText[n].length - 2).toLowerCase()
					if (possibleCodeLower == 'line') {

					} else if (possibleCodeLower == 'i') {

					} else {
						wordToWrite = splitText[n]
					}
				} else {
					wordToWrite = splitText[n]
				}
				if (wordToWrite != '' || n == splitText.length - 1) {
					var currentWordWidth = textLineContext.measureText(wordToWrite).width
					if (currentWordWidth + currentLineWidth > scaleX(textObjectList[i].width) || n == splitText.length - 1) {
						//finish the current line, draw to paragraph, clear
						var textAlignShift = 0
						if (textAlign == 'center') {
							textAlignShift = (scaleX(textObjectList[i].width) - currentLineWidth) / 2
						} else if (textAlign == 'right') {
							textAlignShift = scaleX(textObjectList[i].width) - currentLineWidth
						}
						textParagraphContext.drawImage(textLineCanvas, 0 + textAlignShift, textY)
						if (n != splitText.length - 1) {
							textLineContext.clearRect(0, 0, textLineCanvas.width, textLineCanvas.height)
							textX = textCanvasBuffer
							currentLineWidth = 0
							textY += textSize
						}
					}
					textLineContext.fillText(wordToWrite, textX, textCanvasBuffer + textSize)
					currentLineWidth += currentWordWidth
					textX += currentWordWidth
				}
			}
			if (n == splitText.length - 1) {
				targetContext.drawImage(textParagraphCanvas, scaleX(textObjectList[i].x) - textCanvasBuffer, scaleY(textObjectList[i].y) - textCanvasBuffer + (scaleY(textObjectList[i].height) - textY) / 2)
			}
		}
	}
	drawCardObjects()
}

function uploadImage(event, destination) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function() {
		var dataURL = reader.result;
		destination.src = dataURL;
	}
	reader.readAsDataURL(input.files[0]);
}

function cardArtUpdated() {
	cardMasterList[0].x = getFloat('inputCardArtX') / cardWidth
	cardMasterList[0].y = getFloat('inputCardArtY') / cardHeight
	cardMasterList[0].zoom = getFloat('inputCardArtZoom') / 100
	drawCardObjects()
}

//Must run last:
cardMasterList.push(new cardPlaceholder('Card Art Placeholder', cardArt))
cardMasterList.push(new cardPlaceholder('Text Placeholder', window['textCanvas']))
cardMaster.insertBefore(cardMasterList[0].cardMasterElement(), cardMaster.children[0])
cardMaster.insertBefore(cardMasterList[1].cardMasterElement(), cardMaster.children[0])
drawCardObjects()