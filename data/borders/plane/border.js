//============================================//
//              Miniplane Border              //
//============================================//
//Change canvas size
changeCanvasSize(1050, 750)
imgFrame.load("none")
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.legendary = false
cardData.creature = false
cardData.rareStamp = false
cardData.pinline = false
//Specific Values
cardData.manaSymbolDirection = "none"
cardData.titleAlignment = "center"
cardData.titleX = cardWidth / 2
cardData.titleY = cheight(105)
cardData.titleFontSize = cwidth(25)
cardData.titleRight = cwidth(700)
cardData.typeAlignment = "center"
cardData.typeX = cardWidth / 2
cardData.typeY = cheight(739)
cardData.typeFontSize = cwidth(18)
cardData.textX = cwidth(90)
cardData.textY = cheight(790)
document.getElementById("inputTextSize").value = 27
cardData.textRight = cwidth(669)
cardData.setSymbolY = cheight(727)
cardData.setSymbolWidth = cwidth(55)
cardData.setSymbolHeight = cheight(33)
cardData.setSymbolX = cwidth(582)
cardData.watermarkWidth = cwidth(660)
cardData.watermarkHeight = cheight(210)
cardData.watermarkY = cheight(870)
cardData.cardArtX = cwidth(23)
cardData.cardArtY = cheight(46)
cardData.bottomInfoFunction = "bottomInfoPlanechase"
cardData.horizontal = true
//Images
imgArtMask.load("data/borders/plane/imgArtMask.png")
imgFrameMask.load("data/borders/plane/imgFrameMask.png")
imgBorderMask.load("data/borders/plane/imgBorderMask.png")
imgRulesMask.load("data/borders/plane/imgRulesMask.png")
imgTypeMask.load("data/borders/plane/imgTypeMask.png")
imgTitleMask.load("data/borders/plane/imgTitleMask.png")
//Loads the Colors
loadColors("white-Regular,high-High,mid-Middle,low-Low,none-Single")
//Finishes loading the border style
finishChangingBorder()

function bottomInfoPlanechase() {
	var infoNumber = document.getElementById("inputInfoNumber").value
	var infoRarity = document.getElementById("inputInfoRarity").value
	var infoSet = document.getElementById("inputInfoSet").value
	var infoLanguage = document.getElementById("inputInfoLanguage").value
	var infoArtist = document.getElementById("inputInfoArtist").value
	var infoCopyright = "CC \u2014 " + document.getElementById("inputInfoCopyright").value
	if (infoCopyright == "CC \u2014 secretcode") {
		var date = new Date()
		var year = date.getFullYear()
		infoCopyright = "\u2122 & \u00a9 " + year + " Wizards of the Coast"
	} else if (infoCopyright == "CC \u2014 ") {
		infoCopyright = ""
	}
	var infoNumberSetLanguage = infoNumber + " " + infoSet + " \u00b7 " + infoLanguage + " "
	textContext.fillStyle = "white"
	textContext.font = cheight(18) + "px gothammedium"
	var infoNumberSetLanguageWidth = textContext.measureText(infoNumberSetLanguage).width
	textContext.font = cheight(19) + "px mplantin"
	var infoCopyrightWidth = textContext.measureText(infoCopyright).width
	var bottomLineStart = cardWidth / 2 - (infoNumberSetLanguageWidth + infoCopyrightWidth) / 2
	textContext.fillText(infoCopyright, bottomLineStart + infoNumberSetLanguageWidth, cheight(1028))
	textContext.font = cheight(18) + "px gothammedium"
	textContext.fillText(infoNumberSetLanguage, bottomLineStart, cheight(1028))
	textContext.font = cheight(19) + "px belerenbsc"
	var infoArtistStart = cardWidth / 2 - (textContext.measureText(infoArtist).width + cheight(21)) / 2
	imgArtistBrush.load("none", infoArtistStart, cheight(992), cheight(21), cheight(13))
	textContext.mask(imgArtistBrush, "none", textContext.fillStyle)
	textContext.fillText(infoArtist, infoArtistStart + cheight(21), cheight(1004))
	drawCard()
}