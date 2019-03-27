//============================================//
//                 M15 Border                 //
//============================================//
//Restores default values
cardData = defaultCardData
//Restores default masks
for (var i = 0; i < frameMaskList.length; i++) {
	if (window[frameMaskList[i]].src.includes("data/borders/m15/" + frameMaskList[i] + ".png") == false) {
		window[frameMaskList[i]].load("data/borders/m15/" + frameMaskList[i] + ".png")
	}
}
//Loads the colors
loadColors("white-White,blue-Blue,black-Black,red-Red,green-Green,gold-Gold,artifact-Artifact,colorless-Colorless,vehicle-Vehicle,clear-Clear,whiteLand-White Land,blueLand-Blue Land,blackLand-Black Land,redLand-Red Land,greenLand-Green Land,goldLand-Gold Land,colorlessLand-Colorless Land")
//Changes anything needed to be changed