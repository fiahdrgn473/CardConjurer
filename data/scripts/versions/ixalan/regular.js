if (!loadedVersions.includes('ixalanRegular')) {
	loadedVersions.push('ixalanRegular')
	loadFrameImages([
		['White Frame', 'data/images/ixalan/ixalanFrameW.png', 0, 0, 1, 1, ['Full']],
		['Blue Frame', 'data/images/ixalan/ixalanFrameU.png', 0, 0, 1, 1, ['Full']],
		['Black Frame', 'data/images/ixalan/ixalanFrameB.png', 0, 0, 1, 1, ['Full']],
		['Red Frame', 'data/images/ixalan/ixalanFrameR.png', 0, 0, 1, 1, ['Full']],
		['Green Frame', 'data/images/ixalan/ixalanFrameG.png', 0, 0, 1, 1, ['Full']],
		['Multicolored Frame', 'data/images/ixalan/ixalanFrameM.png', 0, 0, 1, 1, ['Full']],
		['Land Frame', 'data/images/ixalan/ixalanFrameL.png', 0, 0, 1, 1, ['Full']],
		['Artifact Icon', 'data/images/ixalan/ixalanIconArtifact.png', 90/1500, 105/2100, 100/1500, 101/2100, ['Full']],
		['Creature Icon', 'data/images/ixalan/ixalanIconCreature.png', 90/1500, 105/2100, 100/1500, 101/2100, ['Full']],
		['Enchantment Icon', 'data/images/ixalan/ixalanIconEnchantment.png', 90/1500, 105/2100, 100/1500, 101/2100, ['Full']],
		['Instant Icon', 'data/images/ixalan/ixalanIconInstant.png', 90/1500, 105/2100, 100/1500, 101/2100, ['Full']],
		['Multitype Icon', 'data/images/ixalan/ixalanIconMulti.png', 90/1500, 105/2100, 100/1500, 101/2100, ['Full']],
		['Sorcery Icon', 'data/images/ixalan/ixalanIconSorcery.png', 90/1500, 105/2100, 100/1500, 101/2100, ['Full']],
	], 'frameClassIxalanRegular')
}

hideFrameImages('frameClassIxalanRegular')