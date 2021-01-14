//Create objects for common properties across available frames
var bounds = {x:-0.044, y:-1/35, width:1.088, height:37/35};
//defines available frames
availableFrames = [
	{name:'Black Border Extension', src:'/img/frames/margins/blackBorderExtension.png', bounds:bounds},
	{name:'Borderless Border Extension', src:'/img/frames/margins/borderlessBorderExtension.png', bounds:bounds},
	{name:'Box Topper Border Extension', src:'/img/frames/margins/boxTopperBorderExtension.png', bounds:bounds},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities({canvas:[1500, 2100, 0.044, 1/35], resetOthers:false});
	//sets card version
	// card.version = 'margin';
	card.margins = true;
	//art stuff
	var changedArtBounds = false;
	if (card.artBounds.width == 1) {
		card.artBounds.width += 0.044;
		changedArtBounds = true;
	}
	if (card.artBounds.x == 0) {
		card.artBounds.x = -0.044;
		card.artBounds.width += 0.044;
		changedArtBounds = true;
	}
	if (card.artBounds.height == 1) {
		card.artBounds.height += 1/35;
		changedArtBounds = true;
	}
	if (card.artBounds.y == 0) {
		card.artBounds.y = -1/35;
		card.artBounds.height += 1/35;
		changedArtBounds = true;
	}
	if (changedArtBounds) {
		autoFitArt();
	}
	//runs anything that needs to run
	if (card.version.includes('planeswalker')) {
		planeswalkerEdited();
	}
	if (card.version.includes('saga')) {
		sagaEdited();
	}
	drawTextBuffer();
	drawFrames();
	bottomInfoEdited();
	watermarkEdited();
}
//loads available frames
loadFramePack();