//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskFrame.png', name:'Frame'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/snow/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/snow/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/snow/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/snow/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/snow/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/snow/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/snow/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/snow/l.png', masks:masks},
	{name:'White Land Frame', src:'/img/frames/m15/snow/wl.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/m15/snow/ul.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/m15/snow/bl.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/m15/snow/rl.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/m15/snow/gl.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();