//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
/* Initiate! */
window.onload = initiate;
function initiate() {
    window.CSVList = []
	window.version = {}
	window.cardWidth = 744;
	window.cardHeight = 1039;
    window.creditColor = "";
    if (window.location.search != "") {
        var parameters = window.location.search.replace('?', '').split('&');
        for (var i = 0; i < parameters.length; i ++) {
            var targetParameter = parameters[i].split('=');
            if (targetParameter[0] == 'width') {
                cardWidth = parseInt(targetParameter[1]);
            } else if (targetParameter[0] == 'height') {
                cardHeight = parseInt(targetParameter[1]);
            }
            if (targetParameter[0] == 'creditColor') {
                window.creditColor = "{fontcolor" + targetParameter[1] + "}";
            }
        }
    }
    window.whichTextIndex = 0;
	window.frameList = new Array();
	window.maskNameList = [];
	window.maskList = [];
	window.selectedFrame = -1;
	window.selectedMask = "";
	window.updateTextDelay = setTimeout(rewriteText, 500);
	window.cardMaster = document.getElementById("cardMaster");
	window.displayCanvas = document.getElementById("displayCanvas");
	document.getElementById("displayCanvas").width = cardWidth;
	document.getElementById("displayCanvas").height = cardHeight;
	window.displayContext = displayCanvas.getContext("2d");
    window.textCanvasesPadding = 100;
    window.newFrameInsertionLocation = 1;
	newCanvas("frameMask");
	newCanvas("frameFinal");
	newCanvas("text");
	newCanvas("line", textCanvasesPadding);
	newCanvas("paragraph");
	newCanvas("bottomInfo");
	newCanvas("setSymbol");
	newCanvas("watermark");
	newCanvas("transparent");
	newCanvas("crop");
	newCanvas("temp");
	newCanvas("cardFinal");
	//Mana symbol Array setup
	window.manaSymbolCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "w", "u", "b", "r", "g", "2w", "2u", "2b", "2r", "2g", "pw", "pu", "pb", "pr", "pg", "wu", "wb", "ub", "ur", "br", "bg", "rg", "rw", "gw", "gu", "x", "s", "c", "t","untap", "e", "y", "z", "1/2", "inf", "chaos", "plane", "l+", "l-", "l0", "oldtap", "artistbrush", "bar", "whiteBrush", "blackBrush"];
	window.manaSymbolImageList = [];
	//Manually create a few important images
	window.cardArt = new Image();
	window.setSymbol = new Image();
	window.watermark = new Image();
	cardArt.crossOrigin = "anonymous";
	setSymbol.crossOrigin = "anonymous";
	watermark.crossOrigin = "anonymous";
	cardArt.onload = function() {
        if (this.width / this.height > version.artWidth / version.artHeight) {
            document.getElementById("inputCardArtZoom").value = version.artHeight / this.height * 100;
        } else {
            document.getElementById("inputCardArtZoom").value = version.artWidth / this.width * 100;
        }
        document.getElementById("inputCardArtX").value = 0;
        document.getElementById("inputCardArtY").value = 0;
		cardMasterUpdated();
        document.getElementById("artPlaceholderImage").src = this.src;
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
//    document.body.appendChild(cropCanvas);
}


/* Loads all the image info from the CSV! */
function loadImageCSV(targetCSV) {
    if (!CSVList.includes(targetCSV)) {
        CSVList[CSVList.length] = targetCSV;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var splitImageCSV = (xhttp.responseText + " ").split("\n");
                for (var i = 1; i < splitImageCSV.length; i++) {
                    var splitIndividualImageCSV = splitImageCSV[i].split(",");
                    frameList[frameList.length] = new frameImage(splitIndividualImageCSV[0], "data/images/" + splitIndividualImageCSV[1], splitIndividualImageCSV[2], splitIndividualImageCSV[3].toString());
                    if (i == version.frameIndexToInsert + 1) {
                        version.trueFrameIndexToInsert = frameList.length - 1
                        version.frameIndexToInsert = "none";
                        frameList[frameList.length - 1].image.onload = function() {
                            cardMaster.insertBefore(frameList[version.trueFrameIndexToInsert].cardMasterElement("Full"), cardMaster.children[newFrameInsertionLocation]);
                            cardMasterUpdated();
                        };
                    }
                }
                for (var i = 0; i < frameList.length; i++) {
                    frameList[i].framePickerElement();
                }
                console.log("image csv loaded, happy card conjuring!");
                //Inserts a frame!
                if (version.frameIndexToInsert != "none") {
                    cardMaster.insertBefore(frameList[version.frameIndexToInsert].cardMasterElement("Full"), cardMaster.children[newFrameInsertionLocation]);
//                    version.frameIndexToInsert = "none";
                    cardMasterUpdated();
                }
            }
        }
        xhttp.open("GET", targetCSV, true);
        xhttp.send();
    }
}


/* Image Class */
class frameImage {
	constructor(display, path, masks, classes) {
		this.displayName = display;
		this.image = new Image();
        this.image.crossOrigin = "anonymous";
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
        this.framePickerClasses = ["frameOption"]
        if (classes.length > 0) {
            this.framePickerClasses = ("frameOption;" + classes.slice(0,classes.length - 1)).replace(/;/g, ";frameClass").split(";");
        }
        this.addedToFramePicker = false;
	}
	cardMasterElement(targetMask) {
		var tempElement = document.createElement("div");
		tempElement.id = "frameIndex" + frameList.indexOf(this);
		tempElement.classList.add("cardMasterElement");
		tempElement.innerHTML = "<span class='handle'>|||</span><div>" + this.displayName + " (" + targetMask + ") <br><input type='number' min='0' max='100' value='100' class='inputOpacity input' oninput='cardMasterUpdated()'><input type='checkbox' onchange='cardMasterUpdated()'><img class='zoom' src=" + this.image.src + "><img class='cardMasterElementMaskImage zoom' src=" + maskList[maskNameList.indexOf(targetMask.split(" - ")[0])].src + "></div><span class='closeCardMasterElement' onclick='deleteCardMasterElement(event)'>x</span>";
		return tempElement
	}
	framePickerElement(targetElement) {
        if (!this.addedToFramePicker) {
            this.addedToFramePicker = true;
            var tempElement = document.createElement("div");
            tempElement.id = "frameIndex" + frameList.indexOf(this);
            for (var i = 0; i < this.framePickerClasses.length; i++) {
                tempElement.classList.add(this.framePickerClasses[i]);
//                console.log(this.framePickerClasses)
            }
            tempElement.onclick = frameOptionClicked;
            tempElement.innerHTML = "<img src=" + this.image.src + ">";
            document.getElementById("framePicker").appendChild(tempElement);
//            return tempElement;
        } else {
            return
        }
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
//            alert(frameList[selectedFrame].maskOptionList);
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
		cardMaster.insertBefore(frameList[selectedFrame].cardMasterElement(selectedMask + right), cardMaster.children[newFrameInsertionLocation]);
		cardMasterUpdated();
	}
}
function deleteCardMasterElement(event) {
	event.target.parentElement.parentElement.removeChild(event.target.parentElement);
	cardMasterUpdated();
}
function addNewFrameOption(imageSource) {
    var availableMasks = "";
    for (var i = 2; i < maskNameList.length; i++) {
        availableMasks += maskNameList[i] + "-0-0-" + cardWidth + "-" + cardHeight + ";";
    }
    availableMasks = availableMasks.substring(0, availableMasks.length - 1);
    frameList[frameList.length] = new frameImage("Custom", imageSource, availableMasks, "Eternal;Custom ");
    frameList[frameList.length - 1].image.customVar = frameList.length - 1;
	frameList[frameList.length - 1].image.onload = function() {
		frameList[this.customVar].framePickerElement();
	}
}


/* Card Master Cool Stuff! */
function cardMasterUpdated() {
//    console.log("The card master is updating!");
	frameFinalContext.clearRect(0, 0, cardWidth, cardHeight);
	for (var i = cardMaster.children.length - 1; i >= 0; i--) {
		var targetChild = cardMaster.children[i];
		if (parseInt(targetChild.id.replace("frameIndex", "")) == -1) {
			//The card art placeholder is manually set to -1 and cannot be removed :)
            frameFinalContext.drawImage(cardArt, version.artX + getValue("inputCardArtX"), version.artY + getValue("inputCardArtY"), cardArt.width * getValue("inputCardArtZoom") / 100, cardArt.height * getValue("inputCardArtZoom") / 100);
        } else if (parseInt(targetChild.id.replace("frameIndex", "")) == -2) {
            if (i == 0) {
                newFrameInsertionLocation = 1;
            } else {
                newFrameInsertionLocation = 0;
            }
            frameFinalContext.drawImage(watermarkCanvas, 0, 0, cardWidth, cardHeight)
            frameFinalContext.drawImage(textCanvas, 0, 0, cardWidth, cardHeight);
        } else {
			var frameToDraw = frameList[parseInt(targetChild.id.replace("frameIndex", ""))];
			var opacityToDraw = targetChild.children[1].children[1].value / 100;
			var maskName = targetChild.innerHTML.slice(targetChild.innerHTML.indexOf("(") + 1, targetChild.innerHTML.indexOf(")"));
            var sectionMask = "none"
            if (maskName.includes(" - ")) {
                sectionMask = maskName.split(" - ")[1];
                maskName = maskName.split(" - ")[0];
            }
			var maskIndex = frameToDraw.maskOptionList.indexOf(maskName);
			var maskImageIndex = maskNameList.indexOf(maskName)
			//Clears the temporary mask canvas, draws the mask, draws the image over it, then copies it to the final frame canvas
			frameMaskContext.globalCompositeOperation = "source-over";
			frameMaskContext.clearRect(0, 0, cardWidth, cardHeight);
			frameMaskContext.drawImage(maskList[maskImageIndex], 0, 0, cardWidth, cardHeight);
			frameMaskContext.globalCompositeOperation = "source-in";
            if (sectionMask != "none") {
                frameMaskContext.drawImage(maskList[maskNameList.indexOf(sectionMask)], 0, 0, cardWidth, cardHeight);
            }
			frameMaskContext.drawImage(frameToDraw.image, frameToDraw.xList[maskIndex], frameToDraw.yList[maskIndex], frameToDraw.widthList[maskIndex], frameToDraw.heightList[maskIndex]);
			if (targetChild.children[1].children[2].checked == true) {
				frameFinalContext.globalCompositeOperation = "destination-out";
			}
			frameFinalContext.globalAlpha = opacityToDraw;
			frameFinalContext.drawImage(frameMaskCanvas, 0, 0, cardWidth, cardHeight);
			frameFinalContext.globalAlpha = 1;
            if (targetChild.children[1].children[2].checked == true) {
                frameFinalContext.globalCompositeOperation = "destination-over";
                frameFinalContext.drawImage(cardArt, version.artX + getValue("inputCardArtX"), version.artY + getValue("inputCardArtY"), cardArt.width * getValue("inputCardArtZoom") / 100, cardArt.height * getValue("inputCardArtZoom") / 100);
            }
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
    if (version.currentVersion == "planeswalker") {
        cardFinalContext.drawImage(planeswalkerCanvas, 0, 0, cardWidth, cardHeight);
    }
	cardFinalContext.drawImage(bottomInfoCanvas, 0, 0, cardWidth, cardHeight);
//    cardFinalContext.drawImage(textCanvas, 0, 0, cardWidth, cardHeight);
	cardFinalContext.drawImage(setSymbolCanvas, 0, 0, cardWidth, cardHeight)
    cardFinalContext.drawManaCost(document.getElementById("inputManaCost").value, version.manaCostX, version.manaCostY, version.manaCostDiameter, version.manaCostDistance, version.manaCostDirection, version.manaCostVersion)
	//Clear the corners
	cardFinalContext.globalCompositeOperation = "destination-out"
	cardFinalContext.drawImage(maskList[1], 0, 0, cardWidth, cardHeight)
	cardFinalContext.globalCompositeOperation = "source-over"
	//Copy it to the visible canvas
	displayContext.drawImage(cardFinalCanvas, 0, 0, cardWidth, cardHeight);
}


/* Loading/manipulating card versions */
function changeVersionTo(versionToChangeTo) {
    loadScript("data/versions/" + versionToChangeTo + ".js");
}
function finishChangingVersion(targetCSV = false) {
    for (var i = 0; i < version.masksToAdd.length; i++) {
        if (!maskNameList.includes(version.masksToAdd[i])) {
            maskNameList[maskNameList.length] = version.masksToAdd[i];
            maskList[maskList.length] = new Image();
            maskList[maskList.length - 1].crossOrigin = "anonymous";
            maskList[maskList.length - 1].src = "data/images/masks/" + version.masksToAdd[i].replace(/ /g, "") + ".png";
        }
    }
    document.getElementById("inputWhichTextTabs").innerHTML = ""
	for (var i = 0; i < version.textList.length; i ++) {
		document.getElementById("inputWhichTextTabs").innerHTML += "<div class='textTabButton' onclick='textTabFunction(event, `" + version.textList[i][0] + "`)'>" + version.textList[i][0] + "</div>"
        if (i == 0) {
            document.getElementsByClassName("textTabButton")[0].classList.add("activeTextTab")
        }
	}
	console.log("version changed, time to load the image csv")
    if (targetCSV != false) {
        loadImageCSV(targetCSV);
    }
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
function updateText() {
    version.textList[whichTextIndex][1] = document.getElementById("inputText").value
    clearTimeout(updateTextDelay)
    updateTextDelay = setTimeout(rewriteText, 250);
}
function rewriteText() {
	textContext.clearRect(0, 0, cardWidth, cardHeight)
    for (var i = 0; i < version.textList.length; i ++) {
        if (version.textList[i][10]) {
            if (version.textList[i][10] != "ignore") {
                window[version.textList[i][10]]();
            }
        } else {
            textContext.writeText(version.textList[i][1], version.textList[i][2], version.textList[i][3], version.textList[i][4], version.textList[i][5], version.textList[i][6], version.textList[i][7], version.textList[i][8], version.textList[i][9]);
        }
    }
    cardMasterUpdated()
}


/* functions for all the little parts of the card */
function updateBottomInfoCanvas() {
	window[version.bottomInfoFunction]()
}


/* Misc/general convenient little functions */
function scale(input) {
	return input * cardWidth / 744;
}
function getValue(elementId) {
	return parseFloat(document.getElementById(elementId).value)
}
function beforeAfter(targetString, beforeString, afterString) {
    if (targetString.includes(beforeString) && targetString.includes(afterString)) {
        return targetString.split(beforeString)[1].split(afterString)[0];
    } else {
        return "";
    }
}


/* Functions that make stuff */
function newCanvas(newCanvasName, padding = 0) {
	window[newCanvasName + "Canvas"] = document.createElement("canvas");
	window[newCanvasName + "Canvas"].width = cardWidth + padding * 2;
	window[newCanvasName + "Canvas"].height = cardHeight + padding * 2;
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
    if (version.currentVersion == "future") {
        //Also center the set symbol horizontally
        setSymbolX = version.setSymbolRight - setSymbolWidth / 2;
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
    cardMasterUpdated();
}

//Custom text function! This acts on any codes and makes things look nice :)
CanvasRenderingContext2D.prototype.writeText = function(text = "", textX = 0, textY = 0, textWidth = cardWidth, textHeight = cardHeight, textFont = "belerenbsc", inputTextSize = 38, textColor="black", other="", completionFunction) {
    paragraphContext.clearRect(0, 0, cardWidth, cardHeight)
	var textSize = inputTextSize
	lineContext.font = textSize + "px " + textFont
	lineContext.fillStyle = textColor
	var otherParameters = other.split(",")
	var outline, shadow = 0, oneLine = false, outlineWidth = 2, textAlign = "left", verticalAlign = true, lineSpace = 1, userHorizontalShift = 0
	for (var i = 0; i < otherParameters.length; i ++) {
		eval(otherParameters[i])
	}
	lineContext.strokeStyle = outline
	lineContext.lineWidth = outlineWidth
	var currentLineX = textCanvasesPadding + userHorizontalShift
	var currentLineY = textY + (textSize * 0.45) //+ textCanvasesPadding
	var uniqueSplitter = "9dn57gwbt4sh"
	var splitString = text.replace(/\n/g, "{line}").replace(/ /g, uniqueSplitter +  " " + uniqueSplitter).replace(/{/g, uniqueSplitter + "{").replace(/}/g, "}" + uniqueSplitter).split(uniqueSplitter)
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
					lineContext.drawImage(manaSymbolImageList[63], textX + textWidth / 2 - barWidth / 2, currentLineY + textSize * 0.6, barWidth, barHeight)
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
                    userHorizontalShift -= (parseInt(possibleCodeLower.slice(4, possibleCodeLower.length)));
                    currentLineX -= (parseInt(possibleCodeLower.slice(4, possibleCodeLower.length)));
				} else if (possibleCodeLower.includes("right")) {
                    userHorizontalShift += (parseInt(possibleCodeLower.slice(5, possibleCodeLower.length)));
                    currentLineX += (parseInt(possibleCodeLower.slice(5, possibleCodeLower.length)));
				} else if (possibleCodeLower == "artistbrush") {
					var artistBrushWidth = textSize * 1.2
					lineContext.drawImage(manaSymbolImageList[62], currentLineX, currentLineY - artistBrushWidth * 0.58, artistBrushWidth, artistBrushWidth * 13 / 21)
					currentLineX += artistBrushWidth * 1.1
                } else if (possibleCodeLower == "oldartistbrush") {
                    var artistBrushWidth = textSize * 2.4
                    if (lineContext.fillStyle == "#ffffff" || lineContext.fillStyle == "white") {
                        lineContext.drawImage(manaSymbolImageList[64], currentLineX, currentLineY - artistBrushWidth * 13 / 63, artistBrushWidth, artistBrushWidth * 13 / 63);
                    } else {
                        lineContext.drawImage(manaSymbolImageList[65], currentLineX, currentLineY - artistBrushWidth * 13 / 63, artistBrushWidth, artistBrushWidth * 13 / 63);
                    }
                    currentLineX += artistBrushWidth * 1.1
                } else if (possibleCodeLower.includes("fontcolor")) {
					lineContext.fillStyle = possibleCodeLower.slice(9, possibleCodeLower.length)
				} else if (possibleCodeLower.includes("font")) {
					textFont = possibleCodeLower.slice(5, possibleCodeLower.length)
					lineContext.font = textSize + "px " + textFont
                } else if (possibleCodeLower.includes("outline:")) {
                    outline = true;
                    lineContext.strokeStyle = possibleCodeLower.replace("outline:", "").split(",")[0];
                    lineContext.lineWidth = parseInt(possibleCodeLower.replace("outline:", "").split(",")[1]);
                } else if (possibleCodeLower.includes("shadow")) {
                    shadow = parseInt(possibleCodeLower.replace("shadow", ""));
                } else if (manaSymbolCodeList.includes(possibleCodeLower.split("/").join(""))) {
					//THIS HAS TO BE THE LAST ONE
					var manaSymbolDiameter = textSize * 0.77
					lineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(possibleCodeLower.split("/").join(""))], currentLineX, currentLineY - manaSymbolDiameter * 0.95, manaSymbolDiameter, manaSymbolDiameter)
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
				if (currentLineX - textCanvasesPadding + currentWordWidth > textWidth || finishLine) {
					//Finish the line
					if (oneLine && i != splitString.length - 1 && inputTextSize > 1) {
						lineContext.clearRect(0, 0, cardWidth + 2 * textCanvasesPadding, cardHeight + 2 * textCanvasesPadding)
						this.writeText(text, textX, textY, textWidth, textHeight, textFont, inputTextSize - 1, textColor, other)
						return
					}
					var alignAdjust = 0
					if (textAlign == "center" || textAlign == "right") {
						if (lastWordAdded == " ") {
							currentLineX -= textContext.measureText("   ").width
						}
						if (textAlign == "center") {
							alignAdjust = textWidth / 2 - (currentLineX - textCanvasesPadding) / 2 + textX
						} else if (textAlign == "right") {
							alignAdjust = textWidth + textX - currentLineX + textCanvasesPadding
						}
					} else {
						alignAdjust += textX
					}
					paragraphContext.drawImage(lineCanvas, 0 + alignAdjust - textCanvasesPadding, 0, cardWidth + 2 * textCanvasesPadding, cardHeight + 2 * textCanvasesPadding)
					lineContext.clearRect(0, 0, cardWidth + 2 * textCanvasesPadding, cardHeight + 2 * textCanvasesPadding)
					currentLineY += textSize * lineSpace
					currentLineX = textCanvasesPadding + userHorizontalShift
					if (wordToWrite == " ") {
						currentWordWidth = 0
					}
				}
				//Whether or not the current line is finished, write to it.
				if (shadow > 0) {
                    lineContext.fillStyle = "black";
                    lineContext.fillText(wordToWrite, currentLineX + shadow, currentLineY + shadow);
                    lineContext.fillStyle = textColor;
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
    if (text != "") {
//        console.log(text)
    }
    if (completionFunction) {
        window[completionFunction]();
    }
    return "done"
}
//Loads up all the mana symbol images
function loadManaSymbolImages() {
	for (var i = 0; i < manaSymbolCodeList.length; i++) {
		manaSymbolImageList[i] = new Image()
        manaSymbolImageList[i].crossOrigin = "anonymous";
		manaSymbolImageList[i].src = "data/images/manaSymbols/" + i + ".png"
	}
}
//Draws a mana cost
CanvasRenderingContext2D.prototype.drawManaCost = function(text, symbolsX, symbolsY, diameter = 50, distance = -50, direction = "horizontal", version = "m15") {
	var splitManaCost = text.toLowerCase().replace(/{/g, " ").replace(/}/g, " ").split("/").join("").split(" ")
    if (version == "future") {
        splitManaCost.reverse();
    }
	var currentSymbolIndex = 0
	var currentX = symbolsX
	var currentY = symbolsY
    var realManaCostIndex = 0;
	for (var i = splitManaCost.length - 1; i >= 0; i --) {
		if (manaSymbolCodeList.includes(splitManaCost[i])) {
//            console.log(realManaCostIndex, splitManaCost[i])
			if (Array.isArray(direction) && realManaCostIndex < direction.length) {
				currentX = direction[realManaCostIndex][0]
				currentY = direction[realManaCostIndex][1]
			}
            if (version == "m15") {
                this.fillStyle = "black"
                this.beginPath()
                this.arc(currentX + diameter / 2.13, currentY + diameter / 1.7, diameter / 2, 0, 2 * Math.PI, false)
                this.fill()
                this.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(splitManaCost[i])], currentX, currentY, diameter, diameter)
            } else if (version == "justTheSymbol") {
                this.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(splitManaCost[i])], currentX, currentY, diameter, diameter)
            } else if (version == "seventh") {
                this.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(splitManaCost[i])], currentX, currentY, diameter, diameter)
            } else if (version == "future") {
                if (realManaCostIndex < direction.length) {
                    if (window.version.futureManaSymbolNameList.includes(splitManaCost[i]) && window.version.futureManaSymbolImageList[window.version.futureManaSymbolNameList.indexOf(splitManaCost[i])]) {
                        this.drawImage(window.version.futureManaSymbolImageList[window.version.futureManaSymbolNameList.indexOf(splitManaCost[i])], currentX, currentY, diameter, diameter)
                    } else {
                        this.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(splitManaCost[i])], currentX, currentY, diameter, diameter)
                    }
                }
            }
			if (direction == "horizontal") {
				currentX += distance
			} else if (direction == "vertical") {
				currentY += distance
            }
            realManaCostIndex += 1;
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
                pix.x.sort(function(a,b){return a-b});
                pix.y.sort(function(a,b){return a-b});
                var n = pix.x.length - 1;
	            //Finds the difference between the leftmost and rightmost visible pixels, and the topmost and bottommost pixels, cuts out a section of the canvas
                width = pix.x[n] - pix.x[0];
                height = pix.y[n] - pix.y[0];
                var cropped = cropContext.getImageData(pix.x[0], pix.y[0], width + 1, height + 1);
	            //Resizes the canvas and draws cropped image
                cropCanvas.width = width + 1;
                cropCanvas.height = height + 1;
                cropContext.putImageData(cropped, 0, 0);
	            //Saves the newly cropped image to the given image
                setTimeout(function() {targetImage.src = cropCanvas.toDataURL();}, 100)
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
        if (destination == setSymbol) {
            autocrop(setSymbol)
        }
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
	_SYMBOL-creates a mana symbol, where SYMBOL can be: w, u, b, r, g, 1, 2, 3, etc...
    _outline:*,#-outlines the following text with # thickness and * color
    _shadow#-creates a text shadow # pixels left and # pixels right`
	var textCodeTutorialArray = textCodeTutorialString.split("_")
	for (var i = 0; i < textCodeTutorialArray.length; i ++) {
		document.getElementById("textCodeTutorial").innerHTML += "<div class='selectable'><b>{" + textCodeTutorialArray[i].split("-")[0] + "}</b></div><div>" + textCodeTutorialArray[i].split("-")[1] + "</div>"
	}
}

// //textCodeTutorial()
textCodeTutorial()
loadSampleImages()




function filterFramePicker(classToShow) {
    var framePickerList = document.getElementsByClassName("frameOption")
    for (var i = 0; i < framePickerList.length; i++) {
        if (!framePickerList[i].classList.contains("hidden") && !framePickerList[i].classList.contains(classToShow) && !framePickerList[i].classList.contains("frameClassEternal")) {
            framePickerList[i].classList.add("hidden")
        } else if (framePickerList[i].classList.contains(classToShow) && framePickerList[i].classList.contains("hidden")) {
            framePickerList[i].classList.remove("hidden")
        }
    }
}


function loadSampleImages() {
    var availableSamples = 12;
    var samplesToLoad = [0,0,0];
    for (var i = 1; i <= samplesToLoad.length; i ++) {
        var sampleImage = new Image()
        sampleImage.customVarIndex = i;
        var randomIndex = 0;
        sampleImage.onload = function() {
            document.getElementById(("sample" + this.customVarIndex)).src = this.src;
        }
        while(samplesToLoad[i - 1] == 0) {
            randomIndex = Math.floor(Math.random() * (availableSamples)) + 1;
            if (!samplesToLoad.includes(randomIndex)) {
                samplesToLoad[i - 1] = randomIndex;
            }
        }
        sampleImage.src = "data/site/images/samples/" + randomIndex + ".png";
    }
    //Donate card stuff!
    var cardWishlist = [["Riku of Two Reflections", "https://img.scryfall.com/cards/large/front/7/1/716d0b3b-bac9-4fb8-882e-bd6171864043.jpg?1562916032"], ["Klothys, God of Destiny", "https://img.scryfall.com/cards/large/front/4/d/4d747889-04db-4e7a-ad4c-7549514b5112.jpg?1577968427"], ["Ramunap Excavator", "https://img.scryfall.com/cards/large/front/9/0/90a54d18-8403-441d-a115-ee462fabdabb.jpg?1562806928"], ["Birds of Paradise", "https://img.scryfall.com/cards/large/front/f/e/feefe9f0-24a6-461c-9ef1-86c5a6f33b83.jpg?1576382980"], ["Xantcha, Sleeper Agent", "https://img.scryfall.com/cards/large/front/8/9/89b03b9a-7e20-47cb-bc64-23513acea855.jpg?1566340797"],["Adobe Photoshop... Wait, that's not a card! Regardless, I would love to see what frames I could add if I had photoshop","https://i0.wp.com/www.keysbundle.com/wp-content/uploads/2019/09/768px-Adobe_Photoshop_CC_icon.svg.png?fit=768%2C749&ssl=1"]];
    var randomWishlistCard = cardWishlist[Math.floor(Math.random() * cardWishlist.length)];
    document.getElementById("wishlistCardName").innerHTML = randomWishlistCard[0];
    var wishlistCardImage = new Image();
    wishlistCardImage.onload = function() {
        document.getElementById("wishlistCardImage").src = this.src;
    }
    wishlistCardImage.src = randomWishlistCard[1];
}



function toggleFrameOptionVisibility() {
    var frameOptionList = document.getElementsByClassName("frameOption")
    if (document.getElementById("inputCheckboxHideFrames").checked) {
        for (var i = 0; i < frameOptionList.length; i ++) {
            frameOptionList[i].classList.remove("visibilityOverride");
        }
    } else {
        for (var i = 0; i < frameOptionList.length; i ++) {
            frameOptionList[i].classList.add("visibilityOverride");
        }
    }
}

//inputCardNameNumberTextImport
var savedImportResponse = ""
function inputCardNameTextImport(cardName) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            savedImportResponse = this.responseText.split('{"object":"card"');
            inputCardNameNumberTextImport(1);
            document.getElementById("inputCardNameNumberTextImport").max = savedImportResponse.length - 1;
            document.getElementById("inputCardNameNumberTextImport").value = 1;
        } else if (this.readyState == 4 && this.status == 404) {
            savedImportResponse = ""
            alert("Sorry, but we can't seem to find any card named '" + cardName + "'");
        }
    }
    xhttp.open("GET", "https://api.scryfall.com/cards/search?order=released&q=name%3D" + cardName.replace(/ /g, "+"), true);
    xhttp.send();
}
function inputCardNameNumberTextImport(index) {
    var importCardTextResponse = savedImportResponse[index]//.split('{"object":"related_card"')[0]
    importText(beforeAfter(importCardTextResponse, '"name":"', '",'), "Title");
    importText(beforeAfter(importCardTextResponse, '"type_line":"', '",'), "Type");
    importText(beforeAfter(importCardTextResponse, '"oracle_text":"', '",').replace(/\\n/g, "\n").replace(/ \\"/g, ' \u201C').replace(/\\"/g, '\u201D').replace(/\(/g, "{i}(").replace(/\)/g, "){/i}"), "Rules Text");
    if (importCardTextResponse.includes('"power":"')) {
        importText(beforeAfter(importCardTextResponse, '"power":"', '",') + "/" + beforeAfter(importCardTextResponse, '"toughness":"', '",'), "Power Toughness");
    } else {
        importText("", "Power Toughness");
    }
    if (importCardTextResponse.includes('"loyalty":"') && version.currentVersion == "planeswalker") {
        importText(beforeAfter(importCardTextResponse, '"loyalty":"', '",'), "Loyalty");
        var abilityList = beforeAfter(importCardTextResponse, '"oracle_text":"', '",').replace(/ \\"/g, ' \u201C').replace(/\\"/g, '\u201D').split(/\\n/g);
        for (var i = 0; i < abilityList.length; i++) {
            var stringVersion = ""
            switch(i) {
                case 3:
                    stringVersion = "Fourth"
                    break;
                case 2:
                    stringVersion = "Third"
                    break;
                case 1:
                    stringVersion = "Second"
                    break;
                default:
                    stringVersion = "First"
            }
            if (abilityList[i].slice(0, 4).includes(":")) {
                importText(abilityList[i].split(/: (.+)?/)[1], stringVersion + " Ability");
                document.getElementById("inputPlaneswalker" + (i + 1) + "Icon").value = abilityList[i].split(/: (.+)?/)[0];
            } else {
                importText("{left24}" + abilityList[i], stringVersion + " Ability");
                document.getElementById("inputPlaneswalker" + (i + 1) + "Icon").value = "";
            }
            if (document.getElementById("inputPlaneswalker" + (i + 1)).value < 1) {
                document.getElementById("inputPlaneswalker" + (i + 1)).value = 1;
            }
        }
    }
    document.getElementById("inputManaCost").value = beforeAfter(importCardTextResponse, '"mana_cost":"', '",');
    document.getElementById("inputCardArtName").value = beforeAfter(importCardTextResponse, '"name":"', '",');
    document.getElementById("inputSetCode").value = beforeAfter(importCardTextResponse, '"set":"', '",');
    document.getElementById("inputSetRarity").value = beforeAfter(importCardTextResponse, '"rarity":"', '",')[0];
    autocrop(setSymbol, "https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + document.getElementById("inputSetCode").value + "&size=large&rarity=" + document.getElementById("inputSetRarity").value);
    inputCardArtName(beforeAfter(importCardTextResponse, '"name":"', '",'));
}
function importText(text, target) {
    for (var i = 0; i < version.textList.length; i++) {
        if (version.textList[i][0] == target) {
            if (i == whichTextIndex) {
                document.getElementById("inputText").value = text;
            } else {
                version.textList[i][1] = text;
            }
            updateText();
        }
    }
}




var inputsToRemoveAutocorrect = document.querySelectorAll("input");

inputsToRemoveAutocorrect.forEach(input => {
    input.setAttribute("autocomplete", "off")
    input.setAttribute("autocorrect", "off")
    input.setAttribute("autocapitalize", "off")
    input.setAttribute("spellcheck", false)
})




