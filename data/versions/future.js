//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
if (version.currentVersion != "future") {
    //Name, text, x, y, width, height, font, size, color, other
    version.textList = [
                        ["Title", "", scale(131), scale(87), scale(550), 0, "matrixb", 45, "white", "oneLine=true"],
                        ["Type", "", scale(91), scale(615), scale(557), 0, "matrixb", 37, "white", "oneLine=true"],
                        ["Rules Text", "", scale(76), scale(650), scale(594), scale(278), "mplantin", 36, "black", "lineSpace=0.97"],
                        ["Power Toughness", "", scale(574), scale(960), scale(106), 0, "mplantin", 42, "white", "oneLine=true,textAlign='center'"]
                        ];
    if (!version.addedFuture) {
        version.addedFuture = true;
        version.futureManaSymbolNameList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "w", "u", "b", "r", "g", "wu", "wb", "ub", "ur", "br", "bg", "rg", "rw", "gw", "gu", "x"]
        version.futureManaSymbolImageList = []
        for (var i = 0; i < version.futureManaSymbolNameList.length; i++) {
            version.futureManaSymbolImageList[i] = new Image();
            version.futureManaSymbolImageList[i].src = "data/images/manaSymbols/future/" + i + ".png"
        }
    }
}
version.currentVersion = "future"
version.artX = scale(64)
version.artY = scale(88)
version.artWidth = scale(648)
version.artHeight = scale(608)
version.setSymbolRight = scale(678)
version.setSymbolVertical = scale(618)
version.setSymbolWidth = scale(40)
version.setSymbolHeight = scale(40)
version.bottomInfoFunction = "futureBottomInfo"
version.manaCostX = scale(91)
version.manaCostY = scale(140)
version.manaCostDiameter = scale(59)
version.manaCostDistance = scale(-38)
version.manaCostDirection = [[91, 140], [61, 207], [46, 281], [46, 356], [59, 437], [106, 512]];
version.manaCostVersion = "future";
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
version.masksToAdd = ["Border Future", "Icon Future Creature", "Icon Future Instant", "Icon Future Sorcery", "Icon Future Enchantment", "Icon Future Artifact", "Icon Future Land", "Icon Future Multi"];
filterFramePicker("frameClassFuture");


function futureBottomInfo() {
    var colorToFill = "white"
    var copyrightShift = 0;
    for (var i = 0; i < cardMaster.children.length; i++) {
        if (parseInt(cardMaster.children[i].id.replace("frameIndex", "")) >= 0 && frameList[parseInt(cardMaster.children[i].id.replace("frameIndex", ""))].image.src.includes("PT") && !frameList[parseInt(cardMaster.children[i].id.replace("frameIndex", ""))].framePickerClasses.includes("frameClassCustom")) {
            copyrightShift = scale(-124);
        }
        if (parseInt(cardMaster.children[i].id.replace("frameIndex", "")) >= 0 && !frameList[parseInt(cardMaster.children[i].id.replace("frameIndex", ""))].framePickerClasses.includes("frameClassCustom")) {
            var frameColorSource = frameList[parseInt(cardMaster.children[i].id.replace("frameIndex", ""))].image.src;
            if (frameColorSource.includes("WFull") || frameColorSource.includes("AFull") || frameColorSource.includes("CFull")) {
                colorToFill = "black";
            }
        }
    }
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
    bottomInfoContext.writeText("{right}{oldArtistBrush}" + document.getElementById("inputInfoArtist").value, scale(70), scale(952), scale(604) + copyrightShift, 0, "matrixb", scale(26), colorToFill, "oneLine=true")
	bottomInfoContext.writeText("\u2122 & \u00a9 " + date.getFullYear() + " Wizards of the Coast *Not For Sale*", scale(70), scale(975), scale(604) + copyrightShift, 0, "mplantin", scale(18), colorToFill, "oneLine=true,textAlign='right'")
	cardImageUpdated()
}
 setTimeout(futureBottomInfo, 250)

finishChangingVersion("data/images/future/futureCSV.csv")
