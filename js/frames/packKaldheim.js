//Create objects for common properties across available frames
var masks = [{src:'/img/frames/kaldheim/maskDetails.png', name:'Details'}, {src:'/img/frames/kaldheim/maskPinline.png', name:'Pinline'}, {src:'/img/frames/kaldheim/maskTitle.png', name:'Title'}, {src:'/img/frames/kaldheim/maskType.png', name:'Type'}, {src:'/img/frames/kaldheim/maskTextbox.png', name:'Rules'}, {src:'/img/frames/kaldheim/maskBorder.png', name:'Border'}, {src:'/img/frames/kaldheim/maskFrame.png', name:'Frame'}];
var masks2 = [{src:'/img/frames/kaldheim/maskPTCorners.png', name:'Corners'}, {src:'/img/frames/kaldheim/maskPTCornersRight.png', name:'Corners (right)'}];
var bounds = {x:0.7627, y:0.8853, width:0.188, height:0.0724};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/kaldheim/frameW.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/kaldheim/frameU.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/kaldheim/frameB.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/kaldheim/frameR.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/kaldheim/frameG.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/kaldheim/frameM.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/kaldheim/frameA.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/kaldheim/ptW.png', bounds:bounds, masks:masks2},
	{name:'Blue Power/Toughness', src:'/img/frames/kaldheim/ptU.png', bounds:bounds, masks:masks2},
	{name:'Black Power/Toughness', src:'/img/frames/kaldheim/ptB.png', bounds:bounds, masks:masks2},
	{name:'Red Power/Toughness', src:'/img/frames/kaldheim/ptR.png', bounds:bounds, masks:masks2},
	{name:'Green Power/Toughness', src:'/img/frames/kaldheim/ptG.png', bounds:bounds, masks:masks2},
	{name:'Multicolored Power/Toughness', src:'/img/frames/kaldheim/ptM.png', bounds:bounds, masks:masks2},
	{name:'Artifact Power/Toughness', src:'/img/frames/kaldheim/ptA.png', bounds:bounds, masks:masks2}
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
	card.setSymbolBounds = {x:0.9213, y:0.6081, width:0.12, height:0.04, vertical:'center', horizontal: 'right'};
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
		pt: {name:'Power/Toughness', text:'', x:0.7954, y:0.9029, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();