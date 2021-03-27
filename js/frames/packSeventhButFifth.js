//Create objects for common properties across available frames
var masks = [{src:'/img/frames/seventh/regular/seventhMaskPinline.png', name:'Pinline'}, {src:'/img/frames/seventh/regular/seventhMaskRules.png', name:'Rules'}, {src:'/img/frames/seventh/regular/seventhMaskFrame.png', name:'Frame'}, {src:'/img/frames/seventh/regular/seventhMaskBorder.png', name:'Border'}];
var borderMask = [{src:'/img/frames/seventh/regular/seventhMaskBorder.png', name:'Border'}]
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/seventh/regular/seventhFrameW.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/seventh/regular/seventhFrameU.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/seventh/regular/seventhFrameB.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/seventh/regular/seventhFrameR.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/seventh/regular/seventhFrameG.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/seventh/regular/seventhFrameM.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/seventh/regular/seventhFrameA.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/seventh/regular/seventhFrameCL.png', masks:masks},
	{name:'White Land Frame', src:'/img/frames/seventh/regular/seventhFrameWL.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/seventh/regular/seventhFrameUL.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/seventh/regular/seventhFrameBL.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/seventh/regular/seventhFrameRL.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/seventh/regular/seventhFrameGL.png', masks:masks},
	{name:'DCI Star', src:'/img/frames/seventh/seventhFoilStamp.png', bounds:{x:0.1089, y:0.8345, width:0.4033, height:0.1107}},
	{name:'White Border', src:'/img/frames/white.png', masks:borderMask, noDefaultMask:true},
	{name:'Silver Border', src:'/img/frames/silver.png', masks:borderMask, noDefaultMask:true},
	{name:'Gold Border', src:'/img/frames/gold.png', masks:borderMask, noDefaultMask:true}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'seventh';
	//art bounds
	card.artBounds = {x:0.117, y:0.0973, width:0.7662, height:0.4466};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8914, y:0.5748, width:0.12, height:0.0381, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.18, y:0.64, width:0.64, height:0.24};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.108, y:0.0505, width:0.8147, height:72/2100, oneLine:true, size:72/1638, align:'right', manaCost:true, manaSpacing:0.0014},
		title: {name:'Title', text:'', x:0.108, y:0.0448, width:0.784, height:0.0405, oneLine:true, font:'goudymedieval', size:0.0405, color:'white', shadowX:0.0034, shadowY:0.0024},
		type: {name:'Type', text:'', x:0.1074, y:0.5486, width:0.7852, height:0.0543, oneLine:true, size:0.032, color:'white', shadowX:0.0021, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.126, y:0.6074, width:0.748, height:0.2724, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.8, y:0.8981, width:0.1367, height:0.0453, size:0.0453, oneLine:true, align:'center', color:'white', shadowX:0.0034, shadowY:0.0024}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'Illus: {elemidinfo-artist}', x:0.1, y:1883/2100, width:0.8774, height:0.0281, oneLine:true, size:0.0281, shadowX:0.0027, shadowY:0.002, color:'white'},
		wizards: {name:'wizards', text:'\u2122 & \u00a9 ' + date.getFullYear() + ' Wizards of the Coast', x:0.1, y:1942/2100, width:0.8774, height:0.0172, oneLine:true, size:0.0172, shadowX:0.0027, shadowY:0.002, color:'white'},
		bottom: {text:'NOT FOR SALE   CardConjurer.com', x:0.1, y:1980/2100, width:0.8774, height:26/2100, oneLine:true, size:26/2100, shadowX:0.0027, shadowY:0.002, color:'white'}
	});
}
//loads available frames
loadFramePack();