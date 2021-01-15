//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/ciPips/firstHalf.svg', name:'First Half'}, {src:'/img/frames/m15/ciPips/secondHalf.svg', name:'Second Half'}, {src:'/img/frames/m15/ciPips/firstThird.svg', name:'First Third'}, {src:'/img/frames/m15/ciPips/secondThird.svg', name:'Second Third'}, {src:'/img/frames/m15/ciPips/thirdThird.svg', name:'Third Third'}];
//defines available frames
availableFrames = [
	{name:'Color Identity Pip Base', src:'/img/frames/m15/ciPips/base.png', bounds:{x:0.0767, y:0.5748, width:0.0467, height:0.0334}},
	{name:'White Pip', src:'/img/frames/m15/ciPips/w.svg', masks:masks},
	{name:'Blue Pip', src:'/img/frames/m15/ciPips/u.svg', masks:masks},
	{name:'Black Pip', src:'/img/frames/m15/ciPips/b.svg', masks:masks},
	{name:'Red Pip', src:'/img/frames/m15/ciPips/r.svg', masks:masks},
	{name:'Green Pip', src:'/img/frames/m15/ciPips/g.svg', masks:masks},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();