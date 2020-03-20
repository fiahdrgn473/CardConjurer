//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
if (!version.addedMoreMasks) {
    version.addedMoreMasks = true;
    version.masksToAdd = ["Left Half", "Left Third", "Left Two Thirds", "Middle Third", "Right Two Thirds", "Right Third"];
    for (var i = 0; i < version.masksToAdd.length; i++) {
        if (!maskNameList.includes(version.masksToAdd[i])) {
            document.getElementById("addFrameToCardMasterButtons").innerHTML += "<button onclick='addFrameToCardMaster(` - " + version.masksToAdd[i] + "`)' class='button'>Add To " + version.masksToAdd[i] + "</button>"
            maskNameList[maskNameList.length] = version.masksToAdd[i];
            maskList[maskList.length] = new Image();
            maskList[maskList.length - 1].crossOrigin = "anonymous";
            maskList[maskList.length - 1].src = "data/images/masks/" + version.masksToAdd[i].replace(/ /g, "") + ".png";
        }
    }
}
