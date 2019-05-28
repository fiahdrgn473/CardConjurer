//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
//Hi there :D
//changeme new location
window.onscroll = function() {scrollFunction()}
window.onresize = function() {scrollFunction()}

function scrollFunction() {
	var scrollHeight = document.body.scrollTop
	if (scrollHeight < 0) {
		scrollHeight = 0
	}
	var titleHeight = parseInt(window.innerWidth * 141 / 1236 - 10);
	if (window.innerWidth >= 750) {
		if (window.innerWidth >= 970) {
			titleHeight = 100
		}
		if (scrollHeight < titleHeight - 30) {
    		document.getElementById("header").style.maxHeight =  titleHeight - scrollHeight
  		} else {
    		document.getElementById("header").style.maxHeight = "30px"
  		}
  		document.getElementsByClassName("mainGrid")[0].style.marginTop = titleHeight + 10
	} else {
		document.getElementsByClassName("mainGrid")[0].style.marginTop = 0
		document.getElementById("header").style.maxHeight = titleHeight
	}
}

function textAreaKeyPressed() {
	if (event.key == "Enter" || event.key == "Return" || event.keyCode == 13) {
		setTimeout(function() {
			cursorIndex = document.getElementById("inputText").selectionStart
			document.getElementById("inputText").value = document.getElementById("inputText").value.slice(0, cursorIndex) + "{line}" + document.getElementById("inputText").value.slice(cursorIndex, 0)
		}, 5)
	}
}





//============================================//
//     Anything I Like to Change Often :)     //
//============================================//
randomizeSampleCards(8)

//============================================//
//         Setup Variables/Canvases           //
//============================================//
//Define important variables
var sectionFrame = 0, sectionText = 0, sectionOther = 0
var cardWidth = 750, cardHeight = 1050
var date = new Date()
document.getElementById("inputInfoNumber").value = date.getFullYear()
var savedArtList = [], cardArtUrlList = [], cardArtArtistList = []
//Create the object that stores data for convencience :) It's what keeps track of values necessary to change between card frames
var defaultCardData = {
	version:"m15",
	manaSymbolX:cwidth(659), manaSymbolY:cheight(60), manaSymbolRadius:cwidth(17.5), manaSymbolDirection:"left",
	titleX:cwidth(63), titleY:cheight(94), titleRight:cwidth(687), titleFont:"belerenb", titleFontSize:cwidth(40), titleAlignment:"left", titleShadow:"none",
	typeX:cwidth(63), typeY:cheight(630), typeRight:cwidth(687), typeFont:"belerenb", typeFontSize:cwidth(34), typeAlignment:"left", typeShadow:"none",
	textX:cwidth(63), textY:cheight(690), textRight:cwidth(690), textFont:"mplantin",
	ptFont:"39px belerenb", ptX:cwidth(645), ptY:cheight(975), ptShadow:"none",
	ptBoxX:cwidth(571), ptBoxY:cheight(929), ptBoxWidth:cwidth(135), ptBoxHeight:cheight(76),
	setSymbolWidth:cwidth(77), setSymbolHeight:cheight(42), setSymbolX:cwidth(693), setSymbolY:cheight(620), setSymbolAlignment:"right",
	watermarkWidth:cwidth(520), watermarkHeight:cheight(250), watermarkY:cheight(815),
	cardArtX:cwidth(58), cardArtY:cheight(118),
	miracle:true, nyx:true, legendary:true, creature:true, rulesBox:true, pinline:true, rareStamp:true, titleTypeBoxes:true,
	transparency:false,
	specialImageA:false, specialImageB:false,
	bottomInfoFunction:"bottomInfoM15",
	horizontal:false
}
var cardData = {}
Object.assign(cardData, defaultCardData)
//Function that restores image values for various things :)
function backToDefault(version) {
	//Fixes canvas size
	if (cardWidth != 750 || cardHeight != 1050) {
		changeCanvasSize(750, 1050)
	}
	//Default card data, correct card version
	Object.assign(cardData, defaultCardData)
	cardData.version = version
	//Default image values
	imgLegendary.load("none", cwidth(20), cheight(20), cwidth(714), cheight(186))
	imgLegendaryRight.load("none", cwidth(20), cheight(20), cwidth(714), cheight(186))
	imgRareStamp.load("none", cwidth(329), cheight(949), cwidth(90), cheight(50))
	imgRareStampRight.load("none", cwidth(329), cheight(949), cwidth(90), cheight(50))
	imgStamp.load("none", cwidth(340), cheight(965), cwidth(70), cheight(37))
	imgNyx.load("none", cwidth(30), cheight(30), cwidth(690), cheight(586))
	imgNyxRight.load("none", cwidth(30), cheight(30), cwidth(690), cheight(586))
	imgMiracle.load("none", cwidth(30), cheight(30), cwidth(689), cheight(511))
	imgMiracleRight.load("none", cwidth(30), cheight(30), cwidth(689), cheight(511))
	//Default masks
	for (var i = 0; i < frameMaskList.length; i++) {
		if (window[frameMaskList[i]].src.includes("data/borders/m15/" + frameMaskList[i] + ".png") == false) {
			window[frameMaskList[i]].load("data/borders/m15/" + frameMaskList[i] + ".png")
		}
	}
	//Loads default frame images
	for (var i = 0; i < frameImageList.length; i++) {
		window[frameImageList[i]].load("data/borders/" + cardData.version + "/white/frame.png")
	}
	//Fixes default font Colors
	for (var i = 0; i < document.getElementsByClassName("fontColor").length; i++) {
		document.getElementsByClassName("fontColor")[i].value = "#000000"
	}
	//Runs the finishing script
	loadScript('data/borders/' + version + '/border.js')
}
function finishChangingBorder() {
	loadLegendaryImages()
	loadRareStampImages()
	loadMiracleImages()
	loadNyxImages()
	changePowerToughnessColor()
	//Runs the three main drawing functions
	sectionTextFunction()
	sectionFrameFunction()
	sectionOtherFunction()
}

//Set up canvases
var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")
var canvasList = ["card", "mask", "frame", "text", "other", "transparent", "crop", "specialA", "specialB"]
for (var i = 0; i < canvasList.length; i ++) {
	window[(canvasList[i] + "Canvas")] = document.createElement("canvas")
	window[(canvasList[i] + "Context")] = window[(canvasList[i] + "Canvas")].getContext("2d")
	window[(canvasList[i] + "Canvas")].width = cardWidth
	window[(canvasList[i] + "Canvas")].height = cardHeight
}
function changeCanvasSize(width, height) {
	cardWidth = width
	cardHeight = height
	for (var i = 0; i < canvasList.length; i ++) {
		window[(canvasList[i] + "Canvas")].width = cardWidth
		window[(canvasList[i] + "Canvas")].height = cardHeight
	}
	imgCornerMask.load("none")
	imgWhite.load("none")
	imgBlank.load("none")
}

//============================================//
//          Custom Canvas Functions           //
//============================================//
//Create custom canvas functions
//Image masks
CanvasRenderingContext2D.prototype.mask = function(image, masks, color, maskOpacity = 1) {
	//Clear the mask canvas
    maskContext.clearRect(0, 0, cardWidth, cardHeight)
    maskContext.globalCompositeOperation = "source-over"
    if (masks != undefined && masks != "none") {
    	//Break up the list of masks, interpret and apply them
	    var maskList = masks.split(";")
	    for (var i = 0; i < maskList.length; i ++) {
	        var currentMask = maskList[i].split(",")
	        maskContext.globalCompositeOperation = currentMask[1]
	        if (window[currentMask[0]] != undefined) {
	            maskContext.drawImage(window[currentMask[0]], 0, 0, cardWidth, cardHeight)
	        } else {
	            maskContext.fillStyle = currentMask[0]
	            maskContext.fillRect(0, 0, cardWidth, cardHeight)
	        }
	    }
	    //Now all the masks are applied. Draw the image, if provided.
   		maskContext.globalCompositeOperation = "source-in"
    }
    maskContext.globalAlpha = maskOpacity
    if (image != "none") {
    	maskContext.drawImage(image, image.xVal || 0, image.yVal || 0, image.wVal || cardWidth, image.hVal || cardHeight)
    }
    //If a color is provided, fill that in too.
    if (color != undefined && color != "none") {
    	maskContext.globalCompositeOperation = "source-in"
    	maskContext.fillStyle = color
        maskContext.fillRect(0, 0, cardWidth, cardHeight)
    }
    maskContext.globalAlpha = 1
    this.drawImage(maskCanvas, 0, 0, cardWidth, cardHeight)
}

//Text processor... kind of?
CanvasRenderingContext2D.prototype.writeText = function(text, inputX, inputY, inputRightLimit, textFont, textFontSize, textColor, skipLines, outline, outlineColor, textAlignment = "left", shadow = "none") {
	this.font = textFontSize + "px " + textFont
	this.fillStyle = textColor
	this.strokeStyle = outlineColor
	this.lineWidth = 2
	this.textAlign = textAlignment
	var x = inputX
	var y = inputY
	var rightLimit = inputRightLimit
	var splitText = text.split(" ")
	for (var i = 0; i < splitText.length - 1; i ++) {
		//adds a space to the end of every word (they used to have one until the split command took out all the spaces)
		splitText[i] += " "
	}
	if (skipLines == false) {
		//The text is condensed into one line
		if (textAlignment == "center") {
			rightLimit = rightLimit + (rightLimit - x)
		} else if (textAlignment == "right") {
			rightLimit = 2 * x - rightLimit
		}
		while(this.measureText(text).width + x > rightLimit) {
			textFontSize -= 0.5
			this.font = textFontSize + "px " + textFont
		}
		if (shadow != false) {
			this.fillStyle = "black"
			this.fillText(text, x + shadow, y + shadow)
			this.fillStyle = textColor
		}
		if (outline) {
			this.strokeText(text, x, y)
		}
		this.fillText(text, x, y)
	} else {
		//Multiple lines and codes? Processing time!
		var currentX = x
		var currentY = y
		var currentString = ""
		for (var i = 0; i < splitText.length; i ++) {
			if (splitText[i].includes("{") && splitText[i].includes("}")) {
				//Codes or not, something will happen. First write what we already have.
				if (outline) {
					this.strokeText(currentString, currentX, currentY)
				}
				this.fillText(currentString, currentX, currentY)
				currentX += this.measureText(currentString).width
				currentString = ""
				//Then grind through the string for codes
				while(splitText[i] != "") {
					//There may be codes within! split up the string further incase there are multiple codes/words
					var wordToWrite = ""
					if (splitText[i].charAt(0) == "{" && splitText[i].includes("}")) {
						//It might be a code
						var possibleCode = splitText[i].slice(0, splitText[i].indexOf("}") + 1)
						var possibleCodeLower = possibleCode.toLowerCase()
						//Go through all the codes and see if the possible code can do anything
						if (possibleCodeLower == "{i}") {
							this.font = textFontSize + "px " + textFont + "i"
						} else if (possibleCodeLower == "{/i}") {
							this.font = textFontSize + "px " + textFont
						} else if (possibleCodeLower == "{line}") {
							currentX = x
							currentY += textFontSize + parseInt(document.getElementById("inputTextShift").value)
						} else if (possibleCodeLower == "{bar}") {
							this.drawImage(imgBar, cardWidth / 2 - imgBar.width / 2, currentY + parseInt(document.getElementById("inputTextShift").value) + 6)
							currentX = x
							currentY += textFontSize + 2 * parseInt(document.getElementById("inputTextShift").value)
						} else if (possibleCodeLower == "{linenospace}") {
							currentX = x
							currentY += textFontSize
						} else if (possibleCodeLower == "{left}") {
							rightLimit = inputRightLimit
							this.textAlign = "left"
							x = inputX
							currentX = x
						} else if (possibleCodeLower == "{center}") {
							rightLimit = 1.5 * inputRightLimit
							this.textAlign = "center"
							x = cardWidth / 2
							currentX = x
						} else if (possibleCodeLower == "{right}") {
							rightLimit = 2 * inputRightLimit - inputX
							this.textAlign = "right"
							x = cardWidth - inputX
							currentX = x
						} else if (possibleCodeLower.slice(0, 3) == "{up" && possibleCodeLower.charAt(possibleCodeLower.length - 1) == "}") {
							currentY -= parseInt(possibleCodeLower.slice(3, possibleCodeLower.length - 1))
						} else if (possibleCodeLower.slice(0, 5) == "{down" && possibleCodeLower.charAt(possibleCodeLower.length - 1) == "}") {
							currentY += parseInt(possibleCodeLower.slice(5, possibleCodeLower.length - 1))
						} else if (possibleCodeLower.slice(0, 5) == "{left" && possibleCodeLower.charAt(possibleCodeLower.length - 1) == "}") {
							currentX -= parseInt(possibleCodeLower.slice(5, possibleCodeLower.length - 1))
							x -= parseInt(possibleCodeLower.slice(5, possibleCodeLower.length - 1))
						} else if (possibleCodeLower.slice(0, 6) == "{right" && possibleCodeLower.charAt(possibleCodeLower.length - 1) == "}") {
							currentX += parseInt(possibleCodeLower.slice(6, possibleCodeLower.length - 1))
							x += parseInt(possibleCodeLower.slice(6, possibleCodeLower.length - 1))
						} else if (possibleCodeLower == "{plane}") {
							this.drawImage(manaSymbolImageList[56], currentX + cheight(5), currentY - cheight(25), cheight(67), cheight(60))
							currentX += cheight(85)
							x += cheight(85)
						} else if (manaSymbolCodeList.includes((possibleCodeLower.replace("{", "").replace("}", "")))) {
							//It's a mana symbol! Draw it.
							var extraWidth = 1
							if (possibleCodeLower.replace("{", "").replace("}", "") == "chaos") {
								extraWidth = 1.15
							}
							this.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(possibleCodeLower.replace("{", "").replace("}", ""))], currentX + textFontSize * 0.054, currentY - textFontSize * 0.7, textFontSize * 0.77 * extraWidth, textFontSize * 0.77)
							currentX += textFontSize * 0.77 * extraWidth + textFontSize * 0.07
						} else {
							//It's not a code. treat it like a regular word.
							wordToWrite = possibleCode
						}
						//Whatever the result was, remove this part of the string.
						splitText[i] = splitText[i].substr(possibleCode.length)
					} else {
						//It begins with a word. Write it.
						if (splitText[i].includes("{") && splitText[i].charAt(0) != "{") {
							//There still could be codes, leave those be.
							wordToWrite = splitText[i].slice(0, splitText[i].indexOf("{"))
						} else if (splitText[i] != "" && splitText != " ") {
							//There aren't any codes left. Finish up.
							wordToWrite = splitText[i] //+ " "
						}
						splitText[i] = splitText[i].substring(wordToWrite.length)
					}
					//After extracting a word to write, write it (if it exists)
					if (wordToWrite != "") {
						if (this.measureText(wordToWrite).width + currentX > rightLimit) {
							//The word doesn't fit. Write the word on the next line.
							currentY += textFontSize
							if (outline) {
								this.strokeText(wordToWrite, x, currentY)
							}
							this.fillText(wordToWrite, x, currentY)
							currentX = x + this.measureText(wordToWrite).width
						} else {
							if (outline) {
								this.strokeText(wordToWrite, currentX, currentY)
							}
							this.fillText(wordToWrite, currentX, currentY)
							currentX += this.measureText(wordToWrite).width
						}
					}
				} //WHILE LOOP ENDS HERE
			} else if (this.measureText(currentString /*+ " "*/ + splitText[i]).width + currentX > rightLimit) {
				//There aren't any codes, but the text doesn't fit. Finish writing the current line and move to the next one.
				if (outline) {
					this.strokeText(currentString, currentX, currentY)
				}
				this.fillText(currentString, currentX, currentY)
				currentString = splitText[i] //+ " "
				currentY += textFontSize
				currentX = x
			} else {
				//No codes and the word fits. Add it to the current line.
				currentString += splitText[i] //+ " "
			}
			if (i == splitText.length - 1) {
				if (outline) {
					this.strokeText(currentString, currentX, currentY)
				}
				this.fillText(currentString, currentX, currentY)
			}
		}
	}
	this.textAlign = "left"
}

//Mana cost!
CanvasRenderingContext2D.prototype.manaCost = function(input, x, y, size, path) {
	this.fillStyle = "black"
	var currentX = x
	var currentY = y
	var manaCostList = input.toLowerCase().replace(/{/g, " ").replace(/}/g, " ").split(" ")
	if (cardData.manaSymbolDirection == "left") {
		var manaSymbolWidth = 0
		for (var i = manaCostList.length - 1; i >= 0; i--) {
			if (manaSymbolCodeList.indexOf(manaCostList[i]) != -1) {
				this.beginPath()
				this.arc(currentX + size - 1, currentY + size + 3.5, size, 0, 6.29, false)
				this.fill()
				this.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(manaCostList[i])], currentX, currentY, size * 2, size * 2)
				if (path == "left") {
					currentX -= 39
					manaSymbolWidth += 39
				}
			}
		}
		return manaSymbolWidth
	} else {
		return 0
	}
}

//Function that autocrops the image
function autocrop(targetImage) {
    //Create image, size canvas, draw image
    var imgTempTarget = new Image()
    imgTempTarget.crossOrigin = "anonymous"
    imgTempTarget.src = targetImage.src
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

//Function that auto... makes the image's white pixels transparent
function whiteToTransparent(targetImage) {
    //Create image, size canvas, draw image
    var imgTempTarget = new Image()
    imgTempTarget.crossOrigin = "anonymous"
    imgTempTarget.src = targetImage.src
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
                    if (imageData.data[index] >= 250 && imageData.data[index + 1] >= 250 && imageData.data[index + 2] >= 250) {
                        imageData.data[index + 3] = 0
                    }
                }
            }
            transparentContext.clearRect(0, 0, width, height)
            transparentContext.putImageData(imageData, 0, 0)
            targetImage.src = transparentCanvas.toDataURL()
        }
    }
}

//============================================//
//             Custom Image Stuff             //
//============================================//
//Whenever a new image is created it will be given an onload function.
function createImage(name, section) {
	//Create the image and give it default values
	window[name] = new Image()
	window[name].name = name
	if (section != undefined) {
		window[name].cardSection = section
	} else {
		window[name].cardSection = "none"
	}
	//Give the image an onload function
	window[name].onload = function() {
		//the loading status is used to insure that images are loaded before doing anything else
		this.loadingStatus = false
		if (this.cardSection != "none") {
			window[this.cardSection] -= 1
			if (this.cardSection == "sectionFrame") {
				//console.log("Finished loading. Current total: " + window[this.cardSection] + " " + this.name)
			}
			if (window[this.cardSection] <= 0) {
				//Once all the images under a certain section have loaded, that section's function will be run
				if (this.cardSection == "sectionFrame") {
					//console.log("We're all done loading!\n\n\n\n\n")
				}
				window[this.cardSection + "Function"]()
			}
		}
	}
}

//This is a custom function meant to load new image sources
Image.prototype.load = function(source, x, y, w, h) {
	if (source != "none") {
		if (this.loadingStatus != true && this.cardSection != "none") {
			window[this.cardSection] += 1
			if (this.cardSection == "sectionFrame") {
				//console.log("Starting to load. Current total: " + window[this.cardSection] + " " + this.name)
			}
		}
		this.loadingStatus = true
		this.src = source
	}

	if (x != undefined) {this.xVal = x}
	if (y != undefined) {this.yVal = y}
	if (w != undefined) {this.wVal = w}
	if (h != undefined) {this.hVal = h}
}

//Loads images via URL
function imageURL(input, targetImage, processes) {
	targetImage.cropStatus = processes
	targetImage.load("https://cors-anywhere.herokuapp.com/" + input)
}

//============================================//
//           Loads all the images             //
//============================================//
//Images that are drawn on the frame
var frameImageList = ["imgSectionFrame", "imgFrame", "imgFrameRight", "imgTitleTypeBoxes", "imgTitleTypeBoxesRight", "imgRulesBox", "imgRulesBoxRight", "imgPinline", "imgPinlineRight", "imgLegendary", "imgLegendaryRight", "imgNyx", "imgNyxRight", "imgMiracle", "imgMiracleRight", "imgRareStamp", "imgRareStampRight"]
for (var i = 0; i < frameImageList.length; i++) {
	createImage(frameImageList[i], "sectionFrame")
	window[frameImageList[i]].load("data/borders/m15/white/frame.png")
}
//changeme
createImage("imgPowerToughness", "sectionText")
imgPowerToughness.load("data/borders/m15/white/pt.png")
//masks for the card frame
var frameMaskList = ["imgTypeMask", "imgTitleMask", "imgPinlineMask", "imgRulesMask", "imgFrameMask", "imgArtMask", "imgBorderMask"]
for (var i = 0; i < frameMaskList.length; i++) {
	createImage(frameMaskList[i], "sectionFrame")
	window[frameMaskList[i]].load("data/borders/m15/" + frameMaskList[i] + ".png")
}
//any images that stay the same
var staticImageList = ["imgMultiGradient", "imgArtistBrush", "imgFoil", "imgStamp", "imgCornerMask", "imgBar", "imgBlank", "imgWhite"]
for (var i = 0; i < staticImageList.length; i++) {
	createImage(staticImageList[i], "none")
	window[staticImageList[i]].load("data/borders/" + staticImageList[i] + ".png")
}
//Any images uploaded by the user
var userInputImageList = ["imgCardArt", "imgSetSymbol", "imgWatermark"]
for (var i = 0; i < userInputImageList.length; i++) {
	createImage(userInputImageList[i], "sectionOther")
	window[userInputImageList[i]].load("data/borders/imgBlank.png")
	window[userInputImageList[i]].crossOrigin = "anonymous"
		window[userInputImageList[i]].onload = function() {
		if (this.cropStatus == "needsBoth") {
			this.cropStatus = "needsCrop"
			whiteToTransparent(this)
		} else if (this.cropStatus == "needsWhite") {
			this.cropStatus = "none"
			whiteToTransparent(this)
		} else if (this.cropStatus == "needsCrop") {
			this.cropStatus = "none"
			autocrop(this)
		} else {
			this.loadingStatus = false
			sectionOther -= 1
			if (sectionOther <= 0) {
				sectionOtherFunction()
			}
		}
	}
}
//Any images that may or may not be used
var staticImageList = ["imgAbilityLineEven", "imgAbilityLineOdd"]
for (var i = 0; i < staticImageList.length; i++) {
	createImage(staticImageList[i], "none")
	window[staticImageList[i]].load("data/borders/imgBlank.png")
}
//Mana symbol Array setup
var manaSymbolCodeList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "w", "u", "b", "r", "g", "2w", "2u", "2b", "2r", "2g", "pw", "pu", "pb", "pr", "pg", "wu", "wb", "ub", "ur", "br", "bg", "rg", "rw", "gw", "gu", "x", "s", "c", "t","untap", "e", "y", "z", "1/2", "inf", "chaos", "plane", "l+", "l-", "l0"]
var manaSymbolImageList = new Array()
for (var i = 0; i < manaSymbolCodeList.length; i++) {
	manaSymbolImageList[i] = new Image()
	manaSymbolImageList[i].src = "data/manaSymbols/" + i + ".png"
	manaSymbolImageList[i].name = i
	manaSymbolImageList[i].onload = function() {
		document.getElementById(this.name).src = this.src
	}
}

//============================================//
//             Draw The Sections!             //
//============================================//
function sectionFrameFunction() {
	//Whenever images for the card from finish loading this function will run
	//Draw the primary frame stuff!
	frameContext.clearRect(0, 0, cardWidth, cardHeight)
	if (cardData.transparency && document.getElementById("inputCheckboxFrameRight").checked) {
		frameContext.mask(imgFrame, "imgMultiGradient,source-over;imgWhite,source-out;imgArtMask,destination-out")
	} else {
		frameContext.mask(imgFrame, "imgArtMask,source-over;imgWhite,source-out")
	}
	if (document.getElementById("inputCheckboxFrameRight").checked) {
		frameContext.mask(imgFrameRight, "imgMultiGradient,source-over;imgArtMask,destination-out")
	}
	if (document.getElementById("inputCheckboxRulesBox").checked && cardData.rulesBox) {
		frameContext.mask(imgRulesBox, "imgRulesMask,source-over")
		if (document.getElementById("inputCheckboxRulesBoxRight").checked) {
			frameContext.mask(imgRulesBoxRight, "imgRulesMask,source-over;imgMultiGradient,source-in")
		}
	}
	if (document.getElementById("inputCheckboxTitleTypeBoxes").checked && cardData.titleTypeBoxes) {
		frameContext.mask(imgTitleTypeBoxes, "imgTitleMask,source-over;imgTypeMask,source-over")
		if (document.getElementById("inputCheckboxTitleTypeBoxesRight").checked) {
			frameContext.mask(imgTitleTypeBoxesRight, "imgTitleMask,source-over;imgTypeMask,source-over;imgMultiGradient,source-in")
		}
	}
	if (document.getElementById("inputCheckboxNyx").checked && cardData.nyx) {
		frameContext.mask(imgNyx)
		if (document.getElementById("inputCheckboxFrameRight").checked) {
			frameContext.mask(imgNyxRight, "imgMultiGradient,source-over")
		}
	}
	if (document.getElementById("inputCheckboxPinline").checked && cardData.pinline) {
		frameContext.mask(imgPinline, "imgPinlineMask,source-over")
		if (document.getElementById("inputCheckboxPinlineRight").checked) {
			frameContext.mask(imgPinlineRight, "imgPinlineMask,source-over;imgMultiGradient,source-in")
		}
	}
	if (document.getElementById("inputCheckboxMiracle").checked && cardData.miracle) {
		if ((document.getElementById("inputCheckboxTitleTypeBoxes").checked && document.getElementById("inputCheckboxTitleTypeBoxesRight").checked) || (document.getElementById("inputCheckboxFrameRight").checked && document.getElementById("inputCheckboxTitleTypeBoxes").checked == false)) {
			frameContext.mask(imgMiracle) //changeme
			frameContext.mask(imgMiracleRight, "imgMultiGradient,source-over")
		} else {
			frameContext.mask(imgMiracle)
		}
	}
	frameContext.mask(imgBorderMask, "none", document.getElementById("inputBorderColor").value)
	if (document.getElementById("inputCheckboxLegendary").checked && cardData.legendary) {
		frameContext.fillStyle = document.getElementById("inputBorderColor").value
		frameContext.fillRect(0, 0, cardWidth, 50)
		frameContext.mask(imgLegendary, "imgTitleMask,source-over;imgWhite,source-out")
		if ((document.getElementById("inputCheckboxPinline").checked && document.getElementById("inputCheckboxPinlineRight").checked) || (document.getElementById("inputCheckboxFrameRight").checked && document.getElementById("inputCheckboxPinline").checked == false)) {
			frameContext.mask(imgLegendaryRight, "imgTitleMask,source-over;imgMultiGradient,source-out")
		}
	}
	if (document.getElementById("inputCheckboxRareStamp").checked && cardData.rareStamp) {
		frameContext.mask(imgRareStamp)
		if ((document.getElementById("inputCheckboxPinline").checked && document.getElementById("inputCheckboxPinlineRight").checked) || (document.getElementById("inputCheckboxFrameRight").checked && document.getElementById("inputCheckboxPinline").checked == false)) {
			frameContext.mask(imgRareStampRight, "imgMultiGradient,source-over")
		}
		frameContext.mask(imgStamp)
	}
	//Erase anything if needed (includes opacity fun)
	frameContext.globalCompositeOperation = "destination-out"
	// frameContext.mask(imgArtMask)
	frameContext.mask(imgCornerMask)
	frameContext.mask(imgWhite, "imgTitleMask,source-over;imgTypeMask,source-over", "none", 1 - (parseInt(document.getElementById("inputTitleTypeOpacity").value) / 100))
	frameContext.mask(imgWhite, "imgRulesMask,source-over", "none", 1 - (parseInt(document.getElementById("inputRulesBoxOpacity").value) / 100))
	frameContext.mask(imgWhite, "imgPinlineMask,source-over", "none", 1 - (parseInt(document.getElementById("inputPinlineOpacity").value) / 100))
	frameContext.mask(imgWhite, "imgFrameMask,source-over", "none", 1 - (parseInt(document.getElementById("inputFrameOpacity").value) / 100))
	frameContext.globalCompositeOperation = "source-over"
	//Update the card
	drawCard()
}

function sectionTextFunction() {
	//Clears the text canvas
	textContext.clearRect(0, 0, cardWidth, cardHeight)
	//mana cost, name, type, text
	var manaSymbolWidth = textContext.manaCost(document.getElementById("inputCost").value, cardData.manaSymbolX, cardData.manaSymbolY, cardData.manaSymbolRadius, cardData.manaSymbolDirection)
	textContext.writeText(document.getElementById("inputName").value, cardData.titleX, cardData.titleY, cardData.titleRight - manaSymbolWidth, cardData.titleFont, cardData.titleFontSize, document.getElementById("inputTitleColor").value, false, document.getElementById("inputCheckboxTitleOutline").checked, document.getElementById("inputTitleOutlineColor").value, cardData.titleAlignment, cardData.titleShadow)
	textContext.writeText(document.getElementById("inputType").value, cardData.typeX, cardData.typeY, cardData.typeRight, cardData.typeFont, cardData.typeFontSize, document.getElementById("inputTypeColor").value, false, document.getElementById("inputCheckboxTypeOutline").checked, document.getElementById("inputTypeOutlineColor").value, cardData.typeAlignment, cardData.typeShadow)
	textContext.writeText(document.getElementById("inputText").value, cardData.textX, cardData.textY + parseInt(document.getElementById("inputTextDown").value), cardData.textRight, cardData.textFont, parseInt(document.getElementById("inputTextSize").value), document.getElementById("inputRulesColor").value, true, document.getElementById("inputCheckboxRulesOutline").checked, document.getElementById("inputRulesOutlineColor").value)
	//Power Toughness
	if (document.getElementById("inputCheckboxPowerToughness").checked && cardData.creature) {
		imgPowerToughness.xVal = cardData.ptBoxX
		imgPowerToughness.yVal = cardData.ptBoxY
		imgPowerToughness.wVal = cardData.ptBoxWidth
		imgPowerToughness.hVal = cardData.ptBoxHeight
		textContext.mask(imgPowerToughness)
		textContext.textAlign = "center"
		textContext.font = cardData.ptFont
		textContext.fillStyle = document.getElementById("inputCreatureColor").value
		if (cardData.ptShadow != "none") {
			textContext.fillStyle = "black"
			textContext.fillText(document.getElementById("inputPowerToughness").value, cardData.ptX + parseInt(cardData.ptShadow), cardData.ptY + parseInt(cardData.ptShadow))
			textContext.fillStyle = document.getElementById("inputCreatureColor").value
		}
		textContext.fillText(document.getElementById("inputPowerToughness").value, cardData.ptX, cardData.ptY)
		textContext.textAlign = "left"
	}	
	if (cardData.bottomInfoFunction != "none") {
		window[cardData.bottomInfoFunction]()
	} else {
		drawCard()
	}
}

function bottomInfoM15() {
	var infoNumber = document.getElementById("inputInfoNumber").value
	var infoRarity = document.getElementById("inputInfoRarity").value
	var infoSet = document.getElementById("inputInfoSet").value
	var infoLanguage = document.getElementById("inputInfoLanguage").value
	var infoArtist = document.getElementById("inputInfoArtist").value
	var infoMessage = "*" + document.getElementById("inputInfoMessage").value + "*"
	var infoSetLanguage = infoSet + " \u00b7 " + infoLanguage
	textContext.font = "18px gothammedium"
	textContext.fillStyle = "white"
	textContext.fillText(infoNumber, cwidth(47), cheight(997))
	textContext.fillText(infoRarity, cwidth(54) + textContext.measureText(infoNumber).width, cheight(997))
	textContext.fillText(infoMessage, cwidth(61) + textContext.measureText(infoNumber).width + textContext.measureText(infoRarity).width, cheight(997))
	textContext.fillText(infoSetLanguage, cwidth(47), cheight(1016))
	var rarityArtistShift = textContext.measureText(infoSetLanguage).width + 54
	imgArtistBrush.load("none", rarityArtistShift, cheight(1003), cwidth(21), cheight(13))
	textContext.mask(imgArtistBrush, "none", textContext.fillStyle)
	textContext.font = "18px belerenbsc"
	textContext.fillText(infoArtist, rarityArtistShift + cwidth(25), cheight(1016))
	textContext.font = "18px mplantin"
	textContext.textAlign = "right"
	var copyrightMessage = "\u2122 & \u00a9 " + date.getFullYear() + " Wizards of the Coast"
	var copyrightY = cheight(997)
	if (document.getElementById("inputCheckboxPowerToughness").checked && cardData.creature) {
		copyrightY = cheight(1016)
	}
	textContext.fillText(copyrightMessage, cwidth(700), copyrightY)
	textContext.textAlign = "left"
	drawCard()
}

function sectionOtherFunction() {
	//clears the 'other' canvas
	otherContext.clearRect(0, 0, cardWidth, cardHeight)
	if (document.getElementById("inputCheckboxSetSymbol").checked) {
		//Set Symbol
		switch(cardData.setSymbolAlignment) {
			case "left":
				setSymbolAlignment = -1
				break
			case "center":
				setSymbolAlignment = 1/2
				break
			default:
				setSymbolAlignment = 1
		}
		var setSymbolWidth = cardData.setSymbolWidth
		var setSymbolHeight = imgSetSymbol.height / imgSetSymbol.width * setSymbolWidth
		if (setSymbolHeight > cardData.setSymbolHeight) {
			setSymbolHeight = cardData.setSymbolHeight
			setSymbolWidth = imgSetSymbol.width / imgSetSymbol.height * setSymbolHeight
		}
		setSymbolWidth *= parseInt(document.getElementById("inputSetSymbolScale").value) / 100
		setSymbolHeight *= parseInt(document.getElementById("inputSetSymbolScale").value) / 100
		otherContext.drawImage(imgSetSymbol, cardData.setSymbolX - setSymbolWidth * setSymbolAlignment, cardData.setSymbolY - setSymbolHeight / 2, setSymbolWidth, setSymbolHeight)
	}
	if (document.getElementById("inputCheckboxWatermark").checked) {
		//Watermark
		var watermarkWidth = cardData.watermarkWidth
		var watermarkHeight = imgWatermark.height / imgWatermark.width * watermarkWidth
		if (watermarkHeight > cardData.watermarkHeight) {
			watermarkHeight = cardData.watermarkHeight
			watermarkWidth = imgWatermark.width / imgWatermark.height * watermarkHeight
		}
		imgWatermark.xVal = cardWidth / 2 - watermarkWidth / 2
		imgWatermark.yVal = cardData.watermarkY - watermarkHeight / 2
		imgWatermark.wVal = watermarkWidth
		imgWatermark.hVal = watermarkHeight
		otherContext.globalAlpha = parseInt(document.getElementById("inputWatermarkOpacity").value) / 100
		if (document.getElementById("inputCheckboxSecondWatermark").checked) {
			otherContext.mask(imgWatermark, "imgMultiGradient,source-over;imgWhite,source-out", document.getElementById("inputWatermarkColor").value)
			otherContext.mask(imgWatermark, "imgMultiGradient,source-over", document.getElementById("inputSecondWatermarkColor").value)
		} else {
			otherContext.mask(imgWatermark, "none", document.getElementById("inputWatermarkColor").value)
		}
		otherContext.globalAlpha = 1
	}
	drawCard()
}

function drawCard() {
	//Clears the card
	cardContext.mask(imgWhite, "none", document.getElementById("inputBorderColor").value)
	//Draws the card art
	cardContext.drawImage(imgCardArt, parseInt(document.getElementById("inputCardArtX").value) + cardData.cardArtX, parseInt(document.getElementById("inputCardArtY").value) + cardData.cardArtY, imgCardArt.width * document.getElementById("inputCardArtZoom").value / 100, imgCardArt.height * document.getElementById("inputCardArtZoom").value / 100)
	//Might do something special? Usually the ability lines for planeswalkers
	if (cardData.specialImageA == true) {
		cardContext.drawImage(specialACanvas, 0, 0, cardWidth, cardHeight)
	}
	//Draws the card frame
	cardContext.drawImage(frameCanvas, 0, 0, cardWidth, cardHeight)
	//Might do something special? Usually the ability icons for planeswalkers
	if (cardData.specialImageB == true) {
		cardContext.drawImage(specialBCanvas, 0, 0, cardWidth, cardHeight)
	}
	//Draws the card text
	cardContext.drawImage(textCanvas, 0, 0, cardWidth, cardHeight)
	//Draws the other stuff
	cardContext.drawImage(otherCanvas, 0, 0, cardWidth, cardHeight)
	//Erase anything if needed
	cardContext.globalCompositeOperation = "destination-out"
	cardContext.mask(imgCornerMask)
	cardContext.globalCompositeOperation = "source-over"
	//Draws the card onto the visible canvas
	context.clearRect(0, 0, canvas.width, canvas.height)
	if (cardData.horizontal) {
		context.rotate(-90 * Math.PI / 180)
		context.drawImage(cardCanvas, -canvas.height, 0, canvas.height, canvas.width)
		context.rotate(90 * Math.PI / 180)
	} else {
		context.drawImage(cardCanvas, 0, 0, canvas.width, canvas.height)
	}
}

//============================================//
//                HTML Stuff                  //
//============================================//
//Toggles the visibility of predetermined sections of the input boxes
function toggleView(targetId, targetClass) {
	for (var i = 0; i < document.getElementsByClassName(targetClass).length; i++) {
		document.getElementsByClassName(targetClass)[i].classList.remove("shown")
	}
	document.getElementById(targetClass + "-" + targetId).classList.add("shown")
}

//Downloads the image!
function downloadCardImage(linkElement) {
	linkElement.download = document.getElementById("inputName").value.toLowerCase() + ".png"
	var cardImageData = cardCanvas.toDataURL()
	if (cardImageData == undefined) {
		alert("Sorry, it seems that you cannot download your card. Please try using a different browser/device.")
	}
	linkElement.href = cardImageData
}

//Gives all the select boxes the same color options to choose from
//loadColors("white-White,blue-Blue,colorlessLand-Colorless Land,gold-Gold"), this is an example of how to use the function
function loadColors(colors) {
	var endResult = ""
	var colorList = colors.split(",")
	for (var i = 0; i < colorList.length; i++) {
		endResult += "<option value='data/borders/" + cardData.version + "/" + colorList[i].split("-")[0] + "/'>" + colorList[i].split("-")[1] + "</option>"
	}
	for (var i = 0; i < document.getElementsByClassName("selectColor").length; i++) {
		document.getElementsByClassName("selectColor")[i].innerHTML = endResult
	}
}
//changeme?
// loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,artifact-Artifact,colorless-Colorless,vehicle-Vehicle,clear-Clear,whiteLand-White Land,blueLand-Blue Land,blackLand-Black Land,redLand-Red Land,greenLand-Green Land,goldLand-Gold Land,colorlessLand-Colorless Land")

//It's easier to generate the mana symbol list via js, so do it here
var symbolList = ""
for (var i = 0; i < manaSymbolCodeList.length; i++) {
	symbolList += "<div class='manaSymbol' alt='...'>" + manaSymbolCodeList[i] + "<br/>" + "<img id='" + i + "'></img></div>"
}
document.getElementById("symbolList").innerHTML += symbolList

//Randomizes the sample cards at the bottom of the page.
function randomizeSampleCards(count) {
	var cardNumbers = []
	while (cardNumbers.length < 3) {
		var randomNumber = Math.floor(Math.random() * count) + 1
		if (cardNumbers.indexOf(randomNumber) > -1) {
			continue
		}
		cardNumbers[cardNumbers.length] = randomNumber
		var imgName = "sampleCard" + cardNumbers.length
		window[imgName] = new Image()
		window[imgName].src = "images/sampleCards/sample" + randomNumber + ".png"
	}
	sampleCard1.onload = function() {
		document.getElementById("sampleCardA").src = sampleCard1.src
	}
	sampleCard2.onload = function() {
		document.getElementById("sampleCardB").src = sampleCard2.src
	}
	sampleCard3.onload = function() {
		document.getElementById("sampleCardC").src = sampleCard3.src
	}
}

//Loads images from a file upload
function loadImage(event, destination) {
	var input = event.target
	var reader = new FileReader()
	reader.onload = function() {
		var dataURL = reader.result
		destination.src = dataURL
		destination.cropped = false
		if (destination == imgWatermark) {
			imgWatermark.whiteToTransparent = false
		}
	}
	reader.readAsDataURL(input.files[0])
}

//============================================//
//                Misc Stuff                  //
//============================================//
//Allows javascript files to be loaded through javascript code
function loadScript(scriptName){
	var script = document.createElement("script")
	script.setAttribute("type","text/javascript")
	script.setAttribute("src", scriptName)
	if (typeof script != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(script)
	}
}

//Loads card art from Scryfall's API via card name!
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
				cardArtArtistList[i] = savedArtList[i].slice(savedArtList[i].indexOf('"artist":"') + 10, savedArtList[i].indexOf('","border_color":'))
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
	imgCardArt.load("https://cors-anywhere.herokuapp.com/" + cardArtUrlList[cardArtNameNumberInput - 1])
	document.getElementById("inputInfoArtist").value = cardArtArtistList[cardArtNameNumberInput - 1]
	sectionTextFunction()
}

//============================================//
//           Special Image Loading            //
//============================================//
function loadLegendaryImages() {
	if (cardData.legendary) {
		if (document.getElementById("inputCheckboxPinline").checked) {
			imgLegendary.load(imgPinline.src.replace("frame.png", "legendary.png"))
			imgLegendaryRight.load(imgPinlineRight.src.replace("frame.png", "legendary.png"))
		} else {
			imgLegendary.load(imgFrame.src.replace("frame.png", "legendary.png"))
			imgLegendaryRight.load(imgFrameRight.src.replace("frame.png", "legendary.png"))
		}
	}
}
function loadRareStampImages() {
	if (cardData.rareStamp) {
		if (document.getElementById("inputCheckboxPinline").checked) {
			imgRareStamp.load(imgPinline.src.replace("frame.png", "stamp.png"))
			imgRareStampRight.load(imgPinlineRight.src.replace("frame.png", "stamp.png"))
		} else {
			imgRareStamp.load(imgFrame.src.replace("frame.png", "stamp.png"))
			imgRareStampRight.load(imgFrameRight.src.replace("frame.png", "stamp.png"))
		}
	}
}
function loadMiracleImages() {
	if (cardData.miracle) {
		if (document.getElementById("inputCheckboxTitleTypeBoxes").checked) {
			imgMiracle.load(imgTitleTypeBoxes.src.replace("frame.png", "miracle.png"))
			imgMiracleRight.load(imgTitleTypeBoxesRight.src.replace("frame.png", "miracle.png"))
		} else {
			imgMiracle.load(imgFrame.src.replace("frame.png", "miracle.png"))
			imgMiracleRight.load(imgFrameRight.src.replace("frame.png", "miracle.png"))
		}
	}
}
function loadNyxImages() {
	if (cardData.nyx) {
		imgNyx.load(imgFrame.src.replace("frame.png", "nyx.png"))
		imgNyxRight.load(imgFrameRight.src.replace("frame.png", "nyx.png"))
	}
}
function changePowerToughnessColor() {
	if (cardData.creature) {
		if (document.getElementById("inputCheckboxFrameRight").checked) {
			imgPowerToughness.load(document.getElementById("inputFrameRightColor").value + 'pt.png')
		} else {
			imgPowerToughness.load(document.getElementById("inputFrameColor").value + 'pt.png')
		}
	}
}
for (var i = 0; i < document.getElementsByClassName("changesFrame").length; i++) {
	document.getElementsByClassName("changesFrame")[i].addEventListener("change", function() {loadLegendaryImages(); loadRareStampImages(); loadNyxImages(); loadMiracleImages(); changePowerToughnessColor()}, false)
}
for (var i = 0; i < document.getElementsByClassName("changesTitleType").length; i++) {
	document.getElementsByClassName("changesTitleType")[i].addEventListener("change", function() {loadMiracleImages()}, false)
}
for (var i = 0; i < document.getElementsByClassName("changesPinline").length; i++) {
	document.getElementsByClassName("changesPinline")[i].addEventListener("change", function() {loadLegendaryImages(); loadRareStampImages()}, false)
}
//============================================//
//                Brower Stuff!               //
//============================================//
//Determine browser
if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) {
	var isMobile = true
} else {
	var isMobile = false
}
var isChrome = navigator.userAgent.indexOf("Chrome") > -1
var isExplorer = navigator.userAgent.indexOf("MSIE") > -1
var isFirefox = navigator.userAgent.indexOf("Firefox") > -1
var isSafari = navigator.userAgent.indexOf("Safari") > -1
if (isChrome == true && isSafari == true) {
	isSafari = false
}
//Now act on different browser craziness...
if (isSafari == true) {
	if (isMobile == true) {
		//Safari for iOS
		textBaselineShift = [-0.17, -0.08]
	} else {
		//Safari for macOS
		textBaselineShift = [-0.17, 0]
	}
}
function setCookie(cookieName, cookieValue) {
  	var tempDate = new Date();
  	tempDate.setTime(tempDate.getTime() + (5 * 365 * 24 * 60 * 60 * 1000)); //years*days*hours*minutes*seconds*milliseconds
  	var expires = "expires=" + tempDate.toUTCString();
  	document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
function getCookie(cookieName) {
  	var name = cookieName + "=";
  	var cookieArray = document.cookie.split(";");
  	for(var i = 0; i < cookieArray.length; i++) {
    	var tempCookie = cookieArray[i];
    	while (tempCookie.charAt(0) == " ") {
      		tempCookie = tempCookie.substring(1);
    	}
    	if (tempCookie.indexOf(name) == 0) {
     		return tempCookie.substring(name.length, tempCookie.length);
    	}
  	}
  	return "";
}
function checkCookies() {
	if (getCookie("visited") != "true") {
		if (isMobile == true) {
            alert("Thanks for using Card Conjurer! Unfortunately some users have been experiencing difficulty on mobile devices when uploading pictures they took on that mobile device. An easy solution is to quickly edit that picture by cropping it slightly. Otherwise, images from URLs and other sources should work normally.")
        } else if (isChrome == false) {
            alert("Thanks for using Card Conjurer! Unfortunately different browsers treat custom fonts differently and it appears that you are using a browser other than Chrome. Everything may work perfectly, but if you notice that the text looks odd try switching to Chrome.")
        }
        setCookie("visited", "true")
        setCookie("cookieUpdated5", "true")
	} else {
		console.log("Welcome back to Card Conjurer!")
		if (getCookie("cookieUpdated5") != "true") {
			alert("Card Conjurer has been updated since your last visit. Feel free to contact me at CardConjurerMTG@gmail.com if you would like to request a border style or have any questions. \r\n\r\nNewest border style: Old")
   	    	setCookie("cookieUpdated5", "true")
		} else {
			console.log("There are no new updates since your last visit.")
		}
	}
}

//============================================//
//                    OTHER                   //
//============================================//
//changeme (FIND A BETTER PLACE FOR THIS)
function cwidth(originalValue = 750, originalCardWidth = 750) {
	return (originalValue / originalCardWidth * cardWidth)
}
function cheight(originalValue = 1050, originalCardHeight = 1050) {
	return (originalValue / originalCardHeight * cardHeight)
}

//Runs stuff at the very end (once everything is set up)
setTimeout(function(){checkCookies()}, 1005)
backToDefault("m15")
loadScript("data/other/setCodeList.js")
scrollFunction()
//changeme
setTimeout(function(){sectionTextFunction()}, 250)
setTimeout(function(){sectionTextFunction()}, 500)
setTimeout(function(){sectionTextFunction()}, 1000)
// Only for working on frames n' stuff :)
// setTimeout(function(){
// 	document.getElementById("inputCardVersion").value = "old"
// 	document.getElementById("inputCardVersion").onchange()
// }, 500)

//============================================//
//            RIP OLD CARD CONJURER           //
//============================================//

// 	//COLOR IDENTITY
// 	if (document.getElementById("checkboxIdentity").checked == true) {
// 		var identityList = document.getElementById("inputIdentity").value.toLowerCase().split(" ")
// 		var angleSize = Math.PI * 2 / identityList.length
// 		var identityRadius = 14
// 		var identityX = typeX
// 		if (typeAlign == "left") {
// 			identityX += 8
// 		}
// 		var identityY = typeY + 15
// 		switch (identityList.length) {
// 			case 1:
// 			var originAngle = 0
// 			break;
// 			case 2:
// 			var originAngle = 3 * Math.PI / 4
// 			break;
// 			case 3:
// 			var originAngle = 7 * Math.PI / 6
// 			break;
// 			case 4:
// 			var originAngle = 3 * Math.PI / 2
// 			break;
// 			case 5:
// 			var originAngle = 13 * Math.PI / 10
// 			break;
// 			default:
// 			var originAngle = 0
// 		}
// 		for (var i = 0; i < identityList.length; i ++) {
// 			switch (identityList[i]) {
// 				case "w":
// 				border.fillStyle = "#f3f2ef"
// 				break;
// 				case "u":
// 				border.fillStyle = "#1d7097"
// 				break;
// 				case "b":
// 				border.fillStyle = "#31302e"
// 				break;
// 				case "r":
// 				border.fillStyle = "#bf544c"
// 				break;
// 				case "g":
// 				border.fillStyle = "#1c6449"
// 				break;
// 				case "m":
// 				border.fillStyle = "#e3d591"
// 				break;
// 				default:
// 				border.fillStyle = "#e0e0e0"
// 			}
// 			var startAngle = originAngle + i * angleSize
// 			border.beginPath()
// 			border.moveTo(identityX, identityY)
// 			border.arc(identityX, identityY, identityRadius, startAngle, startAngle + angleSize)
// 			border.lineTo(identityX, identityY)
// 			border.fill()
// 		}
// 		border.drawImage(imgIdentity, identityX - identityRadius, identityY - identityRadius, 2 * identityRadius, 2 * identityRadius)
// 		typeRightShift = 33
// 	} else {
// 		typeRightShift = 0
// 	}