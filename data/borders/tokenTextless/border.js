//============================================//
//          Full Art Land M15 Border          //
//============================================//
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.rareStamp = false
cardData.rulesBox = false
//Specific Values
cardData.cardArtX = cwidth(56)
cardData.cardArtY = cheight(124)
cardData.manaSymbolDirection = "none"
document.getElementById("inputTitleColor").value = "#ffe886"
cardData.titleX = cardWidth / 2
cardData.titleAlignment = "center"
cardData.titleFont = "belerenbsc"
cardData.typeY = cheight(901)
cardData.setSymbolY = cheight(889)
cardData.textY = cheight(296)
//Images
imgArtMask.load("data/borders/tokenTextless/imgArtMask.png")
imgFrameMask.load("data/borders/tokenTextless/imgFrameMask.png")
imgPinlineMask.load("data/borders/tokenTextless/imgPinlineMask.png")
imgTitleMask.load("data/borders/tokenTextless/imgTitleMask.png")
imgTypeMask.load("data/borders/tokenTextless/imgTypeMask.png")
imgLegendary.load("none", cwidth(26), cheight(20), cwidth(697), cheight(112))
imgLegendaryRight.load("none", cwidth(26), cheight(20), cwidth(697), cheight(112))
//Loads the Colors
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,artifact-Artifact,colorless-Colorless")
//Runs the things!
sectionTextFunction()
sectionFrameFunction()
sectionOtherFunction()