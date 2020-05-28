if (!loadedVersions.includes('seventhTextlessRegular')) {
	loadedVersions.push('seventhTextlessRegular')
	loadFrameImages([
		['Red Frame', 'data/images/seventhTextless/seventhTextlessFrameR.png', 0, 0, 1, 1, ['Full']],
		['Foil Stamp', 'data/images/seventh/seventhFoilStamp.png', 81/744, 867/1039, 300/744, 115/1039, ['Full']]
	], 'frameClassSeventhTextlessRegular')
}

hideFrameImages('frameClassSeventhTextlessRegular')