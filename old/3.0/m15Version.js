//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
version.currentVersion = "m15"
version.typeOrder = ["Full", "FullSecondary", "Frame", "FrameSecondary", "Nyx", "NyxSecondary", "Pinline", "PinlineSecondary", "Legendary", "LegendarySecondary", "Title", "TitleSecondary", "Miracle", "MiracleSecondary", "Type", "TypeSecondary", "Rules", "RulesSecondary", "Border", "BorderSecondary", "PT", "RareStamp", "RareStampSecondary", "FlipPT", "FlipCircle", "FlipIcon"]
version.typesAdvanced = ["Nyx", "Miracle", "FlipPT", "FlipCircle", "FlipIcon"]
version.typeNotFull = ["Legendary", "LegendarySecondary", "PT", "RareStamp", "RareStampSecondary", "Nyx", "NyxSecondary", "Miracle", "MiracleSecondary", "FlipPT", "FlipCircle", "FlipIcon", "Border", "BorderSecondary"]
version.artX = cwidth(58)
version.artY = cheight(118)
version.setSymbolRight = cwidth(693)
version.setSymbolVertical = cheight(620)
version.setSymbolWidth = cwidth(77)
version.setSymbolHeight = cheight(42)
version.bottomInfoFunction = "m15BottomInfo"
version.manaCostX = cwidth(656)
version.manaCostY = cheight(62)
version.manaCostDiameter = cwidth(36)
version.manaCostDistance = cwidth(-38)
version.manaCostDirection = "horizontal"
version.rareStampX = cwidth(340)
version.rareStampY = cheight(965)
version.rareStampWidth = cwidth(70)
version.rareStampHeight = cheight(38)
version.watermarkWidth = cwidth(520)
version.watermarkHeight = cheight(250)
version.watermarkY = cheight(815)
//Name, text, x, y, width, height, font, size, color, other
version.textList = [
	["Title", "", cwidth(62), cheight(87), cwidth(630), 0, "belerenb", 40, "black", "oneLine=true"],
	["Type", "", cwidth(60), cheight(624), cwidth(630), 0, "belerenb", 34, "black", "oneLine=true"],
	["Rules Text", "", cwidth(63), cheight(670), cwidth(624), cheight(292), "mplantin", 38, "black", "lineSpace=0.97"],
	["Power Toughness", "", cwidth(590), cheight(970), cwidth(110), 0, "belerenb", 39, "black", "oneLine=true,textAlign='center'"],
	["Flip PT", "", cwidth(588), cheight(902), cwidth(100), 0, "belerenb", 28, "#666", "oneLine=true,textAlign='right'"]
]
finishChangingVersion()

function m15BottomInfo() {
	//remember to ctrl+f for 'artistBrushWidth' and adjust that when fixing these values!
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	bottomInfoContext.writeText(document.getElementById("inputInfoNumber").value + " " + document.getElementById("inputInfoRarity").value + " *Not For Sale*", cwidth(46), cheight(993), cwidth(329), 0, "gothammedium", 18, "white", "oneLine=true")
	bottomInfoContext.writeText(document.getElementById("inputInfoSet").value + " \u00b7 " + document.getElementById("inputInfoLanguage").value + "  {fontsize1}{font:belerenbsc}{artistBrush}" + document.getElementById("inputInfoArtist").value, cwidth(46), cheight(1012), cwidth(375), 0, "gothammedium", 17, "white", "oneLine=true")
	var copyrightShift = 19 * cardMasterTypes.includes("PT")
	bottomInfoContext.writeText("\u2122 & \u00a9 " + date.getFullYear() + " Wizards of the Coast", cardWidth / 2, cheight(993 + copyrightShift), cwidth(322), 0, "mplantin", 17, "white", "oneLine=true,textAlign='right'")
	updateCardCanvas()
}
setTimeout(m15BottomInfo, 250)
