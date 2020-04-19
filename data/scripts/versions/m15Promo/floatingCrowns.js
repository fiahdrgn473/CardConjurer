if (!loadedVersions.includes('m15PromoFloatingCrown')) {
	loadedVersions.push("m15PromoFloatingCrown")
	loadFrameImages([
		['White Floating Legend Crown', 'data/images/m15/m15CrownFloatingW.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
		['Blue Floating Legend Crown', 'data/images/m15/m15CrownFloatingU.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
		['Black Floating Legend Crown', 'data/images/m15/m15CrownFloatingB.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
		['Red Floating Legend Crown', 'data/images/m15/m15CrownFloatingR.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
		['Green Floating Legend Crown', 'data/images/m15/m15CrownFloatingG.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
		['Multicolored Floating Legend Crown', 'data/images/m15/m15CrownFloatingM.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
		['Artifact Floating Legend Crown', 'data/images/m15/m15CrownFloatingA.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']],
		['Land Floating Legend Crown', 'data/images/m15/m15CrownFloatingA.png', 46/1500, 40/2100, 1408/1500, 215/2100, ['Full']]
	], 'frameClassM15PromoFloatingCrowns')
}

hideFrameImages('frameClassM15PromoFloatingCrowns')