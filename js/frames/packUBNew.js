//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/regular/new/pinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/new/title.png', name:'Title'}, {src:'/img/frames/m15/regular/new/type.png', name:'Type'}, {src:'/img/frames/m15/regular/new/rules.png', name:'Rules'}, {src:'/img/frames/m15/regular/new/frame.png', name:'Frame'}, {src:'/img/frames/m15/regular/new/border.png', name:'Border'}];
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
var bounds2 = {x:0.4254, y:0.9005, width:0.1494, height:0.0486};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/regular/new/ub/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/regular/new/ub/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/regular/new/ub/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/regular/new/ub/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/regular/new/ub/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/regular/new/ub/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/regular/new/ub/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/regular/new/ub/l.png', masks:masks},
	{name:'Vehicle Frame', src:'/img/frames/m15/regular/new/ub/v.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/m15/regular/new/ub/c.png', masks:masks},

	{name:'White Land Frame', src:'/img/frames/m15/regular/new/ub/lw.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/m15/regular/new/ub/lu.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/m15/regular/new/ub/lb.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/m15/regular/new/ub/lr.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/m15/regular/new/ub/lg.png', masks:masks},
	{name:'Multicolored Land Frame', src:'/img/frames/m15/regular/new/ub/lm.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/ub/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/ub/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/ub/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/ub/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/ub/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/ub/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/ub/pt/a.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/ub/pt/c.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/ub/pt/v.png', bounds:bounds},

	{name:'White Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/w.png', bounds:bounds2},
	{name:'Blue Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/u.png', bounds:bounds2},
	{name:'Black Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/b.png', bounds:bounds2},
	{name:'Red Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/r.png', bounds:bounds2},
	{name:'Green Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/g.png', bounds:bounds2},
	{name:'Multicolored Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/m.png', bounds:bounds2},
	{name:'Artifact Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/a.png', bounds:bounds2},
	{name:'Land Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/l.png', bounds:bounds2},
	{name:'Gray Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/gray.png', bounds:bounds2},
	{name:'Gold Holo Stamp', src:'/img/frames/m15/ub/regular/stamp/gold.png', bounds:bounds2}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'ubRegular';
	//art bounds
	card.artBounds = {x:0.0767, y:0.1129, width:0.8476, height:0.4429};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1862/2010, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:176/2814, width:1864/2010, height:71/2100, oneLine:true, size:70.5/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:168/2010, y:145/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:168/2010, y:1588/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.086, y:1780/2814, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();