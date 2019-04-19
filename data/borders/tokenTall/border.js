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
cardData.titleX = cardWidth / 2
cardData.titleAlignment = "center"
cardData.titleFont = "belerenbsc"
//Images
imgArtMask.load("data/borders/tokenTall/imgArtMask.png")
imgFrameMask.load("data/borders/tokenTall/imgFrameMask.png")
imgPinlineMask.load("data/borders/tokenTall/imgPinlineMask.png")
imgTitleMask.load("data/borders/tokenTall/imgTitleMask.png")
imgTypeMask.load("data/borders/tokenTall/imgTypeMask.png")
imgRulesMask.load("data/borders/tokenTall/imgRulesMask.png")
imgLegendary.load("none", cwidth(26), cheight(20), cwidth(697), cheight(112))
imgLegendaryRight.load("none", cwidth(26), cheight(20), cwidth(697), cheight(112))
//Loads the Colors
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,artifact-Artifact,colorless-Colorless")
//Finishes loading the border style
finishChangingBorder()