//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
if (version.currentVersion != "seventh") {
    //Name, text, x, y, width, height, font, size, color, other
    version.textList = [
        ["Title", "", scale(82), scale(70), scale(630), 0, "goudymedieval", 42, "white", "oneLine=true,shadow=2"],
        ["Type", "", scale(82), scale(600), scale(630), 0, "mplantin", 33, "white", "oneLine=true,shadow=2"],
        ["Rules Text", "", scale(97), scale(630), scale(554), scale(292), "mplantin", 36, "black", "lineSpace=0.97"],
        ["Power Toughness", "", scale(592), scale(959), scale(110), 0, "mplantin", 47, "white", "oneLine=true,textAlign='center',shadow=2"]
    ];
}
version.currentVersion = "seventh"
version.artX = scale(88)
version.artY = scale(102)
version.artWidth = scale(567)
version.artHeight = scale(461)
version.setSymbolRight = scale(663)
version.setSymbolVertical = scale(598)
version.setSymbolWidth = scale(90)
version.setSymbolHeight = scale(39)
version.bottomInfoFunction = "seventhBottomInfo"
version.manaCostX = scale(648)
version.manaCostY = scale(49)
version.manaCostDiameter = scale(36)
version.manaCostDistance = scale(-41)
version.manaCostDirection = "horizontal"
version.manaCostVersion = "seventh"
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
version.masksToAdd = ["Rules Text Seventh", "Pinline Seventh", "Frame Seventh", "Border Seventh"];
filterFramePicker("frameClassSeventh");


function seventhBottomInfo() {
	//remember to ctrl+f for 'artistBrushWidth' and adjust that when fixing these values!
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
    bottomInfoContext.writeText("{center}{shadow2}Illus: " + document.getElementById("inputInfoArtist").value, scale(46), scale(948), scale(651), 0, "mplantin", 29, "white", "oneLine=true")
    bottomInfoContext.writeText("{center}\u2122 & \u00a9 " + date.getFullYear() + " Wizards of the Coast *Not For Sale*", scale(46), scale(972), scale(651), 0, "mplantin", 18, "white", "oneLine=true,textAlign='right'")
	cardImageUpdated()
}
 setTimeout(seventhBottomInfo, 250)

finishChangingVersion("data/images/seventh/seventhCSV.csv")
