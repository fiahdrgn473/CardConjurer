//============================================//
//               Vanguard Border              //
//============================================//
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.legendary = false
cardData.creature = false
cardData.rareStamp = false
//Specific Values
cardData.bottomInfoFunction = "bottomInfoVanguard"
cardData.cardArtX = cwidth(92)
cardData.cardArtY = cheight(113)
cardData.manaSymbolDirection = "none"
cardData.setSymbolAlignment = "none"
cardData.titleFont = "matrixb"
cardData.titleFontSize = cwidth(54)
cardData.titleX = cwidth(130)
cardData.titleWidth = cwidth(490)
cardData.titleY = cheight(98)
cardData.titleAlignment = "center"
cardData.typeFont = "matrix"
cardData.typeFontSize = cwidth(32)
cardData.typeX = cwidth(130)
cardData.typeWidth = cwidth(490)
cardData.typeY = cheight(640)
cardData.typeAlignment = "center"
cardData.textX = cwidth(135)
cardData.textWidth = cwidth(480)
//Images
imgArtMask.load("data/borders/vanguard/imgArtMask.png")
imgFrameMask.load("data/borders/vanguard/imgFrameMask.png")
imgRulesMask.load("data/borders/vanguard/imgRulesMask.png")
imgBorderMask.load("data/borders/vanguard/imgBorderMask.png")
//Loads the Colors
loadColors("white-White,blue-Blue,red-Red,green-Green")
//Finishes loading the border style
document.getElementById("cmmVanguard").style.display = "block"
document.getElementById("inputTextSize").value = 28
finishChangingBorder()

function bottomInfoVanguard() {
	var infoArtist = "Illus. " + document.getElementById("inputInfoArtist").value
	var copyrightNumber = "\u2122 & \u00a9 1993-" + date.getFullYear() + " Wizards of the Coast, Inc. *Not For Sale*" //+ document.getElementById("inputInfoNumber").value
	textContext.textAlign = "center"
	textContext.fillStyle = "black"
	textContext.font = "17px mplantin"
	textContext.fillText(infoArtist, cwidth(377), cheight(949))
	textContext.font = "13px mplantin"
	textContext.fillText(copyrightNumber, cwidth(375), cheight(963))
	//special vanguard fun!
	textContext.font = "31px mplantin"
	textContext.fillText(document.getElementById("inputVanguardHand").value, cwidth(107), cheight(910))
	textContext.fillText(document.getElementById("inputVanguardLife").value, cwidth(642), cheight(909))
	drawCard()
}