//Create objects for common properties across available frames
var bounds = {x:-0.044, y:-1/35, width:1.088, height:37/35};
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/unstable/margins/w.png', bounds:bounds},
	{name:'Blue Extension', src:'/img/frames/unstable/margins/u.png', bounds:bounds},
	{name:'Black Extension', src:'/img/frames/unstable/margins/b.png', bounds:bounds},
	{name:'Red Extension', src:'/img/frames/unstable/margins/r.png', bounds:bounds},
	{name:'Green Extension', src:'/img/frames/unstable/margins/g.png', bounds:bounds},
	{name:'Multicolored Extension', src:'/img/frames/unstable/margins/m.png', bounds:bounds},
	{name:'Land Extension', src:'/img/frames/unstable/margins/c.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();