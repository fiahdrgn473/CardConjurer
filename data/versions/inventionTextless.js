//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
if (version.currentVersion != "inventionTextless") {
    //Name, text, x, y, width, height, font, size, color, other
    version.textList = [
                        ["Title", "", scale(64), scale(82), scale(630), 0, "belerenb", scale(37), "black", "oneLine=true"],
                        ["Type", "", scale(64), scale(898), scale(630), 0, "belerenb", scale(33), "black", "oneLine=true"],
                        ["Power Toughness", "", scale(587), scale(958), scale(110), 0, "belerenb", scale(38), "black", "oneLine=true,textAlign='center'"]
                        ]
    version.frameIndexToInsert = 0;
}
version.currentVersion = "inventionTextless"
version.artX = scale(29)
version.artY = scale(28)
version.artWidth = scale(685)
version.artHeight = scale(935)
version.setSymbolRight = scale(684)
version.setSymbolVertical = scale(896)
version.setSymbolWidth = scale(90)
version.setSymbolHeight = scale(41)
version.bottomInfoFunction = "m15BottomInfo"
version.manaCostX = scale(653)
version.manaCostY = scale(59)
version.manaCostDiameter = scale(34)
version.manaCostDistance = scale(-38)
version.manaCostDirection = "horizontal"
version.manaCostVersion = "m15"
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
version.masksToAdd = ["Border Invention"];
filterFramePicker("frameClassInvention");

finishChangingVersion("data/images/invention/inventionTextlessCSV.csv")

