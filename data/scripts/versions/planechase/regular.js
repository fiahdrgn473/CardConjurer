if (!loadedVersions.includes('planechaseRegular')) {
	loadedVersions.push('planechaseRegular')
	loadFrameImages([
		['Planechase Frame', '/data/images/cardImages/planechase/planechaseFrame.png', 0, 0, 1, 1, ['Full']],
		['Planechase Reference', '/data/images/cardImages/planechase/planechaseFrame - Copy.png', 0, 0, 1, 1, ['Full']]
	], 'frameClassPlanechaseRegular')
}

hideFrameImages('frameClassPlanechaseRegular')