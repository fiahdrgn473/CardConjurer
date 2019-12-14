//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
version.currentVersion = "planeswalker"
version.artX = scale(58)
version.artY = scale(118)
version.setSymbolRight = scale(687)
version.setSymbolVertical = scale(612)
version.setSymbolWidth = scale(90)
version.setSymbolHeight = scale(42)
version.bottomInfoFunction = "m15PlaneswalkerBottomInfo"
version.manaCostX = scale(653)
version.manaCostY = scale(43)
version.manaCostDiameter = scale(34)
version.manaCostDistance = scale(-39)
version.manaCostDirection = "horizontal"
version.watermarkWidth = scale(520)
version.watermarkHeight = scale(250)
version.watermarkY = scale(800)
version.masksToAdd = ["Title Planeswalker", "Type Planeswalker", "Pinline Planeswalker", "Frame Planeswalker", "Border Planeswalker", "Loyalty Planeswalker", "Rules Text Planeswalker"]
filterFramePicker("frameClassPlaneswalker")
//Name, text, x, y, width, height, font, size, color, other, alternative-function
version.textList = [
	["Title", "", scale(65), scale(65), scale(630), 0, "belerenb", scale(39), "black", "oneLine=true"],
	["Type", "", scale(65), scale(615), scale(630), 0, "belerenb", scale(33), "black", "oneLine=true"],
	["First Ability","",,,,,,,,,"planeswalkerAbilities"],
    ["Second Ability", "",,,,,,,,,"ignore"],
    ["Third Ability", "",,,,,,,,,"ignore"],
    ["Fourth Ability", "",,,,,,,,,"ignore"],
	["Loyalty", "", scale(615), scale(958), scale(79), 0, "belerenb", scale(38), "white", "oneLine=true,textAlign='center'"]
]
function m15PlaneswalkerBottomInfo() {    //remember to ctrl+f for 'artistBrushWidth' and adjust that when fixing these values!
    bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
    bottomInfoContext.writeText(document.getElementById("inputInfoNumber").value + " " + document.getElementById("inputInfoRarity").value + " *Not For Sale*", scale(46), scale(982), scale(329), 0, "gothammedium", scale(17), "white", "oneLine=true")
    bottomInfoContext.writeText(document.getElementById("inputInfoSet").value + "  \u2022  " + document.getElementById("inputInfoLanguage").value + "  {font:belerenbsc}{artistBrush}{fontsize1}" + document.getElementById("inputInfoArtist").value, scale(46), scale(1002), scale(375), 0, "gothammedium", 17, "white", "oneLine=true")
    bottomInfoContext.writeText("\u2122 & \u00a9 " + date.getFullYear() + " Wizards of the Coast", cardWidth / 2, scale(1001), scale(322), 0, "mplantin", scale(17), "white", "oneLine=true,textAlign='right'")
    cardImageUpdated()
}
if (!version.addedPlaneswalker) {
    version.addedPlaneswalker = true
    document.getElementById("mainTabMenu").innerHTML += "<div class='tabOption mainEditor' onclick='toggleTabs(event, `planeswalker`, `mainEditor`)'>Planeswalker</div>"
    var planeswalkerTab = document.createElement("div")
    planeswalkerTab.classList.add("tabContent")
    planeswalkerTab.classList.add("mainEditor")
    planeswalkerTab.id = "planeswalker"
    planeswalkerTab.innerHTML = `
            One: <input type="number" class="input number" id="inputPlaneswalker1" oninput="planeswalkerAbilities()" value="99" min="0" max="1039"><input type="text" class="input text" id="inputPlaneswalker1Icon" oninput="planeswalkerAbilities()" value="+1">
            Two: <input type="number" class="input number" id="inputPlaneswalker2" oninput="planeswalkerAbilities()" value="100" min="0" max="1039"><input type="text" class="input text" id="inputPlaneswalker2Icon" oninput="planeswalkerAbilities()" value="0">
            Three: <input type="number" class="input number" id="inputPlaneswalker3" oninput="planeswalkerAbilities()" value="101" min="0" max="1039"><input type="text" class="input text" id="inputPlaneswalker3Icon" oninput="planeswalkerAbilities()" value="-3">
            Four: <input type="number" class="input number" id="inputPlaneswalker4" oninput="planeswalkerAbilities()" value="0" min="0" max="1039"><input type="text" class="input text" id="inputPlaneswalker4Icon" oninput="planeswalkerAbilities()" value="-9"><br>
    For two-ability Planeswalkers only:<br>
    <input type="checkbox" onchange="changePlaneswalkerAbilityLayout()" id="inputWARSpacing"> Use War of the Spark ability spacing<br>
    <input type="checkbox" onchange="changePlaneswalkerAbilityLayout()" id="inputWARReverse"> Reverse War of the Spark ability spacing`
    document.getElementById("cardMenu").appendChild(planeswalkerTab)
    newCanvas("planeswalker");
    var planeswalkerPlus = new Image()
    planeswalkerPlus.crossOrigin = "anonymous";
    planeswalkerPlus.src = "data/images/planeswalker/planeswalkerPlus.png"
    var planeswalkerNeutral = new Image()
    planeswalkerNeutral.crossOrigin = "anonymous";
    planeswalkerNeutral.src = "data/images/planeswalker/planeswalkerNeutral.png"
    var planeswalkerMinus = new Image()
    planeswalkerMinus.crossOrigin = "anonymous";
    planeswalkerMinus.src = "data/images/planeswalker/planeswalkerMinus.png"
    var lightToDarkPlaneswalker = new Image()
    lightToDarkPlaneswalker.crossOrigin = "anonymous";
    lightToDarkPlaneswalker.src = "data/images/planeswalker/abilityLineOdd.png"
    var darkToLightPlaneswalker = new Image()
    darkToLightPlaneswalker.crossOrigin = "anonymous";
    darkToLightPlaneswalker.onload = function() {planeswalkerAbilities()}
    darkToLightPlaneswalker.src = "data/images/planeswalker/abilityLineEven.png"
}

m15PlaneswalkerBottomInfo()
finishChangingVersion("data/images/planeswalker/planeswalkerCSV.csv")

var planeswalkerAbilityLayout = [[0], [0, scale(784)], [0, scale(730), scale(863)], [0, scale(697), scale(784), scale(878)], [0, scale(100), scale(200), scale(300), scale(400)]]
var planeswalkerAbilityCount = 3;
var ability1Y = 0, ability2Y = 0, ability3Y = 0, ability4Y = 0, ability5Y = cardHeight;
//planeswalkerContext.writeText(version.textList[2][1], 64, ability1Y, 616, 0, "mplantin", 38, "black", "lineSpace=0.97");
function planeswalkerAbilities() {
    planeswalkerContext.clearRect(0, 0, cardWidth, cardHeight)
    planeswalkerAbilityCount = 0
    for (var i = 1; i < 5; i++) {
        if (getValue("inputPlaneswalker" + i) != 0) {
            planeswalkerAbilityCount += 1;
        } else {
            break
        }
    }
    if (planeswalkerAbilityCount > 0) {
        ability1Y = scale(648)
        if (planeswalkerAbilityCount > 1) {
            window.ability2Y = getValue("inputPlaneswalker1") + ability1Y
            if (planeswalkerAbilityCount > 2) {
                ability3Y = getValue("inputPlaneswalker2") + ability2Y
                if (planeswalkerAbilityCount > 3) {
                    ability4Y = getValue("inputPlaneswalker3") + ability3Y
                    planeswalkerContext.writeText(version.textList[5][1], scale(133), ability4Y + (scale(950) - ability4Y) / 2, scale(555), 0, "mplantin", scale(38), "black", "lineSpace=0.97");
                }
                planeswalkerContext.writeText(version.textList[4][1], scale(133), ability3Y + getValue("inputPlaneswalker3") / 2, scale(555), 0, "mplantin", scale(38), "black", "lineSpace=0.97");
            }
            planeswalkerContext.writeText(version.textList[3][1], scale(133), ability2Y + getValue("inputPlaneswalker2") / 2, scale(555), 0, "mplantin", scale(38), "black", "lineSpace=0.97");
        }
        planeswalkerContext.writeText(version.textList[2][1], scale(133), ability1Y + getValue("inputPlaneswalker1") / 2, scale(555), 0, "mplantin", scale(38), "black", "lineSpace=0.97", "planeswalkerTextFunction");
    }
}
function planeswalkerTextFunction() {
    planeswalkerContext.globalCompositeOperation = "destination-over"
    var lastAdjust = 0
    for (var i = 1; i < planeswalkerAbilityCount + 1; i++) {
        if (i == planeswalkerAbilityCount) {
            lastAdjust = 2 * cardHeight
        }
        if (i % 2 == 1) {
            planeswalkerContext.fillStyle = "white"
            planeswalkerContext.globalAlpha = 0.608
            planeswalkerContext.fillRect(scale(91), window["ability" + i + "Y"] + scale(10), scale(599), window["ability" + (i + 1) + "Y"] - window["ability" + i + "Y"] - scale(20) + lastAdjust)
            if (i == 1 && planeswalkerAbilityCount != 1) {
                planeswalkerContext.fillRect(scale(91), window["ability" + i + "Y"], scale(599), scale(10))
            }
            planeswalkerContext.globalAlpha = 1
            planeswalkerContext.drawImage(lightToDarkPlaneswalker, scale(91), window["ability" + (i + 1) + "Y"] - scale(10) + lastAdjust, scale(599), scale(20))
        } else {
            planeswalkerContext.fillStyle = "#a4a4a4"
            planeswalkerContext.globalAlpha = 0.706
            planeswalkerContext.fillRect(scale(91), window["ability" + i + "Y"] + scale(10), scale(599), window["ability" + (i + 1) + "Y"] - window["ability" + i + "Y"] - scale(20) + lastAdjust)
            planeswalkerContext.globalAlpha = 1
            planeswalkerContext.drawImage(darkToLightPlaneswalker, scale(91), window["ability" + (i + 1)+ "Y"] - scale(10) + lastAdjust, scale(599), scale(20))
        }
    }
    planeswalkerContext.globalCompositeOperation = "destination-in"
    planeswalkerContext.drawImage(maskList[maskNameList.indexOf("Rules Text Planeswalker")], 0, 0, cardWidth, cardHeight)
    planeswalkerContext.globalCompositeOperation = "source-over"
    planeswalkerContext.fillStyle = "white"
    planeswalkerContext.font = "30px belerenbsc"
    planeswalkerContext.textAlign = "center"
    for (var i = 1; i < planeswalkerAbilityCount + 1; i++) {
        var planeswalkerIconValue = document.getElementById("inputPlaneswalker" + i + "Icon").value
        var planeswalkerMidpoint = getValue("inputPlaneswalker" + i + "") / 2 + window["ability" + i + "Y"]
        if (planeswalkerIconValue.includes("+")) {
            planeswalkerContext.drawImage(planeswalkerPlus, scale(22), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scale(35), scale(105), scale(76))
            planeswalkerContext.fillText(planeswalkerIconValue, scale(77), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scale(10))
        } else if (planeswalkerIconValue.includes("-")) {
            planeswalkerContext.drawImage(planeswalkerMinus, scale(21), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scale(24), scale(106), scale(74))
            planeswalkerContext.fillText(planeswalkerIconValue, scale(77), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scale(11))
        } else if (planeswalkerIconValue != "") {
            planeswalkerContext.drawImage(planeswalkerNeutral, scale(21), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scale(24), scale(106), scale(64))
            planeswalkerContext.fillText(planeswalkerIconValue, scale(77), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scale(12))
        }
    }
    cardImageUpdated()
}
function changePlaneswalkerAbilityLayout() {
    if (document.getElementById("inputWARSpacing").checked) {
        if (document.getElementById("inputWARReverse").checked) {
            planeswalkerAbilityLayout[2] = [0, scale(784), scale(878)]
        } else {
            planeswalkerAbilityLayout[2] = [0, scale(697), scale(784)]
        }
    } else {
        planeswalkerAbilityLayout[2] = [0, scale(730), scale(863)]
    }
    planeswalkerAbilities()
}




