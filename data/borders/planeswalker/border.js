//============================================//
//                 M15 Border                 //
//============================================//
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.legendary = false
//Specific Values
cardData.textX = cwidth(134)
cardData.textY = cheight(687)
cardData.textRight = cwidth(682)
cardData.cardArtX = cwidth(52)
cardData.cardArtY = cheight(106)
cardData.titleFontSize = cwidth(40)
cardData.titleX = cwidth(62)
cardData.titleY = cheight(79)
cardData.manaSymbolY = cheight(46)
cardData.ptBoxX = cwidth(599)
cardData.ptBoxY = cheight(922)
cardData.ptBoxWidth = cwidth(120)
cardData.ptBoxHeight = cheight(78)
cardData.ptX = cwidth(657)
cardData.ptY = cheight(974)
cardData.watermarkY = cheight(805)
cardData.watermarkWidth = cwidth(520)
cardData.watermarkHeight = cheight(250)
cardData.setSymbolY = cheight(618)
cardData.setSymbolRight = cwidth(695)
//Images
imgPowerToughness.load("data/borders/planeswalker/white/pt.png")
imgArtMask.load("data/borders/planeswalker/imgArtMask.png")
imgFrameMask.load("data/borders/planeswalker/imgFrameMask.png")
imgBorderMask.load("data/borders/planeswalker/imgBorderMask.png")
imgPinlineMask.load("data/borders/planeswalker/imgPinlineMask.png")
imgTitleMask.load("data/borders/planeswalker/imgTitleMask.png")
imgTypeMask.load("data/borders/planeswalker/imgTypeMask.png")
imgAbilityLineEven.load("data/borders/planeswalker/imgAbilityLineEven.png")
imgAbilityLineOdd.load("data/borders/planeswalker/imgAbilityLineOdd.png")
//Loads the Colors
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,colorless-Colorless")
//Anything special
document.getElementById("inputCreatureColor").value = "#ffffff"
cardData.specialImageA = true
cardData.specialImageB = true
//Runs the things!
sectionTextFunction()
sectionFrameFunction()
sectionOtherFunction()

var abilityLineThickness = cheight(6)
var abilityLines = []
function planeswalkerAbilityLines() {
	abilityLines = []
	if (document.getElementById("inputAbilityLine1").value > 0) {abilityLines[abilityLines.length] = parseInt(document.getElementById("inputAbilityLine1").value)}
	if (document.getElementById("inputAbilityLine2").value > 0) {abilityLines[abilityLines.length] = parseInt(document.getElementById("inputAbilityLine2").value)}
	if (document.getElementById("inputAbilityLine3").value > 0) {abilityLines[abilityLines.length] = parseInt(document.getElementById("inputAbilityLine3").value)}
	if (document.getElementById("inputAbilityLine4").value > 0) {abilityLines[abilityLines.length] = parseInt(document.getElementById("inputAbilityLine4").value)}
	specialAContext.clearRect(0, 0, cardWidth, cardHeight)
	//Start with the background
	var abilityLineCurrentY = cheight(655) - abilityLineThickness
	for (var i = 0; i < abilityLines.length; i ++) {
		//determine the correct color
		if (i % 2 === 0) {
			specialAContext.fillStyle = "#95959595"
		} else {
			specialAContext.fillStyle = "#6a6a6a6a"
		}
		if (i == abilityLines.length - 1) {
			//This is the last line
			specialAContext.fillRect(cwidth(50), abilityLineCurrentY + abilityLineThickness, cwidth(649), cardHeight - abilityLineCurrentY - cheight(89) - abilityLineThickness)
		} else {
			specialAContext.fillRect(cwidth(50), abilityLineCurrentY + abilityLineThickness, cwidth(649), abilityLines[i] - abilityLineThickness * 2)
			if (i % 2 === 0) {
				specialAContext.drawImage(imgAbilityLineOdd, cwidth(92), abilityLineCurrentY + abilityLines[i] - abilityLineThickness, cwidth(599), abilityLineThickness * 2)
			} else {
				specialAContext.drawImage(imgAbilityLineEven, cwidth(92), abilityLineCurrentY + abilityLines[i] - abilityLineThickness, cwidth(599), abilityLineThickness * 2)
			}
		}
		abilityLineCurrentY += abilityLines[i]
	}
	planeswalkerAbilityIcons()
}
function planeswalkerAbilityIcons() {
	switch (abilityLines.length) {
		case 4:
			abilityIconSpacing = 75
			abilityIconStartShift = 12
			break;
		case 3:
			abilityIconSpacing = 94
			abilityIconStartShift = 0
			break;
		case 2:
			abilityIconSpacing = 125
			abilityIconStartShift = -32
			break;
		case 1:
			abilityIconSpacing = 0
			abilityIconStartShift = -100
			break;
	}
	specialBContext.clearRect(0, 0, cardWidth, cardHeight)
	//Now the loyalty ability icons
	var abilityLineCurrentY = cheight(705) - abilityIconStartShift
	for (var i = 0; i < abilityLines.length; i ++) {
		var loyaltyValue = document.getElementById("inputAbilityValue" + i).value
		if (loyaltyValue != "") {
			specialBContext.fillStyle = "white"
			specialBContext.textAlign = "center"
			specialBContext.font = cwidth(31) + "px belerenbsc"
			if (loyaltyValue.charAt(0) == "-") {
				specialBContext.drawImage(manaSymbolImageList[58], cwidth(35), abilityLineCurrentY - cheight(28), cwidth(86), cheight(64))
				specialBContext.fillText(loyaltyValue, cwidth(76), abilityLineCurrentY + cheight(8))
				specialBContext.font = cwidth(38) + "px mplantin"
				specialBContext.fillStyle = "black"
				specialBContext.fillText(":", cwidth(125), abilityLineCurrentY + cheight(5))
			} else if (loyaltyValue.charAt(0) == "+") {
				specialBContext.drawImage(manaSymbolImageList[59], cwidth(35), abilityLineCurrentY - cheight(36), cwidth(86), cheight(63))
				specialBContext.fillText(loyaltyValue, cwidth(76), abilityLineCurrentY + cheight(9))
				specialBContext.font = cwidth(38) + "px mplantin"
				specialBContext.fillStyle = "black"
				specialBContext.fillText(":", cwidth(125), abilityLineCurrentY + cheight(7))
			} else {
				specialBContext.drawImage(manaSymbolImageList[60], cwidth(35), abilityLineCurrentY - cheight(27), cwidth(85), cheight(56))
				specialBContext.fillText(loyaltyValue, cwidth(76), abilityLineCurrentY + cheight(9))
				specialBContext.font = cwidth(38) + "px mplantin"
				specialBContext.fillStyle = "black"
				specialBContext.fillText(":", cwidth(125), abilityLineCurrentY + cheight(5))
			}
			
		}
		abilityLineCurrentY += abilityIconSpacing
	}
	drawCard()
}

setTimeout(function() {planeswalkerAbilityLines()}, 500)
document.getElementById("cmmPlaneswalker").style.display = "block"