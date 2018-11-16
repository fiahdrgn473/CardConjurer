//This is the primary javascript file for Card Conjurer, a program by Kyle Burton that draws custom Magic: The Gathering cards!


//============================================//
//              Initialization                //
//============================================//
//The following bits of code are run immediatly to initialize the program while allowing the variables to remain global.
//Define initial variables
var borderPath
var secondColor
var thirdColor
var titleRightShift = 0
var typeRightShift = 0
var imagesToLoad

//Set up canvas
var canvas = document.getElementById("canvas")
var card = canvas.getContext("2d")

//Create the canvas for creating the border image
var borderCanvas = document.createElement("canvas")
var border = borderCanvas.getContext("2d")

//load template images (images that may change based off of the selected template)
var imgListTemplate = ["multiMask", "rareStampMask", "frameMask", "legendFrameMask", "borderMask", "artMask"]
for (i = 0; i < imgListTemplate.length; i ++) {
	var imgName = "img" + imgListTemplate[i].charAt(0).toUpperCase() + imgListTemplate[i].slice(1)
	window[imgName] = new Image()
	window[imgName].crossOrigin = "anonymous"
}

//Load border images (images that are determined by border settings)
var imgListBorder = ["borderColor", "secondBorderColor", "thirdBorderColor", "borderCreature", "borderLegendary", "secondBorderLegendary", "borderRareStamp", "secondBorderRareStamp", "borderNyx", "secondBorderNyx", "borderMiracle", "secondBorderMiracle", "borderFlipIcon", "borderFlipCircle", "borderFlipTip", "borderFlippedDark", "secondBorderFlippedDark"]
for (i = 0; i < imgListBorder.length; i ++) {
	var imgName = "img" + imgListBorder[i].charAt(0).toUpperCase() + imgListBorder[i].slice(1)
	window[imgName] = new Image()
	window[imgName].crossOrigin = "anonymous"
	imgListBorder[i] = window[imgName]
	imgListBorder[i].onload = function() {
		if (this.hasToLoad == true) {
			this.hasToLoad = false
			imagesToLoad --
			if (imagesToLoad == 0) {
				createBorder()
			}
		}
	}
}

//Load dynamic images (images that are input by the user)
var imgListUser = ["art", "setSymbol", "watermark", "border"]
for (i = 0; i < imgListUser.length; i ++) {
	var imgName = "img" + imgListUser[i].charAt(0).toUpperCase() + imgListUser[i].slice(1)
	window[imgName] = new Image()
	window[imgName].crossOrigin = "anonymous"
	window[imgName].onload = function() {
		//If both tasks are required, it will make white pixels transparent first. That way they also get cropped out.
		if (this.whiteToTransparent == false) {
			this.whiteToTransparent = true
			whiteToTransparent(imgWatermark)
		} else if (this.cropped == false) {
			this.cropped = true
			autocrop(this.src, this)
		}
	}
}

//Load static images
var imgListStatic = ["artistBrush", "foil", "stampGradient", "multiGradient", "rareStamp", "cardMask", "bar", "identity"]
for (i = 0; i < imgListStatic.length; i ++) {
	var imgName = "img" + imgListStatic[i].charAt(0).toUpperCase() + imgListStatic[i].slice(1)
	window[imgName] = new Image()
	window[imgName].src = "data/borders/" + imgListStatic[i] + ".png"
}

//Mana symbol Array setup
var manaSymbolCode = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "w", "u", "b", "r", "g", "2w", "2u", "2b", "2r", "2g", "pw", "pu", "pb", "pr", "pg", "wu", "wb", "ub", "ur", "br", "bg", "rg", "rw", "gw", "gu", "x", "snow", "c", "t","untap", "e", "y", "z", "1/2", "inf", "chaos", "plane"]
var manaSymbolImages = new Array()
for (var i = 0; i < manaSymbolCode.length; i++) {
	manaSymbolImages[i] = new Image()
	manaSymbolImages[i].src = "data/manaSymbols/" + i + ".png"
	manaSymbolImages[i].name = i
	manaSymbolImages[i].onload = function() {
		document.getElementById(this.name).src = this.src
	}
}

//Go ahead and load the first border
loadScript("data/borders/defaultBorder.js")

//load first set symbol
loadSetSymbol()

//Randomize the sample cards at the bottom
randomizeSampleCards(8)

//Set up the initial clock!
var cardClockInterval = setInterval(cardClock, 1000 / document.getElementById("inputFPS").value)

//It's easier to generate the mana symbol list via js, so do it here
var symbolList = ""
	for (var i = 0; i < manaSymbolCode.length; i++) {
		symbolList += "<div class='manaSymbol' alt='...'>" + manaSymbolCode[i] + "<br/>" + "<img id='" + i + "'></img></div>"
	}
document.getElementById("symbolList").innerHTML += symbolList


//============================================//
//       Card clock and changing frames!      //
//============================================//
//Runs ten times every second (main loop)
function cardClock() {
	//fixes the global alpha just incase...
	//Insures that the corners of the final image are transparent
	card.globalCompositeOperation = "source-over"
	drawMask(document.getElementById("inputColor").value, 0, 0, cardWidth, cardHeight, card, imgCardMask, false, false)
	card.globalCompositeOperation = "source-atop"
	//Draws the card image, then...
	drawPicture()
	//draws the card frame on top
	if (transparentBorder != true) {
        drawMask(imgBorder, 0, 0, cardWidth, cardHeight, card, imgArtMask, false, false)
    } else {
    	card.drawImage(imgBorder, 0, 0, cardWidth, cardHeight)
    }
	//draws the set symbol, mana cost, and watermark
	drawSetSymbol()
	drawManaCost()
	drawWatermark()
	//writes all the text: name, type, rules...
	writeText()
	//m15 and 8th edition have different info at the bottom of the cards and require completely different functions
	if (m15Info == true) {
		bottomInfoM15()
	} else if (eighthInfo == true) {
		bottomInfo8th()
	}else if (planechaseInfo == true) {
		bottomInfoPlanechase()
	}
	//A shiny foil overlay!
	if(document.getElementById("checkboxFoil").checked == true) {
		card.drawImage(imgFoil, 0, 0, cardWidth, cardHeight)
	}
	//These are for pinpointing coordinates while adjusting values for new border types
	//Vertical Line
	// card.beginPath()
	// card.moveTo(688, 0)
	// card.lineTo(688, 1044)
	// card.stroke()
	//Horizontal Line
	// card.beginPath()
	// card.moveTo(0, setSymbolY)
	// card.lineTo(749, setSymbolY)
	// card.stroke()
}

//The two following functions load border images
function changeTemplate() {
	//the loadScript function is located in data/scripts/loadScript.js. It sets values to variables such as set symbol coordinates or title font
	loadScript("data/borders/defaultBorder.js")
}
function finishTemplate() {
	//This is a seperate function to insure that the border.js file finishes running before running a few last commands
	canvas.width = cardWidth
	canvas.height = cardHeight
	borderCanvas.width = cardWidth
	borderCanvas.height = cardHeight
	document.getElementById("colorSelection").value = "white"
	imgMultiMask.src = borderPath + "multiMask.png"
	imgFrameMask.src = borderPath + "frameMask.png"
	if (m15Info == true) {
		imgLegendFrameMask.src = borderPath + "legendFrameMask.png"
		imgRareStampMask.src = borderPath + "rareStampMask.png"
		imgBorderMask.src = borderPath + "borderMask.png"
	} else if (eighthInfo == true) {
		imgBorderMask.src = borderPath + "frameMask.png"
	}
	updateBorder()
}
//Loads the images for the card frame, power toughness box, and rare stamp
function updateBorder() {
	borderPath = "data/borders/" + document.getElementById("borderSelection").value
	secondColor = document.getElementById("checkboxSecondColor").checked
	thirdColor = document.getElementById("checkboxThirdColor").checked
	var firstColorPath = borderPath + document.getElementById("colorSelection").value
	var secondColorPath = borderPath + document.getElementById("secondColorSelection").value
	var thirdColorPath = borderPath + document.getElementById("thirdColorSelection").value
	var altframe = ""
	imgArtMask.src = borderPath + "artMask.png"
	imgBorderColor.src = firstColorPath + "/frame.png"
	imgSecondBorderColor.src = secondColorPath + "/frame.png"
	imgThirdBorderColor.src = thirdColorPath + "/frame.png"
	if (document.getElementById("checkboxFlippedDark").checked == true && flipBorder == true) {
		altframe = "dark"
	} else {
		altframe = ""
	}
	if (creatureBorder == true) {
		if (thirdColor == true) {
			imgBorderCreature.src = thirdColorPath + "/" +  altframe + "pt.png"
		} else if (secondColor == true) {
			imgBorderCreature.src = secondColorPath + "/" +  altframe + "pt.png"
		} else {
			imgBorderCreature.src = firstColorPath + "/" +  altframe + "pt.png"
		}
	}
	if (legendaryBorder == true) {
		imgBorderLegendary.src = firstColorPath + "/legendary.png"
		imgSecondBorderLegendary.src = secondColorPath + "/legendary.png"
	}
	if (stampBorder == true) {
		imgBorderRareStamp.src = firstColorPath + "/stamp.png"
		imgSecondBorderRareStamp.src = secondColorPath + "/stamp.png"
	}
	if (nyxBorder == true) {
		if (thirdColor == true) {
			imgBorderNyx.src = thirdColorPath + "/nyx.png"
		} else {
			imgBorderNyx.src = firstColorPath + "/nyx.png"
			imgSecondBorderNyx.src = secondColorPath + "/nyx.png"
		}
	}
	if (miracleBorder == true) {
		if (thirdColor == true) {
			imgBorderMiracle.src = thirdColorPath + "/" +  altframe + "miracle.png"
		} else {
			imgBorderMiracle.src = firstColorPath + "/" +  altframe + "miracle.png"
			imgSecondBorderMiracle.src = secondColorPath + "/" +  altframe + "miracle.png"
		}
	}
	if (flipBorder == true) {
		if (thirdColor == true) {
			imgBorderFlippedDark.src = thirdColorPath + "/flippedDark.png"
		} else {
			imgBorderFlippedDark.src = firstColorPath + "/flippedDark.png"
			imgSecondBorderFlippedDark.src = secondColorPath + "/flippedDark.png"
		}
		if (secondColor == true) {
			imgBorderFlipTip.src = secondColorPath + "/flipTip.png"
		} else {
			imgBorderFlipTip.src = firstColorPath + "/flipTip.png"
		}
		imgBorderFlipCircle.src = firstColorPath + "/flipCircle.png"
		imgBorderFlipIcon.src = "data/borders/icons/" + document.getElementById("inputFlipIcon").value
	}
	//This allows all the images to be loaded
	imagesToLoad = 0
	//Makes a count of all images that are loading, also tags them
	for (i = 0; i < imgListBorder.length; i++) {
		if (imgListBorder[i].complete == false) {
			imagesToLoad ++
			imgListBorder[i].hasToLoad = true
		}
	}
	//If no images needed to be loaded, runs the createBorder function anyways
	if (imagesToLoad == 0) {
		createBorder()
	}
}
//Once the border images have finished loading, they are all drawn into a temporary canvas then saved to a single image
function createBorder() {
	//These if else statements check to see whether or not to draw different parts of the card, like the legendary border or rare stamp, and draws them in the appropriate order so that when multiple border colors are used the gradients overlap correctly
	//BACKGROUND COLOR
	border.clearRect(0, 0, cardWidth, cardHeight)
	drawMask(document.getElementById("inputColor").value, 0, 0, cardWidth, cardHeight, border, imgArtMask, false, false)
	//MAIN CARD FRAME
	drawMask(imgBorderColor, 0, 0, cardWidth, cardHeight, border, imgFrameMask, false, false)
	if (secondColor == true && secondBorder == true) {
		drawMask(imgSecondBorderColor, 0, 0, cardWidth, cardHeight, border, imgFrameMask, imgMultiGradient, "reverseSecond")
	}
	if (thirdColor == true && thirdBorder == true) {
		drawMask(imgThirdBorderColor, 0, 0, cardWidth, cardHeight, border, imgFrameMask, imgMultiMask, false)
	}
	//Draws the silver border usually on un-cards
	if (document.getElementById("checkboxSilverBorder").checked == true) {
		drawMask("#a3aeb7", 0, 0, cardWidth, cardHeight, border, imgBorderMask, imgFrameMask, "reverseSecond")
	}
	//NYX
	if (document.getElementById("checkboxNyx").checked == true && nyxBorder == true) {
		if (thirdColor == true) {
			drawMask(imgBorderNyx, 0, 0, cardWidth, cardHeight, border, imgFrameMask, imgMultiMask, false)
		} else {
			drawMask(imgBorderNyx, 0, 0, cardWidth, cardHeight, border, imgFrameMask, false, false)
			if (secondColor == true) {
				drawMask(imgSecondBorderNyx, 0, 0, cardWidth, cardHeight, border, imgFrameMask, imgMultiGradient, "reverseSecond")
			}
		}	
	}
	//MIRACLE
	if (document.getElementById("checkboxMiracle").checked == true && miracleBorder == true && (document.getElementById("checkboxFlippedDark").checked == false || flipBorder == false)) {
		if (document.getElementById("checkboxFlippedDark").checked == true) {
			alert("hmmm")
		}
		if (thirdColor == true) {
			drawMask(imgBorderMiracle, 0, 0, cardWidth, cardHeight, border, imgFrameMask, false, false)
		} else {
			drawMask(imgBorderMiracle, 0, 0, cardWidth, cardHeight, border, imgFrameMask, false, false)
			if (secondColor == true) {
				drawMask(imgSecondBorderMiracle, 0, 0, cardWidth, cardHeight, border, imgFrameMask, imgMultiGradient, "reverseSecond")
			}
		}
	}
	//LEGENDARY
	if (document.getElementById("checkboxLegendary").checked == true && legendaryBorder == true) {
		drawMask(imgBorderLegendary, 0, 0, cardWidth, cardHeight, border, imgLegendFrameMask, false, false)
		if (secondColor == true) {
			drawMask(imgSecondBorderLegendary, 0, 0, cardWidth, cardHeight, border, imgLegendFrameMask, imgMultiGradient, "reverseSecond")
		}
		//redraws the custom-color border to match the legendary frame
		drawMask(document.getElementById("inputColor").value, 0, 0, cardWidth, cardHeight, border, imgBorderMask, imgLegendFrameMask, "reverseSecond")
		//redraws the silver border usually on un-cards to match the legendary frame
		if (document.getElementById("checkboxSilverBorder").checked == true) {
			drawMask("#a3aeb7", 0, 0, cardWidth, cardHeight, border, imgBorderMask, imgLegendFrameMask, "reverseSecond")
		}
	}
	//FLIP CARDS
	if (flipBorder == true) {
		if (document.getElementById("checkboxFlippedDark").checked == true && flipBorder == true) {
			if (thirdColor == true) {
				drawMask(imgBorderFlippedDark, 0, 0, cardWidth, cardHeight, border, imgFrameMask, false, false)
			} else {
				drawMask(imgBorderFlippedDark, 0, 0, cardWidth, cardHeight, border, imgFrameMask, false, false)
				if (secondColor == true) {
					drawMask(imgSecondBorderFlippedDark, 0, 0, cardWidth, cardHeight, border, imgSecondBorderFlippedDark, imgMultiGradient, "reverseSecond")
				}
			}
		}
		//redraws the miracle border if required to match with the newer darker overlay
		if (document.getElementById("checkboxMiracle").checked == true && miracleBorder == true && (document.getElementById("checkboxLegendary").checked == false || legendaryBorder == false)) {
			if (thirdColor == true) {
				drawMask(imgBorderMiracle, 0, 0, cardWidth, cardHeight, border, imgFrameMask, false, false)
			} else {
				drawMask(imgBorderMiracle, 0, 0, cardWidth, cardHeight, border, imgFrameMask, false, false)
				if (secondColor == true) {
					drawMask(imgSecondBorderMiracle, 0, 0, cardWidth, cardHeight, border, imgFrameMask, imgMultiGradient, "reverseSecond")
				}
			}
		}
		if (document.getElementById("checkboxFlipIcon").checked == true || document.getElementById("checkboxFlippedDark").checked == true) {
			border.drawImage(imgBorderFlipCircle, 0, 0, cardWidth, cardHeight)
			border.drawImage(imgBorderFlipIcon, 39, 51, 60, 60)
		}
		if (document.getElementById("checkboxFlipTip").checked == true) {
			border.drawImage(imgBorderFlipTip, 0, 0, cardWidth, cardHeight)
			border.fillStyle="#666"
			canvas.style.letterSpacing = "0px"
			border.font = "28px belerenb"
			border.fillText(document.getElementById("inputFlipTip").value, 688 - border.measureText(document.getElementById("inputFlipTip").value).width, 880)
		}
		if (document.getElementById("checkboxFlipIcon").checked == true || document.getElementById("checkboxFlippedDark").checked == true) {
			titleRightShift = 50
		} else {
			titleRightShift = 0
		}
	}
	//COLOR IDENTITY
	if (document.getElementById("checkboxIdentity").checked == true) {
		var identityList = document.getElementById("inputIdentity").value.toLowerCase().split(" ")
		var angleSize = Math.PI * 2 / identityList.length
		var identityRadius = 14
		var identityX = typeX + 8
		var identityY = typeY + 21
		switch (identityList.length) {
			case 1:
			var originAngle = 0
			break;
			case 2:
			var originAngle = 3 * Math.PI / 4
			break;
			case 3:
			var originAngle = 7 * Math.PI / 6
			break;
			case 4:
			var originAngle = 3 * Math.PI / 2
			break;
			case 5:
			var originAngle = 13 * Math.PI / 10
			break;
			default:
			var originAngle = 0
		}
		for (i = 0; i < identityList.length; i ++) {
			switch (identityList[i]) {
				case "w":
				border.fillStyle = "#f3f2ef"
				break;
				case "u":
				border.fillStyle = "#1d7097"
				break;
				case "b":
				border.fillStyle = "#31302e"
				break;
				case "r":
				border.fillStyle = "#bf544c"
				break;
				case "g":
				border.fillStyle = "#1c6449"
				break;
				case "m":
				border.fillStyle = "#e3d591"
				break;
				default:
				border.fillStyle = "#e0e0e0"
			}
			var startAngle = originAngle + i * angleSize
			border.beginPath()
			border.moveTo(identityX, identityY)
			border.arc(identityX, identityY, identityRadius, startAngle, startAngle + angleSize)
			border.lineTo(identityX, identityY)
			border.fill()
		}
		border.drawImage(imgIdentity, identityX - identityRadius, identityY - identityRadius, 2 * identityRadius, 2 * identityRadius)
		typeRightShift = 33
	} else {
		typeRightShift = 0
	}
	//RARE STAMP
	if (document.getElementById("checkboxRareStamp").checked == true && stampBorder == true) {
		border.drawImage(imgBorderRareStamp, 329, rareStampY - 15, 90, 50)

		if (document.getElementById("checkboxSecondColor").checked == true) {
			drawMask(imgSecondBorderRareStamp, 329, rareStampY - 15, 90, 50, border, imgSecondBorderRareStamp, imgStampGradient, "reverseSecond")
		}
		//Draws over the rare stamp (part that's usually black) to match custom border color
		drawMask(document.getElementById("inputColor").value, 329, rareStampY - 15, 90, 50, border, imgRareStampMask, false, false)
		//This is when the holo stamp is drawn
		border.drawImage(imgRareStamp, 340, rareStampY, 70, 37)
	}
	imgBorder.src = borderCanvas.toDataURL()
}


//============================================//
//            Drawing on the card             //
//============================================//
//Draw card art
function drawPicture() {
	//scales the card art and draws it
	var imageScale = document.getElementById("imageSize").value * 0.01
	var imageLeftShift = parseInt(document.getElementById("imageLeft").value)
	var imageUpShift = parseInt(document.getElementById("imageUp").value)
	if (imgArt.width > 0) {
		card.drawImage(imgArt, artX - imageLeftShift, artY - imageUpShift, imgArt.width * imageScale, imgArt.height * imageScale)
		//drawMask(imgArt, artX - imageLeftShift, artY - imageUpShift, imgArt.width * imageScale, imgArt.height * imageScale, card, imgArtMask, false, false)
	}
}

//Draw the set symbol
function drawSetSymbol() {
	//scales the set symbol so that it fits in the correct area and centers it
	if (imgSetSymbol.width > 0 && document.getElementById("checkboxSetSymbol").checked == true) {
		var height = setSymbolHeight
		var width = imgSetSymbol.width * (height / imgSetSymbol.height)
		if (width > setSymbolWidth) {
			width = setSymbolWidth
			height = imgSetSymbol.height * (width / imgSetSymbol.width)
		}
		height *= document.getElementById("setSymbolSize").value / 100
		width *= document.getElementById("setSymbolSize").value / 100
		var y = setSymbolY - height / 2
		var x = setSymbolRight - width / centerSetSymbol
		card.drawImage(imgSetSymbol, x, y, width, height)
	}
}

//Draw the watermark
function drawWatermark() {
	//The watermark is centered/scaled just like the set symbol
	if (imgWatermark.width > 0 && document.getElementById("checkboxWatermark").checked == true) {
		var height = watermarkHeight
		var width = imgWatermark.width * (height / imgWatermark.height)
		if (width > watermarkWidth) {
			width = watermarkWidth
			height = imgWatermark.height * (width / imgWatermark.width)
		}
		var x = cardWidth / 2 - width / 2
		var y = watermarkY - height / 2
		//globalAlpha insures that the watermark is drawn partially transparent. This value may not be perfect but the watermark colors are calibrated to it
		card.globalAlpha = document.getElementById("inputWatermarkOpacity").value
	    //if the following if statement is true, the watermark will be drawn in two halves of the chosen colors. Otherwise, a single watermark of the first chosen color is drawn.
	    if (document.getElementById("checkboxSecondWatermarkColor").checked == true) {
	    	drawMask(document.getElementById("watermarkColorSelection").value, x, y, width, height, card, imgWatermark, imgMultiGradient, false)
	    	drawMask(document.getElementById("secondWatermarkColorSelection").value, x, y, width, height, card, imgWatermark, imgMultiGradient, "reverseSecond")
	    } else {
	    	drawMask(document.getElementById("watermarkColorSelection").value, x, y, width, height, card, imgWatermark, false, false)
	    }
	}
	card.globalAlpha = 1
}

//Draw the mana cost
function drawManaCost() {
	//the symbols string splits the mana cost input into an array of strings which is then put into a for loop that draws the appropriate set symbol then adjusts the xShift so the set symbols are spaced properly
	card.fillStyle = "Black"
	var symbols = document.getElementById("inputCost").value.toLowerCase().split(" ")
	var xShift = 0
	for (n = symbols.length; n > -1; n--) {
		if (manaSymbolCode.indexOf(symbols[n]) != -1) {
			card.beginPath()
			card.arc(manaCostX + xShift + manaCostRadius - 1, manaCostY + manaCostRadius + 3.5, manaCostRadius, 0, 6.29, false)
			card.fill()
			card.drawImage(manaSymbolImages[manaSymbolCode.indexOf(symbols[n])], manaCostX + xShift, manaCostY, manaCostRadius * 2, manaCostRadius * 2)
			xShift -= 39
		}
	}
}

//Write card text (title, type, pt, and rules)
function writeText() {
	//Draws the entered text onto the card, also draws the power/toughness box if necessary
	//All use these:
	card.textBaseline = "top"
	if (flipBorder == true && document.getElementById("checkboxFlippedDark").checked == true) {
		card.fillStyle = "White"
	} else {
		card.fillStyle = "Black"
	}
	//Title
	card.textAlign = titleAlign
	canvas.style.letterSpacing = titleFontSpacing
	card.font = titleFont	
	card.fillText(document.getElementById("inputName").value, titleX + titleRightShift, titleY)
	//Type
	card.textAlign = typeAlign
	canvas.style.letterSpacing = typeFontSpacing
	card.font = typeFont
	card.fillText(document.getElementById("inputType").value, typeX + typeRightShift, typeY)
	//Power/Toughness
	if (document.getElementById("checkboxCreature").checked == true && creatureBorder == true) {
		if (imgBorderCreature.src.substr(imgBorderCreature.src.length - 14) == "vehicle/pt.png") {
			card.fillStyle = "White"
		}
		card.textAlign = "center"
		card.drawImage(imgBorderCreature, ptX, ptY, ptWidth, ptHeight)
		canvas.style.letterSpacing = ptFontSpacing
		card.font = ptFont
		powerToughness = document.getElementById("inputPowerToughness").value
		card.fillText(powerToughness, ptTextX, ptTextY)
	}
	card.textAlign = "left"
	card.fillStyle = "Black"
	//Rules Text
	canvas.style.letterSpacing = textFontSpacing + "px"
	card.font = document.getElementById("textSize").value + textFont
	var text = document.getElementById("inputText").value
	drawText(text, textX, textY)
}

//Bottom info on M15 cards
function bottomInfoM15() {
	if (document.getElementById("checkboxArtistColor").checked == true) {
		card.fillStyle = "black"
	} else {
		card.fillStyle = "white"
	}
	var shiftInfo = 442
	canvas.style.letterSpacing = "0.8px"
	card.font = "19.5px relaymedium"
	var bottomLine = document.getElementById("inputSet").value + " \u00b7 " + document.getElementById("inputLanguage").value
	card.fillText(bottomLine, 48, m15InfoY)
	var artistBrushShift = card.measureText(bottomLine).width + 58
	drawMask(card.fillStyle, artistBrushShift, m15InfoY + 5, 21, 13, card, imgArtistBrush, false, false)
	canvas.style.letterSpacing = "1.3px"
	card.font = "19.5px relaymedium"
	card.fillText(document.getElementById("inputNumber").value, 49, m15InfoY - 20)
	card.fillText(document.getElementById("inputRarity").value, artistBrushShift - 1, m15InfoY - 20)
	if (442 < artistBrushShift  + card.measureText(document.getElementById("inputRarity").value).width && document.getElementById("checkboxCreature").checked == false) {
		shiftInfo = artistBrushShift  + card.measureText(document.getElementById("inputRarity").value).width + 5
	}
	canvas.style.letterSpacing = "-0.1px"
	card.font = "24px matrixbsc"
	card.fillText(document.getElementById("inputArtist").value, artistBrushShift + 21, m15InfoY + 2)
	if (442 < artistBrushShift + 21 + card.measureText(document.getElementById("inputArtist").value).width && document.getElementById("checkboxCreature").checked == true) {
		shiftInfo = artistBrushShift + card.measureText(document.getElementById("inputArtist").value).width + 26
	}
	//This is where "CC —" is hardcoded. The only reason is to prevent users from easily typing in the trademark and copyright that's usually on real cards. It's also there so I can see if a card was created with my program, it makes me feel good :)
	if (document.getElementById("inputInfo").value != "") {
		canvas.style.letterSpacing = "0px"
		card.font = "17px mplantin"
		var bottomInfo = "CC \u2014 " + document.getElementById("inputInfo").value
		if (bottomInfo == "CC \u2014 secretcode") {
			var date = new Date()
			var year = date.getFullYear()
			bottomInfo = "\u2122 & \u00a9 " + year + " Wizards of the Coast"
		}
		if (document.getElementById("checkboxCreature").checked == true) {
			card.fillText(bottomInfo, shiftInfo, m15InfoY + 3)
		} else {
			card.fillText(bottomInfo, shiftInfo, m15InfoY - 17)
		}
	}
}
//Bottom info on 8th edition cards
function bottomInfo8th() {
	if (document.getElementById("checkboxArtistColor").checked == true) {
		card.fillStyle = "black"
	} else {
		card.fillStyle = "white"
	}
	canvas.style.letterSpacing = "1px"
	card.font = "25px matrixb"
	card.fillText(document.getElementById("inputArtist").value, 116, eighthInfoY)
	canvas.style.letterSpacing = "0.5px"
	card.font = "16px mplantin"
	card.fillText("CC \u2014 " + document.getElementById("inputInfo").value + " " + document.getElementById("inputNumber").value, 62, eighthInfoY + 31)
}


//============================================//
//         Text processor! (kind of)          //
//============================================//
//Write the rules and flavor text!
function drawText(text, xCoord, yCoord) {
	var x = xCoord
	var lineSpace = parseInt(document.getElementById("textShift").value, 10)
	var textSize = parseInt(document.getElementById("textSize").value, 10)
	var y = yCoord + parseInt(document.getElementById("textDown").value, 10)
	var textXShift = 0
	var words = (text).split(" ")
	var line = ""
	var tempTextWidth = textWidth
	for (wordIndex = 0; wordIndex < words.length; wordIndex ++) {
		if (words[wordIndex].includes("<") == false || words[wordIndex].includes(">") == false) {
			//Just a regular old word
			testLine = line + words[wordIndex]
			var lineWidth = card.measureText(testLine).width
			if (lineWidth + textXShift + x > tempTextWidth && wordIndex > 0) {
				//Word is too big
				card.fillText(line, x + textXShift, y)
				line = words[wordIndex] + " "
				y += textSize + 1
				textXShift = 0
			} else {
				//Word fits
				line = testLine + " "
			}
			if (wordIndex + 1 == words.length) {
				card.fillText(line, x + textXShift, y)
			}
		} else {
			//Symbols and more!
			var splitWord = words[wordIndex].split("<")
			for (splitIndex = 0; splitIndex < splitWord.length; splitIndex ++) {
				//Write what's there first!
				card.fillText(line, x + textXShift, y)
				textXShift += card.measureText(line).width
				line = ""
				if (splitWord[splitIndex].includes(">")) {
					var plainWord = ""
					var megaSplit = splitWord[splitIndex].split(">")
					//series of if statements to determine an action based off of the given code
					if (megaSplit[0] == "i") {
						canvas.style.letterSpacing = textFontSpacing * 1/3 + "px"
						card.font = textSize + textFont + "i"
					} else if (megaSplit[0] == "/i") {
						canvas.style.letterSpacing = textFontSpacing + "px"
						card.font = textSize + textFont
					} else if (megaSplit[0] == "center") {
						card.textAlign="center"
						x = cardWidth / 2
						tempTextWidth = textWidth * 1.5
					} else if (megaSplit[0] == "right") {
						card.textAlign="right"
						tempTextWidth = textWidth * 1.9
						x = cardWidth - xCoord
					} else if (megaSplit[0] == "left") {
						card.textAlign="left"
						tempTextWidth = textWidth
						x = xCoord
					} else if (megaSplit[0] == "line") {
						textXShift = 0
						y += lineSpace + textSize + 1
					} else if (megaSplit[0] == "lineNoSpace") {
						textXShift = 0
						y += textSize + 1
					} else if (megaSplit[0] == "bar") {
						card.drawImage(imgBar, cardWidth / 2 - imgBar.width / 2, y + textSize + lineSpace + 5)
						textXShift = 0
						y += 2 * lineSpace + textSize + 3
					} else if (megaSplit[0].toLowerCase() == "chaos") {
						//The chaos symbol (on planar cards) needs to be a bit bigger
						card.drawImage(manaSymbolImages[56], x + textXShift + textSize * 0.054, y + textSize * 0.17, textSize, manaSymbolImages[56].height * textSize / manaSymbolImages[56].width)
						textXShift += textSize * 1
					} else if (megaSplit[0] == "plane") {
						//This draws the large chaos symbol found on planar cards and permenantly shifts the text over
						card.drawImage(manaSymbolImages[57], x, y + 6, 48, 42)
						x += 58
					} else {
						//It's an image (mana symbol, tap, etc...)
						card.drawImage(manaSymbolImages[manaSymbolCode.indexOf(megaSplit[0].toLowerCase())], x + textXShift + textSize * 0.054, y + textSize * 0.17 + parseInt(document.getElementById("inputSymbolDown").value), textSize * 0.77, textSize * 0.77)
						textXShift += textSize * 0.84
					}
					if (megaSplit[1] != "") {
						plainWord = megaSplit[1] + " "
					} else if (splitIndex == splitWord.length - 1) {
						line += " "
					}
				} else {
					plainWord = splitWord[splitIndex]
				}
				if (plainWord != "") {
					//After isolating the plain word, write it!
					testLine = line + plainWord
					var lineWidth = card.measureText(testLine).width
					if (lineWidth + textXShift + x > tempTextWidth && wordIndex > 0) {
						//Word is too big
						card.fillText(line, x + textXShift, y)
						line = plainWord
						y += textSize + 1
						textXShift = 0
					} else {
						//Word fits
						line = testLine
					}
					if (wordIndex + 1 == words.length) {
						card.fillText(line, x + textXShift, y)
					}
				}
			}
		}
	}
	//Make things go back to normal :)
	card.textAlign="left"
}


//============================================//
//       Various website-related code         //
//============================================//
//Toggles the visibility of predetermined sections of the input boxes
function toggleView(targetId, targetClass) {
	for (i = 0; i < document.getElementsByClassName(targetClass).length; i++) {
		document.getElementsByClassName(targetClass)[i].classList.remove("shown")
	}
	document.getElementById(targetClass + "-" + targetId).classList.add("shown")
}
//Randomizes the sample cards at the bottom of the page. Runs it here too
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
		window[imgName].src = "sampleCards/sample-card-" + randomNumber + ".png"
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


//============================================//
//              Image loading                 //
//============================================//
//Loads the set symbol from the gatherer site
function loadSetSymbol() {
	imgSetSymbol.cropped = false
	imgSetSymbol.src = "https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + document.getElementById("setSymbolCode").value.toUpperCase() + "&size=large&rarity=" + document.getElementById("setSymbolRarity").value.toUpperCase()
}
//Set Image to watermark!!!
function loadSetSymbolWatermark() {
	imgWatermark.whiteToTransparent = false
	imgWatermark.cropped = false
	imgWatermark.src = "https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + document.getElementById("inputWatermarkSetCode").value.toUpperCase() + "&size=large&rarity=C"
}
//Loads an image from URL
function imageURL(input, targetImage) {
	targetImage.cropped = false
	if (targetImage == imgWatermark) {
		imgWatermark.whiteToTransparent = false
	}
	targetImage.src = "https://cors-anywhere.herokuapp.com/" + input.value
}


//============================================//
//                  Other                     //
//============================================//
//Best for last - downloads the image!
function downloadCardImage(linkElement) {
	var cardImageData = canvas.toDataURL()
	if (cardImageData == undefined) {
		alert("Sorry, it seems that you cannot download your card. Please try using a different browser/device.")
	}
	linkElement.href = cardImageData
}


//============================================//
//                  Log it!                   //
//============================================//
console.log("The main.js file has finished loading.")


//============================================//
//                    WIP                     //
//============================================//
