//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
if (version.currentVersion != "m15") {
    //Name, text, x, y, width, height, font, size, color, other
    version.textList = [
                        ["Title", "", scale(64), scale(83), scale(630), 0, "belerenb", 37, "black", "oneLine=true"],
                        ["Type", "", scale(64), scale(615), scale(630), 0, "belerenb", 33, "black", "oneLine=true"],
                        ["Rules Text", "", scale(64), scale(662), scale(616), scale(292), "mplantin", 38, "black", "lineSpace=0.97"],
                        ["Power Toughness", "", scale(587), scale(958), scale(110), 0, "belerenb", 38, "black", "oneLine=true,textAlign='center'"]/*,
                                                                                                                                                   ["Flip PT", "", scale(588), scale(902), scale(100), 0, "belerenb", 28, "#666", "oneLine=true,textAlign='right'"]*/
                        ]
}
version.currentVersion = "m15"
version.artX = scale(58)
version.artY = scale(118)
version.artWidth = scale(626)
version.artHeight = scale(458)
version.setSymbolRight = scale(684)
version.setSymbolVertical = scale(614)
version.setSymbolWidth = scale(90)
version.setSymbolHeight = scale(40)
version.bottomInfoFunction = "m15BottomInfo"
version.manaCostX = scale(653)
version.manaCostY = scale(60)
version.manaCostDiameter = scale(34)
version.manaCostDistance = scale(-38)
version.manaCostDirection = "horizontal"
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
version.masksToAdd = []
filterFramePicker("frameClassRegular");
m15BottomInfo()
finishChangingVersion("data/images/m15Extras/m15ExtrasCSV.csv")

