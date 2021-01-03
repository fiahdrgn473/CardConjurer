//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}];
var bounds = {x:0.7627, y:0.8853, width:0.192, height:0.0753};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/kaldheim/frameW.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/kaldheim/frameU.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/kaldheim/frameR.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/kaldheim/ptW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/kaldheim/ptU.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/kaldheim/ptR.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'm15Regular';
	//art bounds
	card.artBounds = {x:0.1047, y:0.1158, width:0.7907, height:0.462};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.6081, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0691, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0667, y:0.0591, width:0.8667, height:0.0543, oneLine:true, font:'belerenb', color:'white', size:0.0381, shadowX:0.0027, shadowY:0.002},
		type: {name:'Type', text:'', x:0.0734, y:0.5829, width:0.8534, height:0.0543, oneLine:true, font:'belerenb', color:'white', size:0.0324, shadowX:0.0027, shadowY:0.002},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6405, width:0.828, height:0.2739, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.798, y:0.9039, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();