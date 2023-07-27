//Create objects for common properties across available frames
var masks = [];
var bounds = {x:0.0307, y:0.0191, width:0.9387, height:0.092};
var innerCrownBounds = {x:244/1500, y:51/2100, width:1021/1500, height:64/2100};
//defines available frames
availableFrames = [
	{name:'White Legend Crown', src:'/img/frames/etched/regular/crowns/w.png', bounds:bounds, complementary:9},
	{name:'Blue Legend Crown', src:'/img/frames/etched/regular/crowns/u.png', bounds:bounds, complementary:9},
	{name:'Black Legend Crown', src:'/img/frames/etched/regular/crowns/b.png', bounds:bounds, complementary:9},
	{name:'Red Legend Crown', src:'/img/frames/etched/regular/crowns/r.png', bounds:bounds, complementary:9},
	{name:'Green Legend Crown', src:'/img/frames/etched/regular/crowns/g.png', bounds:bounds, complementary:9},
	{name:'Multicolored Legend Crown', src:'/img/frames/etched/regular/crowns/m.png', bounds:bounds, complementary:9},
	{name:'Artifact Legend Crown', src:'/img/frames/etched/regular/crowns/a.png', bounds:bounds, complementary:9},
	{name:'Land Crown', src:'/img/frames/etched/regular/crowns/l.png', bounds:bounds, complementary:9},
	{name:'Colorless Crown', src:'/img/frames/etched/regular/crowns/c.png', bounds:bounds, complementary:9},
	{name:'Legend Crown Cover', src:'/img/frames/etched/regular/crowns/cover.svg'},

	{name:'White Inner Crown (Nyx)', src:'/img/frames/etched/regular/innerCrowns/nyx/w.png', bounds:innerCrownBounds},
	{name:'Blue Inner Crown (Nyx)', src:'/img/frames/etched/regular/innerCrowns/nyx/u.png', bounds:innerCrownBounds},
	{name:'Black Inner Crown (Nyx)', src:'/img/frames/etched/regular/innerCrowns/nyx/b.png', bounds:innerCrownBounds},
	{name:'Red Inner Crown (Nyx)', src:'/img/frames/etched/regular/innerCrowns/nyx/r.png', bounds:innerCrownBounds},
	{name:'Green Inner Crown (Nyx)', src:'/img/frames/etched/regular/innerCrowns/nyx/g.png', bounds:innerCrownBounds},
	{name:'Multicolored Inner Crown (Nyx)', src:'/img/frames/etched/regular/innerCrowns/nyx/m.png', bounds:innerCrownBounds},
	{name:'Artifact Inner Crown (Nyx)', src:'/img/frames/etched/regular/innerCrowns/nyx/a.png', bounds:innerCrownBounds},

	{name:'White Inner Crown (Companion)', src:'/img/frames/etched/regular/innerCrowns/companion/w.png', bounds:innerCrownBounds},
	{name:'Blue Inner Crow (Companion)', src:'/img/frames/etched/regular/innerCrowns/companion/u.png', bounds:innerCrownBounds},
	{name:'Black Inner Crown (Companion)', src:'/img/frames/etched/regular/innerCrowns/companion/b.png', bounds:innerCrownBounds},
	{name:'Red Inner Crown (Companion)', src:'/img/frames/etched/regular/innerCrowns/companion/r.png', bounds:innerCrownBounds},
	{name:'Green Inner Crown (Companion)', src:'/img/frames/etched/regular/innerCrowns/companion/g.png', bounds:innerCrownBounds},
	{name:'Multicolored Inner Crown (Companion)', src:'/img/frames/etched/regular/innerCrowns/companion/m.png', bounds:innerCrownBounds},
	{name:'Artifact Inner Crown (Companion)', src:'/img/frames/etched/regular/innerCrowns/companion/a.png', bounds:innerCrownBounds},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();