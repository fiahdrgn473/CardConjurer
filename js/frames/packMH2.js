//Create objects for common properties across available frames
// var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskFrame.png', name:'Frame'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
var bounds = {x:0.748, y:0.8796, width:0.204, height:0.072};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/mh2/w.png'},
	{name:'Blue Frame', src:'/img/frames/mh2/u.png'},
	{name:'Black Frame', src:'/img/frames/mh2/b.png'},
	{name:'Red Frame', src:'/img/frames/mh2/r.png'},
	{name:'Green Frame', src:'/img/frames/mh2/g.png'},
	// {name:'Multicolored Frame', src:'/img/frames/mh2/m.png'},
	// {name:'Artifact Frame', src:'/img/frames/mh2/a.png'},
	// {name:'Vehicle Frame', src:'/img/frames/mh2/v.png'},
	{name:'White Power/Toughness', src:'/img/frames/mh2/wpt.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/mh2/upt.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/mh2/bpt.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/mh2/rpt.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/mh2/gpt.png', bounds:bounds},
	// {name:'Multicolored Power/Toughness', src:'/img/frames/mh2/mpt.png', bounds:bounds},
	// {name:'Artifact Power/Toughness', src:'/img/frames/mh2/apt.png', bounds:bounds},
	// {name:'Vehicle Power/Toughness', src:'/img/frames/mh2/vpt.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	// notifies
	notify('Currently only monocolored frames are available. Due to the nature of the sketch frame, I\'m not sure if/when I\'ll be able to add the remaining frames.', 10);
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'mh2';
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
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();