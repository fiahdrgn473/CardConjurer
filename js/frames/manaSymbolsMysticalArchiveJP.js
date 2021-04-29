//checks to see if it needs to run
if (!card.manaSymbols.includes('/js/frames/manaSymbolsOutline.js')) {
	card.manaSymbols.push('/js/frames/manaSymbolsOutline.js');
}
if (findManaSymbolIndex('majpw') == -1) {
	loadManaSymbols([
		'majp/majpw', 'majp/majpu', 'majp/majpb', 'majp/majpr', 'majp/majpg',
		'majp/majpc', 'majp/majpx', 'majp/majp0', 'majp/majp1',
		'majp/majp2', 'majp/majp3', 'majp/majp4', 'majp/majp5', 'majp/majp6',
		'majp/majp7', 'majp/majp8', 'majp/majp9'
	]);
}