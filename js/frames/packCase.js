//Create objects for common properties across available frames
var masks = [{src:'/img/frames/class/pinline.svg', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/saga/sagaMaskType.png', name:'Type'}, {src:'/img/frames/class/frame.svg', name:'Frame'}, {src:'/img/frames/class/text.svg', name:'Text'}, {src:'/img/frames/class/textRight.png', name:'Text, Right Half'}, {src:'/img/frames/class/border.svg', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/class/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/class/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/class/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/class/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/class/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/class/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/class/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/class/l.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'case';
	//art bounds
	card.artBounds = {x:0.0753, y:0.1124, width:0.4247, height:0.7253};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9227, y:0.8739, width:0.12, height:0.0381, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5214, y:0.4748, width:0.38, height:0.6767};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0854, y:0.8481, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		case: {name:'Rules Text', text:'//{bar}//To solve — {i}(If unsolved, solve at the beginning of your end step.){/i}//{bar}//Solved — ', x:0.5093, y:356/2814, width:0.404, height:1974/2814, size:0.03445}
	});
}
//loads available frames
loadFramePack();