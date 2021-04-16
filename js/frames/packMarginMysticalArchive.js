//Create objects for common properties across available frames
var bounds = {x:-0.044, y:-1/35, width:1.088, height:37/35};
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/mysticalArchive/margin/w.png', bounds:bounds},
	{name:'Blue Extension', src:'/img/frames/mysticalArchive/margin/u.png', bounds:bounds},
	{name:'Black Extension', src:'/img/frames/mysticalArchive/margin/b.png', bounds:bounds},
	{name:'Red Extension', src:'/img/frames/mysticalArchive/margin/r.png', bounds:bounds},
	{name:'Green Extension', src:'/img/frames/mysticalArchive/margin/g.png', bounds:bounds},
	{name:'Multicolored Extension', src:'/img/frames/mysticalArchive/margin/m.png', bounds:bounds},
	{name:'Artifact Extension', src:'/img/frames/mysticalArchive/margin/a.png', bounds:bounds},
	{name:'Land Extension', src:'/img/frames/mysticalArchive/margin/l.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();