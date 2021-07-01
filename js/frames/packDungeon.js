//Create objects for common properties across available frames
// var masks = [{src:'/img/frames/saga/sagaMaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/saga/sagaMaskType.png', name:'Type'}, {src:'/img/frames/saga/sagaMaskFrame.png', name:'Frame'}, {src:'/img/frames/saga/sagaMaskBanner.png', name:'Banner'}, {src:'/img/frames/saga/sagaMaskBannerRight.png', name:'Banner (Right)'}, {src:'/img/frames/saga/sagaMaskText.png', name:'Text'}, {src:'/img/frames/saga/sagaMaskTextRight.png', name:'Text (Right)'}, {src:'/img/frames/saga/sagaMaskBorder.png', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/dungeon/regular/b.png', complementary:7},
	{name:'Blue Frame', src:'/img/frames/dungeon/regular/b.png', complementary:7},
	{name:'Black Frame', src:'/img/frames/dungeon/regular/b.png', complementary:7},
	{name:'Red Frame', src:'/img/frames/dungeon/regular/b.png', complementary:7},
	{name:'Green Frame', src:'/img/frames/dungeon/regular/b.png', complementary:7},
	{name:'Multicolored Frame', src:'/img/frames/dungeon/regular/b.png', complementary:7},
	{name:'Land Frame', src:'/img/frames/dungeon/regular/b.png', complementary:7},
	{name:'Floor', src:'/img/frames/dungeon/regular/floor.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'dungeon';
	card.onload = '/js/frames/versionDungeon.js';
	loadScript('/js/frames/versionDungeon.js');
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:1};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9227, y:0.8739, width:0.12, height:0.0381, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.3027, y:0.4748, width:0.3547, height:0.6767};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenbsc', size:0.0381, color:'white', align:'center'},
		room1: {name:'Ability 1', text:'', x:0.1334, y:0.2896, width:0.35, height:0.1786, size:0.0305},
	});
}
//loads available frames
loadFramePack();
