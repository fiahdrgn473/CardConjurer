//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
version.currentVersion = "m15"
version.artX = scale(58)
version.artY = scale(118)
version.setSymbolRight = scale(688)
version.setSymbolVertical = scale(613)
version.setSymbolWidth = scale(90)
version.setSymbolHeight = scale(38)
version.bottomInfoFunction = "m15BottomInfo"
version.manaCostX = scale(653)
version.manaCostY = scale(60)
version.manaCostDiameter = scale(34)
version.manaCostDistance = scale(-38)
version.manaCostDirection = "horizontal"
// version.rareStampX = scale(340)
// version.rareStampY = scale(965)
// version.rareStampWidth = scale(70)
// version.rareStampHeight = scale(38)
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
//Name, text, x, y, width, height, font, size, color, other
version.textList = [
	["Title", "", scale(64), scale(83), scale(630), 0, "belerenb", 37, "black", "oneLine=true"],
	["Type", "", scale(65), scale(615), scale(630), 0, "belerenb", 37, "black", "oneLine=true"],
	["Rules Text", "", scale(66), scale(670), scale(624), scale(292), "mplantin", 38, "black", "lineSpace=0.97"],
	["Power Toughness", "", scale(587), scale(958), scale(110), 0, "belerenb", 38, "black", "oneLine=true,textAlign='center'"]/*,
	["Flip PT", "", scale(588), scale(902), scale(100), 0, "belerenb", 28, "#666", "oneLine=true,textAlign='right'"]*/
]

function m15BottomInfo() {
	//remember to ctrl+f for 'artistBrushWidth' and adjust that when fixing these values!
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	bottomInfoContext.writeText(document.getElementById("inputInfoNumber").value + " " + document.getElementById("inputInfoRarity").value + " *Not For Sale*", scale(43), scale(980), scale(329), 0, "gothammedium", 17, "white", "oneLine=true")
	bottomInfoContext.writeText(document.getElementById("inputInfoSet").value + "  \u2022  " + document.getElementById("inputInfoLanguage").value + "  {font:belerenbsc}{artistBrush}{fontsize1}" + document.getElementById("inputInfoArtist").value, scale(43), scale(1000), scale(375), 0, "gothammedium", 17, "white", "oneLine=true")
	var copyrightShift = 0;
	for (var i = 0; i < cardMaster.children.length; i++) {
		if (parseInt(cardMaster.children[i].id.replace("frameIndex", "")) != -1 && frameList[parseInt(cardMaster.children[i].id.replace("frameIndex", ""))].image.src.includes("PT")) {
			copyrightShift = 19;
		}
	}
	bottomInfoContext.writeText("\u2122 & \u00a9 " + date.getFullYear() + " Wizards of the Coast", cardWidth / 2, scale(980 + copyrightShift), scale(322), 0, "mplantin", 17, "white", "oneLine=true,textAlign='right'")
	cardImageUpdated()
}
// setTimeout(m15BottomInfo, 250)

finishChangingVersion()
