//Create objects for common properties across available frames
// var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskFrame.png', name:'Frame'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
var bounds = {x:0.8587, y:0.8186, width:0.062, height:0.1258};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/invocation/W.png'},
	{name:'Blue Frame', src:'/img/frames/invocation/U.png'},
	{name:'Black Frame', src:'/img/frames/invocation/B.png'},
	{name:'Red Frame', src:'/img/frames/invocation/R.png'},
	{name:'Green Frame', src:'/img/frames/invocation/G.png'},
	{name:'Multicolored Frame', src:'/img/frames/invocation/M.png'},
	{name:'Artifact Frame', src:'/img/frames/invocation/A.png'},
	{name:'Power/Toughness', src:'/img/frames/invocation/pt.png', bounds:bounds},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'invocation';
	//art bounds
	card.artBounds = {x:0, y:0.1067, width:1, height:0.4386};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8954, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0727, y:0.05, width:0.8547, height:0.0515, oneLine:true, font:'invocation', size:0.0515},
		type: {name:'Type', text:'', x:0.0767, y:0.5672, width:0.7334, height:0.0496, oneLine:true, font:'invocation', size:0.0496, align:'center'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6334, width:0.828, height:0.2429, size:0.0334, font:'invocation-text', align:'center'},
		pt: {name:'Power/Toughness', text:'', x:0.8707, y:0.8315, width:0.0387, height:0.0929, size:0.0372, font:'belerenbsc', align:'center'}
	});
}
//loads available frames
loadFramePack();
