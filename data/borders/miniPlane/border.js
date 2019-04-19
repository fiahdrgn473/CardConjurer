//============================================//
//              Miniplane Border              //
//============================================//
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.legendary = false
cardData.creature = false
cardData.rulesBox = false
cardData.pinline = false
cardData.titleTypeBoxes = false
cardData.rareStamp = false
//Specific Values
cardData.manaSymbolDirection = "none"
cardData.titleAlignment = "center"
cardData.titleX = cardWidth / 2
cardData.titleY = cheight(95)
cardData.titleFontSize = cwidth(42)
// cardData.titleRight = cwidth(1000)
cardData.typeAlignment = "center"
cardData.typeX = cardWidth / 2
cardData.typeY = cheight(735)
cardData.typeFontSize = cwidth(32)
cardData.textX = cwidth(105)
cardData.textY = cheight(780)
cardData.textRight = cwidth(660)
cardData.setSymbolY = cheight(727)
cardData.setSymbolWidth = cwidth(55)
cardData.setSymbolHeight = cheight(33)
cardData.setSymbolX = cwidth(582)
cardData.watermarkWidth = cwidth(660)
cardData.watermarkHeight = cheight(210)
cardData.watermarkY = cheight(864)
cardData.cardArtX = cwidth(28)
cardData.cardArtY = cheight(46)
cardData.bottomInfoFunction = "bottomInfoPlanechase"
//Images
imgArtMask.load("data/borders/miniPlane/imgArtMask.png")
imgFrameMask.load("data/borders/miniPlane/imgFrameMask.png")
imgBorderMask.load("data/borders/miniPlane/imgBorderMask.png")
//Loads the Colors
loadColors("white-Regular")
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
	var infoNumberSetLanguage = infoNumber + " " + infoSet + " \u00b7 " + infoLanguage + "  "
	textContext.fillStyle = "white"
	textContext.font = cheight(15) + "px gothammedium"
	var infoNumberSetLanguageWidth = textContext.measureText(infoNumberSetLanguage).width
	textContext.font = cheight(16) + "px mplantin"
	var infoCopyrightWidth = textContext.measureText(infoCopyright).width
	var bottomLineStart = cardWidth / 2 - (infoNumberSetLanguageWidth + infoCopyrightWidth) / 2
	textContext.fillText(infoCopyright, bottomLineStart + infoNumberSetLanguageWidth, cheight(1029))
	textContext.font = cheight(15) + "px gothammedium"
	textContext.fillText(infoNumberSetLanguage, bottomLineStart, cheight(1029))
	textContext.font = cheight(19) + "px belerenbsc"
	var infoArtistStart = cardWidth / 2 - (textContext.measureText(infoArtist).width + cwidth(23)) / 2
	imgArtistBrush.load("none", infoArtistStart, cheight(995), cwidth(21), cheight(13))
	textContext.mask(imgArtistBrush, "none", textContext.fillStyle)
	textContext.fillText(infoArtist, infoArtistStart + cwidth(23), cheight(1008))
	drawCard()
}