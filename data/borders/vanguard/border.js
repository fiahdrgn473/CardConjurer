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
cardData.titleX = cardWidth / 2
cardData.titleY = cheight(98)
cardData.titleAlignment = "center"
cardData.titleRight = cwidth(616)
cardData.typeFont = "matrix"
cardData.typeFontSize = cwidth(32)
cardData.typeX = cardWidth / 2
cardData.typeY = cheight(640)
cardData.typeAlignment = "center"
cardData.textRight = cwidth(585)
cardData.textX = cwidth(135)
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
createAlert("conflict", "The Vanguard card's centered rules text doesn't cooperate with my rules text code, so if you choose to use centered text any mana symbols or other codes may throw off the text. I apologize for any inconveniences. I hope to resolve this in the future :)")

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