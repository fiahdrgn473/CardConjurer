//checks to see if it needs to run
if (!card.manaSymbols.includes('/js/frames/manaSymbolsPokemon.js')) {
	card.manaSymbols.push('/js/frames/manaSymbolsPokemon.js');
}
if (!mana.get('pokemonw')) {
	loadManaSymbols([
		'pokemon/pokemonw.png',
		'pokemon/pokemonu.png',
		'pokemon/pokemonb.png',
		'pokemon/pokemonr.png',
		'pokemon/pokemong.png',
		'pokemon/pokemonc.png',
		'pokemon/pokemont.png',
		'pokemon/pokemon0.png',
		'pokemon/pokemon1.png',
		'pokemon/pokemon2.png',
		'pokemon/pokemon3.png',
		'pokemon/pokemon4.png',
		'pokemon/pokemon5.png',
		'pokemon/pokemon6.png',
		'pokemon/pokemon7.png',
		'pokemon/pokemon8.png',
		'pokemon/pokemon9.png',
		'pokemon/pokemon10.png',
		'pokemon/pokemon11.png',
		'pokemon/pokemon12.png',
		'pokemon/pokemon13.png',
		'pokemon/pokemon14.png',
		'pokemon/pokemon15.png',
		'pokemon/pokemon16.png',
		'pokemon/pokemon17.png',
		'pokemon/pokemon18.png',
		'pokemon/pokemon19.png',
		'pokemon/pokemon20.png',
	]);
}