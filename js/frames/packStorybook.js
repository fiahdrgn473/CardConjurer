//Create objects for common properties across available frames
var bounds = {x:0.7427, y:0.8858, width:0.2213, height:0.0658};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/storybook/storybookFrameW.png'},
	{name:'Blue Frame', src:'/img/frames/storybook/storybookFrameU.png'},
	{name:'Black Frame', src:'/img/frames/storybook/storybookFrameB.png'},
	{name:'Red Frame', src:'/img/frames/storybook/storybookFrameR.png'},
	{name:'Green Frame', src:'/img/frames/storybook/storybookFrameG.png'},
	{name:'Colorless Frame', src:'/img/frames/storybook/storybookFrameC.png'},
	{name:'White Power/Toughness', src:'/img/frames/storybook/storybookPTW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/storybook/storybookPTU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/storybook/storybookPTB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/storybook/storybookPTR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/storybook/storybookPTG.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/storybook/storybookPTC.png', bounds:bounds},
	{name:'Holo Stamp', src:'/img/frames/storybook/holo.png', bounds:{x:0.4507, y:0.9129, width:0.0987, height:0.0386}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'storybook';
	//art bounds
	card.artBounds = {x:0.0334, y:0.0258, width:0.9367, height:0.5596};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8854, y:0.5929, width:0.0494, height:0.0353, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.72, y:0.7681, width:0.3867, height:0.2358};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.1454, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.2134, y:0.5667, width:0.5732, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, align:'center'},
		rules: {name:'Rules Text', text:'', x:0.0854, y:0.7358, width:0.3947, height:0.15, size:0.0353},
		rules2: {name:'Rules Text (Right)', text:'', x:0.5267, y:0.65, width:0.3867, height:0.2358, size:0.0353},
		pt: {name:'Power/Toughness', text:'', x:0.7934, y:0.9029, width:0.14, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'},
		mana2: {name:'Adventure Mana Cost', text:'', x:0.0814, y:0.6391, width:0.4, height:60/2100, oneLine:true, size:60/1638, color:'white', shadowX:-0.001, shadowY:0.0029, align:'right', manaCost:true},
		title2: {name:'Adventure Title', text:'', x:0.0814, y:0.6391, width:0.4, height:0.0296, size:0.0296, color:'white', shadowX:0.0014, shadowY:0.001, oneLine:true, font:'belerenb'},
		type2: {name:'Adventure Type', text:'', x:0.0814, y:0.6839, width:0.4, height:0.0296, size:0.0296, color:'white', shadowX:0.0014, shadowY:0.001, oneLine:true, font:'belerenb'},
	});
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	document.querySelector('#loadFrameVersion').click();
}