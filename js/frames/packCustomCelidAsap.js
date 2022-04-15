//Create objects for common properties across available frames
var masks = []//[{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}];
// var bounds = {x:0.74, y:0.85, width:0.26, height:0.15};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/celid/asap/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/celid/asap/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/celid/asap/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/celid/asap/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/celid/asap/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/celid/asap/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/celid/asap/a.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'customCelidAsap';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.8929};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.9196, width:0.12, height:0.0362, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.37, y:0.0267, width:0.26, height:54/2100, oneLine:true, size:54/1638, align:'center', manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.06, y:0.0743, width:0.88, height:0.04, oneLine:true, font:'belerenb', size:0.04, color:'white', align:'center'},
		type: {name:'Type', text:'', x:0.07, y:0.9058, width:0.86, height:0.0286, oneLine:true, font:'belerenb', size:0.0286, color:'white', align:'center'},
		rules: {name:'Rules Text', text:'', x:0.074, y:0.672, width:0.852, height:0.2191, size:0.0362, color:'white', align:'center'},
		// pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
	//bottom info
	await loadBottomInfo({
		midLeft: {text:'{elemidinfo-set}*{elemidinfo-language}  {fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{elemidinfo-artist}', x:0.0647, y:0.9548, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
		bottomLeft: {text:'NOT FOR SALE', x:0.0647, y:0.9719, width:0.8707, height:0.0143, oneLine:true, font:'gothammedium', size:0.0143, color:'white', outlineWidth:0.003},
		wizards: {name:'wizards', text:'\u2122 & \u00a9 {elemidinfo-year} Wizards of the Coast', x:0.0647, y:0.9549, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003},
		bottomRight: {text:'CardConjurer.com', x:0.0647, y:0.972, width:0.8707, height:0.0143, oneLine:true, font:'mplantin', size:0.0143, color:'white', align:'right', outlineWidth:0.003}
	});
}
//loads available frames
loadFramePack();