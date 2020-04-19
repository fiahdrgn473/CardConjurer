if (!loadedVersions.includes('futureRegular')) {
	loadedVersions.push('futureRegular')
	loadFrameImages([
		['White Frame', 'data/images/future/futureFrameW.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['Blue Frame', 'data/images/future/futureFrameU.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['Black Frame', 'data/images/future/futureFrameB.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['Red Frame', 'data/images/future/futureFrameR.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['Green Frame', 'data/images/future/futureFrameG.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['Multicolored Frame', 'data/images/future/futureFrameM.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['Artifact Frame', 'data/images/future/futureFrameA.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['Clear Frame', 'data/images/future/futureFrameC.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['Land Frame', 'data/images/future/futureFrameL.png', 0, 0, 1, 1, ['Full', 'Border (future)']],
		['White Power/Toughness', 'data/images/future/futurePTW.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['Blue Power/Toughness', 'data/images/future/futurePTU.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['Black Power/Toughness', 'data/images/future/futurePTB.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['Red Power/Toughness', 'data/images/future/futurePTR.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['Green Power/Toughness', 'data/images/future/futurePTG.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['Multicolored Power/Toughness', 'data/images/future/futurePTM.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['Artifact Power/Toughness', 'data/images/future/futurePTA.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['Clear Power/Toughness', 'data/images/future/futurePTC.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['Land Power/Toughness', 'data/images/future/futurePTL.png', 567/744, 918/1039, 129/744, 81/1039, ['Full']],
		['White Icon', 'data/images/future/futureWhite.png', 49/744, 49/1039, 32/744, 32/1039, ['Artifact Icon (future)', 'Creature Icon (future)', 'Enchantment Icon (future)', 'Instant Icon (future)', 'Land Icon (future)', 'Multitype Icon (future)', 'Sorcery Icon (future)']],
		['Gray Icon', 'data/images/future/futureGray.png', 49/744, 49/1039, 32/744, 32/1039, ['Artifact Icon (future)', 'Creature Icon (future)', 'Enchantment Icon (future)', 'Instant Icon (future)', 'Land Icon (future)', 'Multitype Icon (future)', 'Sorcery Icon (future)']]
	], 'frameClassFutureRegular')
}

hideFrameImages('frameClassFutureRegular')