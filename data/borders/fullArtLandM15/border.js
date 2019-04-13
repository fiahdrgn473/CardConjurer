//============================================//
//          Full Art Land M15 Border          //
//============================================//
//General Booleans
cardData.miracle = false
cardData.nyx = false
cardData.legendary = false
cardData.creature = false
cardData.rulesBox = false
cardData.rareStamp = false
//Specific Values
cardData.cardArtX = 60
cardData.cardArtY = 120
cardData.typeY = cheight(903)
cardData.setSymbolY = cheight(893)
cardData.watermarkY = cheight(886)
cardData.watermarkWidth = cwidth(110)
cardData.watermarkHeight = cheight(110)
//Images
imgArtMask.load("data/borders/fullArtLandM15/imgArtMask.png")
imgFrameMask.load("data/borders/fullArtLandM15/imgFrameMask.png")
imgPinlineMask.load("data/borders/fullArtLandM15/imgPinlineMask.png")
imgTitleMask.load("data/borders/fullArtLandM15/imgTitleMask.png")
imgTypeMask.load("data/borders/fullArtLandM15/imgTypeMask.png")
//Loads the Colors
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,colorless-Colorless")
//Runs the things!
sectionTextFunction()
sectionFrameFunction()
sectionOtherFunction()