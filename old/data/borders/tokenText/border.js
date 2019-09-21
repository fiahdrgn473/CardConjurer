//============================================//
//          Full Art Land M15 Border          //
//============================================//
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.rareStamp = false
//Specific Values
cardData.cardArtX = cwidth(56)
cardData.cardArtY = cheight(124)
cardData.manaSymbolDirection = "none"
document.getElementById("inputTitleColor").value = "#ffe886"
cardData.titleAlignment = "center"
cardData.titleFont = "belerenbsc"
cardData.typeY = cheight(751)
cardData.setSymbolY = cheight(739)
cardData.textY = cheight(808)
//Images
imgArtMask.load("data/borders/tokenText/imgArtMask.png")
imgFrameMask.load("data/borders/tokenText/imgFrameMask.png")
imgPinlineMask.load("data/borders/tokenText/imgPinlineMask.png")
imgTitleMask.load("data/borders/tokenText/imgTitleMask.png")
imgTypeMask.load("data/borders/tokenText/imgTypeMask.png")
imgRulesMask.load("data/borders/tokenText/imgRulesMask.png")
imgLegendary.load("none", cwidth(26), cheight(20), cwidth(697), cheight(112))
imgLegendaryRight.load("none", cwidth(26), cheight(20), cwidth(697), cheight(112))
//Loads the Colors
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,artifact-Artifact,colorless-Colorless")
//Finishes loading the border style
finishChangingBorder()