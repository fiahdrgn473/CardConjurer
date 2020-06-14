if (!loadedVersions.includes('storybookRegular')) {
	loadedVersions.push('storybookRegular')
	loadFrameImages([
		['White Frame', 'data/images/storybook/storybookFrameW.png', 0, 0, 1, 1, ['Full']],
		['Blue Frame', 'data/images/storybook/storybookFrameU.png', 0, 0, 1, 1, ['Full']],
		['Black Frame', 'data/images/storybook/storybookFrameB.png', 0, 0, 1, 1, ['Full']],
		['Red Frame', 'data/images/storybook/storybookFrameR.png', 0, 0, 1, 1, ['Full']],
		['Green Frame', 'data/images/storybook/storybookFrameG.png', 0, 0, 1, 1, ['Full']],
		['Colorless Frame', 'data/images/storybook/storybookFrameC.png', 0, 0, 1, 1, ['Full']],
		['White Power/Toughness', 'data/images/storybook/storybookPTW.png', 1114/1500, 1860/2100, 332/1500, 138/2100, ['Full']],
		['Blue Power/Toughness', 'data/images/storybook/storybookPTU.png', 1114/1500, 1860/2100, 332/1500, 138/2100, ['Full']],
		['Black Power/Toughness', 'data/images/storybook/storybookPTB.png', 1114/1500, 1860/2100, 332/1500, 138/2100, ['Full']],
		['Red Power/Toughness', 'data/images/storybook/storybookPTR.png', 1114/1500, 1860/2100, 332/1500, 138/2100, ['Full']],
		['Green Power/Toughness', 'data/images/storybook/storybookPTG.png', 1114/1500, 1860/2100, 332/1500, 138/2100, ['Full']],
		['Colorless Power/Toughness', 'data/images/storybook/storybookPTC.png', 1114/1500, 1860/2100, 332/1500, 138/2100, ['Full']]
	], 'frameClassStorybookRegular')
}

hideFrameImages('frameClassStorybookRegular')