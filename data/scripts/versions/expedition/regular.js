if (!loadedVersions.includes('expeditionRegular')) {
	loadedVersions.push('expeditionRegular')
	loadFrameImages([
		['Land Frame', 'data/images/expedition/expeditionFrameL.png', 0, 0, 1, 1, ['Full', 'Pinline (expedition)', 'Title (m15)', 'Type (expedition)', 'Frame (expedition)', 'Rules (expedition)', 'Border (m15)']],
		['White Frame', 'data/images/expedition/expeditionFrameW.png', 0, 0, 1, 1, ['Full', 'Pinline (expedition)', 'Title (m15)', 'Type (expedition)', 'Frame (expedition)', 'Rules (expedition)', 'Border (m15)']],
		['Blue Frame', 'data/images/expedition/expeditionFrameU.png', 0, 0, 1, 1, ['Full', 'Pinline (expedition)', 'Title (m15)', 'Type (expedition)', 'Frame (expedition)', 'Rules (expedition)', 'Border (m15)']],
		['Black Frame', 'data/images/expedition/expeditionFrameB.png', 0, 0, 1, 1, ['Full', 'Pinline (expedition)', 'Title (m15)', 'Type (expedition)', 'Frame (expedition)', 'Rules (expedition)', 'Border (m15)']],
		['Red Frame', 'data/images/expedition/expeditionFrameR.png', 0, 0, 1, 1, ['Full', 'Pinline (expedition)', 'Title (m15)', 'Type (expedition)', 'Frame (expedition)', 'Rules (expedition)', 'Border (m15)']],
		['Green Frame', 'data/images/expedition/expeditionFrameG.png', 0, 0, 1, 1, ['Full', 'Pinline (expedition)', 'Title (m15)', 'Type (expedition)', 'Frame (expedition)', 'Rules (expedition)', 'Border (m15)']],
		['Multicolored Frame', 'data/images/expedition/expeditionFrameM.png', 0, 0, 1, 1, ['Full', 'Pinline (expedition)', 'Title (m15)', 'Type (expedition)', 'Frame (expedition)', 'Rules (expedition)', 'Border (m15)']],
		['Artifact Frame', 'data/images/expedition/expeditionFrameA.png', 0, 0, 1, 1, ['Full', 'Pinline (expedition)', 'Title (m15)', 'Type (expedition)', 'Frame (expedition)', 'Rules (expedition)', 'Border (m15)']],
		['White Power/Toughness', 'data/images/m15/m15PTW.png', 1136/1500, 1858/2100, 282/1500, 154/2100, ['Full']],
		['Blue Power/Toughness', 'data/images/m15/m15PTU.png', 1136/1500, 1858/2100, 282/1500, 154/2100, ['Full']],
		['Black Power/Toughness', 'data/images/m15/m15PTB.png', 1136/1500, 1858/2100, 282/1500, 154/2100, ['Full']],
		['Red Power/Toughness', 'data/images/m15/m15PTR.png', 1136/1500, 1858/2100, 282/1500, 154/2100, ['Full']],
		['Green Power/Toughness', 'data/images/m15/m15PTG.png', 1136/1500, 1858/2100, 282/1500, 154/2100, ['Full']],
		['Multicolored Power/Toughness', 'data/images/m15/m15PTM.png', 1136/1500, 1858/2100, 282/1500, 154/2100, ['Full']],
		['Artifact Power/Toughness', 'data/images/m15/m15PTA.png', 1136/1500, 1858/2100, 282/1500, 154/2100, ['Full']]
	], 'frameClassExpeditionRegular')
}

hideFrameImages('frameClassExpeditionRegular')