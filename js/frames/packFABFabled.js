//defines available frames
availableFrames = [
	{name:'Fabled Action', src:'/img/frames/fab/fabled/fabled.png'},
	{name:'Red', src:'/img/frames/fab/fabled/red.svg'},
	{name:'Blue', src:'/img/frames/fab/fabled/blue.svg'},
	{name:'Yellow', src:'/img/frames/fab/fabled/yellow.svg'},
	{name:'Pitch (1)', src:'/img/frames/fab/addons/1.svg'},
	{name:'Pitch (2)', src:'/img/frames/fab/addons/2.svg'},
	{name:'Pitch (3)', src:'/img/frames/fab/addons/3.svg'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();