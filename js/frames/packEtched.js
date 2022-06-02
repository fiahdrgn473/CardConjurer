//Create objects for common properties across available frames
var masks = [{src:'/img/frames/etched/legends/frame.svg', name:'Frame'}, {src:'/img/frames/etched/legends/title.svg', name:'Title'}, {src:'/img/frames/etched/legends/type.svg', name:'Type'}, {src:'/img/frames/etched/legends/rules.svg', name:'Rules'}, {src:'/img/frames/etched/legends/border.svg', name:'Border'}];
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
var bounds2 = {x:0.42, y:0.9062, width:0.16, height:0.0453};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/etched/legends/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/etched/legends/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/etched/legends/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/etched/legends/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/etched/legends/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/etched/legends/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/etched/legends/a.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/m15/commanderLegends/ptW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/commanderLegends/ptU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/commanderLegends/ptB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/commanderLegends/ptR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/commanderLegends/ptG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/commanderLegends/ptM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/commanderLegends/ptA.png', bounds:bounds},
	{name:'White Holo Stamp', src:'/img/frames/etched/legends/holo/w.png', bounds:bounds2},
	{name:'Blue Holo Stamp', src:'/img/frames/etched/legends/holo/u.png', bounds:bounds2},
	{name:'Black Holo Stamp', src:'/img/frames/etched/legends/holo/b.png', bounds:bounds2},
	{name:'Red Holo Stamp', src:'/img/frames/etched/legends/holo/r.png', bounds:bounds2},
	{name:'Green Holo Stamp', src:'/img/frames/etched/legends/holo/g.png', bounds:bounds2},
	{name:'Multicolored Holo Stamp', src:'/img/frames/etched/legends/holo/m.png', bounds:bounds2},
	{name:'Artifact Holo Stamp', src:'/img/frames/etched/legends/holo/a.png', bounds:bounds2},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'etched';
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
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.0927, y:0.6303, width:0.8147, height:0.2875, size:0.0362, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();