//card object
var card = {width:1500, height:2100, marginX:0, marginY:0, frames:[], artSource:'/img/blank.png', artX:0, artY:0, artZoom:1, setSymbolSource:'/img/blank.png', setSymbolX:0, setSymbolY:0, setSymbolZoom:1, watermarkSource:'/img/blank.png', watermarkX:0, watermarkY:0, watermarkZoom:1, watermarkLeft:'none', watermarkRight:'none', watermarkOpacity:0.4, version:'', manaSymbols:[]};
//art
art = new Image();
art.src = '/img/blank.png';
art.crossOrigin = 'anonymous';
art.onerror = function() {this.src = '/img/blank.png';}
art.onload = artEdited;
//set symbol
setSymbol = new Image()
setSymbol.src = '/img/blank.png';
setSymbol.crossOrigin = 'anonymous';
setSymbol.onerror = function() {this.src = '/img/blank.png';}
setSymbol.onload = setSymbolEdited;
//watermark
watermark = new Image()
watermark.src = '/img/blank.png';
watermark.crossOrigin = 'anonymous';
watermark.onerror = function() {this.src = '/img/blank.png';}
watermark.onload = watermarkEdited;
//preview canvas
var previewCanvas = document.querySelector('#previewCanvas');
var previewContext = previewCanvas.getContext('2d');
var canvasList = [];
//frame/mask picker stuff
var availableFrames = [];
var selectedFrameIndex = 0;
var selectedMaskIndex = 0;
var selectedTextIndex = 0;
//core images/masks
const black = new Image(); black.src = '/img/black.png';
const blank = new Image(); blank.src = '/img/blank.png';
const right = new Image(); right.src = '/img/frames/maskRightHalf.png';
const middle = new Image(); middle.src = '/img/frames/maskMiddleThird.png';
const corner = new Image(); corner.src = '/img/frames/cornerCutout.png';
//for imports
var scryfallArt;
var scryfallCard;
//for text
var savedTextXPosition = 0;
//for misc
var date = new Date();
//to avoid rerunning special scripts (planeswalker, saga, etc...)
var loadedVersions = [];
//Card Object managament
async function resetCardIrregularities({canvas = [1500, 2100, 0, 0], resetOthers = true} = {}) {
	//rotation
	if (card.landscape) {
		previewContext.scale(5/7, 7/5);
		previewContext.rotate(Math.PI / 2);
		previewContext.translate(0, -card.width / 2);
		card.landscape = false;
	}
	//card size
	card.width = canvas[0];
	card.height = canvas[1];
	card.marginX = canvas[2];
	card.marginY = canvas[3];
	//canvases
	canvasList.forEach(name => {
		if (window[name + 'Canvas'].width != card.width * (1 + card.marginX) || window[name + 'Canvas'].height != card.height * (1 + card.marginY)) {
			sizeCanvas(name);
		}
	});
	if (resetOthers) {
		//bottom info
		await loadBottomInfo({
			midLeft: {text:'{elemidinfo-set}*{elemidinfo-language}  {savex}{fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{elemidinfo-artist}', x:0.0647, y:0.9548, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
			topLeft: {text:'{elemidinfo-number}{loadx}{elemidinfo-rarity}', x:0.0647, y:0.9377, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
			bottomLeft: {text:'NOT FOR SALE', x:0.0647, y:0.9719, width:0.8707, height:0.0143, oneLine:true, font:'gothammedium', size:0.0143, color:'white', outlineWidth:0.003},
			wizards: {text:'{ptshift0,0.0172}\u2122 & \u00a9 ' + date.getFullYear() + ' Wizards of the Coast', x:0.0647, y:0.9377, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003},
			bottomRight: {text:'{ptshift0,0.0172}CardConjurer.com', x:0.0647, y:0.9548, width:0.8707, height:0.0143, oneLine:true, font:'mplantin', size:0.0143, color:'white', align:'right', outlineWidth:0.003}
		});
		//onload
		card.onload = null;
	}
}
//Canvas management
function sizeCanvas(name, width = Math.round(card.width * (1 + 2 * card.marginX)), height = Math.round(card.height * (1 + 2 * card.marginY))) {
	if (!window[name + 'Canvas']) {
		window[name + 'Canvas'] = document.createElement('canvas');
		window[name + 'Context'] = window[name + 'Canvas'].getContext('2d');
		canvasList[canvasList.length] = name;
	}
	window[name + 'Canvas'].width = width;
	window[name + 'Canvas'].height = height;
	// var label = document.createElement('p');
	// label.innerHTML = name;
	// window[name + 'Canvas'].style = 'width: 20rem; height: 28rem; border: 1px solid red;';
	// document.body.appendChild(window[name + 'Canvas']);
	// document.body.appendChild(label);
}
//create main canvases
sizeCanvas('card');
sizeCanvas('frame');
sizeCanvas('frameMasking');
sizeCanvas('text');
sizeCanvas('paragraph');
sizeCanvas('line');
sizeCanvas('watermark');
sizeCanvas('bottomInfo');
//Scaling
function scaleX(input) {
	return Math.round((input + card.marginX) * card.width);
}
function scaleWidth(input) {
	return Math.round(input * card.width);
}
function scaleY(input) {
	return Math.round((input + card.marginY) * card.height);
}
function scaleHeight(input) {
	return Math.round(input * card.height);
}
//Other nifty functions
function getElementIndex(element) {
	return Array.prototype.indexOf.call(element.parentElement.children, element);
}
//UI
function toggleCreatorTabs(event, target) {
	Array.from(document.querySelector('#creator-menu-sections').children).forEach(element => element.classList.add('hidden'));
	document.querySelector('#creator-menu-' + target).classList.remove('hidden');
	selectSelectable(event);
}
function selectSelectable(event) {
	var eventTarget = event.target.closest('.selectable');
	Array.from(eventTarget.parentElement.children).forEach(element => element.classList.remove('selected'));
	eventTarget.classList.add('selected');
}
function dragStart(event) {
	event.target.closest('.draggable').classList.add('dragging');
}
function dragEnd(event) {
	Array.from(document.querySelectorAll('.dragging')).forEach(element => element.classList.remove('dragging'));
}
function dragOver(event) {
	var eventTarget = event.target.closest('.draggable');
	var movingElement = document.querySelector('.dragging');
	if (document.querySelector('.dragging') && !eventTarget.classList.contains('dragging') && eventTarget.parentElement == movingElement.parentElement) {
		var parentElement = eventTarget.parentElement;
		var elements = document.createDocumentFragment();
		var movingElementPassed = false;
		var movingElementOldIndex = -1;
		var movingElementNewIndex = -1;
		Array.from(parentElement.children).forEach((element, index) => {
			if (element == eventTarget) {
				movingElementNewIndex = index;
				if(movingElementPassed) {
					elements.appendChild(element.cloneNode(true));
					elements.appendChild(movingElement.cloneNode(true));
				} else {
					elements.appendChild(movingElement.cloneNode(true));
					elements.appendChild(element.cloneNode(true));
				}
			} else if(element != movingElement) {
				elements.appendChild(element.cloneNode(true));
			} else {
				movingElementOldIndex = index;
				movingElementPassed = true;
			}
		});
		Array.from(elements.children).forEach(element => {
			element.ondragstart = dragStart;
			element.ondragend = dragEnd;
			element.ondragover = dragOver;
			element.onclick = frameElementClicked;
			element.children[3].onclick = removeFrame;
		})
		parentElement.innerHTML = null;
		parentElement.appendChild(elements);
		if (movingElementNewIndex >= 0) {
			var originalMovingElement = card.frames[movingElementOldIndex];
			card.frames.splice(movingElementOldIndex, 1);
			card.frames.splice(movingElementNewIndex, 0, originalMovingElement);
			drawFrames();
		}
	}
}
function toggleCollapse(event) {
	event.target.closest('.collapsible').classList.toggle('collapsed');
}
//Mana Symbols
var manaSymbols = [];
loadManaSymbols(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 'w', 'u', 'b', 'r', 'g', 'c', 'x', 'y', 'z', 't', 'untap', 'e', 'snow', 'chaos']);
loadManaSymbols(['wu', 'wb', 'ub', 'ur', 'br', 'bg', 'rg', 'rw', 'gw', 'gu', '2w', '2u', '2b', '2r', '2g', 'wp', 'up', 'bp', 'rp', 'gp'], [1.2, 1.2]);
loadManaSymbols(['bar.png', 'whitebar.png']);
loadManaSymbols(['chaos'], [1, 10.2]);
function loadManaSymbols(manaSymbolPaths, size = [1, 1]) {
	manaSymbolPaths.forEach(item => {
		var manaSymbol = {};
		manaSymbol.name = item.split('.')[0];
		if (manaSymbol.name.includes('/')) {
			manaSymbol.name = manaSymbol.name.split('/')[1];
		}
		manaSymbol.width = size[0];
		manaSymbol.height = size[1];
		manaSymbol.image = new Image();
		var manaSymbolPath = '/img/manaSymbols/' + item;
		if (!manaSymbolPath.includes('.png')) {
			manaSymbolPath += '.svg';
		}
		manaSymbol.image.src = manaSymbolPath;
		manaSymbols.push(manaSymbol);
	});
}
function findManaSymbolIndex(string) {
	return manaSymbols.findIndex(element => element.name == string);
}
//FRAME TAB
function drawFrames() {
	frameContext.clearRect(0, 0, frameCanvas.width, frameCanvas.height);
	var frameToDraw = card.frames.slice().reverse();
	frameToDraw.forEach(item => {
		if (item.image) {
			frameContext.globalCompositeOperation = item.mode || 'source-over';
			frameContext.globalAlpha = item.opacity / 100 || 1;
			if (item.opacity == 0) {
				frameContext.globalAlpha = 0;
			}
			var bounds = item.bounds || {};
			frameX = Math.round(scaleX(bounds.x || 0));
			frameY = Math.round(scaleY(bounds.y || 0));
			frameWidth = Math.round(scaleWidth(bounds.width || 1));
			frameHeight = Math.round(scaleHeight(bounds.height || 1));
			frameMaskingContext.globalCompositeOperation = 'source-over';
			frameMaskingContext.drawImage(black, 0, 0, frameMaskingCanvas.width, frameMaskingCanvas.height);
			frameMaskingContext.globalCompositeOperation = 'source-in';
			item.masks.forEach(mask => frameMaskingContext.drawImage(mask.image, scaleX(0), scaleY(0), scaleWidth(1), scaleHeight(1)));
			frameMaskingContext.drawImage(item.image, frameX, frameY, frameWidth, frameHeight);
			if (item.erase) {frameContext.globalCompositeOperation = 'destination-out';}
			frameContext.drawImage(frameMaskingCanvas, 0, 0, frameCanvas.width, frameCanvas.height);
		}
	});
	drawCard();
}
function loadFramePacks(framePackOptions = []) {
	document.querySelector('#selectFramePack').innerHTML = null;
	framePackOptions.forEach(item => {
		var framePackOption = document.createElement('option');
		framePackOption.innerHTML = item.name;
		if (item.value == 'disabled') {
			framePackOption.disabled = true;
		} else {
			framePackOption.value = item.value;
		}
		document.querySelector('#selectFramePack').appendChild(framePackOption);
	});
	loadScript("/js/frames/pack" + document.querySelector('#selectFramePack').value + ".js");
}
function loadFramePack(frameOptions = availableFrames) {
	document.querySelector('#frame-picker').innerHTML = null;
	frameOptions.forEach(item => {
		var frameOption = document.createElement('div');
		frameOption.classList = 'frame-option hidden';
		frameOption.onclick = frameOptionClicked;
		var frameOptionImage = document.createElement('img');
		frameOption.appendChild(frameOptionImage);
		frameOptionImage.onload = function() {
			this.parentElement.classList.remove('hidden');
		}
		if (!item.noThumb && !item.src.includes('/img/black.png')) {
			frameOptionImage.src = item.src.replace('.png', 'Thumb.png');
		} else {
			frameOptionImage.src = item.src;
		}
		document.querySelector('#frame-picker').appendChild(frameOption);

	})
	document.querySelector('#frame-picker').children[0].click();
}
function frameOptionClicked(event) {
	var clickedFrameOption = event.target.closest('.frame-option');
	if (document.querySelector('.frame-option.selected')) {
		document.querySelector('.frame-option.selected').classList.remove('selected');
	}
	clickedFrameOption.classList.add('selected');
	selectedFrameIndex = getElementIndex(clickedFrameOption);
	document.querySelector('#mask-picker').innerHTML = '<div class="mask-option selected" onclick="maskOptionClicked(event)"><img src="/img/black.png"><p>No Mask</p></div>';
	selectedMaskIndex = 0;
	document.querySelector('#selectedPreview').innerHTML = '(Selected: ' + availableFrames[selectedFrameIndex].name + ', No Mask)';
	if (availableFrames[selectedFrameIndex].masks) {
		availableFrames[selectedFrameIndex].masks.forEach(item => {
			var maskOption = document.createElement('div');
			maskOption.classList = 'mask-option hidden';
			maskOption.onclick = maskOptionClicked;
			var maskOptionImage = document.createElement('img');
			maskOption.appendChild(maskOptionImage);
			maskOptionImage.onload = function() {
				this.parentElement.classList.remove('hidden');
			}
			maskOptionImage.src = item.src.replace('.png', 'Thumb.png');
			maskOptionLabel = document.createElement('p');
			maskOptionLabel.innerHTML = item.name;
			maskOption.appendChild(maskOptionLabel);
			document.querySelector('#mask-picker').appendChild(maskOption);
		});
	}
}
function maskOptionClicked(event) {
	var clickedMaskOption = event.target.closest('.mask-option');
	document.querySelector('.mask-option.selected').classList.remove('selected');
	clickedMaskOption.classList.add('selected');
	selectedMaskIndex = getElementIndex(clickedMaskOption);
	var selectedMaskName = 'No Mask'
	if (selectedMaskIndex > 0) {selectedMaskName = availableFrames[selectedFrameIndex].masks[selectedMaskIndex - 1].name;}
	document.querySelector('#selectedPreview').innerHTML = '(Selected: ' + availableFrames[selectedFrameIndex].name + ', ' + selectedMaskName + ')';
}
function addFrame(additionalMasks = [], loadingFrame = false) {
	var frameToAdd = JSON.parse(JSON.stringify(availableFrames[selectedFrameIndex]));
	var maskThumbnail = true;
	if (!loadingFrame) {
		if (frameToAdd.masks && selectedMaskIndex > 0) {
			frameToAdd.masks = frameToAdd.masks.slice(selectedMaskIndex - 1, selectedMaskIndex);
		} else {
		 	frameToAdd.masks = [];
		 	maskThumbnail = false;
		}
		additionalMasks.forEach(item => frameToAdd.masks.push(item));
	} else {
		frameToAdd = loadingFrame;
		if (frameToAdd.masks.length == 0 || (frameToAdd.masks[0].src.includes('/img/frames/mask'))) {
			maskThumbnail = false;
		}
	}
	frameToAdd.masks.forEach(item => {
		item.image = new Image();
		item.image.src = '/img/blank.png';
		item.image.onload = drawFrames;
		item.image.src = item.src;
	});
	frameToAdd.image = new Image();
	if (frameToAdd.name == 'Uploaded Image') {
		frameToAdd.image.crossOrigin = 'anonymous'
	}
	frameToAdd.image.src = '/img/blank.png';
	frameToAdd.image.onload = drawFrames;
	frameToAdd.image.src = frameToAdd.src;
	if (!loadingFrame) {
		card.frames.unshift(frameToAdd);
	}
	var frameElement = document.createElement('div');
	frameElement.classList = 'draggable frame-element';
	frameElement.draggable = 'true';
	frameElement.ondragstart = dragStart;
	frameElement.ondragend = dragEnd;
	frameElement.ondragover = dragOver;
	frameElement.onclick = frameElementClicked;
	var frameElementImage = document.createElement('img');
	if (frameToAdd.noThumb || frameToAdd.src.includes('/img/black.png')) {
		frameElementImage.src = frameToAdd.src;
	} else {
		frameElementImage.src = frameToAdd.src.replace('.png', 'Thumb.png');
	}
	frameElement.appendChild(frameElementImage);
	var frameElementMask = document.createElement('img');
	if (maskThumbnail) {
		frameElementMask.src = frameToAdd.masks[0].src.replace('.png', 'Thumb.png');
	} else {
		frameElementMask.src = '/img/black.png';
	}
	frameElement.appendChild(frameElementMask);
	var frameElementLabel = document.createElement('h4');
	frameElementLabel.innerHTML = frameToAdd.name;
	frameToAdd.masks.forEach(item => frameElementLabel.innerHTML += ', ' + item.name);
	frameElement.appendChild(frameElementLabel);
	var frameElementClose = document.createElement('h4');
	frameElementClose.innerHTML = 'X';
	frameElementClose.classList = 'frame-element-close';
	frameElementClose.onclick = removeFrame;
	frameElement.appendChild(frameElementClose);
	document.querySelector('#frame-list').prepend(frameElement);
	bottomInfoEdited();
}
function removeFrame(event) {
	card.frames.splice(getElementIndex(event.target.parentElement), 1);
	event.target.parentElement.remove();
	drawFrames();
	bottomInfoEdited();
}
function frameElementClicked(event) {
	if (!event.target.classList.contains('frame-element-close')) {
		var selectedFrameElement = event.target.closest('.frame-element');
		var selectedFrame = card.frames[Array.from(selectedFrameElement.parentElement.children).indexOf(selectedFrameElement)];
		document.querySelector('#frame-element-editor').classList.add('opened');
		selectedFrame.bounds = selectedFrame.bounds || {};
		document.querySelector('#frame-editor-x').value = scaleWidth(selectedFrame.bounds.x || 0);
		document.querySelector('#frame-editor-x').onchange = (event) => {selectedFrame.bounds.x = (event.target.value / card.width); drawFrames();}
		document.querySelector('#frame-editor-y').value = scaleHeight(selectedFrame.bounds.y || 0);
		document.querySelector('#frame-editor-y').onchange = (event) => {selectedFrame.bounds.y = (event.target.value / card.height); drawFrames();}
		document.querySelector('#frame-editor-width').value = scaleWidth(selectedFrame.bounds.width || 1);
		document.querySelector('#frame-editor-width').onchange = (event) => {selectedFrame.bounds.width = (event.target.value / card.width); drawFrames();}
		document.querySelector('#frame-editor-height').value = scaleHeight(selectedFrame.bounds.height || 1);
		document.querySelector('#frame-editor-height').onchange = (event) => {selectedFrame.bounds.height = (event.target.value / card.height); drawFrames();}
		document.querySelector('#frame-editor-opacity').value = selectedFrame.opacity || 100;
		document.querySelector('#frame-editor-opacity').onchange = (event) => {selectedFrame.opacity = event.target.value; drawFrames();}
		document.querySelector('#frame-editor-erase').checked = selectedFrame.erase || false;
		document.querySelector('#frame-editor-erase').onchange = (event) => {selectedFrame.erase = event.target.checked; drawFrames();}
	}
}
function uploadFrameOption(imageSource) {
	var uploadedFrame = {name:'Uploaded Image', src:imageSource, noThumb:true}
	availableFrames.push(uploadedFrame);
	loadFramePack();
}
//TEXT TAB
var writingText;
function loadTextOptions(textObject) {
	var oldCardText = card.text || {};
	card.text = textObject;
	document.querySelector('#text-options').innerHTML = null;
	Object.entries(card.text).forEach(item => {
		if (oldCardText[item[0]]) {
			card.text[item[0]].text = oldCardText[item[0]].text;
		}
		var textOptionElement = document.createElement('h4');
		textOptionElement.innerHTML = item[1].name;
		textOptionElement.classList = 'selectable text-option'
		textOptionElement.onclick = textOptionClicked;
		document.querySelector('#text-options').appendChild(textOptionElement);
	});
	document.querySelector('#text-options').firstChild.click();
	drawTextBuffer();
}
function textOptionClicked(event) {
	selectedTextIndex = getElementIndex(event.target);
	document.querySelector('#text-editor').value = Object.entries(card.text)[selectedTextIndex][1].text;
	selectSelectable(event);
}
function textEdited() {
	card.text[Object.keys(card.text)[selectedTextIndex]].text = document.querySelector('#text-editor').value;
	drawTextBuffer();
}
function drawTextBuffer() {
	clearTimeout(writingText);
	writingText = setTimeout(drawText, 500);
}
async function drawText() {
	textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
	for (var textObject of Object.entries(card.text)) {
		await writeText(textObject[1], textContext);
		continue;
	}
	drawCard();
}
function writeText(textObject, targetContext) {
	//Most bits of info about text loaded, with defaults when needed
	var textX = scaleX(textObject.x) || scaleX(0);
	var textY = scaleY(textObject.y) || scaleY(0);
	var textWidth = scaleWidth(textObject.width) || scaleWidth(1);
	var textHeight = scaleHeight(textObject.height) || scaleHeight(1);
	var startingTextSize = scaleHeight(textObject.size) || scaleHeight(0.038);
	var textFontHeightRatio = 0.7;
	var textBounded = textObject.bounded || true;
	var textOneLine = textObject.oneLine || false;
	var textManaCost = textObject.manaCost || false;
	var textManaSpacing = scaleWidth(textObject.manaSpacing) || 0;
	//Buffers the canvases accordingly
	var canvasMargin = 300;
	paragraphCanvas.width = textWidth + 2 * canvasMargin;
	paragraphCanvas.height = textHeight + 2 * canvasMargin;
	lineCanvas.width = textWidth + 2 * canvasMargin;
	lineCanvas.height = startingTextSize + 2 * canvasMargin;
	//Preps the text string
	var splitString = '6GJt7eL8';
	var splitText = textObject.text.replace(/\n/g, '{line}').replace('{flavor}', '{lns}{bar}{lns}{i}').replace(/{/g, splitString + '{').replace(/}/g, '}' + splitString).replace(/ /g, splitString + ' ' + splitString).split(splitString);
	splitText = splitText.filter(item => item);
	splitText.push('');
	//Manages the redraw loop
	var drawingText = true;
	//Repeatedly tries to draw the text at smaller and smaller sizes until it fits
	outerloop: while (drawingText) {
		//Rest of the text info loaded that may have been changed by a previous attempt at drawing the text
		var textColor = textObject.color || 'black';
		var textFont = textObject.font || 'mplantin';
		var textAlign = textObject.align || 'left';
		var textShadowColor = textObject.shadow || 'black';
		var textShadowOffsetX = scaleWidth(textObject.shadowX) || 0;
		var textShadowOffsetY = scaleHeight(textObject.shadowY) || 0;
		var textShadowBlur = scaleHeight(textObject.shadowBlur) || 0;
		//Variables for tracking text position/size/font
		var currentX = 0;
		var startingCurrentX = 0;
		var currentY = 0;
		var lineY = 0;
		var newLine = false;
		var textFontExtension = '';
		var textFontStyle = textObject.fontStyle || '';
		var manaPlacementCounter = 0;
		//variables that track various... things?
		var newLineSpacing = 0;
		var textSize = startingTextSize;
		var ptShift = [0, 0];
		var permaShift = [0, 0];
		//Finish prepping canvases
		paragraphContext.clearRect(0, 0, paragraphCanvas.width, paragraphCanvas.height);
		lineContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
		lineContext.font = textFontStyle + textSize + 'px ' + textFont + textFontExtension;
		lineContext.fillStyle = textColor;
		lineContext.shadowColor = textShadowColor;
		lineContext.shadowOffsetX = textShadowOffsetX;
		lineContext.shadowOffsetY = textShadowOffsetY;
		lineContext.shadowBlur = textShadowBlur;
		lineContext.strokeStyle = textObject.outlineColor || 'black';
		var textOutlineWidth = scaleHeight(textObject.outlineWidth) || 0;
		lineContext.lineWidth = textOutlineWidth;
		//Begin looping through words/codes
		innerloop: for (word of splitText) {
			var wordToWrite = word;
			if (wordToWrite.includes('{') && wordToWrite.includes('}') || textManaCost) {
				var possibleCode = wordToWrite.toLowerCase().replace('{', '').replace('}', '');
				wordToWrite = null;
				if (possibleCode == 'line') {
					newLine = true;
					newLineSpacing = textSize * 0.35;
				} else if (possibleCode == 'lns' || possibleCode == 'linenospace') {
					newLine = true;
				} else if (possibleCode == 'bar') {
					var barWidth = textWidth * 0.95;
					var barHeight = scaleHeight(0.002);
					var barImageName = 'bar';
					if (textColor == 'white') {
						barImageName = 'whitebar';
					}
					lineContext.drawImage(manaSymbols[findManaSymbolIndex(barImageName)].image, canvasMargin + (textWidth - barWidth) / 2, canvasMargin + 0.45 * textSize, barWidth, barHeight);
				} else if (possibleCode == 'i') {
					if (textFont == 'mplantin') {
						textFontExtension = 'i';
						textFontStyle = '';
					} else {
						textFontExtension = '';
						textFontStyle = 'italic ';
					}
					lineContext.font = textFontStyle + textSize + 'px ' + textFont + textFontExtension;
				} else if (possibleCode == '/i') {
					textFontExtension = '';
					textFontStyle = '';
					lineContext.font = textFontStyle + textSize + 'px ' + textFont + textFontExtension;
				} else if (possibleCode == 'left') {
					textAlign = 'left';
				} else if (possibleCode == 'center') {
					textAlign = 'center';
				} else if (possibleCode == 'right') {
					textAlign = 'right';
				} else if (possibleCode.includes('fontcolor')) {
					textColor = possibleCode.replace('fontcolor', '');
					lineContext.fillStyle = textColor;
				} else if (possibleCode.includes('fontsize')) {
					textSize += parseInt(possibleCode.replace('fontsize', '')) || 0;
					lineContext.font = textFontStyle + textSize + 'px ' + textFont + textFontExtension;
				} else if (possibleCode.includes('font')) {
					textFont = word.replace('{font', '').replace('}', '');
					textFontExtension = '';
					textFontStyle = '';
					lineContext.font = textFontStyle + textSize + 'px ' + textFont + textFontExtension;
				} else if (possibleCode.includes('outlinecolor')) {
					lineContext.strokeStyle = possibleCode.replace('outlinecolor', '');
				} else if (possibleCode.includes('outline')) {
					textOutlineWidth = parseInt(possibleCode.replace('outline', ''));
					lineContext.lineWidth = textOutlineWidth;
				} else if (possibleCode.includes('upinline')) {
					lineY -= parseInt(possibleCode.replace('upinline', '')) || 0;
				} else if (possibleCode.includes('up') && possibleCode != 'up') {
					currentY -= parseInt(possibleCode.replace('up', '')) || 0;
				} else if (possibleCode.includes('down')) {
					currentY += parseInt(possibleCode.replace('down', '')) || 0;
				} else if (possibleCode.includes('left')) {
					currentX -= parseInt(possibleCode.replace('left', '')) || 0;
				} else if (possibleCode.includes('right')) {
					currentX += parseInt(possibleCode.replace('right', '')) || 0;
				} else if (possibleCode.includes('shadow')) {
					if (possibleCode.includes('color')) {
						textShadowColor = possibleCode.replace('shadowcolor', '');
						lineContext.shadowColor = textShadowColor;
					} else if (possibleCode.includes('blur')) {
						textShadowBlur = parseInt(possibleCode.replace('shadowblur', '')) || 0;
						lineContext.shadowBlur = textShadowBlur
					} else if (possibleCode.includes('shadowx')) {
						textShadowOffsetX = parseInt(possibleCode.replace('shadowx', '')) || 0;
						lineContext.shadowOffsetX = textShadowOffsetX;
					} else if (possibleCode.includes('shadowy')) {
						textShadowOffsetY = parseInt(possibleCode.replace('shadowy', '')) || 0;
						lineContext.shadowOffsetY = textShadowOffsetY;
					} else {
						textShadowOffsetX = parseInt(possibleCode.replace('shadow', '')) || 0;
						textShadowOffsetY = textShadowOffsetX;
						lineContext.shadowOffsetX = textShadowOffsetX;
						lineContext.shadowOffsetY = textShadowOffsetY;
					}
				} else if (possibleCode == 'planechase') {
					var planechaseHeight = textSize * 1.8;
					lineContext.drawImage(manaSymbols[findManaSymbolIndex('chaos')].image, currentX + canvasMargin, canvasMargin, planechaseHeight * 1.2, planechaseHeight);
					currentX += planechaseHeight * 1.3;
					startingCurrentX += planechaseHeight * 1.3;
				} else if (possibleCode.includes('elemid')) {
					if (document.querySelector('#' + word.replace('{elemid', '').replace('}', ''))) {
						wordToWrite = document.querySelector('#' + word.replace('{elemid', '').replace('}', '')).value || '';
					}
				} else if (possibleCode == 'savex') {
					savedTextXPosition = currentX;
				} else if (possibleCode == 'loadx') {
					if (savedTextXPosition > currentX) {
						currentX = savedTextXPosition;
					}
				} else if (possibleCode.includes('ptshift')) {
					if (card.frames.findIndex(element => element.name.toLowerCase().includes('power/toughness')) >= 0 || card.version.includes('planeswalker') || card.version.includes('commanderLegends')) {
						ptShift[0] = scaleWidth(parseFloat(possibleCode.replace('ptshift', '').split(',')[0]));
						ptShift[1] = scaleHeight(parseFloat(possibleCode.split(',')[1]));
					}
				} else if (possibleCode.includes('permashift')) {
					permaShift = [parseFloat(possibleCode.replace('permashift', '').split(',')[0]), parseFloat(possibleCode.split(',')[1])];
				} else if (findManaSymbolIndex(possibleCode.replace('/', '')) > -1 || findManaSymbolIndex(possibleCode.replace('/', '').split('').reverse().join('')) > -1) {
					var manaSymbol = manaSymbols[findManaSymbolIndex(possibleCode.replace('/', ''))] || manaSymbols[findManaSymbolIndex(possibleCode.replace('/', '').split('').reverse().join(''))];
					var manaSymbolSpacing = textSize * 0.04 + textManaSpacing;
					var manaSymbolWidth = manaSymbol.width * textSize * 0.78;
					var manaSymbolHeight = manaSymbol.height * textSize * 0.78;
					var manaSymbolX = currentX + canvasMargin + manaSymbolSpacing;
					var manaSymbolY = canvasMargin + textSize * 0.34 - manaSymbolHeight / 2;
					if (textObject.manaPlacement) {
						manaSymbolX = scaleX(textObject.manaPlacement.x[manaPlacementCounter] || 0) + canvasMargin;
						manaSymbolY = canvasMargin;
						currentY = scaleY(textObject.manaPlacement.y[manaPlacementCounter] || 0);
						manaPlacementCounter ++;
						newLine = true;
					}
					lineContext.drawImage(manaSymbol.image, manaSymbolX, manaSymbolY, manaSymbolWidth, manaSymbolHeight);
					currentX += manaSymbolWidth + manaSymbolSpacing * 2;
				} else {
					wordToWrite = word;
				}
			}
			if (wordToWrite && lineContext.measureText(wordToWrite).width + currentX >= textWidth) {
				if (textOneLine && startingTextSize > 1) {
					//doesn't fit... try again at a smaller text size?
					startingTextSize -= 1;
					continue outerloop;
				}
				newLine = true;
			}
			if ((newLine && !textOneLine) || splitText.indexOf(word) == splitText.length - 1) {
				var horizontalAdjust = 0
				if (textAlign == 'center') {
					horizontalAdjust = (textWidth - currentX) / 2;
				} else if (textAlign == 'right') {
					horizontalAdjust = textWidth - currentX;
				}
				paragraphContext.drawImage(lineCanvas, horizontalAdjust, currentY);
				lineY = 0;
				lineContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
				currentX = startingCurrentX;
				currentY += textSize + newLineSpacing;
				newLineSpacing = 0;
				newLine = false;
			}
			if (wordToWrite && (currentX != 0 || wordToWrite != ' ') && !textManaCost) {
				if (textOutlineWidth >= 1) {
					lineContext.strokeText(wordToWrite, currentX + canvasMargin, canvasMargin + textSize * textFontHeightRatio + lineY);
				}
				lineContext.fillText(wordToWrite, currentX + canvasMargin, canvasMargin + textSize * textFontHeightRatio + lineY);
				currentX += lineContext.measureText(wordToWrite).width;
			}
			if (currentY > textHeight && textBounded && !textOneLine && startingTextSize > 1) {
				//doesn't fit... try again at a smaller text size?
				startingTextSize -= 1;
				continue outerloop;
			}
			if (splitText.indexOf(word) == splitText.length - 1) {
				//should manage vertical centering here
				var verticalAdjust = 0;
				if (!textObject.noVerticalCenter) {
					verticalAdjust = (textHeight - currentY + textSize * 0.15) / 2;
				}
				targetContext.drawImage(paragraphCanvas, textX - canvasMargin + ptShift[0] + permaShift[0], textY - canvasMargin + verticalAdjust + ptShift[1] + permaShift[1]);
				drawingText = false;
			}
		}
	}
}
//ART TAB
function uploadArt(imageSource, otherParams) {
	art.src = imageSource;
	if (otherParams && otherParams == 'autoFit') {
		art.onload = function() {
			autoFitArt();
			art.onload = artEdited;
		};
	}
}
function artEdited() {
	card.artSource = art.src;
	card.artX = document.querySelector('#art-x').value / card.width;
	card.artY = document.querySelector('#art-y').value / card.height;
	card.artZoom = document.querySelector('#art-zoom').value / 100;
	drawCard();
}
function autoFitArt() {
	if (art.width / art.height > scaleWidth(card.artBounds.width) / scaleHeight(card.artBounds.height)) {
		document.querySelector('#art-y').value = Math.round(scaleY(card.artBounds.y) - scaleHeight(card.marginY));
		document.querySelector('#art-zoom').value = (scaleHeight(card.artBounds.height) / art.height * 100).toFixed(1);
		document.querySelector('#art-x').value = Math.round(scaleX(card.artBounds.x) - (document.querySelector('#art-zoom').value / 100 * art.width - scaleWidth(card.artBounds.width)) / 2 - scaleWidth(card.marginX));
	} else {
		document.querySelector('#art-x').value = Math.round(scaleX(card.artBounds.x) - scaleWidth(card.marginX));
		document.querySelector('#art-zoom').value = (scaleWidth(card.artBounds.width) / art.width * 100).toFixed(1);
		document.querySelector('#art-y').value = Math.round(scaleY(card.artBounds.y) - (document.querySelector('#art-zoom').value / 100 * art.height - scaleHeight(card.artBounds.height)) / 2 - scaleHeight(card.marginY));
	}
	artEdited();
}
function artFromScryfall(scryfallResponse) {
	scryfallArt = scryfallResponse.data;
	document.querySelector('#art-index').value = 1;
	document.querySelector('#art-index').max = scryfallArt.length;
	changeArtIndex();
}
function changeArtIndex() {
	imageURL(scryfallArt[document.querySelector('#art-index').value - 1].image_uris.art_crop, uploadArt, "autoFit");
	artistEdited(scryfallArt[document.querySelector('#art-index').value - 1].artist);
}
//SET SYMBOL TAB
function uploadSetSymbol(imageSource, otherParams) {
	setSymbol.src = imageSource;
	if (otherParams && otherParams == 'resetSetSymbol') {
		setSymbol.onload = function() {
			resetSetSymbol();
			setSymbol.onload = setSymbolEdited;
		};
	}
}
function setSymbolEdited() {
	card.setSymbolSource = setSymbol.src;
	card.setSymbolX = document.querySelector('#setSymbol-x').value / card.width;
	card.setSymbolY = document.querySelector('#setSymbol-y').value / card.height;
	card.setSymbolZoom = document.querySelector('#setSymbol-zoom').value / 100;
	drawCard();
}
function resetSetSymbol() {
	document.querySelector('#setSymbol-x').value = Math.round(scaleX(card.setSymbolBounds.x));
	document.querySelector('#setSymbol-y').value = Math.round(scaleY(card.setSymbolBounds.y));
	var setSymbolZoom;
	if (setSymbol.width / setSymbol.height > scaleWidth(card.setSymbolBounds.width) / scaleHeight(card.setSymbolBounds.height)) {
		setSymbolZoom = (scaleWidth(card.setSymbolBounds.width) / setSymbol.width * 100).toFixed(1);
	} else {
		setSymbolZoom = (scaleHeight(card.setSymbolBounds.height) / setSymbol.height * 100).toFixed(1);
	}
	document.querySelector('#setSymbol-zoom').value = setSymbolZoom;
	if (card.setSymbolBounds.horizontal == 'center') {
		document.querySelector('#setSymbol-x').value = Math.round(scaleX(card.setSymbolBounds.x) - (setSymbol.width * setSymbolZoom / 100) / 2 - scaleWidth(card.marginX));
	} else if (card.setSymbolBounds.horizontal == 'right') {
		document.querySelector('#setSymbol-x').value = Math.round(scaleX(card.setSymbolBounds.x) - (setSymbol.width * setSymbolZoom / 100) - scaleWidth(card.marginX));
	}
	if (card.setSymbolBounds.vertical == 'center') {
		document.querySelector('#setSymbol-y').value = Math.round(scaleY(card.setSymbolBounds.y) - (setSymbol.height * setSymbolZoom / 100) / 2 - scaleHeight(card.marginY));
	} else if (card.setSymbolBounds.vertical == 'bottom') {
		document.querySelector('#setSymbol-y').value = Math.round(scaleY(card.setSymbolBounds.y) - (setSymbol.height * setSymbolZoom / 100) - scaleHeight(card.marginY));
	}
	setSymbolEdited();
}
function fetchSetSymbol() {
	var setCode = document.querySelector('#set-symbol-code').value.toLowerCase() || 'cmd';
	var setRarity = document.querySelector('#set-symbol-rarity').value.toLowerCase() || 'c';
	if (setCode == 'cc') {
		uploadSetSymbol('/img/setSymbols/cc-' + setRarity + '.png', 'resetSetSymbol');
	} else {
		imageURL('http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=' + setCode + '&size=large&rarity=' + setRarity, uploadSetSymbol, 'resetSetSymbol');
	}
}
//WATERMARK TAB
function uploadWatermark(imageSource, otherParams) {
	watermark.src = imageSource;
	if (otherParams && otherParams == 'resetWatermark') {
		watermark.onload = function() {
			resetWatermark();
			watermark.onload = watermarkEdited;
		};
	}
}
function watermarkEdited() {
	card.watermarkSource = watermark.src;
	card.watermarkX = document.querySelector('#watermark-x').value / card.width;
	card.watermarkY = document.querySelector('#watermark-y').value / card.height;
	card.watermarkZoom = document.querySelector('#watermark-zoom').value / 100;
	card.watermarkLeft = document.querySelector('#watermark-left').value;
	card.watermarkRight =  document.querySelector('#watermark-right').value;
	card.watermarkOpacity = document.querySelector('#watermark-opacity').value / 100;
	watermarkContext.globalCompositeOperation = 'source-over';
	watermarkContext.globalAlpha = 1;
	watermarkContext.clearRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
	if (card.watermarkLeft != 'none') {
		if (card.watermarkRight != 'none') {
			watermarkContext.drawImage(right, scaleX(0), scaleY(0), scaleWidth(1), scaleHeight(1));
			watermarkContext.globalCompositeOperation = 'source-in';
			if (card.watermarkRight == 'default') {
				watermarkContext.drawImage(watermark, scaleX(card.watermarkX), scaleY(card.watermarkY), watermark.width * card.watermarkZoom, watermark.height * card.watermarkZoom);
			} else {
				watermarkContext.fillStyle = card.watermarkRight;
				watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
			}
			watermarkContext.globalCompositeOperation = 'destination-over';
		}
		if (card.watermarkLeft == 'default') {
			watermarkContext.drawImage(watermark, scaleX(card.watermarkX), scaleY(card.watermarkY), watermark.width * card.watermarkZoom, watermark.height * card.watermarkZoom);
		} else {
			watermarkContext.fillStyle = card.watermarkLeft;
			watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
		}
		watermarkContext.globalCompositeOperation = 'destination-in';
		watermarkContext.drawImage(watermark, scaleX(card.watermarkX), scaleY(card.watermarkY), watermark.width * card.watermarkZoom, watermark.height * card.watermarkZoom);
		watermarkContext.globalAlpha = card.watermarkOpacity;
		watermarkContext.fillRect(0, 0, watermarkCanvas.width, watermarkCanvas.height);
	}
	drawCard();
}
function resetWatermark() {
	var watermarkZoom;
	if (watermark.width / watermark.height > scaleWidth(card.watermarkBounds.width) / scaleHeight(card.watermarkBounds.height)) {
		watermarkZoom = (scaleWidth(card.watermarkBounds.width) / watermark.width * 100).toFixed(1);
	} else {
		watermarkZoom = (scaleHeight(card.watermarkBounds.height) / watermark.height * 100).toFixed(1);
	}
	document.querySelector('#watermark-zoom').value = watermarkZoom;
	document.querySelector('#watermark-x').value = Math.round(scaleX(card.watermarkBounds.x) - watermark.width * watermarkZoom / 200 - scaleWidth(card.marginX));
	document.querySelector('#watermark-y').value = Math.round(scaleY(card.watermarkBounds.y) - watermark.height * watermarkZoom / 200 - scaleHeight(card.marginY));
	watermarkEdited();
}
//svg cropper
function getSetSymbolWatermark(setCode, targetImage = watermark) {
	xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'https://raw.githubusercontent.com/andrewgioia/keyrune/4073ac89bb943978c29be504275e6f3160a07255/svg/' + setCode + '.svg', true);
	xhttp.overrideMimeType('image/svg+xml');
	xhttp.onload = function(event) {
		if (this.readyState == 4 && this.status == 200) {
		    var svg = document.body.appendChild(xhttp.responseXML.documentElement);
		    var box = svg.getBBox(svg);
			svg.setAttribute('viewBox', [box.x, box.y, box.width, box.height].join(' '));
			svg.setAttribute('width', box.width);
			svg.setAttribute('height', box.height);
			uploadWatermark('data:image/svg+xml,' + encodeURIComponent(svg.outerHTML), 'resetWatermark');
			svg.remove();
		} else if (this.status == 404) {
			throw new Error('woopsie');
		}
	}
	xhttp.send();
}
//Bottom Info Tab
async function loadBottomInfo(textObjects = []) {
	await bottomInfoContext.clearRect(0, 0, bottomInfoCanvas.width, bottomInfoCanvas.height);
	card.bottomInfo = textObjects;
	bottomInfoEdited();
}
async function bottomInfoEdited() {
	await bottomInfoContext.clearRect(0, 0, bottomInfoCanvas.width, bottomInfoCanvas.height);
	card.infoNumber = document.querySelector('#info-number').value;
	card.infoRarity = document.querySelector('#info-rarity').value;
	card.infoSet = document.querySelector('#info-set').value;
	card.infoLanguage = document.querySelector('#info-language').value;
	card.infoArtist = document.querySelector('#info-artist').value;
	for (var textObject of Object.entries(card.bottomInfo)) {
		await writeText(textObject[1], bottomInfoContext);
		continue;
	}
	drawCard();
}
function artistEdited(value) {
	document.querySelector('#art-artist').value = value;
	document.querySelector('#info-artist').value = value;
	bottomInfoEdited();
}
//DRAWING THE CARD (putting it all together)
function drawCard() {
	cardContext.globalCompositeOperation = 'source-over';
	cardContext.clearRect(0, 0, cardCanvas.width, cardCanvas.height);
	cardContext.drawImage(art, scaleX(card.artX), scaleY(card.artY), art.width * card.artZoom, art.height * card.artZoom);
	cardContext.drawImage(frameCanvas, 0, 0, cardCanvas.width, cardCanvas.height);
	if (card.version.includes('planeswalker') && typeof planeswalkerCanvas !== "undefined") {
		cardContext.drawImage(planeswalkerCanvas, 0, 0, cardCanvas.width, cardCanvas.height);
	}
	cardContext.drawImage(watermarkCanvas, 0, 0, cardCanvas.width, cardCanvas.height);
	if (card.version.includes('saga') && typeof sagaCanvas !== "undefined") {
		cardContext.drawImage(sagaCanvas, 0, 0, cardCanvas.width, cardCanvas.height);
	}
	cardContext.drawImage(textCanvas, 0, 0, cardCanvas.width, cardCanvas.height);
	cardContext.drawImage(setSymbol, scaleX(card.setSymbolX), scaleY(card.setSymbolY), setSymbol.width * card.setSymbolZoom, setSymbol.height * card.setSymbolZoom)
	cardContext.drawImage(bottomInfoCanvas, 0, 0, cardCanvas.width, cardCanvas.height);
	cardContext.globalCompositeOperation = 'destination-out';
	if (card.marginX == 0 && card.marginY == 0) {
		cardContext.drawImage(corner, 0, 0, scaleWidth(59/1500), scaleWidth(59/1500));
		cardContext.rotate(Math.PI / 2);
		cardContext.drawImage(corner, 0, -card.width, scaleWidth(59/1500), scaleWidth(59/1500));
		cardContext.rotate(Math.PI / 2);
		cardContext.drawImage(corner, -card.width, -card.height, scaleWidth(59/1500), scaleWidth(59/1500));
		cardContext.rotate(Math.PI / 2);
		cardContext.drawImage(corner, -card.height, 0, scaleWidth(59/1500), scaleWidth(59/1500));
		cardContext.rotate(Math.PI / 2);
	}
	previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
	previewContext.drawImage(cardCanvas, 0, 0, previewCanvas.width, previewCanvas.height);
}
//DOWNLOADING
async function downloadCard() {
	if (card.infoArtist.replace(/ /g, '') == '' && !card.artSource.includes('/img/blank.png')) {
		alert('You must credit an artist before downloading!' + ' ' + card.artSource);
	} else {
		var download = document.createElement('a');
		var imageName = card.text.title.text;
		if (card.text.nickname) {
			imageName = card.text.nickname.text + ' (' + imageName + ')'
		}
		download.download = imageName + '.png';
		download.href = cardCanvas.toDataURL();
		document.body.appendChild(download);
		await download.click();
		download.remove();
	}
}
//IMPORT/SAVE TAB
function importCard(cardObject) {
	scryfallCard = cardObject.data;
	document.querySelector('#import-index').value = 1;
	document.querySelector('#import-index').max = scryfallCard.length;
	changeCardIndex();
}
function changeCardIndex() {
	var cardToImport = scryfallCard[document.querySelector('#import-index').value - 1];
	//text
	if (card.text.title) {card.text.title.text = cardToImport.name || '';}
	if (card.text.nickname) {card.text.nickname.text = cardToImport.flavor_name || '';}
	if (card.text.mana) {card.text.mana.text = cardToImport.mana_cost || '';}
	if (card.text.type) {card.text.type.text = cardToImport.type_line || '';}
	if (card.text.rules) {
		var rulesText = (cardToImport.oracle_text || '').replace('(', '{i}(').replace(')', '){/i}');
		var rulesTextCounter = 1;
		while (rulesText.includes('"')) {
			if (rulesTextCounter % 2) {
				rulesText = rulesText.replace('"', '\u201c');
			} else {
				rulesText = rulesText.replace('"', '\u201d');
			}
			rulesTextCounter ++;
		}
		card.text.rules.text = rulesText;
		if (cardToImport.flavor_text) {
			var flavorText = cardToImport.flavor_text;
			var flavorTextCounter = 1;
			while (flavorText.includes('*') || flavorText.includes('"')) {
				if (flavorTextCounter % 2) {
					flavorText = flavorText.replace('*', '{/i}');
					flavorText = flavorText.replace('"', '\u201c');
				} else {
					flavorText = flavorText.replace('*', '{i}');
					flavorText = flavorText.replace('"', '\u201d');
				}
				flavorTextCounter ++;
			}
			card.text.rules.text += '{flavor}' + flavorText.replace('\n', '{lns}');
		}
	}
	if (card.text.pt) {card.text.pt.text = cardToImport.power + '/' + cardToImport.toughness || '';}
	if (card.text.pt && card.text.pt.text == undefined + '/' + undefined) {card.text.pt.text = '';}
	if (card.version.includes('planeswalker')) {
		card.text.loyalty.text = cardToImport.loyalty || '';
		var planeswalkerAbilities = cardToImport.oracle_text.split('\n');
		while (planeswalkerAbilities.length > 4) {
			var newAbility = planeswalkerAbilities[planeswalkerAbilities.length - 2] + '\n' + planeswalkerAbilities.pop();
			planeswalkerAbilities[planeswalkerAbilities.length - 1] = newAbility;
		}
		for (var i = 0; i < 4; i ++) {
			if (planeswalkerAbilities[i]) {
				var planeswalkerAbility = planeswalkerAbilities[i].replace(': ', 'splitstring').split('splitstring');
				if (!planeswalkerAbility[1]) {
					planeswalkerAbility = ['', '{permashift' + scaleWidth(-0.04) + ',0}' + planeswalkerAbility[0]];
				}
				card.text['ability' + i].text = planeswalkerAbility[1].replace('(', '{i}(').replace(')', '){/i}');
				if (card.version == 'planeswalkerTall') {
					document.querySelector('#planeswalker-height-' + i).value = Math.round(scaleHeight(0.3572) / planeswalkerAbilities.length);
				} else {
					document.querySelector('#planeswalker-height-' + i).value = Math.round(scaleHeight(0.2915) / planeswalkerAbilities.length);
				}
				document.querySelector('#planeswalker-cost-' + i).value = planeswalkerAbility[0].replace('\u2212', '-');
			} else {
				card.text['ability' + i].text = '';
				document.querySelector('#planeswalker-height-' + i).value = 0;
			}
		}
		planeswalkerEdited();
	} else if (card.version.includes('saga')) {
		card.text.ability0.text = cardToImport.oracle_text.replace('(', '{i}(').replace(')', '){/i}') || '';
	}
	document.querySelector('#text-editor').value = card.text[Object.keys(card.text)[selectedTextIndex]].text;
	textEdited();
	//art
	scryfallArt = scryfallCard;
	document.querySelector('#art-name').value = cardToImport.name;
	document.querySelector('#art-index').value = 1;
	document.querySelector('#art-index').max = scryfallArt.length;
	changeArtIndex();
	//set symbol
	document.querySelector('#set-symbol-code').value = cardToImport.set;
	document.querySelector('#set-symbol-rarity').value = cardToImport.rarity.slice(0, 1);
	fetchSetSymbol();
}
function loadAvailableCards(cardKeys = JSON.parse(localStorage.getItem('cardKeys'))) {
	if (!cardKeys) {
		cardKeys = [];
		cardKeys.sort();
		localStorage.setItem('cardKeys', JSON.stringify(cardKeys));
	}
	document.querySelector('#load-card-options').innerHTML = '<option selected="selected" disabled>None selected</option>';
	cardKeys.forEach(item => {
		var cardKeyOption = document.createElement('option');
		cardKeyOption.innerHTML = item;
		document.querySelector('#load-card-options').appendChild(cardKeyOption);
	});
}
function saveCard(saveFromFile) {
	var cardKeys = JSON.parse(localStorage.getItem('cardKeys')) || [];
	var cardKey, cardToSave;
	if (saveFromFile) {
		cardKey = saveFromFile.key;
	} else {
		cardKey = card.text.title.text || 'unnamed';
	}
	if (!saveFromFile) {
		cardKey = prompt('Enter the name you would like to save your card under:', cardKey);
		if (!cardKey) {return null;}
	}
	if (cardKeys.includes(cardKey)) {
		if (!confirm('Would you like to overwrite your card previously saved as "' + cardKey + '"?\n(Clicking "cancel" will affix a version number)')) {
			var originalCardKey = cardKey;
			var cardKeyNumber = 1;
			while (cardKeys.includes(cardKey)) {
				cardKey = originalCardKey + ' (' + cardKeyNumber + ')';
				cardKeyNumber ++;
			}
		}
	}
	if (!cardKeys.includes(cardKey)) {
		cardKeys.push(cardKey);
		cardKeys.sort();
		localStorage.setItem('cardKeys', JSON.stringify(cardKeys));
		loadAvailableCards(cardKeys);
	}
	if (saveFromFile) {
		cardToSave = saveFromFile.data;
	} else {
		cardToSave = JSON.parse(JSON.stringify(card));
		cardToSave.frames.forEach(frame => {
			delete frame.image;
			frame.masks.forEach(mask => delete mask.image);
		});
	}
	localStorage.setItem(cardKey, JSON.stringify(cardToSave));
}
async function loadCard(selectedCardKey) {
	document.querySelector('#frame-list').innerHTML = null;
	card = {};
	card = JSON.parse(localStorage.getItem(selectedCardKey));
	document.querySelector('#info-number').value = card.infoNumber;
	document.querySelector('#info-rarity').value = card.infoRarity;
	document.querySelector('#info-set').value = card.infoSet;
	document.querySelector('#info-language').value = card.infoLanguage;
	artistEdited(card.infoArtist);
	document.querySelector('#text-editor').value = card.text[Object.keys(card.text)[selectedTextIndex]].text;
	loadTextOptions(card.text);
	document.querySelector('#art-x').value = scaleX(card.artX);
	document.querySelector('#art-y').value = scaleY(card.artY);
	document.querySelector('#art-zoom').value = card.artZoom * 100;
	uploadArt(card.artSource);
	document.querySelector('#setSymbol-x').value = scaleX(card.setSymbolX);
	document.querySelector('#setSymbol-y').value = scaleY(card.setSymbolY);
	document.querySelector('#setSymbol-zoom').value = card.setSymbolZoom * 100;
	uploadSetSymbol(card.setSymbolSource);
	document.querySelector('#watermark-x').value = scaleX(card.watermarkX);
	document.querySelector('#watermark-y').value = scaleY(card.watermarkY);
	document.querySelector('#watermark-zoom').value = card.watermarkZoom * 100;
	document.querySelector('#watermark-left').value = card.watermarkLeft;
	document.querySelector('#watermark-right').value = card.watermarkRight;
	document.querySelector('#watermark-opacity').value = card.watermarkOpacity * 100;
	uploadWatermark(card.watermarkSource);
	card.frames.reverse();
	await card.frames.forEach(item => addFrame([], item));
	card.frames.reverse();
	if (card.onload) {
		await loadScript(card.onload);
		if (card.version.includes('planeswalker')) {
			setTimeout(function(){
				fixPlaneswalkerInputs(invertPlaneswalkerColors(true));
			}, 1000);
		}
	}
	card.manaSymbols.forEach(item => loadScript(item));
}
function deleteCard() {
	var keyToDelete = document.querySelector('#load-card-options').value;
	if (keyToDelete) {
		var cardKeys = JSON.parse(localStorage.getItem('cardKeys'));
		cardKeys.splice(cardKeys.indexOf(keyToDelete), 1);
		cardKeys.sort();
		localStorage.setItem('cardKeys', JSON.stringify(cardKeys));
		localStorage.removeItem(keyToDelete);
		loadAvailableCards(cardKeys);
	}
}
async function downloadSavedCards() {
	var cardKeys = JSON.parse(localStorage.getItem('cardKeys'));
	if (cardKeys) {
		var allSavedCards = [];
		cardKeys.forEach(item => {
			allSavedCards.push({key:item, data:JSON.parse(localStorage.getItem(item))});
		});
		var download = document.createElement('a');
		download.href = URL.createObjectURL(new Blob([JSON.stringify(allSavedCards)], {type:'text'}));
		download.download = 'saved-cards.cardconjurer';
		document.body.appendChild(download);
		await download.click();
		download.remove();
	}
}
function uploadSavedCards(event) {
	var reader = new FileReader();
	reader.onload = function () {
		JSON.parse(reader.result).forEach(item => saveCard(item));
	}
	reader.readAsText(event.target.files[0]);
}
//TUTORIAL TAB
function loadTutorialVideo() {
	var video = document.querySelector('.video > iframe');
	if (video.src == '') {
		video.src = 'https://www.youtube-nocookie.com/embed/UrNk6I55S0Q?rel=0';
	}
}
//Various loaders
function imageURL(url, destination, otherParams) {
	destination('https://cors-anywhere.herokuapp.com/' + url, otherParams);
}
async function imageLocal(event, destination, otherParams) {
	var reader = new FileReader();
	reader.onload = function () {
		destination(reader.result, otherParams);
	}
	reader.onerror = function () {
		destination('/img/blank.png', otherParams);
	}
	await reader.readAsDataURL(event.target.files[0]);
}
function loadScript(scriptPath) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', scriptPath);
	if (typeof script != 'undefined') {
		document.querySelectorAll('head')[0].appendChild(script);
	}
}
//SCRYFALL STUFF MAY BE CHANGED IN THE FUTURE
function fetchScryfallData(cardName, callback = console.log) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(this.responseText));
			// JSON.parse(this.responseText);
		} else if (this.readyState == 4 && this.status == 404) {
			alert('No cards found for "' + cardName + '"');
		}
	}
	xhttp.open('GET', 'https://api.scryfall.com/cards/search?order=released&unique=art&q=name%3D' + cardName.replace(/ /g, '_'), true);
	xhttp.send();
}
//Initialization
document.querySelector('#info-number').value = date.getFullYear();
loadScript('/js/frames/groupStandard.js');
loadAvailableCards();