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
var textBaselineShift = [0, 0] //[regular,eighthArtistCredit]
var imagesToLoad
var date = new Date()

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


//Set up canvas
var canvas = document.getElementById("canvas")
var card = canvas.getContext("2d")

//Create the canvas for creating the border image
var borderCanvas = document.createElement("canvas")
var border = borderCanvas.getContext("2d")

//load template images (images that may change based off of the selected template)
var imgListTemplate = ["multiMask", "rareStampMask", "frameMask", "legendFrameMask", "borderMask", "artMask", "abilityLineOdd", "abilityLineEven", "rulesMask", "typeMask", "titleMask"]
for (var i = 0; i < imgListTemplate.length; i ++) {
	var imgName = "img" + imgListTemplate[i].charAt(0).toUpperCase() + imgListTemplate[i].slice(1)
	window[imgName] = new Image()
	window[imgName].crossOrigin = "anonymous"
}

//Load border images (images that are determined by border settings)
var imgListBorder = ["borderColor", "secondBorderColor", "thirdBorderColor", "artifactBorderColor", "borderCreature", "borderLegendary", "secondBorderLegendary", "borderRareStamp", "secondBorderRareStamp", "borderNyx", "secondBorderNyx", "borderMiracle", "secondBorderMiracle", "borderFlipIcon", "borderFlipCircle", "borderFlipTip", "borderFlippedDark", "secondBorderFlippedDark"]
for (var i = 0; i < imgListBorder.length; i ++) {
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
for (var i = 0; i < imgListUser.length; i ++) {
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
var imgListStatic = ["artistBrush", "foil", "multiGradient", "rareStamp", "cardMask", "bar", "identity"]
for (var i = 0; i < imgListStatic.length; i ++) {
	var imgName = "img" + imgListStatic[i].charAt(0).toUpperCase() + imgListStatic[i].slice(1)
	window[imgName] = new Image()
	window[imgName].src = "data/borders/" + imgListStatic[i] + ".png"
}

//Mana symbol Array setup
var manaSymbolCode = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "w", "u", "b", "r", "g", "2w", "2u", "2b", "2r", "2g", "pw", "pu", "pb", "pr", "pg", "wu", "wb", "ub", "ur", "br", "bg", "rg", "rw", "gw", "gu", "x", "s", "c", "t","untap", "e", "y", "z", "1/2", "inf", "chaos", "plane", "l+", "l-", "l0"]
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

//Randomize the sample cards at the bottom //samplecount
randomizeSampleCards(16)

//Set up the initial clock!
var cardClockInterval
setTimeout(function() {
    cardClockInterval = setInterval(cardClock, 1000 / document.getElementById("inputFPS").value)
}, 200)

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
	card.mask("imgCardMask,source-over", "none",document.getElementById("inputColor").value)
	card.globalCompositeOperation = "source-atop"
	//Draws the card image, then...
	drawPicture()
	//draws the card frame on top
    card.drawImage(imgBorder, 0, 0, cardWidth, cardHeight)
	//draws the set symbol, mana cost, and watermark
	drawSetSymbol()
	drawManaCost()
	drawWatermark()
	//writes all the text: name, type, rules...
	writeText()
	//Runs any special function that a card may have, including bottom information.
	window[uniqueFunctionName]()
	//A shiny foil overlay!
	if(document.getElementById("checkboxFoil").checked == true) {
		card.drawImage(imgFoil, 0, 0, cardWidth, cardHeight)
	}
	//These are for pinpointing coordinates while adjusting values for new border types
	if (document.getElementById("checkboxDebuggerLine").checked == true) {
		card.strokeStyle = "#ff0000"
		//Vertical Line
		card.beginPath()
		card.moveTo(titleY, 0)
		card.lineTo(titleY, cardHeight)
		card.stroke()
		//Horizontal Line
		card.beginPath()
		card.moveTo(0, titleX)
		card.lineTo(cardWidth, titleX)
		card.stroke()
		console.log("debugging")
	}
}

//The two following functions load border images
function changeTemplate() {
	//the loadScript function is located in data/scripts/loadScript.js. It sets values to variables such as set symbol coordinates or title font
	borderPath = "data/borders/" + document.getElementById("borderSelection").value
	loadScript("data/borders/defaultBorder.js")
}
function finishTemplate() {
	//This is a seperate function to insure that the border.js file finishes running before running a few last commands
	canvas.width = cardWidth
	canvas.height = cardHeight
	borderCanvas.width = cardWidth
	borderCanvas.height = cardHeight
	maskCanvas.width = cardWidth
	maskCanvas.height = cardHeight
	imgArtMask.src = borderPath + "artMask.png"
	document.getElementById("colorSelection").value = "white"
	updateBorder()
}
//Loads the images for the card frame, power toughness box, and rare stamp
function updateBorder() {
	secondColor = document.getElementById("checkboxSecondColor").checked
	thirdColor = document.getElementById("checkboxThirdColor").checked
	var firstColorPath = borderPath + document.getElementById("colorSelection").value
	var secondColorPath = borderPath + document.getElementById("secondColorSelection").value
	var thirdColorPath = borderPath + document.getElementById("thirdColorSelection").value
	var altframe = ""
	imgBorderColor.src = firstColorPath + "/frame.png"
	imgSecondBorderColor.src = secondColorPath + "/frame.png"
	imgThirdBorderColor.src = thirdColorPath + "/frame.png"
	if (artifactBorder == true) {
		imgArtifactBorderColor.src = borderPath + "artifact/frame.png"
	}
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
		if (artifactBorder == true && document.getElementById("checkboxArtifact").checked == true) {
			imgBorderNyx.src = borderPath + "artifact/nyx.png"
		} else if (thirdColor == true) {
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
		imgBorderFlipIcon.src = "data/icons/" + document.getElementById("inputFlipIcon").value
	}
	//This allows all the images to be loaded
	imagesToLoad = 0
	//Makes a count of all images that are loading, also tags them
	for (var i = 0; i < imgListBorder.length; i++) {
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
	if (document.getElementById("colorSelection").value.includes("clear") == true) {
		border.mask("imgArtMask,source-over;imgFrameMask,destination-out", "none", document.getElementById("inputColor").value)
	} else if (document.getElementById("checkboxBorderless").checked == false) {
		border.mask("imgArtMask,source-over", "none", document.getElementById("inputColor").value)
	}
	//Draws the silver border usually on un-cards
	if (document.getElementById("checkboxSilverBorder").checked == true) {
		border.mask("imgBorderMask,source-over", "none", "#a3aeb7")
	}
	//MAIN CARD FRAME
	if (secondColor == true && secondBorder == true && transparentBorder == true) {
		border.mask("imgMultiGradient,source-over;imgFrameMask,source-out", imgBorderColor)
	} else {
		border.mask("imgFrameMask,source-over", imgBorderColor)
	}
	if (secondColor == true && secondBorder == true) {
		border.mask("imgMultiGradient,source-over;imgFrameMask,source-in", imgSecondBorderColor)
	}
	if (thirdColor == true && thirdBorder == true) {
		border.mask("imgMultiMask,source-over;imgFrameMask,source-in", imgThirdBorderColor)
	}
	if (artifactBorder == true && document.getElementById("checkboxArtifact").checked == true) {
		border.mask("imgMultiMask,source-over;imgFrameMask,source-in;imgTitleMask,destination-out;imgTypeMask,destination-out", imgArtifactBorderColor)
	}
	//NYX
	if (document.getElementById("checkboxNyx").checked == true && nyxBorder == true) {
		if (thirdColor == true || (document.getElementById("checkboxArtifact").checked == true && artifactBorder == true)) {
			border.mask("imgMultiMask,source-over;imgFrameMask,source-in", imgBorderNyx)
		} else {
			border.mask("imgFrameMask,source-over", imgBorderNyx)
			if (secondColor == true) {
				border.mask("imgMultiGradient,source-over;imgFrameMask,source-in", imgSecondBorderNyx)
			}
		}	
	}
	//MIRACLE
	if (document.getElementById("checkboxMiracle").checked == true && miracleBorder == true && (document.getElementById("checkboxFlippedDark").checked == false || flipBorder == false)) {
		if (thirdColor == true) {
			border.mask("imgFrameMask,source-over", imgBorderMiracle)
		} else {
			border.mask("imgFrameMask,source-over", imgBorderMiracle)
			if (secondColor == true) {
				border.mask("imgMultiGradient,source-over;imgFrameMask,source-in", imgSecondBorderMiracle)
			}
		}
	}
	//LEGENDARY
	if (document.getElementById("checkboxLegendary").checked == true && legendaryBorder == true) {
		border.mask("imgLegendFrameMask,source-over", imgBorderLegendary)
		if (secondColor == true) {
			border.mask("imgMultiGradient,source-over;imgLegendFrameMask,source-in", imgSecondBorderLegendary)
		}
		//redraws the custom-color border to match the legendary frame
		if (document.getElementById("checkboxBorderless").checked != true) {
			border.mask("imgLegendFrameMask,source-over;imgBorderMask,source-out", "none", document.getElementById("inputColor").value)
		}
		//redraws the silver border usually on un-cards to match the legendary frame
		if (document.getElementById("checkboxSilverBorder").checked == true) {
			border.mask("imgLegendFrameMask,source-over;imgBorderMask,source-out", "none", "#a3aeb7")
		}
	}
	//FLIP CARDS
	if (flipBorder == true) {
		if (document.getElementById("checkboxFlippedDark").checked == true && flipBorder == true) {
			if (thirdColor == true) {
				border.mask("imgFrameMask,source-over", imgBorderFlippedDark)
			} else {
				border.mask("imgFrameMask,source-over", imgBorderFlippedDark)
				if (secondColor == true) {
					border.mask("imgMultiGradient,source-over", imgSecondBorderFlippedDark)
				}
			}
		}
		//redraws the miracle border if required to match with the newer darker overlay
		if (document.getElementById("checkboxMiracle").checked == true && miracleBorder == true && (document.getElementById("checkboxLegendary").checked == false || legendaryBorder == false)) {
			if (thirdColor == true) {
				border.mask("imgFrameMask,source-over", imgBorderMiracle)
			} else {
				border.mask("imgFrameMask,source-over", imgBorderMiracle)
				if (secondColor == true) {
					border.mask("imgMultiGradient,source-over;imgFrameMask,source-in", imgSecondBorderMiracle)
				}
			}
		}
		if (document.getElementById("checkboxFlipIcon").checked == true || document.getElementById("checkboxFlippedDark").checked == true) {
			border.drawImage(imgBorderFlipCircle, imgBorderFlipCircle.imgX, imgBorderFlipCircle.imgY, imgBorderFlipCircle.imgW, imgBorderFlipCircle.imgH)
			border.drawImage(imgBorderFlipIcon, 39, 51, 60, 60)
		}
		if (document.getElementById("checkboxFlipTip").checked == true) {
			border.drawImage(imgBorderFlipTip, imgBorderFlipTip.imgX, imgBorderFlipTip.imgY, imgBorderFlipTip.imgW, imgBorderFlipTip.imgH)
		}
		if (document.getElementById("checkboxFlipIcon").checked == true || document.getElementById("checkboxFlippedDark").checked == true) {
			titleRightShift = 50
		} else {
			titleRightShift = 0
		}
	}
	//CLEAR ANYTHING UNWANTED
	border.globalCompositeOperation = "destination-out"
	if (document.getElementById("checkboxRulesVisibility").checked == false && imgRulesMask.width > 0) {
		border.drawImage(imgRulesMask, 0, 0, cardWidth, cardHeight)
	}
	if (document.getElementById("checkboxTypeVisibility").checked == false && imgTypeMask.width > 0) {
		border.drawImage(imgTypeMask, 0, 0, cardWidth, cardHeight)
	}
	if (document.getElementById("checkboxTitleVisibility").checked == false && imgTitleMask.width > 0) {
		border.drawImage(imgTitleMask, 0, 0, cardWidth, cardHeight)
	}
	// if (document.getElementById("checkboxLegendary").checked == true && legendaryBorder == true && document.getElementById("checkboxBorderless").checked == true && document.getElementById("checkboxSilverBorder").checked == false) {
	// 	border.drawImage(imgBorderMask, 0, 0, cardWidth, cardHeight)
	// }
	border.globalCompositeOperation = "source-over"
	//COLOR IDENTITY
	if (document.getElementById("checkboxIdentity").checked == true) {
		var identityList = document.getElementById("inputIdentity").value.toLowerCase().split(" ")
		var angleSize = Math.PI * 2 / identityList.length
		var identityRadius = 14
		var identityX = typeX
		if (typeAlign == "left") {
			identityX += 8
		}
		var identityY = typeY + 15
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
		for (var i = 0; i < identityList.length; i ++) {
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
        imgBorderRareStamp.imgValues(329, rareStampY - 15, 90, 50, "imgSecondBorderRareStamp,imgRareStampMask")
		border.mask("imgCardMask,source-over", imgBorderRareStamp)
		if (document.getElementById("checkboxSecondColor").checked == true) {
			border.mask("imgMultiGradient,source-over", imgSecondBorderRareStamp)
		}
		if (document.getElementById("checkboxBorderless").checked != true) {
			//Draws over the rare stamp (part that's usually black) to match custom border color
	        border.mask("imgCardMask,source-over", imgRareStampMask, document.getElementById("inputColor").value)
	    }
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
	card.rotate(document.getElementById("imageRotation").value * Math.PI / 180);
	var imageScale = document.getElementById("imageSize").value * 0.01
	var imageLeftShift = parseInt(document.getElementById("imageLeft").value)
	var imageUpShift = parseInt(document.getElementById("imageUp").value)
	if (imgArt.width > 0) {
		card.drawImage(imgArt, artX - imageLeftShift, artY - imageUpShift, imgArt.width * imageScale, imgArt.height * imageScale)
	}
	card.rotate(document.getElementById("imageRotation").value * Math.PI / -180);
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
        imgWatermark.imgValues(x, y, width, height)
		//globalAlpha insures that the watermark is drawn partially transparent. This value may not be perfect but the watermark colors are calibrated to it
		card.globalAlpha = document.getElementById("inputWatermarkOpacity").value
	    //if the following if statement is true, the watermark will be drawn in two halves of the chosen colors. Otherwise, a single watermark of the first chosen color is drawn.
	    if (document.getElementById("checkboxOriginalWatermark").checked == true) {
	    	card.mask("imgCardMask,source-over", imgWatermark)
	    } else if (document.getElementById("checkboxSecondWatermarkColor").checked == true) {
            card.mask("imgMultiGradient,source-over;imgCardMask,source-out", imgWatermark, document.getElementById("watermarkColorSelection").value)
	    	card.mask("imgMultiGradient,source-over", imgWatermark, document.getElementById("secondWatermarkColorSelection").value)
	    } else {
	    	card.mask("imgCardMask,source-over", imgWatermark, document.getElementById("watermarkColorSelection").value)
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
	for (var n = symbols.length; n > -1; n--) {
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
	// if (flipBorder == true && document.getElementById("checkboxFlippedDark").checked == true) {
	// 	card.fillStyle = "White"//attention
	// } else {
	// 	card.fillStyle = "Black"
	// }
	//Title
	card.fillStyle = document.getElementById("inputTitleColor").value
	card.textAlign = titleAlign
	canvas.style.letterSpacing = titleFontSpacing
	card.font = titleFont	
	card.fillText(document.getElementById("inputName").value, titleX + titleRightShift, titleY + textBaselineShift[0] * card.font.split("px")[0])
	//Type
	card.fillStyle = document.getElementById("inputTypeColor").value
	card.textAlign = typeAlign
	canvas.style.letterSpacing = typeFontSpacing
	card.font = typeFont
	card.fillText(document.getElementById("inputType").value, typeX + typeRightShift, typeY + textBaselineShift[0] * card.font.split("px")[0])
	//Power/Toughness
	if (document.getElementById("checkboxCreature").checked == true && creatureBorder == true) {
		// if (imgBorderCreature.src.substr(imgBorderCreature.src.length - 14) == "vehicle/pt.png" || borderPath == "data/borders/planeswalker/") {
		// 	card.fillStyle = "White"//attention
		// }
		card.fillStyle = document.getElementById("inputCreatureColor").value
		card.textAlign = "center"
		card.drawImage(imgBorderCreature, imgBorderCreature.imgX, imgBorderCreature.imgY, imgBorderCreature.imgW, imgBorderCreature.imgH)
		canvas.style.letterSpacing = ptFontSpacing
		card.font = ptFont
		powerToughness = document.getElementById("inputPowerToughness").value
		card.fillText(powerToughness, ptTextX, ptTextY + textBaselineShift[0] * card.font.split("px")[0])
	}
	card.textAlign = "left"
	// card.fillStyle = "Black"//attention
	//Rules Text
	card.fillStyle = document.getElementById("inputRulesColor").value
	canvas.style.letterSpacing = textFontSpacing + "px"
	card.font = document.getElementById("textSize").value + textFont
	var text = document.getElementById("inputText").value
	drawText(text, textX, textY)
	//Flip Tip?
	if (document.getElementById("checkboxFlipTip").checked == true && flipBorder == true) {
		card.textAlign = "right"
		card.fillStyle="#666"
		canvas.style.letterSpacing = "0px"
		card.font = "28px belerenb"
		card.fillText(document.getElementById("inputFlipTip").value, 688, 886 + textBaselineShift[0] * card.font.split("px")[0])
		card.textAlign = "left"
	}
}

//Bottom info on M15 cards
function bottomInfoM15() {
	card.fillStyle = document.getElementById("inputInfoColor").value
	var shiftInfo = 446
	canvas.style.letterSpacing = "1.5px"
	card.font = "19px relaymedium"
	var bottomLine = document.getElementById("inputSet").value + " \u00b7 " + document.getElementById("inputLanguage").value
	card.fillText(bottomLine, 48, infoY + textBaselineShift[0] * card.font.split("px")[0])
	var artistBrushShift = card.measureText(bottomLine).width + 58
    imgArtistBrush.imgValues(artistBrushShift, infoY + 2, 21, 13)
	card.mask("imgArtMask,source-over", imgArtistBrush, card.fillStyle)
	card.font = "18px relaymedium"
	canvas.style.letterSpacing = "2px"
	if (card.measureText(document.getElementById("inputNumber").value).width > artistBrushShift - 58) {
		artistBrushShift = card.measureText(document.getElementById("inputNumber").value).width + 58
	}
	card.fillText(document.getElementById("inputNumber").value, 49, infoY - 20 + textBaselineShift[0] * card.font.split("px")[0])
	card.fillText(document.getElementById("inputRarity").value, artistBrushShift - 1, infoY - 20 + textBaselineShift[0] * card.font.split("px")[0])
	if (446 < artistBrushShift  + card.measureText(document.getElementById("inputRarity").value).width && document.getElementById("checkboxCreature").checked == false) {
		shiftInfo = artistBrushShift  + card.measureText(document.getElementById("inputRarity").value).width + 5
	}
	canvas.style.letterSpacing = "-0.1px"
	card.font = "22px matrixbsc"
	card.fillText(document.getElementById("inputArtist").value, artistBrushShift + 21, infoY + textBaselineShift[1] * card.font.split("px")[0])
	if (446 < artistBrushShift + 21 + card.measureText(document.getElementById("inputArtist").value).width && document.getElementById("checkboxCreature").checked == true) {
		shiftInfo = artistBrushShift + card.measureText(document.getElementById("inputArtist").value).width + 26
	}
	//This is where "CC —" is hardcoded. The only reason is to prevent users from easily typing in the trademark and copyright that's usually on real cards. It's also there so I can see if a card was created with my program, it makes me feel good :)
	if (document.getElementById("inputInfo").value != "") {
		canvas.style.letterSpacing = "0px"
		card.font = "17px mplantin"
		var bottomInfo = "CC \u2014 " + document.getElementById("inputInfo").value
		if (bottomInfo == "CC \u2014 secretcode") {
			var year = date.getFullYear()
			bottomInfo = "\u2122 & \u00a9 " + year + " Wizards of the Coast"
		}
		if (document.getElementById("checkboxCreature").checked == true) {
			card.fillText(bottomInfo, shiftInfo, infoY + 1 + textBaselineShift[0] * card.font.split("px")[0])
		} else {
			card.fillText(bottomInfo, shiftInfo, infoY - 17 + textBaselineShift[0] * card.font.split("px")[0])
		}
	}
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
	for (var wordIndex = 0; wordIndex < words.length; wordIndex ++) {
		if (words[wordIndex].includes("<") == false || words[wordIndex].includes(">") == false) {
			//Just a regular old word
			testLine = line + words[wordIndex]
			var lineWidth = card.measureText(testLine).width
			if (lineWidth + textXShift + x > tempTextWidth && wordIndex > 0) {
				//Word is too big
				card.fillText(line, x + textXShift, y + textBaselineShift[0] * card.font.split("px")[0])
				line = words[wordIndex] + " "
				y += textSize + 1
				textXShift = 0
			} else {
				//Word fits
				line = testLine + " "
			}
			if (wordIndex + 1 == words.length) {
				card.fillText(line, x + textXShift, y + textBaselineShift[0] * card.font.split("px")[0])
			}
		} else {
			//Symbols and more!
			var splitWord = words[wordIndex].split("<")
			for (var splitIndex = 0; splitIndex < splitWord.length; splitIndex ++) {
				//Write what's there first!
				card.fillText(line, x + textXShift, y + textBaselineShift[0] * card.font.split("px")[0])
				textXShift += card.measureText(line).width
				line = ""
				if (splitWord[splitIndex].includes(">")) {
					var plainWord = ""
					var megaSplit = splitWord[splitIndex].split(">")
					//series of if statements to determine an action based off of the given code
					if (megaSplit[0] == "i") {
						canvas.style.letterSpacing = textFontSpacing * 1/3 + "px"
						card.font = textSize * italicSize + textFont + "i"
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
						card.drawImage(manaSymbolImages[manaSymbolCode.indexOf(megaSplit[0].toLowerCase())], x + textXShift + textSize * 0.054, y + textSize * 0.075 + parseInt(document.getElementById("inputSymbolDown").value) + textBaselineShift[0] * card.font.split("px")[0], textSize * 0.77, textSize * 0.77)
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
						card.fillText(line, x + textXShift, y + textBaselineShift[0] * card.font.split("px")[0])
						line = plainWord
						y += textSize + 1
						textXShift = 0
					} else {
						//Word fits
						line = testLine
					}
					if (wordIndex + 1 == words.length) {
						card.fillText(line, x + textXShift, y + textBaselineShift[0] * card.font.split("px")[0])
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
	for (var i = 0; i < document.getElementsByClassName(targetClass).length; i++) {
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
		window[imgName].src = "images/sampleCards/sample-card-" + randomNumber + ".png"
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
function loadImage(event, destination, arg) {
	if (arg != false) {
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
}


//============================================//
//              Image Processing              //
//============================================//
Image.prototype.imgValues = function(x, y, w, h , otherImages) {
    this.imgX = x
    this.imgY = y
    this.imgW = w
    this.imgH = h
    if (otherImages != undefined) {
    	otherImageList = otherImages.split(",")
    	for (i = 0; i < otherImageList.length; i ++) {
    		otherImage = window[otherImageList[i]]
    		otherImage.imgX = x
  	  		otherImage.imgY = y
   			otherImage.imgW = w
    		otherImage.imgH = h
    	}
    }
}
var maskCanvas = document.createElement("canvas")
var maskContext = maskCanvas.getContext("2d")
CanvasRenderingContext2D.prototype.mask = function(masks, image, color) {
	if (image.imgX == undefined) {
		x = 0; y = 0; w = cardWidth; h = cardHeight;
	} else {
		x = image.imgX; y = image.imgY; w = image.imgW; h = image.imgH;
	}
    maskContext.clearRect(0, 0, cardWidth, cardHeight)
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
    maskContext.globalCompositeOperation = "source-in"
    if (image != "none") {
    	maskContext.drawImage(image, x, y, w, h)
    }
    if (color != undefined) {
    	maskContext.fillStyle = color
        maskContext.fillRect(0, 0, cardWidth, cardHeight)
    }
    this.drawImage(maskCanvas, 0, 0, cardWidth, cardHeight)
}
//Create canvas for cropping the image
var cropCanvas = document.createElement("canvas")
var cropContext = cropCanvas.getContext("2d")
//Function that auto crops the image
function autocrop(url, destination) {
    //Create image, size canvas, draw image
    var imgTempSetSymbol = new Image()
    imgTempSetSymbol.crossOrigin = "anonymous"
    imgTempSetSymbol.src = url
    imgTempSetSymbol.onload = function() {
        if (imgTempSetSymbol.width > 0 && imgTempSetSymbol.height > 0) {
            cropCanvas.width = imgTempSetSymbol.width
            cropCanvas.height = imgTempSetSymbol.height
            cropContext.drawImage(imgTempSetSymbol, 0, 0)
            //declare variables
            var width = cropCanvas.width
            var height = cropCanvas.height
            var pix = {x:[], y:[]}
            var imageData = cropContext.getImageData(0,0,cropCanvas.width,cropCanvas.height)
            var x, y, index
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
            destination.src = cropCanvas.toDataURL()
        }
    }
}
//Create a canvas to work on when making white pixels transparent
var transparentCanvas = document.createElement("canvas")
var transparentContext = transparentCanvas.getContext("2d")
//Function that auto  the image
function whiteToTransparent(targetImage) {
    //Create image, size canvas, draw image
    var imgTemporary = new Image()
    imgTemporary.crossOrigin = "anonymous"
    imgTemporary.src = targetImage.src
    imgTemporary.onload = function() {
    	if (imgTemporary.width > 0 && imgTemporary.height > 0) {
    		transparentCanvas.width = imgTemporary.width
    		transparentCanvas.height = imgTemporary.height
    		transparentContext.drawImage(imgTemporary, 0, 0)
            //declare variables
            var width = transparentCanvas.width
            var height = transparentCanvas.height
            var imageData = transparentContext.getImageData(0,0,transparentCanvas.width,transparentCanvas.height)
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
//                  Other                     //
//============================================//
//loadColors("white-White,blue-Blue,colorlessLand-Colorless Land,gold-Gold"), this is an example of how to use the function
function loadColors(colors) {
	var endResult = ""
	var colorList = colors.split(",")
	for (var i = 0; i < colorList.length; i++) {
		endResult += "<option value='" + colorList[i].split("-")[0] + "'>" + colorList[i].split("-")[1] + "</option>"
	}
	document.getElementById("colorSelection").innerHTML = endResult
}
//Allows javascript files to be loaded through javascript code
function loadScript(scriptName){
	var script = document.createElement("script")
	script.setAttribute("type","text/javascript")
	script.setAttribute("src", scriptName)
	if (typeof script != "undefined") {
		document.getElementsByTagName("head")[0].appendChild(script)
	}
}
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
//                  Cookies!                  //
//============================================//
function setCookie(cookieName, cookieValue) {
  	var tempDate = new Date();
  	tempDate.setTime(tempDate.getTime() + (31 * 24 * 60 * 60 * 1000)); //days*hours*minutes*seconds*milliseconds
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
        } else if (isSafari == false && isChrome == false) {
            alert("Thanks for using Card Conjurer! Unfortunately different browsers treat custom fonts differently and it appears that you are using a browser other than Safari or Chrome. Everything may work perfectly, but if you notice that the cards look odd try using Safari or Chrome.")
        }
        setCookie("visited", "true")
	} else {
		console.log("Welcome back to Card Conjurer!")
	}
}

checkCookies()
