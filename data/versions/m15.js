//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
version.currentVersion = "m15"
version.artX = scale(58)
version.artY = scale(118)
version.setSymbolRight = scale(693)
version.setSymbolVertical = scale(620)
version.setSymbolWidth = scale(77)
version.setSymbolHeight = scale(42)
version.bottomInfoFunction = "m15BottomInfo"
version.manaCostX = scale(656)
version.manaCostY = scale(62)
version.manaCostDiameter = scale(36)
version.manaCostDistance = scale(-38)
version.manaCostDirection = "horizontal"
// version.rareStampX = scale(340)
// version.rareStampY = scale(965)
// version.rareStampWidth = scale(70)
// version.rareStampHeight = scale(38)
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(815)
//Name, text, x, y, width, height, font, size, color, other
version.textList = [
	["Title", "", scale(62), scale(87), scale(630), 0, "belerenb", 40, "black", "oneLine=true"],
	["Type", "", scale(60), scale(624), scale(630), 0, "belerenb", 34, "black", "oneLine=true"],
	["Rules Text", "", scale(63), scale(670), scale(624), scale(292), "mplantin", 38, "black", "lineSpace=0.97"],
	["Power Toughness", "", scale(590), scale(970), scale(110), 0, "belerenb", 39, "black", "oneLine=true,textAlign='center'"],
	["Flip PT", "", scale(588), scale(902), scale(100), 0, "belerenb", 28, "#666", "oneLine=true,textAlign='right'"]
]

function m15BottomInfo() {
	//remember to ctrl+f for 'artistBrushWidth' and adjust that when fixing these values!
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	bottomInfoContext.writeText(document.getElementById("inputInfoNumber").value + " " + document.getElementById("inputInfoRarity").value + " *Not For Sale*", scale(46), scale(993), scale(329), 0, "gothammedium", 18, "white", "oneLine=true")
	bottomInfoContext.writeText(document.getElementById("inputInfoSet").value + " \u00b7 " + document.getElementById("inputInfoLanguage").value + "  {fontsize1}{font:belerenbsc}{artistBrush}" + document.getElementById("inputInfoArtist").value, scale(46), scale(1012), scale(375), 0, "gothammedium", 17, "white", "oneLine=true")
	var copyrightShift = 0;
	for (var i = 0; i < cardMaster.children.length; i++) {
		if (parseInt(cardMaster.children[i].id.replace("frameIndex", "")) != -1 && frameList[parseInt(cardMaster.children[i].id.replace("frameIndex", ""))].image.src.includes("PT")) {
			copyrightShift = 19;
		}
	}
	bottomInfoContext.writeText("\u2122 & \u00a9 " + date.getFullYear() + " Wizards of the Coast", cardWidth / 2, scale(993 + copyrightShift), scale(322), 0, "mplantin", 17, "white", "oneLine=true,textAlign='right'")
	cardImageUpdated()
}
// setTimeout(m15BottomInfo, 250)

finishChangingVersion()