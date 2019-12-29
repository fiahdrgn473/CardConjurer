//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
if (version.currentVersion != "expedition") {
    //Name, text, x, y, width, height, font, size, color, other, alternative-function
    version.textList = [
                        ["Title", "", scale(64), scale(77), scale(630), 0, "belerenb", 37, "black", "oneLine=true"],
                        ["Type", "", scale(64), scale(875), scale(630), 0, "belerenb", 37, "black", "oneLine=true"],
                        ["Rules Text", "", scale(64), scale(729), scale(616), scale(0), "mplantin", 38, "black", "lineSpace=0.97"],
                        ["Power Toughness", "", scale(587), scale(958), scale(110), 0, "belerenb", 38, "black", "oneLine=true,textAlign='center'"]
                        ]
}
version.currentVersion = "expedition"
version.artX = scale(56)
version.artY = scale(113)
version.artWidth = scale(630)
version.artHeight = scale(720)
version.setSymbolRight = scale(687)
version.setSymbolVertical = scale(872)
version.setSymbolWidth = scale(90)
version.setSymbolHeight = scale(42)
version.bottomInfoFunction = "m15BottomInfo"
version.manaCostX = scale(653)
version.manaCostY = scale(54)
version.manaCostDiameter = scale(34)
version.manaCostDistance = scale(-38)
version.manaCostDirection = "horizontal"
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
version.masksToAdd = ["Title Expedition", "Type Expedition", "Rules Text Expedition", "Pinline Expedition"]
filterFramePicker("frameClassExpedition")
if (!version.addedExpedition) {
    version.addedExpedition = true
}

m15BottomInfo()
finishChangingVersion("data/images/expedition/expeditionCSV.csv")
