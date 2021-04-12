//Create objects for common properties across available frames
var bounds = {x:0.0234, y:0.0167, width:0.952, height:0.1286};
//defines available frames
availableFrames = [
	{name:'Legend Crown Cutout', src:'/img/frames/modal/crowns/cutout.svg', erase:true},
	{name:'White Legend Crown', src:'/img/frames/modal/crowns/nickname/w.png', bounds:bounds},
	{name:'Blue Legend Crown', src:'/img/frames/modal/crowns/nickname/u.png', bounds:bounds},
	{name:'Black Legend Crown', src:'/img/frames/modal/crowns/nickname/b.png', bounds:bounds},
	{name:'Red Legend Crown', src:'/img/frames/modal/crowns/nickname/r.png', bounds:bounds},
	{name:'Green Legend Crown', src:'/img/frames/modal/crowns/nickname/g.png', bounds:bounds},
	{name:'Multicolored Legend Crown', src:'/img/frames/modal/crowns/nickname/m.png', bounds:bounds},
	{name:'Artifact Legend Crown', src:'/img/frames/modal/crowns/nickname/a.png', bounds:bounds},
	{name:'Land Legend Crown', src:'/img/frames/modal/crowns/nickname/l.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();