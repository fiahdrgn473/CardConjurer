//============================================//
//        Full Art Land Unstable Border       //
//============================================//
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.legendary = false
cardData.creature = false
cardData.rulesBox = false
cardData.titleTypeBoxes = false
cardData.transparency = true
//Specific Values
cardData.cardArtX = 0
cardData.cardArtY = 0
cardData.titleAlignment = "center"
cardData.titleX = cardWidth / 2
cardData.titleY = cheight(48)
cardData.titleRight = cwidth(999)
cardData.manaSymbolDirection = "none"
document.getElementById("inputTitleColor").value = "#ffffff"
imgRareStamp.load("none", cwidth(329), cheight(949), cwidth(90), cheight(50))
imgRareStampRight.load("none", cwidth(329), cheight(949), cwidth(90), cheight(50))
cardData.setSymbolX = cardWidth / 2
cardData.setSymbolY = cheight(80)
cardData.setSymbolAlignment = "center"
//Images
imgArtMask.load("data/borders/fullArtLandUnstable/imgArtMask.png")
imgBorderMask.load("data/borders/fullArtLandUnstable/imgBorderMask.png")
imgFrameMask.load("data/borders/fullArtLandUnstable/imgFrameMask.png")
imgPinlineMask.load("data/borders/fullArtLandUnstable/imgPinlineMask.png")
//Loads the Colors
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,colorless-Colorless")
//Finishes loading the border style
finishChangingBorder()