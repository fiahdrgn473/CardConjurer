//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
/* Initiate! */
window.onload = initiate
function initiate() {
	var cardWidth = 750, cardHeight = 1050;
	displayCanvas = document.getElementById("displayCanvas");
	document.getElementById("displayCanvas").width = cardWidth;
	document.getElementById("displayCanvas").height = cardHeight;
	displayContext = displayCanvas.getContext("2d");
	loadScript("data/scripts/sortable.js");
	// var el = document.getElementById('items');
	// var sortable = Sortable.create(el);
}






// import Sortable from './data/scripts/sortable.js'










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
	document.getElementById(targetTab).classList.add("tabVisible")
	event.target.classList.add("tabOptionSelected")
}
function loadScript(scriptPath){
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("src", scriptPath);
	if (typeof script != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(script);
	}
}










// //Define some variables
// var cardWidth = 750, cardHeight = 1050
// var version = {}
// var date = new Date()
// var initiated = false
// var suggestedColor = "White"
// document.getElementById("inputInfoNumber").value = date.getFullYear()
// //Make all the canvases and their contexts
// var mainCanvas = document.getElementById("mainCanvas")
// mainCanvas.width = cardWidth
// mainCanvas.height = cardHeight
// var mainContext = mainCanvas.getContext("2d")
// var canvasList = ["card", "mask", "image", "text", "paragraph", "line", "transparent", "crop", "bottomInfo", "setSymbol", "watermark", "temp"]
// for (var i = 0; i < canvasList.length; i++) {
// 	window[canvasList[i] + "Canvas"] = document.createElement("canvas")
// 	window[canvasList[i] + "Canvas"].width = cardWidth
// 	window[canvasList[i] + "Canvas"].height = cardHeight
// 	window[canvasList[i] + "Context"] = window[canvasList[i] + "Canvas"].getContext("2d")
// }
// //Create the arrays that keeps track of what parts of the card are what
// var cardMasterTypes = []
// var cardMasterImages = []
// //var cardMasterOpacity = []
// var cardMasterOpacityValue = []
// //Mana symbol Array setup
// var manaSymbolCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "w", "u", "b", "r", "g", "2w", "2u", "2b", "2r", "2g", "pw", "pu", "pb", "pr", "pg", "wu", "wb", "ub", "ur", "br", "bg", "rg", "rw", "gw", "gu", "x", "s", "c", "t","untap", "e", "y", "z", "1/2", "inf", "chaos", "plane", "l+", "l-", "l0", "oldtap", "artistbrush", "bar"]
// var manaSymbolImageList = []
// //Manually create a few important images
// var cardArt = new Image(), setSymbol = new Image(), watermark = new Image()
// cardArt.crossOrigin = "anonymous"
// setSymbol.crossOrigin = "anonymous"
// watermark.crossOrigin = "anonymous"
// cardArt.onload = function() {
// 	updateCardCanvas()
// }
// setSymbol.onload = function() {
// 	updateSetSymbolCanvas()
// }
// watermark.onload = function() {
// 	updateWatermarkCanvas()
// }
// //Load the mana symbol images
// loadManaSymbolImages()
// //Load the CSV full of image data
// loadImageSpreadsheet()


// //============================================//
// //                 Functions                  //
// //============================================//
// var nameArray = []
// //Load the CSV full of image data
// function loadImageSpreadsheet() {
// 	var xhttp = new XMLHttpRequest()
// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4) {
// 			var rawText = xhttp.responseText.split("\n")
// 			for (var i = 0; i < rawText.length; i ++) {
// 				for (var n = 0; n < rawText[0].split(",").length; n++) {
// 					if (i == 0) {
// 						window[rawText[0].split(",")[n].trim() + "Array"] = []
// 					} else {
// 						window[rawText[0].split(",")[n].trim() + "Array"][i - 1] = rawText[i].split(",")[n].trim()
// 					}
// 				}
//                 if (i != 0) {
//                     nameArray[i - 1] = versionArray[i - 1] + colorArray[i - 1] + typeArray[i - 1]
//                 }
// 				if (i == rawText.length - 1) {
//                     init()
// 				}
// 			}
// 		}
// 	}
// 	xhttp.open("GET", "data/images/imageSpreadsheet.csv", true)
// 	xhttp.send()
// }
// //After the csv has been loaded, the init function runs.
// function init() {
// 	//Loads the base version (m15)
// 	changeVersionTo("m15")
// 	//Loads all the masks
// 	for (var i = 0; i < colorArray.length; i ++) {
// 		if (colorArray[i] == "Mask") {
// 			loadImage(i)
// 		}
// 	}
// 	//Runs any tests. This should not do anything when published.
// 	setTimeout(testFunction, 100)
//     initiated = true
//     textCodeTutorial()
//     //Checks cookies!
//     setTimeout(checkCookies, 100)
// }
// //Loads an image. Only actually loads images the first time each image is loaded, otherwise assigns it.
// function loadImage(index, target = "none") {
// 	if (window[nameArray[index]] == undefined) {
// 		window[nameArray[index]] = new customImage(index, target)
// 	} else {
// 		addToCardMaster(index, target)
// 	}
// }
// //Special image object
// function customImage(index, target) {
// 	this.loaded = false
// 	this.index = index
// 	this.image = new Image()
// 	this.image.src = "data/images/" + nameArray[index] + ".png"
// 	this.image.onload = function() {
// 		window[nameArray[index]].loaded = true
// 		addToCardMaster(index, target)
// 	}
// }
// //Adds an image to the card master. Replaces the previous one if it already existed
// function addToCardMaster(index, target) {
// 	if (target == "preview") {
// 		document.getElementById("imgPreview").src = window[nameArray[index]].image.src
// 		return
// 	}
//     if (document.getElementById("checkboxSecondary").checked) {
//         target += "Secondary"
//     }
// 	if ((target == typeArray[index]) || (secondaryArray[index] && target.replace("Secondary", "")) == typeArray[index] || (typeArray[index] == "Full")) {
// 		if (cardMasterTypes.includes(target)) {
// 			cardMasterImages[cardMasterTypes.indexOf(target)] = window[nameArray[index]]
// 		} else {
// 			cardMasterImages[cardMasterTypes.length] = window[nameArray[index]]
// 			cardMasterTypes[cardMasterTypes.length] = target
// 		}
// 		cardMasterUpdated()
// 	}
// }
// //Runs through all the assigned card images and draws them in
// function cardMasterUpdated() {
// 	imageContext.clearRect(0, 0, cardWidth, cardHeight)
// 	for (var i = 0; i < version.typeOrder.length; i ++) {
// 		if (cardMasterTypes.includes(version.typeOrder[i])) {
// 			imageContext.mask(cardMasterTypes.indexOf(version.typeOrder[i]))
// 		}
// 	}
// }
// //Custom function that draws onto a canvas using masks
// CanvasRenderingContext2D.prototype.mask = function(cardMasterIndex) {
// 	maskContext.clearRect(0, 0, cardWidth, cardHeight)
// 	maskContext.globalCompositeOperation = "source-over"
// 	if (cardMasterTypes[cardMasterIndex].includes("Secondary")) {
// 		maskContext.drawImage(window[nameArray[nameArray.indexOf("noneMaskSecondary")]].image, 0, 0, cardWidth, cardHeight)
// 		maskContext.globalCompositeOperation = "source-in"
// 	}
// 	var maskToUse = window[versionArray[cardMasterImages[cardMasterIndex].index] + "Mask" + cardMasterTypes[cardMasterIndex].replace("Secondary", "")]
// 	if (maskToUse != undefined) {
// 		maskContext.drawImage(maskToUse.image, xArray[maskToUse.index] * cardWidth, yArray[maskToUse.index] * cardHeight, widthArray[maskToUse.index] * cardWidth, heightArray[maskToUse.index] * cardHeight)
// 		maskContext.globalCompositeOperation = "source-in"
// 	}
// 	var mainImageIndex = cardMasterImages[cardMasterIndex].index
//     maskContext.drawImage(cardMasterImages[cardMasterIndex].image, xArray[mainImageIndex] * cardWidth, yArray[mainImageIndex] * cardHeight, widthArray[mainImageIndex] * cardWidth, heightArray[mainImageIndex] * cardHeight)
//     this.globalAlpha = cardMasterOpacityValue[version.typeOrder.indexOf(cardMasterTypes[cardMasterIndex].replace("Secondary", ""))] / 100
// 	this.drawImage(maskCanvas, 0, 0, cardWidth, cardHeight)
//     this.globalAlpha = 1
// 	if (cardMasterTypes[cardMasterIndex].includes("RareStamp")) {
// 		this.drawImage(window[nameArray[nameArray.indexOf("noneMaskStamp")]].image, version.rareStampX, version.rareStampY, version.rareStampWidth, version.rareStampHeight)
// 	}
// 	updateImageCanvas()
// }
// //All the canvas functions
// function updateImageCanvas() {
// //    imageContext.globalCompositeOperation = "destination-out"
// //    for (var i = 0; i < cardMasterOpacity.length; i ++) {
// //        imageContext.globalAlpha = 1 - cardMasterOpacityValue[i] / 100
// //        opacityImage = window[version.currentVersion + "Mask" + cardMasterOpacity[i]].image
// //        imageContext.drawImage(opacityImage, 0, 0, cardWidth, cardHeight)
// //    }
// //    imageContext.globalAlpha = 1
// //    imageContext.globalCompositeOperation = "source-over"
// 	updateBottomInfoCanvas()
// }
// function updateTextCanvas() {
// 	//post processing?
// 	updateCardCanvas()
// }
// var currentlyWritingText = false
// //Rewrites all the text!
// function updateText() {
//     if (!currentlyWritingText) {
//         currentlyWritingText = true
//         setTimeout(updateTextInnerShell, 100)
//     }
// }
// function updateTextInnerShell() {
//     version.textList[whichTextIndex][1] = document.getElementById("inputText").value
//     textContext.clearRect(0, 0, cardWidth, cardHeight)
//     for (var i = 0; i < version.textList.length; i ++) {
//         var waitUntilIAmDone = textContext.writeText(version.textList[i][1], version.textList[i][2], version.textList[i][3], version.textList[i][4], version.textList[i][5], version.textList[i][6], version.textList[i][7], version.textList[i][8], version.textList[i][9])
//         updateTextCanvas()
//     }
// }
// //figures out the placing of the set symbol
// function updateSetSymbolCanvas() {
// 	setSymbolContext.clearRect(0, 0, cardWidth, cardHeight)
// 	var setSymbolWidth, setSymbolHeight, setSymbolX, setSymbolY
// 	if (version.setSymbolWidth / version.setSymbolHeight < setSymbol.width / setSymbol.height) {
// 		//wider
// 		setSymbolWidth = version.setSymbolWidth
// 		setSymbolHeight = version.setSymbolWidth / setSymbol.width * setSymbol.height
// 		setSymbolX = version.setSymbolRight - setSymbolWidth
// 		setSymbolY = version.setSymbolVertical - setSymbolHeight / 2
// 	} else {
// 		//taller
// 		setSymbolHeight = version.setSymbolHeight
// 		setSymbolWidth = version.setSymbolHeight / setSymbol.height * setSymbol.width
// 		setSymbolX = version.setSymbolRight - setSymbolWidth
// 		setSymbolY = version.setSymbolVertical - setSymbolHeight / 2
// 	}
// 	setSymbolContext.drawImage(setSymbol, setSymbolX, setSymbolY, setSymbolWidth, setSymbolHeight)
// 	updateCardCanvas()
// }
// function updateWatermarkCanvas() {
// 	if (document.getElementById("inputWatermarkPrimary").value != "none") {
// 		watermarkContext.clearRect(0, 0, cardWidth, cardHeight)
// 		var watermarkX, watermarkY, watermarkWidth, watermarkHeight
// 		if (version.watermarkWidth / version.watermarkHeight < watermark.width / watermark.height) {
// 			//wider
// 			watermarkWidth = version.watermarkWidth
// 			watermarkHeight = version.watermarkWidth / watermark.width * watermark.height
// 			watermarkX = cardWidth / 2 - watermarkWidth / 2
// 			watermarkY = version.watermarkY - watermarkHeight / 2
// 		} else {
// 			//taller
// 			watermarkHeight = version.watermarkHeight
// 			watermarkWidth = version.watermarkHeight / watermark.height * watermark.width
// 			watermarkX = cardWidth / 2 - watermarkWidth / 2
// 			watermarkY = version.watermarkY - watermarkHeight / 2
// 		}
// 		watermarkContext.drawImage(watermark, watermarkX, watermarkY, watermarkWidth, watermarkHeight)
// 		watermarkContext.globalCompositeOperation = "source-in"
// 		if (document.getElementById("inputWatermarkPrimary").value != "default") {
// 			watermarkContext.fillStyle = document.getElementById("inputWatermarkPrimary").value
// 			watermarkContext.fillRect(0, 0, cardWidth, cardHeight)
// 		}
// 		if (document.getElementById("inputWatermarkSecondary").value != "none") {
// 			watermarkContext.globalCompositeOperation = "source-atop"
// 			tempContext.clearRect(0, 0, cardWidth, cardHeight)
// 			tempContext.drawImage(window[nameArray[nameArray.indexOf("noneMaskSecondary")]].image, 0, 0, cardWidth, cardHeight)
// 			tempContext.globalCompositeOperation = "source-in"
// 			if (document.getElementById("inputWatermarkSecondary").value == "default") {
// 				tempContext.drawImage(watermark, watermarkX, watermarkY, watermarkWidth, watermarkHeight)
// 			} else {
// 				tempContext.fillStyle = document.getElementById("inputWatermarkSecondary").value
// 				tempContext.fillRect(0, 0, cardWidth, cardHeight)
// 			}
// 			tempContext.globalCompositeOperation = "source-over"
// 			watermarkContext.drawImage(tempCanvas, 0, 0, cardWidth, cardHeight)
// 		}
// 		watermarkContext.globalCompositeOperation = "source-over"
// 	} else {
// 		watermarkContext.clearRect(0, 0, cardWidth, cardHeight)
// 	}
// 	updateCardCanvas()
// }
// //Does the bottom info function! This can be different depending on the version.
// function updateBottomInfoCanvas() {
// 	window[version.bottomInfoFunction]()
// }
// function updateCardCanvas() {
//     if (!initiated) {
//         return
//     }
// 	//clear it
// 	cardContext.fillStyle = "black"
// 	cardContext.fillRect(0, 0, cardWidth, cardHeight)
// 	//draw the art, frame, text, mana symbols, set symbol, watermark...
// 	cardContext.drawImage(cardArt, version.artX + getValue("inputCardArtX"), version.artY + getValue("inputCardArtY"), cardArt.width * getValue("inputCardArtZoom") / 100, cardArt.height * getValue("inputCardArtZoom") / 100)
// 	cardContext.drawImage(imageCanvas, 0, 0, cardWidth, cardHeight)
// 	cardContext.drawImage(watermarkCanvas, 0, 0, cardWidth, cardHeight)
// 	cardContext.drawImage(textCanvas, 0, 0, cardWidth, cardHeight)
// 	cardContext.drawImage(bottomInfoCanvas, 0, 0, cardWidth, cardHeight)
// 	cardContext.drawManaCost(document.getElementById("inputManaCost").value, version.manaCostX, version.manaCostY, version.manaCostDiameter, version.manaCostDistance, version.manaCostDirection)
// 	cardContext.drawImage(setSymbolCanvas, 0, 0, cardWidth, cardHeight)
// 	//clear the corners
// 	cardContext.globalCompositeOperation = "destination-out"
// 	cardContext.drawImage(window[nameArray[nameArray.indexOf("noneMaskCorners")]].image, 0, 0, cardWidth, cardHeight)
// 	cardContext.globalCompositeOperation = "source-over"
// 	//paste it to the visible canvas
// 	mainContext.clearRect(0, 0, cardWidth, cardHeight)
// 	mainContext.drawImage(cardCanvas, 0, 0, cardWidth, cardHeight)
//     currentlyWritingText = false
// }
// //Loads an image in from user input
// function userLoadImage() {
// 	loadImage(getSelectedTab("tabSelectColor"), "preview")
// }
// //Enters an image from user input
// function userEnterImage() {
// 	loadImage(getSelectedTab("tabSelectColor"), getSelectedTab("frameType"))
// }
// //Removes an image from user input
// function userRemoveImage() {
//     var targetToRemove = getSelectedTab("frameType")
//     if (document.getElementById("checkboxSecondary").checked) {
//         targetToRemove += "Secondary"
//     }
// 	if (cardMasterTypes.includes(targetToRemove) && targetToRemove != "Full") {
// 		cardMasterImages.splice(cardMasterTypes.indexOf(targetToRemove), 1)
// 		cardMasterTypes.splice(cardMasterTypes.indexOf(targetToRemove), 1)
// 		cardMasterUpdated()
// 	}
// }
// //Loads a script
// function loadScript(scriptPath){
// 	var script = document.createElement("script")
// 	script.setAttribute("type","text/javascript")
// 	script.setAttribute("src", scriptPath)
// 	if (typeof script != "undefined") {
// 		document.getElementsByTagName("head")[0].appendChild(script)
// 	}
// }
// //Adjusts values to the card size
// function cwidth(inputWidth) {
// 	return inputWidth / 750 * cardWidth
// }
// function cheight(inputHeight) {
// 	return inputHeight / 1050 * cardHeight
// }
// //shortcut for parseInt(document.getElementById("").value)
// function getValue(elementId) {
// 	return parseFloat(document.getElementById(elementId).value)
// }
// //Changes the version
// function changeVersionTo(versionToChangeTo) {
// 	loadScript("data/versions/" + versionToChangeTo + "Version.js")
// }
// function finishChangingVersion() {
//     hideShowFrameTypes()
// 	for (var i = 0; i < version.textList.length; i ++) {
// 		document.getElementById("inputWhichTextTabs").innerHTML += "<div class='tabButton text' onclick='tabFunction(event, `text`, `option" + version.textList[i][0] + "`, `textTabFunction`)'>" + version.textList[i][0] + "</div>"
//         if (i == 0) {
//             document.getElementsByClassName("tabButton text")[0].classList.add("activeTab")
//         }
// 	}
// 	updateText()
// 	updateBottomInfoCanvas()
// 	updateSetSymbolCanvas()
// }
// function hideShowFrameTypes() {
//     document.getElementById("frameType").innerHTML = ""
//     document.getElementById("inputImageTypeOpacity").innerHTML = ""
//     for (var i = 0; i < version.typeOrder.length; i ++) {
//         if (!version.typeOrder[i].includes("Secondary") && (!version.typesAdvanced.includes(version.typeOrder[i]) || document.getElementById("checkboxAdvanced").checked)) {
//             tabSelectAddOption("frameType", version.typeOrder[i], version.typeOrder[i])
//             document.getElementById("inputImageTypeOpacity").innerHTML += "<option>" + version.typeOrder[i] + "</option>"
// //            cardMasterOpacity[cardMasterOpacity.length] = version.typeOrder[i]
//             cardMasterOpacityValue[cardMasterOpacityValue.length] = 100
//         }
//     }
//     document.getElementsByClassName("frameType")[0].className += " activeTab"
//     hideShowColors(true)
//     loadOpacityValue()
// }
// //Hides and shows the options in inputImageColor to match the selected type
// function hideShowColors(enter = false) {
// 	document.getElementById("tabSelectColor").innerHTML = ""
//     var activeTab = false
// 	for (var i = 0; i < versionArray.length; i ++) {
// 		if (versionArray[i] == version.currentVersion && (typeArray[i] == getSelectedTab("frameType").replace("Secondary", "") || (typeArray[i] == "Full" && version.typeNotFull.includes(getSelectedTab("frameType")) == false)) && colorArray[i] != "Mask" && (document.getElementById("checkboxAdvanced").checked || advancedArray[i] == "FALSE")) {
// 			tabSelectAddOption("tabSelectColor", displayNameArray[i], i)
//             if (displayNameArray[i] == suggestedColor) {
//                 document.getElementsByClassName("tabSelectColor")[document.getElementsByClassName("tabSelectColor").length - 1].className += " activeTab"
//                 activeTab = true
//             }
// 		}
// 	}
//     if (!activeTab && document.getElementsByClassName("tabSelectColor").length > 0) {
//         document.getElementsByClassName("tabSelectColor")[0].className += " activeTab"
//     }
// 	if (enter) {
// 		userEnterImage()
// 	}
// 	userLoadImage()
// }
// //Loads the opacity value
// function loadOpacityValue() {
// 	document.getElementById("inputOpacityValue").value = cardMasterOpacityValue[version.typeOrder.indexOf(document.getElementById("inputImageTypeOpacity").value)] || 100
// }
// function opacityValueUpdated() {
// 	cardMasterOpacityValue[version.typeOrder.indexOf(document.getElementById("inputImageTypeOpacity").value)] = document.getElementById("inputOpacityValue").value
// 	cardMasterUpdated()
// }
// //Custom text function! This acts on any codes and makes things look nice :)
// CanvasRenderingContext2D.prototype.writeText = function(text = "", textX = 0, textY = 0, textWidth = cardWidth, textHeight = cardHeight, textFont = "belerenbsc", inputTextSize = 38, textColor="black", other="") {
// 	paragraphContext.clearRect(0, 0, cardWidth, cardHeight)
// 	var textSize = inputTextSize
// 	lineContext.font = textSize + "px " + textFont
// 	lineContext.fillStyle = textColor
// 	var otherParameters = other.split(",")
// 	var outline, shadow = 0, oneLine = false, outlineWidth = 2, textAlign = "left", verticalAlign = true, lineSpace = 1
// 	for (var i = 0; i < otherParameters.length; i ++) {
// 		eval(otherParameters[i])
// 	}
// 	lineContext.strokeStyle = outline
// 	lineContext.lineWidth = outlineWidth
// 	var currentLineX = 0
// 	var currentLineY = textY + textSize * 0.45
// 	var uniqueSplitter = "9dn57gwbt4sh"
// 	var splitString = text.replace(/ /g, uniqueSplitter +  " " + uniqueSplitter).replace(/{/g, uniqueSplitter + "{").replace(/}/g, "}" + uniqueSplitter).split(uniqueSplitter)
// 	splitString[splitString.length] = " "
// 	var lastWordAdded = ""
// 	for (var i = 0; i < splitString.length; i++) {
// 		if (splitString[i] != "") {
// 			var wordToWrite = splitString[i]
// 			var finishLine = false
// 			if (splitString[i].includes("{") && splitString[i].includes("}")) {
// 				//It may be a code
// 				wordToWrite = ""
// 				possibleCodeLower = splitString[i].toLowerCase().replace("{", "").replace("}", "")
// 				if (possibleCodeLower == "line" && !oneLine) {
// 					finishLine = true
//                     currentLineY += textSize * 0.35
// 				} else if (possibleCodeLower == "linenospace" && ! oneLine) {
// 					finishLine = true
// 				} else if (possibleCodeLower == "bar" || possibleCodeLower == "flavor") {
// 					finishLine = true
// 					var barWidth = manaSymbolImageList[63].width
// 					var barHeight = manaSymbolImageList[63].height
// 					paragraphContext.drawImage(manaSymbolImageList[63], textX + textWidth / 2 - barWidth / 2, currentLineY + textSize * 0.6, barWidth, barHeight)
// 					currentLineY += textSize * 0.8
// 					if (possibleCodeLower == "flavor") {
// 						lineContext.font = "italic " + (textSize - 3) + "px " + textFont
// 					}
// 				} else if (possibleCodeLower.includes("fontsize")) {
// 					textSize += parseInt(possibleCodeLower.slice(8, possibleCodeLower.length))
// 					lineContext.font = textSize + "px " + textFont
// 				} else if (possibleCodeLower == "i") {
// 					lineContext.font = "italic " + textSize + "px " + textFont
// 				} else if (possibleCodeLower == "/i") {
// 					lineContext.font = textSize + "px " + textFont
// 				} else if (possibleCodeLower == "center") {
// 					textAlign = "center"
// 				} else if (possibleCodeLower == "right") {
// 					textAlign = "right"
// 				} else if (possibleCodeLower == "left") {
// 					textAlign = "left"
// 				} else if (possibleCodeLower.includes("up")) {
// 					currentLineY -= (parseInt(possibleCodeLower.slice(2, possibleCodeLower.length)))
// 				} else if (possibleCodeLower.includes("down")) {
// 					currentLineY += (parseInt(possibleCodeLower.slice(4, possibleCodeLower.length)))
// 				} else if (possibleCodeLower.includes("left")) {
// 					currentLineX -= (parseInt(possibleCodeLower.slice(4, possibleCodeLower.length)))
// 				} else if (possibleCodeLower.includes("right")) {
// 					currentLineX += (parseInt(possibleCodeLower.slice(5, possibleCodeLower.length)))
// 				} else if (possibleCodeLower == "artistbrush") {
// 					var artistBrushWidth = textSize * 1.2
// 					lineContext.drawImage(manaSymbolImageList[62], currentLineX, currentLineY - artistBrushWidth * 0.58, artistBrushWidth, artistBrushWidth * 13 / 21)
// 					currentLineX += artistBrushWidth * 1.1
// 				} else if (possibleCodeLower.includes("fontcolor")) {
// 					lineContext.fillStyle = possibleCodeLower.slice(9, possibleCodeLower.length)
// 				}else if (possibleCodeLower.includes("font")) {
// 					textFont = possibleCodeLower.slice(5, possibleCodeLower.length)
// 					lineContext.font = textSize + "px " + textFont
// 				} else if (manaSymbolCodeList.includes(possibleCodeLower)) {
// 					//THIS HAS TO BE THE LAST ONE
// 					var manaSymbolDiameter = textSize * 0.77
// 					lineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(possibleCodeLower)], currentLineX, currentLineY - manaSymbolDiameter * 0.95, manaSymbolDiameter, manaSymbolDiameter)
// 					currentLineX += manaSymbolDiameter * 1.02
// 				} else {
// 					wordToWrite = splitString[i]
// 				}
// 			}
// 			if (wordToWrite != "" || finishLine == true) {
// 				//We're left with a word. Write it.
// 				var currentWordWidth = lineContext.measureText(wordToWrite).width
// 				if (i == splitString.length - 1) {
// 					//forces the last artificially added space to be too wide, making sure the last line is drawn in.
// 					currentWordWidth = textWidth + 1
// 				}
// 				if (currentLineX + currentWordWidth > textWidth || finishLine) {
// 					//Finish the line
// 					if (oneLine && i != splitString.length - 1 && inputTextSize > 1) {
// 						lineContext.clearRect(0, 0, cardWidth, cardHeight)
// 						this.writeText(text, textX, textY, textWidth, textHeight, textFont, inputTextSize - 1, textColor, other)
// 						return
// 					}
// 					var alignAdjust = 0
// 					if (textAlign == "center" || textAlign == "right") {
// 						if (lastWordAdded == " ") {
// 							currentLineX -= textContext.measureText("   ").width
// 						}
// 						if (textAlign == "center") {
// 							alignAdjust = textWidth / 2 - currentLineX  / 2 + textX
// 						} else if (textAlign == "right") {
// 							alignAdjust = textWidth + textX - currentLineX
// 						}
// 					} else {
// 						alignAdjust += textX
// 					}
// 					paragraphContext.drawImage(lineCanvas, 0 + alignAdjust, 0, cardWidth, cardHeight)
// 					lineContext.clearRect(0, 0, cardWidth, cardHeight)
// 					currentLineY += textSize * lineSpace
// 					currentLineX = 0
// 					if (wordToWrite == " ") {
// 						currentWordWidth = 0
// 					}
// 				}
// 				//Whether or not the current line is finished, write to it.
// 				if (shadow > 0) {
// 					lineContext.fillText(wordToWrite, currentLineX + shadow, currentLineY + shadow)
// 				}
// 				if (outline != undefined) {
// 					lineContext.strokeText(wordToWrite, currentLineX, currentLineY)
// 				}
// 				lineContext.fillText(wordToWrite, currentLineX, currentLineY)
// 				currentLineX += currentWordWidth
// 				lastWordAdded = wordToWrite
// 			}
// 		}
// 	}
// 	verticalAdjust = 0
// 	if (verticalAlign) {
// 		verticalAdjust = (textHeight + textY - currentLineY + textSize) / 2
// 	}
// 	this.drawImage(paragraphCanvas, 0, 0 + verticalAdjust, cardWidth, cardHeight)
// 	return "done"
// }
// //Loads up all the mana symbol images
// function loadManaSymbolImages() {
// 	for (var i = 0; i < manaSymbolCodeList.length; i++) {
// 		manaSymbolImageList[i] = new Image()
// 		manaSymbolImageList[i].src = "data/images/manaSymbols/" + i + ".png"
// 	}
// }
// //Draws a mana cost
// CanvasRenderingContext2D.prototype.drawManaCost = function(text, symbolsX, symbolsY, diameter = 50, distance = -50, direction = "horizontal") {
// 	var splitManaCost = text.replace(/{/g, " ").replace(/}/g, " ").split(" ")
// 	var currentSymbolIndex = 0
// 	var currentX = symbolsX
// 	var currentY = symbolsY
// 	for (var i = splitManaCost.length - 1; i >= 0; i --) {
// 		if (manaSymbolCodeList.includes(splitManaCost[i])) {
// 			if (Array.isArray(direction) && i < direction.length) {
// 				currentX = direction[i][0]
// 				currentY = direction[i][1]
// 			}
// 			this.fillStyle = "black"
// 			this.beginPath()
// 			this.arc(currentX + diameter / 2.1, currentY + diameter / 1.8, diameter / 2, 0, 2 * Math.PI, false)
// 			this.fill()
// 			this.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(splitManaCost[i])], currentX, currentY, diameter, diameter)
// 			if (direction == "horizontal") {
// 				currentX += distance
// 			} else if (direction == "vertical") {
// 				currentY += distance
// 			}
// 		}
// 	}
// }
// //Changes the textarea content to whichever text is currently selected for editing
// var whichTextIndex = 0
// function changeWhichText() {
// 	for (var i = 0; i < version.textList.length; i ++) {
// 		if (version.textList[i][0] == document.getElementById("inputWhichText").value) {
// 			whichTextIndex = i
// 		}
// 	}
// 	document.getElementById("inputText").value = version.textList[whichTextIndex][1]
// }
// //Removes all the white pixels in an image
// var whiteThreshold = 250
// function whiteToTransparent(targetImage, source = targetImage.src) {
//     //Create image, size canvas, draw image
//     var imgTempTarget = new Image()
//     imgTempTarget.crossOrigin = "anonymous"
//     imgTempTarget.src = source
//     imgTempTarget.onload = function() {
//     	if (imgTempTarget.width > 0 && imgTempTarget.height > 0) {
//     		transparentCanvas.width = imgTempTarget.width
//     		transparentCanvas.height = imgTempTarget.height
//     		transparentContext.drawImage(imgTempTarget, 0, 0)
//             //declare variables
//             var width = transparentCanvas.width
//             var height = transparentCanvas.height
//             var imageData = transparentContext.getImageData(0, 0, transparentCanvas.width, transparentCanvas.height)
//             var x, y, index
//             //Go through every pixel and
//             for (y = 0; y < height; y++) {
//             	for (x = 0; x < width; x++) {
//                     index = (y * width + x) * 4
//                     if (imageData.data[index] >= whiteThreshold && imageData.data[index + 1] >= whiteThreshold && imageData.data[index + 2] >= whiteThreshold) {
//                         imageData.data[index + 3] = 0
//                     }
//                 }
//             }
//             transparentContext.clearRect(0, 0, width, height)
//             transparentContext.putImageData(imageData, 0, 0)
//             targetImage.src = transparentCanvas.toDataURL()
//             autocrop(targetImage)
//         }
//     }
// }
// //Removes all the whitespace in an image
// function autocrop(targetImage, source = targetImage.src) {
//     //Create image, size canvas, draw image
//     var imgTempTarget = new Image()
//     imgTempTarget.crossOrigin = "anonymous"
//     imgTempTarget.src = source
//     imgTempTarget.onload = function() {
//         if (imgTempTarget.width > 0 && imgTempTarget.height > 0) {
//             cropCanvas.width = imgTempTarget.width
//             cropCanvas.height = imgTempTarget.height
//             cropContext.drawImage(imgTempTarget, 0, 0)
//             //declare variables
//             var width = cropCanvas.width
//             var height = cropCanvas.height
//             var pix = {x:[], y:[]}
//             var imageData = cropContext.getImageData(0, 0, cropCanvas.width, cropCanvas.height)
//             var x, y, index
//             if (imageData.data.length > 4) {
//             	//Go through every pixel and
// 	            for (y = 0; y < height; y++) {
// 	                for (x = 0; x < width; x++) {
// 	                    //(y * width + x) * 4 + 3 calculates the index at which the alpha value of the pixel at x, y is given
// 	                    index = (y * width + x) * 4 + 3
// 	                    if (imageData.data[index] > 0) {
// 	                        //pix is the image object that stores two arrays of x and y coordinates. These stored coordinates are all the visible pixels
// 	                        pix.x.push(x)
// 	                        pix.y.push(y)
// 	                    }
// 	                }
// 	            }
// 	            //sorts the arrays numerically
// 	            pix.x.sort(function(a,b){return a-b})
// 	            pix.y.sort(function(a,b){return a-b})
// 	            var n = pix.x.length - 1
// 	            //Finds the difference between the leftmost and rightmost visible pixels, and the topmost and bottommost pixels, cuts out a section of the canvas
// 	            width = pix.x[n] - pix.x[0]
// 	            height = pix.y[n] - pix.y[0]
// 	            var cropped = cropContext.getImageData(pix.x[0], pix.y[0], width + 1, height + 1)
// 	            //Resizes the canvas and draws cropped image
// 	            cropCanvas.width = width + 1
// 	            cropCanvas.height = height + 1
// 	            cropContext.putImageData(cropped, 0, 0)
// 	            //Saves the newly cropped image to the given image
// 	            targetImage.src = cropCanvas.toDataURL()
//             }
//         }
//     }
// }
// //The next several functions are all about loading images!
// function uploadImage(event, destination) {
// 	var input = event.target
// 	var reader = new FileReader()
// 	reader.onload = function() {
// 		var dataURL = reader.result
// 		destination.src = dataURL
// 	}
// 	reader.readAsDataURL(input.files[0])
// }
// var savedArtList = [], cardArtUrlList = [], cardArtArtistList = []
// function inputCardArtName(cardArtNameInput) {
// 	var xhttp = new XMLHttpRequest()
// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200) {
// 			savedArtList = this.responseText.split('"art_crop":"')
// 			savedArtList.splice(0, 1)
// 			document.getElementById("inputCardArtNameNumber").max = savedArtList.length
// 			document.getElementById("inputCardArtNameNumber").value = 1
// 			for (i = 0; i < savedArtList.length; i ++) {
// 				cardArtUrlList[i] = savedArtList[i].split('","border_crop":')[0]
// 			}
// 			for (i = 0; i < savedArtList.length; i ++) {
// 				cardArtArtistList[i] = savedArtList[i].slice(savedArtList[i].indexOf('"artist":"') + 10, savedArtList[i].indexOf('","artist_ids":'))
// 			}
// 			inputCardArtNameNumber(1)
// 		} else if (this.readyState == 4 && this.status == 404) {
// 			alert("Sorry, but we can't seem to find any art for '" + cardArtNameInput + "'")
// 		}
// 	}
// 	xhttp.open("GET", "https://api.scryfall.com/cards/search?order=released&unique=art&q=name%3D" + cardArtNameInput.replace(/ /g, "_"), true)
// 	xhttp.send()
// }
// function inputCardArtNameNumber(cardArtNameNumberInput) {
// 	cardArt.src = cardArtUrlList[cardArtNameNumberInput - 1]
// 	document.getElementById("inputInfoArtist").value = cardArtArtistList[cardArtNameNumberInput - 1]
// 	updateBottomInfoCanvas()
// }
// //Downloads the image!
// function downloadCardImage(linkElement) {
// 	if (document.getElementById("inputInfoArtist").value.replace(/ /g, "") != "") {
// 		linkElement.download = version.textList[0][1].toLowerCase().replace(/ /g, "_") + ".png"
// 		if (linkElement.download == ".png") {
// 			linkElement.download = "card.png"
// 		}
// 	} else {
// 		event.preventDefault()
// 		alert("You must properly credit an artist before downloading")
// 	}
// 	var cardImageData = cardCanvas.toDataURL()
// 	if (cardImageData == undefined) {
// 		alert("Sorry, it seems that you cannot download your card. Please try using a different browser/device.")
// 	}
// 	linkElement.href = cardImageData
// }
// //Toggles the visibility of tooltips
// function toggleTooltips(revealed = true) {
// 	var tooltipList = document.getElementsByClassName("tooltiptext")
// 	for (var i = 0; i < tooltipList.length; i ++) {
// 		if (revealed) {
// 			tooltipList[i].classList.remove("hidden")
// 		} else {
// 			tooltipList[i].classList.add("hidden")
// 		}
// 	}
// 	setCookie("tooltipsToggled", revealed + "")
// }





// //DELETE: (for testing purposes only)
// function testFunction() {
// 	loadScript("data/scripts/setCodeList.js")
// }



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


// function tabFunction(event, section, target, specialFunction = "none") {
//     var tabButtons = document.getElementsByClassName("tabButton " + section)
//     for (var i = 0; i < tabButtons.length; i++) {
//         tabButtons[i].className = tabButtons[i].className.replace(" activeTab", "")
//     }
//     event.currentTarget.className += " activeTab"
//     if (specialFunction != "none") {
//         window[specialFunction](event, section, target)
//     } else {
//         var tabContents = document.getElementsByClassName("tabContent " + section)
//         for (var i = 0; i < tabContents.length; i++) {
//             tabContents[i].className = tabContents[i].className.replace(" displayed", "")
//         }
//         document.getElementById(target).className += " displayed"
//     }
// }
// function textTabFunction(event, section, target) {
//     for (var i = 0; i < version.textList.length; i ++) {
//         if (version.textList[i][0] == target.replace("option", "")) {
//             whichTextIndex = i
//         }
//     }
//     document.getElementById("inputText").value = version.textList[whichTextIndex][1]
// }











// function tabSelect(event, selectSection) {
//     var tabSelectButtons = document.getElementsByClassName(selectSection)
//     for (var i = 0; i < tabSelectButtons.length; i++) {
//         tabSelectButtons[i].className = tabSelectButtons[i].className.replace(" activeTab", "")
//     }
//     event.target.className += " activeTab"
//     if (selectSection == "frameType") {
//         hideShowColors()
//     } else if (selectSection == "tabSelectColor") {
//         userLoadImage()
//         suggestedColor = displayNameArray[getSelectedTab("tabSelectColor")]
//     }
// }
// function getSelectedTab(selectSection) {
//     var tabSelectButtons = document.getElementsByClassName(selectSection)
//     for (var i = 0; i < tabSelectButtons.length; i++) {
//         if (tabSelectButtons[i].className.includes("activeTab")) {
//             return tabSelectButtons[i].id
//         }
//     }
// }
// function tabSelectAddOption(tabSection, displayName, tabValue) {
//     document.getElementById(tabSection).innerHTML += "<div class='tabButton tabSelectButton " + tabSection + "' id='" + tabValue + "' onclick='tabSelect(event, `" + tabSection + "`)'>" + displayName + "</div>"
// }





// function textCodeTutorial() {
// 	var textCodeTutorialString = `line-skips to the next line
// 	_linenospace-skips to the next line, but doesn't add spacing
// 	_bar-skips to the next line, and adds the flavor text bar
// 	_flavor-skips to the next line, adds the flavor text bar, and italicizes the following text
// 	_i-italicizes the following text
// 	_/i-removes italics from the following text
// 	_fontsize#-changes the font size to # pixels
// 	_fontcolor#-changes the color to #. Can use color names, or hex codes
// 	_left-justifies text to the left
// 	_center-justifies text to the center
// 	_right-justifies text to the right
// 	_up#-moves the following text # pixels up
// 	_down#-moves the following text # pixels down
// 	_left#-moves the following text # pixels left
// 	_right#-moves the following text # pixels right
// 	_SYMBOL-creates a mana symbol, where SYMBOL can be: w, u, b, r, g, 1, 2, 3, etc...`
// 	var textCodeTutorialArray = textCodeTutorialString.split("_")
// 	for (var i = 0; i < textCodeTutorialArray.length; i ++) {
// 		document.getElementById("textCodeTutorial").innerHTML += "<div class='selectable'><b>{" + textCodeTutorialArray[i].split("-")[0] + "}</b></div><div>" + textCodeTutorialArray[i].split("-")[1] + "</div>"
// 	}
// }

// function advancedBordersClicked() {
//     hideShowFrameTypes()
//     setCookie("advancedBorders", document.getElementById("checkboxAdvanced").checked + "")
// }



// //textCodeTutorial()


// /*To do list:
// watermarks





// possibly border color?
// */
