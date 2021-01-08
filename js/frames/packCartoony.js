//defines available frames
availableFrames = [{src:'/img/frames/m15/regular/m15FrameA.png', name:'unnamed'}];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'cartoony';
	loadScript('/js/frames/manaSymbolsCartoony.js');
	// notify('The Future version adds special mana symbols. To use them, place an "F" before the following mana symbols: wubrg, 0-20, x, and hybrid mana symbols.');
	//art bounds
	card.artBounds = {x:0.0767, y:0.1129, width:0.8476, height:0.4429};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.01, oneLine:true, size:180/1638, manaCost:true, manaSpacing:-0.11, noVerticalCenter:true, arcRadius:2, arcStart:0.165},
		title: {name:'Title', y:0.02, text:'', oneLine:true, font:'Acme-Regular', size:0.081, arcRadius:2, arcStart:-0.165, noVerticalCenter:true, outlineWidth:0.0048, color:'white'}, //, x:0.0854, width:0.8292, height:0.0543
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();