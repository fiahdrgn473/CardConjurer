loadFramePacks([
	{name:'Generic Margins', value:'Margin-1'},
	{name:'D&D Module Margin', value:'MarginDNDModule'},
	{name:'Mystical Archive Margin', value:'MarginMysticalArchive'},
	{name:'Unstable Basics Margin', value:'MarginUnstable'}
])

//For multiple Margin packs
var loadMarginVersion = async () => {
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
