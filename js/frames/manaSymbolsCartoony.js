//checks to see if it needs to run
if (!card.manaSymbols.includes('/js/frames/manaSymbolsCartoony.js')) {
	card.manaSymbols.push('/js/frames/manaSymbolsCartoony.js');
}
if (findManaSymbolIndex('cw') == -1) {
	loadManaSymbols([
		['cartoony/cw.png', 'cw', 4], ['cartoony/cu.png', 'cu', 4], ['cartoony/cb.png', 'cb', 4], ['cartoony/cr.png', 'cr', 4], ['cartoony/cg.png', 'cg', 4],
		['cartoony/c0.png', 'cc', 15], ['cartoony/c1.png', 'cc', 15], ['cartoony/c2.png', 'cc', 15], ['cartoony/c3.png', 'cc', 15], ['cartoony/c4.png', 'cc', 15],
		['cartoony/c5.png', 'cc', 15], ['cartoony/c6.png', 'cc', 15], ['cartoony/c7.png', 'cc', 15], ['cartoony/c8.png', 'cc', 15], ['cartoony/c9.png', 'cc', 15],
		['cartoony/c10.png', 'cc', 15], ['cartoony/c11.png', 'cc', 15], ['cartoony/c12.png', 'cc', 15], ['cartoony/c13.png', 'cc', 15], ['cartoony/c14.png', 'cc', 15],
		['cartoony/c15.png', 'cc', 15], ['cartoony/c16.png', 'cc', 15], ['cartoony/c17.png', 'cc', 15], ['cartoony/c18.png', 'cc', 15], ['cartoony/c19.png', 'cc', 15],
		['cartoony/cc.png', 'cc', 15], ['cartoony/ct.png', 'cdark', 1], ['cartoony/cx.png', 'cc', 15], ['cartoony/cy.png', 'cc', 15], ['cartoony/cz.png', 'cc', 15],
	]);
}