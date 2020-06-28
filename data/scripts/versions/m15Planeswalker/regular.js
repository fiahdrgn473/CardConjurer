if (!loadedVersions.includes('planeswalkerRegular')) {
	loadedVersions.push('planeswalkerRegular')
	loadFrameImages([
        ['White Frame', 'data/images/planeswalker/planeswalkerFrameW.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Blue Frame', 'data/images/planeswalker/planeswalkerFrameU.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Black Frame', 'data/images/planeswalker/planeswalkerFrameB.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Red Frame', 'data/images/planeswalker/planeswalkerFrameR.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Green Frame', 'data/images/planeswalker/planeswalkerFrameG.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Multicolored Frame', 'data/images/planeswalker/planeswalkerFrameM.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Artifact Frame', 'data/images/planeswalker/planeswalkerFrameA.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Colorless Frame', 'data/images/planeswalker/planeswalkerFrameC.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Dark Twins', 'data/images/planeswalker/planeswalkerDarkTwins.png', 0, 0, 1, 1, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']],
        ['Holo Stamp', 'data/images/stamp.png', 338/744, 951/1039, 70/744, 36/1039, ['Full', 'Pinline (planeswalker)', 'Title (planeswalker)', 'Type (planeswalker)', 'Frame (planeswalker)', 'Border (planeswalker)']]
    ], 'frameClassPlaneswalkerRegular')
}

hideFrameImages('frameClassPlaneswalkerRegular')