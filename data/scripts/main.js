//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
/* Test things! */
function testFunction() {
	// cardMaster.appendChild(frameList[0].cardMasterElement("Full"));
	cardMasterUpdated();
	// console.log("First frame manually loaded")
}


/* Initiate! */
window.onload = initiate;
function initiate() {
	window.version = {}
	window.cardWidth = 750;
	window.cardHeight = 1050;
	window.frameList = new Array();
	window.maskNameList = ["Right Half", "Corners", "Full", "Title", "Type", "Rules Text", "Pinline", "Frame", "Border"];
	window.maskList = [];
	window.selectedFrame = -1;
	window.selectedMask = "";
	window.updateTextDelay = setTimeout(rewriteText, 500);
	for (var i = 0; i < maskNameList.length; i++) {
		var imageSource = "data/images/masks/" + maskNameList[i].replace(" ", "") + ".png";
		maskList[i] = new Image();
		maskList[i].src = imageSource;
	}
	window.cardMaster = document.getElementById("cardMaster");
	window.displayCanvas = document.getElementById("displayCanvas");
	document.getElementById("displayCanvas").width = cardWidth;
	document.getElementById("displayCanvas").height = cardHeight;
	window.displayContext = displayCanvas.getContext("2d");
	newCanvas("frameMask");
	newCanvas("frameFinal");
	newCanvas("text");
	newCanvas("line");
	newCanvas("paragraph");
	newCanvas("bottomInfo");
	newCanvas("setSymbol");
	newCanvas("watermark");
	newCanvas("transparent");
	newCanvas("crop");
	newCanvas("temp");
	newCanvas("cardFinal");
	//Mana symbol Array setup
	window.manaSymbolCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "w", "u", "b", "r", "g", "2w", "2u", "2b", "2r", "2g", "pw", "pu", "pb", "pr", "pg", "wu", "wb", "ub", "ur", "br", "bg", "rg", "rw", "gw", "gu", "x", "s", "c", "t","untap", "e", "y", "z", "1/2", "inf", "chaos", "plane", "l+", "l-", "l0", "oldtap", "artistbrush", "bar"];
	window.manaSymbolImageList = [];
	//Manually create a few important images
	window.cardArt = new Image();
	window.setSymbol = new Image();
	window.watermark = new Image();
	cardArt.crossOrigin = "anonymous";
	setSymbol.crossOrigin = "anonymous";
	watermark.crossOrigin = "anonymous";
	cardArt.onload = function() {
		// cardImageUpdated();
		cardMasterUpdated();
        document.getElementById("artPlaceholderImage").src = this.src
	}
	setSymbol.onload = function() {
		updateSetSymbol();
	}
	watermark.onload = function() {
		updateWatermark();
	}
	//Load the mana symbol images
	loadManaSymbolImages();
	//Loads up anything that uses Sortable.js
	var sortable = Sortable.create(cardMaster, {animation: 150, ghostClass: "cardMasterElementMoving", handle: ".handle"});
	//Other little things
	window.date = new Date()
	document.getElementById("inputInfoNumber").value = date.getFullYear()
	// randomSet(false)
	//initiation is complete, ready to load image data
	console.log("init done, time to set the card version");
	changeVersionTo("m15");
}


/* Loads all the image info from the CSV! */
function loadImageCSV() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			var splitImageCSV = xhttp.responseText.split("\n");
			for (var i = 1; i < splitImageCSV.length; i++) {
				var splitIndividualImageCSV = splitImageCSV[i].split(",");
				frameList[frameList.length] = new frameImage(splitIndividualImageCSV[0], "data/images/" + splitIndividualImageCSV[1], splitIndividualImageCSV[2]);
			}
			for (var i = 0; i < frameList.length; i++) {
				document.getElementById("framePicker").appendChild(frameList[i].framePickerElement());
			}
			//I don't like these here, because even though they run, it doesn't populate the mask options
			// document.getElementsByClassName("frameOption")[0].classList.add("frameOptionSelected");
			// selectedMask = document.getElementsByClassName("frameOption")[0].id.replace("frameIndex", "");
			console.log("image csv loaded, happy card conjuring!");
			setTimeout(testFunction, 500); //deleteme
		}
	}
	xhttp.open("GET", "data/images/imageCSV.csv", true);
	xhttp.send();
}


/* Image Class */
class frameImage {
	constructor(display, path, masks) {
		this.displayName = display;
		this.image = new Image();
		this.image.src = path;
		this.maskOptionList = new Array();
		this.xList = new Array();
		this.yList = new Array();
		this.widthList = new Array();
		this.heightList = new Array();
		var splitMasks = masks.split(";");
		for (var i = 0; i < splitMasks.length; i++) {
			var splitIndividualMasks = splitMasks[i].split("-");
			this.maskOptionList[i] = splitIndividualMasks[0];
			this.xList[i] = scale(parseInt(splitIndividualMasks[1]));
			this.yList[i] = scale(parseInt(splitIndividualMasks[2]));
			this.widthList[i] = scale(parseInt(splitIndividualMasks[3]));
			this.heightList[i] = scale(parseInt(splitIndividualMasks[4]));
		}
	}
	cardMasterElement(targetMask) {
		var tempElement = document.createElement("div");
		tempElement.id = "frameIndex" + frameList.indexOf(this);
		tempElement.classList.add("cardMasterElement");
		tempElement.innerHTML = "<span class='handle'>|||</span><div>" + this.displayName + " (" + targetMask + ") <br><input type='number' min='0' max='100' value='100' class='inputOpacity' oninput='cardMasterUpdated()'><input type='checkbox' onchange='cardMasterUpdated()'><img src=" + this.image.src + "><img class='cardMasterElementMaskImage' src=" + maskList[maskNameList.indexOf(targetMask.replace(" - Right", ""))].src + "></div><span class='closeCardMasterElement' onclick='deleteCardMasterElement(event)'>x</span>";
		return tempElement
	}
	framePickerElement(targetElement) {
		var tempElement = document.createElement("div");
		tempElement.id = "frameIndex" + frameList.indexOf(this);
		tempElement.classList.add("frameOption");
		tempElement.onclick = frameOptionClicked;
		tempElement.innerHTML = "<img src=" + this.image.src + ">"
		return tempElement;
	}
}


/* User input for card master */
function frameOptionClicked(event) {
	//Takes the clicked element, determines the right frame image index, sets the selected frame, and displays available masks
	//most importantly, stores the selected frame under 'selectedFrame'
	var clickedElement = event.target;
	if (clickedElement.nodeName == "IMG") {
		clickedElement = event.target.parentElement;
	}
	var frameOptionList = document.getElementsByClassName("frameOption");
	for (var i = 0; i < frameOptionList.length; i++) {
		frameOptionList[i].classList.remove("frameOptionSelected");
	}
	clickedElement.classList.add("frameOptionSelected");
	clickedElementIndex = clickedElement.id.replace("frameIndex", "");
	if (clickedElementIndex != selectedFrame) {
		selectedFrame = parseInt(clickedElementIndex);
		document.getElementById("maskPicker").innerHTML = "";
		for (var i = 0; i < frameList[selectedFrame].maskOptionList.length; i++) {
			document.getElementById("maskPicker").innerHTML += "<div class='maskOption' onclick='maskOptionClicked(event)' id='maskName" + frameList[selectedFrame].maskOptionList[i] + "'><img src='" + maskList[maskNameList.indexOf(frameList[selectedFrame].maskOptionList[i])].src + "'>" + frameList[selectedFrame].maskOptionList[i] + "</div>";
		}
		document.getElementsByClassName("maskOption")[0].classList.add("maskOptionSelected");
		selectedMask = document.getElementsByClassName("maskOption")[0].id.replace("maskName", "");
		document.getElementById("selectedFramePreview").innerHTML = "Selected: " + frameList[selectedFrame].displayName + " frame with a " + selectedMask + " mask";
	}
}
function maskOptionClicked(event) {
	//Determines which mask was selected, and stores that value under 'selectedMask'
	var clickedElement = event.target;
	if (clickedElement.nodeName == "IMG") {
		clickedElement = event.target.parentElement;
	}
	var maskOptionList = document.getElementsByClassName("maskOption");
	for (var i = 0; i < maskOptionList.length; i++) {
		maskOptionList[i].classList.remove("maskOptionSelected");
	}
	clickedElement.classList.add("maskOptionSelected");
	selectedMask = clickedElement.id.replace("maskName", "");
	document.getElementById("selectedFramePreview").innerHTML = "Selected: " + frameList[selectedFrame].displayName + " frame with a " + selectedMask + " mask";
}
function addFrameToCardMaster(right = "") {
	//Takes the stored selectedFrame and selectedMask to add the frame w/ mask to the card master!
	if (selectedFrame > -1 && selectedMask != "") {
		//In order to both keep input values and insert new frames before old ones, they must be added like so:
		cardMaster.insertBefore(frameList[selectedFrame].cardMasterElement(selectedMask + right), cardMaster.children[0]);
		cardMasterUpdated();
	}
}
function deleteCardMasterElement(event) {
	event.target.parentElement.parentElement.removeChild(event.target.parentElement);
	cardMasterUpdated();
}
function addNewFrameOption(imageSource) {
	frameList[frameList.length] = new frameImage("Custom", imageSource, "Full-0-0-750-1050;Title-0-0-750-1050;Type-0-0-750-1050;Rules Text-0-0-750-1050;Pinline-0-0-750-1050;Frame-0-0-750-1050;Border-0-0-750-1050");
	frameList[frameList.length - 1].image.customVar = frameList.length - 1
	frameList[frameList.length - 1].image.onload = function() {
		document.getElementById("framePicker").appendChild(frameList[this.customVar].framePickerElement());
	}
}


/* Card Master Cool Stuff! */
function cardMasterUpdated() {
	// console.log("The card master is updating!");
	frameFinalContext.clearRect(0, 0, cardWidth, cardHeight);
	for (var i = cardMaster.children.length - 1; i >= 0; i--) {
		var targetChild = cardMaster.children[i];
		if (parseInt(targetChild.id.replace("frameIndex", "")) == -1) {
			//The card art placeholder is manually set to -1 and cannot be removed :)
			frameFinalContext.drawImage(cardArt, version.artX + getValue("inputCardArtX"), version.artY + getValue("inputCardArtY"), cardArt.width * getValue("inputCardArtZoom") / 100, cardArt.height * getValue("inputCardArtZoom") / 100)
		} else {
			var frameToDraw = frameList[parseInt(targetChild.id.replace("frameIndex", ""))];
			var opacityToDraw = targetChild.children[0].value / 100;
			var maskName = targetChild.innerHTML.slice(targetChild.innerHTML.indexOf("(") + 1, targetChild.innerHTML.indexOf(")"));
			var rightHalf = false;
			if (maskName.includes(" - Right")) {
				maskName = maskName.replace(" - Right", "");
				rightHalf = true;
			}
			var maskIndex = frameToDraw.maskOptionList.indexOf(maskName);
			var maskImageIndex = maskNameList.indexOf(maskName)
			//Clears the temporary mask canvas, draws the mask, draws the image over it, then copies it to the final frame canvas
			frameMaskContext.globalCompositeOperation = "source-over";
			frameMaskContext.clearRect(0, 0, cardWidth, cardHeight);
			frameMaskContext.drawImage(maskList[maskImageIndex], 0, 0, cardWidth, cardHeight);
			frameMaskContext.globalCompositeOperation = "source-in";
			if (rightHalf) {
				frameMaskContext.drawImage(maskList[0], 0, 0, cardWidth, cardHeight)
			}
			frameMaskContext.drawImage(frameToDraw.image, frameToDraw.xList[maskIndex], frameToDraw.yList[maskIndex], frameToDraw.widthList[maskIndex], frameToDraw.heightList[maskIndex]);
			if (targetChild.children[1].checked == true) {
				frameFinalContext.globalCompositeOperation = "destination-out";
			}
			frameFinalContext.globalAlpha = opacityToDraw;
			frameFinalContext.drawImage(frameMaskCanvas, 0, 0, cardWidth, cardHeight);
			frameFinalContext.globalAlpha = 1;
			frameFinalContext.globalCompositeOperation = "source-over";
		}
	}
	updateBottomInfoCanvas();
}


/* Overall card stuff */
function cardImageUpdated() {
	//Clear the canvases
	cardFinalContext.fillStyle = "black";
	cardFinalContext.fillRect(0, 0, cardWidth, cardHeight);
	displayContext.clearRect(0, 0, cardWidth, cardHeight);
	//Draw the art, frame, text, bottom info, mana cost, watermark, and set symbol
	// cardFinalContext.drawImage(cardArt, version.artX + getValue("inputCardArtX"), version.artY + getValue("inputCardArtY"), cardArt.width * getValue("inputCardArtZoom") / 100, cardArt.height * getValue("inputCardArtZoom") / 100)
	cardFinalContext.drawImage(frameFinalCanvas, 0, 0, cardWidth, cardHeight);
	cardFinalContext.drawImage(textCanvas, 0, 0, cardWidth, cardHeight);
	cardFinalContext.drawImage(bottomInfoCanvas, 0, 0, cardWidth, cardHeight);
	cardFinalContext.drawManaCost(document.getElementById("inputManaCost").value, version.manaCostX, version.manaCostY, version.manaCostDiameter, version.manaCostDistance, version.manaCostDirection)
	cardFinalContext.drawImage(watermarkCanvas, 0, 0, cardWidth, cardHeight)
	cardFinalContext.drawImage(setSymbolCanvas, 0, 0, cardWidth, cardHeight)
	//Clear the corners
	cardFinalContext.globalCompositeOperation = "destination-out"
	cardFinalContext.drawImage(maskList[1], 0, 0, cardWidth, cardHeight)
	cardFinalContext.globalCompositeOperation = "source-over"
	//Copy it to the visible canvas
	displayContext.drawImage(cardFinalCanvas, 0, 0, cardWidth, cardHeight);
}


/* Loading/manipulating card versions */
function changeVersionTo(versionToChangeTo) {
	loadScript("data/versions/" + versionToChangeTo + ".js")
}
function finishChangingVersion() {
	for (var i = 0; i < version.textList.length; i ++) {
		document.getElementById("inputWhichTextTabs").innerHTML += "<div class='textTabButton' onclick='textTabFunction(event, `" + version.textList[i][0] + "`)'>" + version.textList[i][0] + "</div>"
        if (i == 0) {
            document.getElementsByClassName("textTabButton")[0].classList.add("activeTextTab")
        }
	}
	console.log("version changed, time to load the image csv")
	loadImageCSV();
}


/* Text functions! */
function textTabFunction(event, target) {
    var textTabButtons = document.getElementsByClassName("textTabButton")
    for (var i = 0; i < textTabButtons.length; i++) {
        textTabButtons[i].classList.remove("activeTextTab")
    }
    event.target.classList.add("activeTextTab")
    for (var i = 0; i < version.textList.length; i ++) {
        if (version.textList[i][0] == target.replace("option", "")) {
            whichTextIndex = i
            document.getElementById("inputText").value = version.textList[whichTextIndex][1]
        }
    	
    }
}
//Changes the textarea content to whichever text is currently selected for editing
var whichTextIndex = 0
function changeWhichText() {
	for (var i = 0; i < version.textList.length; i ++) {
		if (version.textList[i][0] == document.getElementById("inputWhichText").value) {
			whichTextIndex = i
		}
	}
	document.getElementById("inputText").value = version.textList[whichTextIndex][1]
}
function updateText() {
    version.textList[whichTextIndex][1] = document.getElementById("inputText").value
    clearTimeout(updateTextDelay)
    updateTextDelay = setTimeout(rewriteText, 250);
}
function rewriteText() {
	textContext.clearRect(0, 0, cardWidth, cardHeight)
    for (var i = 0; i < version.textList.length; i ++) {
        textContext.writeText(version.textList[i][1], version.textList[i][2], version.textList[i][3], version.textList[i][4], version.textList[i][5], version.textList[i][6], version.textList[i][7], version.textList[i][8], version.textList[i][9])
    }
    cardImageUpdated()
}


/* functions for all the little parts of the care */
function updateBottomInfoCanvas() {
	window[version.bottomInfoFunction]()
}


/* Misc convenient functions */
function scale(input) {
	return input * cardWidth / 750;
}
function getValue(elementId) {
	return parseFloat(document.getElementById(elementId).value)
}


/* Functions that make stuff */
function newCanvas(newCanvasName) {
	window[newCanvasName + "Canvas"] = document.createElement("canvas");
	window[newCanvasName + "Canvas"].width = cardWidth;
	window[newCanvasName + "Canvas"].height = cardHeight;
	window[newCanvasName + "Context"] = window[newCanvasName + "Canvas"].getContext("2d");
}


/* Functions that manage the website */
function toggleTabs(event, targetTab, tabSubject) {
	var tabList = document.getElementsByClassName(tabSubject);
	for (var i = 0; i < tabList.length; i++) {
		tabList[i].classList.remove("tabVisible");
		tabList[i].classList.remove("tabOptionSelected");
	}
	document.getElementById(targetTab).classList.add("tabVisible");
	event.target.classList.add("tabOptionSelected");
}
function loadScript(scriptPath){
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("src", scriptPath);
	if (typeof script != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(script);
	}
}




/*
	Directly taken (with small edits) from previous version.
	sort these!!!
*/





//figures out the placing of the set symbol
function updateSetSymbol() {
	setSymbolContext.clearRect(0, 0, cardWidth, cardHeight)
	var setSymbolWidth, setSymbolHeight, setSymbolX, setSymbolY
	if (version.setSymbolWidth / version.setSymbolHeight < setSymbol.width / setSymbol.height) {
		//wider
		setSymbolWidth = version.setSymbolWidth
		setSymbolHeight = version.setSymbolWidth / setSymbol.width * setSymbol.height
		setSymbolX = version.setSymbolRight - setSymbolWidth
		setSymbolY = version.setSymbolVertical - setSymbolHeight / 2
	} else {
		//taller
		setSymbolHeight = version.setSymbolHeight
		setSymbolWidth = version.setSymbolHeight / setSymbol.height * setSymbol.width
		setSymbolX = version.setSymbolRight - setSymbolWidth
		setSymbolY = version.setSymbolVertical - setSymbolHeight / 2
	}
	setSymbolContext.drawImage(setSymbol, setSymbolX, setSymbolY, setSymbolWidth, setSymbolHeight)
	cardImageUpdated()
}
function updateWatermark() {
	if (document.getElementById("inputWatermarkPrimary").value != "none") {
		watermarkContext.clearRect(0, 0, cardWidth, cardHeight)
		var watermarkX, watermarkY, watermarkWidth, watermarkHeight
		if (version.watermarkWidth / version.watermarkHeight < watermark.width / watermark.height) {
			//wider
			watermarkWidth = version.watermarkWidth
			watermarkHeight = version.watermarkWidth / watermark.width * watermark.height
			watermarkX = cardWidth / 2 - watermarkWidth / 2
			watermarkY = version.watermarkY - watermarkHeight / 2
		} else {
			//taller
			watermarkHeight = version.watermarkHeight
			watermarkWidth = version.watermarkHeight / watermark.height * watermark.width
			watermarkX = cardWidth / 2 - watermarkWidth / 2
			watermarkY = version.watermarkY - watermarkHeight / 2
		}
		watermarkContext.drawImage(watermark, watermarkX, watermarkY, watermarkWidth, watermarkHeight)
		watermarkContext.globalCompositeOperation = "source-in"
		if (document.getElementById("inputWatermarkPrimary").value != "default") {
			watermarkContext.fillStyle = document.getElementById("inputWatermarkPrimary").value
			watermarkContext.fillRect(0, 0, cardWidth, cardHeight)
		}
		if (document.getElementById("inputWatermarkSecondary").value != "none") {
			watermarkContext.globalCompositeOperation = "source-atop"
			tempContext.clearRect(0, 0, cardWidth, cardHeight)
			tempContext.drawImage(maskList[0], 0, 0, cardWidth, cardHeight)
			tempContext.globalCompositeOperation = "source-in"
			if (document.getElementById("inputWatermarkSecondary").value == "default") {
				tempContext.drawImage(watermark, watermarkX, watermarkY, watermarkWidth, watermarkHeight)
			} else {
				tempContext.fillStyle = document.getElementById("inputWatermarkSecondary").value
				tempContext.fillRect(0, 0, cardWidth, cardHeight)
			}
			tempContext.globalCompositeOperation = "source-over"
			watermarkContext.drawImage(tempCanvas, 0, 0, cardWidth, cardHeight)
		}
		watermarkContext.globalCompositeOperation = "source-over"
	} else {
		watermarkContext.clearRect(0, 0, cardWidth, cardHeight)
	}
	cardImageUpdated()
}

//Custom text function! This acts on any codes and makes things look nice :)
CanvasRenderingContext2D.prototype.writeText = function(text = "", textX = 0, textY = 0, textWidth = cardWidth, textHeight = cardHeight, textFont = "belerenbsc", inputTextSize = 38, textColor="black", other="") {
	paragraphContext.clearRect(0, 0, cardWidth, cardHeight)
	var textSize = inputTextSize
	lineContext.font = textSize + "px " + textFont
	lineContext.fillStyle = textColor
	var otherParameters = other.split(",")
	var outline, shadow = 0, oneLine = false, outlineWidth = 2, textAlign = "left", verticalAlign = true, lineSpace = 1
	for (var i = 0; i < otherParameters.length; i ++) {
		eval(otherParameters[i])
	}
	lineContext.strokeStyle = outline
	lineContext.lineWidth = outlineWidth
	var currentLineX = 0
	var currentLineY = textY + textSize * 0.45
	var uniqueSplitter = "9dn57gwbt4sh"
	var splitString = text.replace(/ /g, uniqueSplitter +  " " + uniqueSplitter).replace(/{/g, uniqueSplitter + "{").replace(/}/g, "}" + uniqueSplitter).split(uniqueSplitter)
	splitString[splitString.length] = " "
	var lastWordAdded = ""
	for (var i = 0; i < splitString.length; i++) {
		if (splitString[i] != "") {
			var wordToWrite = splitString[i]
			var finishLine = false
			if (splitString[i].includes("{") && splitString[i].includes("}")) {
				//It may be a code
				wordToWrite = ""
				possibleCodeLower = splitString[i].toLowerCase().replace("{", "").replace("}", "")
				if (possibleCodeLower == "line" && !oneLine) {
					finishLine = true
                    currentLineY += textSize * 0.35
				} else if (possibleCodeLower == "linenospace" && ! oneLine) {
					finishLine = true
				} else if (possibleCodeLower == "bar" || possibleCodeLower == "flavor") {
					finishLine = true
					var barWidth = manaSymbolImageList[63].width
					var barHeight = manaSymbolImageList[63].height
					paragraphContext.drawImage(manaSymbolImageList[63], textX + textWidth / 2 - barWidth / 2, currentLineY + textSize * 0.6, barWidth, barHeight)
					currentLineY += textSize * 0.8
					if (possibleCodeLower == "flavor") {
						lineContext.font = "italic " + (textSize - 3) + "px " + textFont
					}
				} else if (possibleCodeLower.includes("fontsize")) {
					textSize += parseInt(possibleCodeLower.slice(8, possibleCodeLower.length))
					lineContext.font = textSize + "px " + textFont
				} else if (possibleCodeLower == "i") {
					lineContext.font = "italic " + textSize + "px " + textFont
				} else if (possibleCodeLower == "/i") {
					lineContext.font = textSize + "px " + textFont
				} else if (possibleCodeLower == "center") {
					textAlign = "center"
				} else if (possibleCodeLower == "right") {
					textAlign = "right"
				} else if (possibleCodeLower == "left") {
					textAlign = "left"
				} else if (possibleCodeLower.includes("up")) {
					currentLineY -= (parseInt(possibleCodeLower.slice(2, possibleCodeLower.length)))
				} else if (possibleCodeLower.includes("down")) {
					currentLineY += (parseInt(possibleCodeLower.slice(4, possibleCodeLower.length)))
				} else if (possibleCodeLower.includes("left")) {
					currentLineX -= (parseInt(possibleCodeLower.slice(4, possibleCodeLower.length)))
				} else if (possibleCodeLower.includes("right")) {
					currentLineX += (parseInt(possibleCodeLower.slice(5, possibleCodeLower.length)))
				} else if (possibleCodeLower == "artistbrush") {
					var artistBrushWidth = textSize * 1.2
					lineContext.drawImage(manaSymbolImageList[62], currentLineX, currentLineY - artistBrushWidth * 0.58, artistBrushWidth, artistBrushWidth * 13 / 21)
					currentLineX += artistBrushWidth * 1.1
				} else if (possibleCodeLower.includes("fontcolor")) {
					lineContext.fillStyle = possibleCodeLower.slice(9, possibleCodeLower.length)
				}else if (possibleCodeLower.includes("font")) {
					textFont = possibleCodeLower.slice(5, possibleCodeLower.length)
					lineContext.font = textSize + "px " + textFont
				} else if (manaSymbolCodeList.includes(possibleCodeLower)) {
					//THIS HAS TO BE THE LAST ONE
					var manaSymbolDiameter = textSize * 0.77
					lineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(possibleCodeLower)], currentLineX, currentLineY - manaSymbolDiameter * 0.95, manaSymbolDiameter, manaSymbolDiameter)
					currentLineX += manaSymbolDiameter * 1.02
				} else {
					wordToWrite = splitString[i]
				}
			}
			if (wordToWrite != "" || finishLine == true) {
				//We're left with a word. Write it.
				var currentWordWidth = lineContext.measureText(wordToWrite).width
				if (i == splitString.length - 1) {
					//forces the last artificially added space to be too wide, making sure the last line is drawn in.
					currentWordWidth = textWidth + 1
				}
				if (currentLineX + currentWordWidth > textWidth || finishLine) {
					//Finish the line
					if (oneLine && i != splitString.length - 1 && inputTextSize > 1) {
						lineContext.clearRect(0, 0, cardWidth, cardHeight)
						this.writeText(text, textX, textY, textWidth, textHeight, textFont, inputTextSize - 1, textColor, other)
						return
					}
					var alignAdjust = 0
					if (textAlign == "center" || textAlign == "right") {
						if (lastWordAdded == " ") {
							currentLineX -= textContext.measureText("   ").width
						}
						if (textAlign == "center") {
							alignAdjust = textWidth / 2 - currentLineX  / 2 + textX
						} else if (textAlign == "right") {
							alignAdjust = textWidth + textX - currentLineX
						}
					} else {
						alignAdjust += textX
					}
					paragraphContext.drawImage(lineCanvas, 0 + alignAdjust, 0, cardWidth, cardHeight)
					lineContext.clearRect(0, 0, cardWidth, cardHeight)
					currentLineY += textSize * lineSpace
					currentLineX = 0
					if (wordToWrite == " ") {
						currentWordWidth = 0
					}
				}
				//Whether or not the current line is finished, write to it.
				if (shadow > 0) {
					lineContext.fillText(wordToWrite, currentLineX + shadow, currentLineY + shadow)
				}
				if (outline != undefined) {
					lineContext.strokeText(wordToWrite, currentLineX, currentLineY)
				}
				lineContext.fillText(wordToWrite, currentLineX, currentLineY)
				currentLineX += currentWordWidth
				lastWordAdded = wordToWrite
			}
		}
	}
	verticalAdjust = 0
	if (verticalAlign) {
		verticalAdjust = (textHeight + textY - currentLineY + textSize) / 2
	}
	this.drawImage(paragraphCanvas, 0, 0 + verticalAdjust, cardWidth, cardHeight)
	return "done"
}
//Loads up all the mana symbol images
function loadManaSymbolImages() {
	for (var i = 0; i < manaSymbolCodeList.length; i++) {
		manaSymbolImageList[i] = new Image()
		manaSymbolImageList[i].src = "data/images/manaSymbols/" + i + ".png"
	}
}
//Draws a mana cost
CanvasRenderingContext2D.prototype.drawManaCost = function(text, symbolsX, symbolsY, diameter = 50, distance = -50, direction = "horizontal") {
	var splitManaCost = text.replace(/{/g, " ").replace(/}/g, " ").split(" ")
	var currentSymbolIndex = 0
	var currentX = symbolsX
	var currentY = symbolsY
	for (var i = splitManaCost.length - 1; i >= 0; i --) {
		if (manaSymbolCodeList.includes(splitManaCost[i])) {
			if (Array.isArray(direction) && i < direction.length) {
				currentX = direction[i][0]
				currentY = direction[i][1]
			}
			this.fillStyle = "black"
			this.beginPath()
			this.arc(currentX + diameter / 2.1, currentY + diameter / 1.8, diameter / 2, 0, 2 * Math.PI, false)
			this.fill()
			this.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(splitManaCost[i])], currentX, currentY, diameter, diameter)
			if (direction == "horizontal") {
				currentX += distance
			} else if (direction == "vertical") {
				currentY += distance
			}
		}
	}
}

//Removes all the white pixels in an image
var whiteThreshold = 250
function whiteToTransparent(targetImage, source = targetImage.src) {
    //Create image, size canvas, draw image
    var imgTempTarget = new Image()
    imgTempTarget.crossOrigin = "anonymous"
    imgTempTarget.src = source
    imgTempTarget.onload = function() {
    	if (imgTempTarget.width > 0 && imgTempTarget.height > 0) {
    		transparentCanvas.width = imgTempTarget.width
    		transparentCanvas.height = imgTempTarget.height
    		transparentContext.drawImage(imgTempTarget, 0, 0)
            //declare variables
            var width = transparentCanvas.width
            var height = transparentCanvas.height
            var imageData = transparentContext.getImageData(0, 0, transparentCanvas.width, transparentCanvas.height)
            var x, y, index
            //Go through every pixel and
            for (y = 0; y < height; y++) {
            	for (x = 0; x < width; x++) {
                    index = (y * width + x) * 4
                    if (imageData.data[index] >= whiteThreshold && imageData.data[index + 1] >= whiteThreshold && imageData.data[index + 2] >= whiteThreshold) {
                        imageData.data[index + 3] = 0
                    }
                }
            }
            transparentContext.clearRect(0, 0, width, height)
            transparentContext.putImageData(imageData, 0, 0)
            targetImage.src = transparentCanvas.toDataURL()
            autocrop(targetImage)
        }
    }
}
//Removes all the whitespace in an image
function autocrop(targetImage, source = targetImage.src) {
    //Create image, size canvas, draw image
    var imgTempTarget = new Image()
    imgTempTarget.crossOrigin = "anonymous"
    imgTempTarget.src = source
    imgTempTarget.onload = function() {
        if (imgTempTarget.width > 0 && imgTempTarget.height > 0) {
            cropCanvas.width = imgTempTarget.width
            cropCanvas.height = imgTempTarget.height
            cropContext.drawImage(imgTempTarget, 0, 0)
            //declare variables
            var width = cropCanvas.width
            var height = cropCanvas.height
            var pix = {x:[], y:[]}
            var imageData = cropContext.getImageData(0, 0, cropCanvas.width, cropCanvas.height)
            var x, y, index
            if (imageData.data.length > 4) {
            	//Go through every pixel and
	            for (y = 0; y < height; y++) {
	                for (x = 0; x < width; x++) {
	                    //(y * width + x) * 4 + 3 calculates the index at which the alpha value of the pixel at x, y is given
	                    index = (y * width + x) * 4 + 3
	                    if (imageData.data[index] > 0) {
	                        //pix is the image object that stores two arrays of x and y coordinates. These stored coordinates are all the visible pixels
	                        pix.x.push(x)
	                        pix.y.push(y)
	                    }
	                }
	            }
	            //sorts the arrays numerically
	            pix.x.sort(function(a,b){return a-b})
	            pix.y.sort(function(a,b){return a-b})
	            var n = pix.x.length - 1
	            //Finds the difference between the leftmost and rightmost visible pixels, and the topmost and bottommost pixels, cuts out a section of the canvas
	            width = pix.x[n] - pix.x[0]
	            height = pix.y[n] - pix.y[0]
	            var cropped = cropContext.getImageData(pix.x[0], pix.y[0], width + 1, height + 1)
	            //Resizes the canvas and draws cropped image
	            cropCanvas.width = width + 1
	            cropCanvas.height = height + 1
	            cropContext.putImageData(cropped, 0, 0)
	            //Saves the newly cropped image to the given image
	            targetImage.src = cropCanvas.toDataURL()
            }
        }
    }
}
//The next several functions are all about loading images!
function uploadImage(event, destination) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function() {
		var dataURL = reader.result;
		destination.src = dataURL;
	}
	reader.readAsDataURL(input.files[0]);
}
function retrieveLocalURL(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function() {
		addNewFrameOption(reader.result)
		// return reader.result;
	}
	reader.readAsDataURL(input.files[0]);
}
var savedArtList = [], cardArtUrlList = [], cardArtArtistList = []
function inputCardArtName(cardArtNameInput) {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			savedArtList = this.responseText.split('"art_crop":"')
			savedArtList.splice(0, 1)
			document.getElementById("inputCardArtNameNumber").max = savedArtList.length
			document.getElementById("inputCardArtNameNumber").value = 1
			for (i = 0; i < savedArtList.length; i ++) {
				cardArtUrlList[i] = savedArtList[i].split('","border_crop":')[0]
			}
			for (i = 0; i < savedArtList.length; i ++) {
				cardArtArtistList[i] = savedArtList[i].slice(savedArtList[i].indexOf('"artist":"') + 10, savedArtList[i].indexOf('","artist_id'));
				// cardArtArtistList[i] = cardArtArtistList[i].slice(0, cardArtArtistList[i].indexOf('","artist_id'))
			}
			inputCardArtNameNumber(1)
		} else if (this.readyState == 4 && this.status == 404) {
			alert("Sorry, but we can't seem to find any art for '" + cardArtNameInput + "'")
		}
	}
	xhttp.open("GET", "https://api.scryfall.com/cards/search?order=released&unique=art&q=name%3D" + cardArtNameInput.replace(/ /g, "_"), true)
	xhttp.send()
}
function inputCardArtNameNumber(cardArtNameNumberInput) {
	cardArt.src = cardArtUrlList[cardArtNameNumberInput - 1]
	document.getElementById("inputInfoArtist").value = cardArtArtistList[cardArtNameNumberInput - 1]
	updateBottomInfoCanvas()
}
//Downloads the image!
function downloadCardImage(linkElement) {
	if (document.getElementById("inputInfoArtist").value.replace(/ /g, "") != "") {
		linkElement.download = version.textList[0][1].toLowerCase().replace(/ /g, "_") + ".png"
		if (linkElement.download == ".png") {
			linkElement.download = "card.png"
		}
	} else {
		event.preventDefault()
		alert("You must properly credit an artist before downloading")
	}
	var cardImageData = cardFinalCanvas.toDataURL()
	if (cardImageData == undefined) {
		alert("Sorry, it seems that you cannot download your card. Please try using a different browser/device.")
	}
	linkElement.href = cardImageData
}




// function setCookie(cookieName, cookieValue, cookieTime = (5 * 365 * 24 * 60 * 60 * 1000)) { //years*days*hours*minutes*seconds*milliseconds
//   	var tempDate = new Date();
//   	tempDate.setTime(tempDate.getTime() + cookieTime);
//   	var expires = "expires=" + tempDate.toUTCString();
//   	document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
// }
// function getCookie(cookieName) {
//   	var name = cookieName + "=";
//   	var cookieArray = document.cookie.split(";");
//   	for(var i = 0; i < cookieArray.length; i++) {
//     	var tempCookie = cookieArray[i];
//     	while (tempCookie.charAt(0) == " ") {
//       		tempCookie = tempCookie.substring(1);
//     	}
//     	if (tempCookie.indexOf(name) == 0) {
//      		return tempCookie.substring(name.length, tempCookie.length);
//     	}
//   	}
//   	return "";
// }
// function checkCookies() {
// 	if (getCookie("tooltipsToggled") == "false") {
// 		toggleTooltips(false)
// 		document.getElementById("tooltipToggler").checked = false
// 	}
//     if (getCookie("advancedBorders") == "true") {
//         document.getElementById("checkboxAdvanced").checked = true
//         hideShowFrameTypes()
//     }
// }

















function textCodeTutorial() {
	var textCodeTutorialString = `line-skips to the next line
	_linenospace-skips to the next line, but doesn't add spacing
	_bar-skips to the next line, and adds the flavor text bar
	_flavor-skips to the next line, adds the flavor text bar, and italicizes the following text
	_i-italicizes the following text
	_/i-removes italics from the following text
	_fontsize#-changes the font size to # pixels
	_fontcolor#-changes the color to #. Can use color names, or hex codes
	_left-justifies text to the left
	_center-justifies text to the center
	_right-justifies text to the right
	_up#-moves the following text # pixels up
	_down#-moves the following text # pixels down
	_left#-moves the following text # pixels left
	_right#-moves the following text # pixels right
	_SYMBOL-creates a mana symbol, where SYMBOL can be: w, u, b, r, g, 1, 2, 3, etc...`
	var textCodeTutorialArray = textCodeTutorialString.split("_")
	for (var i = 0; i < textCodeTutorialArray.length; i ++) {
		document.getElementById("textCodeTutorial").innerHTML += "<div class='selectable'><b>{" + textCodeTutorialArray[i].split("-")[0] + "}</b></div><div>" + textCodeTutorialArray[i].split("-")[1] + "</div>"
	}
}

// //textCodeTutorial()
textCodeTutorial()
