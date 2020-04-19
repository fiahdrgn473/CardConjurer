if (!loadedVersions.includes('storybookRegular')) {
	loadedVersions.push('storybookRegular')
	loadFrameImages([
		['White Frame', 'data/images/storybook/storybookFrameW.png', 0, 0, 1, 1, ['Full']],
		['Blue Frame', 'data/images/storybook/storybookFrameU.png', 0, 0, 1, 1, ['Full']],
		['Black Frame', 'data/images/storybook/storybookFrameB.png', 0, 0, 1, 1, ['Full']],
		['Red Frame', 'data/images/storybook/storybookFrameR.png', 0, 0, 1, 1, ['Full']],
		['Green Frame', 'data/images/storybook/storybookFrameG.png', 0, 0, 1, 1, ['Full']],
		['Colorless Frame', 'data/images/storybook/storybookFrameC.png', 0, 0, 1, 1, ['Full']]
	], 'frameClassStorybookRegular')
}

hideFrameImages('frameClassStorybookRegular')