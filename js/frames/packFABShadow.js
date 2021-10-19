//defines available frames
availableFrames = [
	{name:'Shadow Frame', src:'/img/frames/fab/talents/shadow/shadow.png', complementary:[1,4]},
	{name:'Pitch (1)', src:'/img/frames/fab/talents/1.svg'},
	{name:'Pitch (2)', src:'/img/frames/fab/talents/2.svg'},
	{name:'Pitch (3)', src:'/img/frames/fab/talents/3.svg'},
	{name:'Blanks', src:'/img/frames/fab/addons/blank.svg'},
	{name:'Spear', src:'/img/frames/fab/addons/spear.svg'},
	{name:'Shield', src:'/img/frames/fab/addons/shield.svg'}
];
// notification
notify('For Talent frames, pitch values and other icons must be placed behind card frames.', 15);
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = LoadFABVersion;
//loads available frames
loadFramePack();