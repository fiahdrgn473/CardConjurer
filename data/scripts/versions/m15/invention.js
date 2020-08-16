if (!loadedVersions.includes('m15/invention')) {
	loadedVersions.push("m15/invention")
	loadFrameImages([
		['Invention Frame', '/data/images/cardImages/m15/invention/m15InventionFrameA.png', 0, 0, 1, 1, ['Full', 'Pinline Super (m15)', 'Title (m15)', 'Type (m15)', 'Rules (m15)', 'Frame (m15)', 'Border (m15)']],
		['Invention Power/Toughness', '/data/images/cardImages/m15/invention/inventionPT.png', 1136/1500, 1858/2100, 282/1500, 154/2100, ['Full']]
	], 'frameClassM15Invention')
}

hideFrameImages('frameClassM15Invention')