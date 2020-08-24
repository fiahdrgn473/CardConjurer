if (!loadedVersions.includes('m15Planeswalker/version')) {
	loadedVersions.push('m15Planeswalker/version')
	newCanvas('planeswalker')
	loadMaskImages([['Pinline (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskPinline.png'], ['Border (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskBorder.png'], ['Title (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskTitle.png'], ['Type (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskType.png'], ['Frame (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskFrame.png'], ['Rules Text (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskText.png']])

	document.getElementById('tabPicker').innerHTML += `<div onclick='toggleTabs(this, "planeswalkerTab")' class='interactable'>Planeswalker</div>`
    var planeswalkerTab = document.createElement("div")
    planeswalkerTab.classList.add('hidden')
    planeswalkerTab.id = 'planeswalkerTab'
    planeswalkerTab.innerHTML = `
            One: <input type="number" class="input number" id="inputPlaneswalker1" oninput="planeswalkerAbilities()" value="200" min="0"><input type="text" class="input text" id="inputPlaneswalker1Icon" oninput="planeswalkerAbilities()" value="+1">
            Two: <input type="number" class="input number" id="inputPlaneswalker2" oninput="planeswalkerAbilities()" value="200" min="0"><input type="text" class="input text" id="inputPlaneswalker2Icon" oninput="planeswalkerAbilities()" value="0">
            Three: <input type="number" class="input number" id="inputPlaneswalker3" oninput="planeswalkerAbilities()" value="200" min="0"><input type="text" class="input text" id="inputPlaneswalker3Icon" oninput="planeswalkerAbilities()" value="-3">
            Four: <input type="number" class="input number" id="inputPlaneswalker4" oninput="planeswalkerAbilities()" value="0" min="0" max="1039"><input type="text" class="input text" id="inputPlaneswalker4Icon" oninput="planeswalkerAbilities()" value="-9"><br>
    For two-ability Planeswalkers only:<br>
    <input type="checkbox" onchange="changePlaneswalkerAbilityLayout()" id="inputWARSpacing"> Use War of the Spark ability spacing<br>
    <input type="checkbox" onchange="changePlaneswalkerAbilityLayout()" id="inputWARReverse"> Reverse War of the Spark ability spacing<br>
    <input type="checkbox" onchange="invertPlaneswalkerColors()" id="inputColorInvert"> Dark ability boxes`
    document.getElementById('tabOptions').appendChild(planeswalkerTab)
    var planeswalkerPlus = new Image()
    planeswalkerPlus.crossOrigin = 'anonymous'
    planeswalkerPlus.src = '/data/images/cardImages/planeswalker/planeswalkerPlus.png'
    var planeswalkerNeutral = new Image()
    planeswalkerNeutral.crossOrigin = "anonymous"
    planeswalkerNeutral.src = '/data/images/cardImages/planeswalker/planeswalkerNeutral.png'
    var planeswalkerMinus = new Image()
    planeswalkerMinus.crossOrigin = "anonymous"
    planeswalkerMinus.src = '/data/images/cardImages/planeswalker/planeswalkerMinus.png'
    var lightToDarkPlaneswalker = new Image()
    lightToDarkPlaneswalker.crossOrigin = 'anonymous'
    lightToDarkPlaneswalker.src = '/data/images/cardImages/planeswalker/abilityLineOdd.png'
    var darkToLightPlaneswalker = new Image()
    darkToLightPlaneswalker.crossOrigin = 'anonymous'
    darkToLightPlaneswalker.src = '/data/images/cardImages/planeswalker/abilityLineEven.png'
    var lightToDarkPlaneswalkerDarkened= new Image()
    lightToDarkPlaneswalkerDarkened.crossOrigin = 'anonymous'
    lightToDarkPlaneswalkerDarkened.src = '/data/images/cardImages/planeswalker/abilityLineOddDarkened.png'
    var darkToLightPlaneswalkerDarkened = new Image()
    darkToLightPlaneswalkerDarkened.crossOrigin = 'anonymous'
    darkToLightPlaneswalkerDarkened.onload = function() {invertPlaneswalkerColors()}
    darkToLightPlaneswalkerDarkened.src = '/data/images/cardImages/planeswalker/abilityLineEvenDarkened.png'
    setTimeout(planeswalkerAbilities, 1000)
    //placeholders:
    var darkColor = '#a4a4a4'
    var lightColor = 'white'
    var planeswalkerLightToDark = new Image()
    var planeswalkerDarkToLight = new Image()
    planeswalkerDarkToLight.onload = function(){planeswalkerAbilities()}
}

if (currentVersion != 'm15Planeswalker/version') {
	currentVersion = 'm15Planeswalker/version'

	artX = scaleX(100 / 1500)
	artY = scaleY(190 / 2100)
	artWidth = scaleX(1508 / 1500)
	artHeight = scaleY(1730 / 2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '86'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1383/1500), 'right']
	setSymbolY = [scaleY(1237/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(80/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoPlaneswalker'

	loadTextOptions([
    new cardText('Card Title', '', 130/1500, 149/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
    new cardText('Card Type', '', 130/1500, 1258/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
    new cardText('Ability 1', '', 270/1500, 1153/2100, 1120/1500, 624/2100, 'mplantin', 74/2100, 'black'),
    new cardText('Ability 2', '', 270/1500, 1153/2100, 1120/1500, 624/2100, 'mplantin', 74/2100, 'black'),
    new cardText('Ability 3', '', 270/1500, 1153/2100, 1120/1500, 624/2100, 'mplantin', 74/2100, 'black'),
    new cardText('Ability 4', '', 270/1500, 1153/2100, 1120/1500, 624/2100, 'mplantin', 74/2100, 'black'),
    new cardText('Loyalty', '', 1215/1500, 1954/2100, 210/1500, 78/2100, 'belerenbsc', 78/2100, 'white', ['oneLine=true,textAlign="center"'])
    ])
}

function bottomInfoPlaneswalker() {
    bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
    var ptBoxShift = 36/2100
    writeText(
        [
            {text: document.getElementById('inputInfoSet').value + '{star}' + document.getElementById('inputInfoLanguage').value + ' {saveTextX}{artistbrush}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value, x: 97/1500, y: 2026/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
            {text: document.getElementById('inputInfoNumber').value + '{loadTextX}' + document.getElementById('inputInfoRarity').value, x: 97/1500, y: 1990/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
            {text: '{right}\u2122 & \u00a9 ' + date.getFullYear() + ' Wizards of the Coast', x: 97/1500, y: 1990/2100 + ptBoxShift, width: 1306/1500, height: 35/2100, font: 'mplantin', fontSize: 35/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
            {text: 'NOT FOR SALE', x: 97/1500, y: 2058/2100, width: 1306/1500, height: 30/2100, font: 'gothammedium', fontSize: 30/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
            {text: '{right}CardConjurer.com', x: 97/1500, y: 2022/2100 + ptBoxShift, width: 1306/1500, height: 30/2100, font: 'mplantin', fontSize: 30/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']}
        ], bottomInfoContext)
}

var planeswalkerAbilityLayout = [[0], [0, scaleY(784/1050)], [0, scaleY(730/1050), scaleY(863/1050)], [0, scaleY(697/1050), scaleY(784/1050), scaleY(878/1050)], [0, scaleY(683/1050), scaleY(756/1050), scaleY(830/1050), scaleY(904/1050)]]
var planeswalkerAbilityCount = 3
var ability1Y = 0, ability2Y = 0, ability3Y = 0, ability4Y = 0, ability5Y = cardHeight

function planeswalkerAbilities() {
    planeswalkerContext.clearRect(0, 0, cardWidth, cardHeight)
    planeswalkerAbilityCount = 0
    for (var i = 1; i < 5; i++) {
    	cardTextList[i + 1].y = 2
        if (getFloat('inputPlaneswalker' + i) != 0) {
            planeswalkerAbilityCount += 1;
        } else {
            break
        }
    }
    if (planeswalkerAbilityCount > 0) {
        ability1Y = scaleY(648/1050)
        if (planeswalkerAbilityCount > 1) {
            window.ability2Y = getFloat("inputPlaneswalker1") + ability1Y
            if (planeswalkerAbilityCount > 2) {
                ability3Y = getFloat('inputPlaneswalker2') + ability2Y
                if (planeswalkerAbilityCount > 3) {
                    ability4Y = getFloat('inputPlaneswalker3') + ability3Y
                    // planeswalkerContext.writeText(version.textList[5][1], scale(133), ability4Y + (scale(950) - ability4Y) / 2, scale(555), 0, "mplantin", scale(38), "black", "lineSpace=0.97");
                	cardTextList[5].y = (ability4Y) / cardHeight + cardTextList[5].fontSize - 10/2100
        			cardTextList[5].height = getFloat('inputPlaneswalker4') / cardHeight
                }
                // planeswalkerContext.writeText(version.textList[4][1], scale(133), ability3Y + getValue("inputPlaneswalker3") / 2, scale(555), 0, "mplantin", scale(38), "black", "lineSpace=0.97");
            	cardTextList[4].y = (ability3Y) / cardHeight + cardTextList[4].fontSize - 10/2100
        		cardTextList[4].height = getFloat('inputPlaneswalker3') / cardHeight
            }
            // planeswalkerContext.writeText(version.textList[3][1], scale(133), ability2Y + getValue("inputPlaneswalker2") / 2, scale(555), 0, "mplantin", scale(38), "black", "lineSpace=0.97");
        	cardTextList[3].y = (ability2Y) / cardHeight + cardTextList[3].fontSize - 10/2100
        	cardTextList[3].height = getFloat('inputPlaneswalker2') / cardHeight
        }
        // planeswalkerContext.writeText(version.textList[2][1], scale(133), ability1Y + getValue("inputPlaneswalker1") / 2, scale(555), 0, "mplantin", scale(38), "black", "lineSpace=0.97", "planeswalkerTextFunction");
        cardTextList[2].y = (ability1Y) / cardHeight + cardTextList[2].fontSize - 10/2100
        cardTextList[2].height = getFloat('inputPlaneswalker1') / cardHeight
        planeswalkerTextFunction()
    }
}
function planeswalkerTextFunction() {
    planeswalkerContext.globalCompositeOperation = 'destination-over'
    var lastAdjust = 0
    var textBoxWidth = scaleX(1210/1500)
    for (var i = 1; i < planeswalkerAbilityCount + 1; i++) {
        if (i == planeswalkerAbilityCount) {
            lastAdjust = 2 * cardHeight
        }
        if (i % 2 == 1) {
            planeswalkerContext.fillStyle = lightColor
            planeswalkerContext.globalAlpha = 0.608
            planeswalkerContext.fillRect(scaleX(91/750), window['ability' + i + 'Y'] + scaleY(10/1050), textBoxWidth, window['ability' + (i + 1) + 'Y'] - window['ability' + i + 'Y'] - scaleY(20/1050) + lastAdjust)
            if (i == 1 && planeswalkerAbilityCount != 1) {
                planeswalkerContext.fillRect(scaleX(91/750), window['ability' + i + 'Y'], textBoxWidth, scaleY(10/1050))
            }
            planeswalkerContext.globalAlpha = 1
            planeswalkerContext.drawImage(planeswalkerLightToDark, scaleX(91/750), window['ability' + (i + 1) + 'Y'] - scaleY(10/1050) + lastAdjust, textBoxWidth, scaleY(20/1050))
        } else {
            planeswalkerContext.fillStyle = darkColor
            planeswalkerContext.globalAlpha = 0.706
            planeswalkerContext.fillRect(scaleX(91/750), window['ability' + i + 'Y'] + scaleY(10/1050), textBoxWidth, window['ability' + (i + 1) + 'Y'] - window['ability' + i + 'Y'] - scaleY(20/1050) + lastAdjust)
            planeswalkerContext.globalAlpha = 1
            planeswalkerContext.drawImage(planeswalkerDarkToLight, scaleX(91/750), window['ability' + (i + 1)+ 'Y'] - scaleY(10/1050) + lastAdjust, textBoxWidth, scaleY(20/1050))
        }
    }
    planeswalkerContext.globalCompositeOperation = 'destination-in'
    planeswalkerContext.drawImage(maskImageList[maskNameList.indexOf('Rules Text (planeswalker)')], 0, 0, cardWidth, cardHeight)
    planeswalkerContext.globalCompositeOperation = 'source-over'
    planeswalkerContext.fillStyle = 'white'
    planeswalkerContext.font = scaleY(30/1050) + 'px belerenbsc'
    planeswalkerContext.textAlign = 'center'
    for (var i = 1; i < planeswalkerAbilityCount + 1; i++) {
        var planeswalkerIconValue = document.getElementById('inputPlaneswalker' + i + 'Icon').value
        var planeswalkerMidpoint = getFloat('inputPlaneswalker' + i + '') / 2 + window['ability' + i + 'Y']
        if (planeswalkerIconValue.includes('+')) {
            planeswalkerContext.drawImage(planeswalkerPlus, scaleX(22/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scaleY(27/1050), scaleX(105/750), scaleY(76/1050))
            planeswalkerContext.fillText(planeswalkerIconValue, scaleX(77/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scaleY(18/1050))
        } else if (planeswalkerIconValue.includes('-')) {
            planeswalkerContext.drawImage(planeswalkerMinus, scaleX(21/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scaleY(16/1050), scaleX(106/750), scaleY(74/1050))
            planeswalkerContext.fillText(planeswalkerIconValue, scaleX(77/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scaleY(19/1050))
        } else if (planeswalkerIconValue != '') {
            planeswalkerContext.drawImage(planeswalkerNeutral, scaleX(21/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scaleY(16/1050), scaleX(106/750), scaleY(64/1050))
            planeswalkerContext.fillText(planeswalkerIconValue, scaleX(77/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scaleY(20/1050))
        }
    }
    cardTextEdited()
}
function changePlaneswalkerAbilityLayout() {
    if (document.getElementById('inputWARSpacing').checked) {
        if (document.getElementById('inputWARReverse').checked) {
            planeswalkerAbilityLayout[2] = [0, scaleY(784/1050), scaleY(878/1050)]
        } else {
            planeswalkerAbilityLayout[2] = [0, scaleY(697/1050), scaleY(784/1050)]
        }
    } else {
        planeswalkerAbilityLayout[2] = [0, scaleY(730/1050), scaleY(863/1050)]
    }
    planeswalkerAbilities()
}
function invertPlaneswalkerColors() {
    if (document.getElementById('inputColorInvert').checked) {
        darkColor = '#5b5b5b'
        lightColor = 'black'
        planeswalkerLightToDark.src = lightToDarkPlaneswalkerDarkened.src
        planeswalkerDarkToLight.src = darkToLightPlaneswalkerDarkened.src
    } else {
        darkColor = '#a4a4a4'
        lightColor = 'white'
        planeswalkerLightToDark.src = lightToDarkPlaneswalker.src
        planeswalkerDarkToLight.src = darkToLightPlaneswalker.src
    }
}

loadFramePackOptions([['regular', 'Regular']])
