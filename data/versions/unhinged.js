//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
if (version.currentVersion != "unhinged") {
    //Name, text, x, y, width, height, font, size, color, other
    version.textList = [
                        ["Title", "", scale(280), scale(56), scale(174), 0, "belerenb", scale(37), "black", "oneLine=true,textAlign='center'"]
                        ]
    version.frameIndexToInsert = 4;
}
version.currentVersion = "unhinged"
version.artX = scale(59)
version.artY = scale(58)
version.artWidth = scale(623)
version.artHeight = scale(864)
version.setSymbolRight = scale(690)
version.setSymbolVertical = scale(967)
version.setSymbolWidth = scale(100)
version.setSymbolHeight = scale(40)
version.bottomInfoFunction = "unhingedBottomInfo"
version.manaCostX = scale(653)
version.manaCostY = scale(60)
version.manaCostDiameter = scale(34)
version.manaCostDistance = scale(-38)
version.manaCostDirection = "horizontal"
version.manaCostVersion = "m15"
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
version.masksToAdd = ["Title Unhinged", "Pinline Unhinged", "Frame Unhinged", "Border Unhinged"]
filterFramePicker("frameClassUnhinged")


function unhingedBottomInfo() {
    bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
    bottomInfoContext.writeText("{oldArtistBrush}John Avon" + document.getElementById("inputInfoArtist").value, scale(60), scale(964), scale(624), 0, "matrixb", scale(26), 'white', "oneLine=true")
    bottomInfoContext.writeText("\u2122 & \u00a9 " + date.getFullYear() + " Wizards of the Coast *Not For Sale*", scale(62), scale(987), scale(620), 0, "mplantin", scale(17), 'white', "oneLine=true")
    cardImageUpdated()
}
setTimeout(unhingedBottomInfo, 250)

finishChangingVersion("data/images/unhinged/unhingedCSV.csv")
