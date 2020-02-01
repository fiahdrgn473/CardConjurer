//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
if (version.currentVersion != "unhinged") {
    //Name, text, x, y, width, height, font, size, color, other
    version.textList = [
                        ["Title", "", scale(212), scale(95), scale(320), 0, "belerenb", scale(42), "white", "oneLine=true,textAlign='center'"],
                        ["Rules Text", "", scale(110), scale(565), scale(524), scale(170), "mplantin", scale(33), "white", "lineSpace=0.97"]
                        ]
    version.frameIndexToInsert = 0;
}
version.currentVersion = "unsanctioned"
version.artX = scale(29)
version.artY = scale(30)
version.artWidth = scale(686)
version.artHeight = scale(924)
version.setSymbolRight = scale(690)
version.setSymbolVertical = scale(967)
version.setSymbolWidth = scale(0)
version.setSymbolHeight = scale(0)
version.bottomInfoFunction = "m15BottomInfo"
version.manaCostX = scale(286)
version.manaCostY = scale(742)
version.manaCostDiameter = scale(172)
version.manaCostDistance = scale(0)
version.manaCostDirection = [[scale(286), scale(742)]]
version.manaCostVersion = "justTheSymbol"
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
version.masksToAdd = []
filterFramePicker("frameClassUnsanctioned")

setTimeout(m15BottomInfo, 250)

finishChangingVersion("data/images/unsanctioned/unsanctionedCSV.csv")
