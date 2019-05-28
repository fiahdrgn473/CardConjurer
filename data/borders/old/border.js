//============================================//
//                 OLD Border                 //
//============================================//
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.rareStamp = false
cardData.legendary = false
cardData.pinline = false
cardData.titleTypeBoxes = false
cardData.bottomInfoFunction = "none"
//Specific Values
cardData.cardArtX = cwidth(89)
cardData.cardArtY = cheight(103)
cardData.manaSymbolX = cwidth(655)
cardData.manaSymbolY = cheight(50)
document.getElementById("inputTitleColor").value = "#ffffff"
cardData.titleFont = "goudymedieval"
cardData.titleShadow = cwidth(2)
cardData.titleFontSize = cwidth(43)
cardData.titleX = cwidth(81)
cardData.titleY = cheight(81)
document.getElementById("inputTypeColor").value = "#ffffff"
cardData.typeFont = "mplantin"
cardData.typeShadow = cwidth(2)
cardData.typeX = cwidth(76)
cardData.typeY = cheight(616)
cardData.textX = cwidth(92)
cardData.textY = cheight(657)
document.getElementById("inputCreatureColor").value = "#ffffff"
cardData.ptFont = "46px mplantin"
cardData.ptShadow = cwidth(2)
cardData.ptX = cwidth(655)
cardData.ptY = cheight(984)
cardData.setSymbolX = cwidth(671)
cardData.setSymbolY = cheight(603)
cardData.bottomInfoFunction = "bottomInfoOld"
//Images
imgArtMask.load("data/borders/old/imgArtMask.png")
imgFrameMask.load("data/borders/old/imgFrameMask.png")
imgRulesMask.load("data/borders/old/imgRulesMask.png")
imgBorderMask.load("data/borders/old/imgBorderMask.png")

//Loads the colors
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,artifact-Artifact,whiteLand-White Land,blueLand-Blue Land,blackLand-Black Land,redLand-Red Land,greenLand-Green Land,colorlessLand-Colorless Land")
//Finishes loading the border style
finishChangingBorder()

function bottomInfoOld() {
	var infoArtist = "Illus. " + document.getElementById("inputInfoArtist").value
	var copyrightNumber = "\u2122 & \u00a9 1993-" + date.getFullYear() + " Wizards of the Coast, Inc. " + document.getElementById("inputInfoNumber").value
	textContext.textAlign = "center"
	textContext.fillStyle = "black"
	textContext.font = "31px mplantin"
	textContext.fillText(infoArtist, cwidth(377), cheight(970))
	textContext.fillStyle = "white"
	textContext.fillText(infoArtist, cwidth(375), cheight(968))
	if (document.getElementById("inputFrameColor").value.includes("white")) {
		textContext.fillStyle = "black"
	}
	textContext.font = "17px mplantin"
	textContext.fillText(copyrightNumber, cwidth(375), cheight(989))
	drawCard()
}