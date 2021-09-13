//defines available frames
availableFrames = [
	{name:'Aria', src:'/img/frames/fab/regions/aria.png', complementary:[3,6]},
	{name:'Demonastery', src:'/img/frames/fab/regions/demonastery.png', complementary:[3,6]},
	{name:'Savage Lands', src:'/img/frames/fab/regions/savageLands.png', complementary:[3,6]},
	{name:'Pitch (1)', src:'/img/frames/fab/regions/1.svg'},
	{name:'Pitch (2)', src:'/img/frames/fab/regions/2.svg'},
	{name:'Pitch (3)', src:'/img/frames/fab/regions/3.svg'},
	{name:'Blanks', src:'/img/frames/fab/addons/blank.svg'},
	{name:'Spear', src:'/img/frames/fab/addons/spear.svg'},
	{name:'Shield', src:'/img/frames/fab/addons/shield.svg'}
];
// notification
notify('For Region frames, pitch values and other icons must be placed behind card frames.', 15);
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = LoadFABVersion;
//loads available frames
loadFramePack();