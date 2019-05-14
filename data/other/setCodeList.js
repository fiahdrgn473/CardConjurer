/*
This is a list of set codes.
It has all been typed manually, so there are possibly errors, but let's hope not!
Duplicates found and removed: ORI, W17, CED
Sets not found: Astral, Deckmasters, Duels of the Planeswalkers
The codes have been resourced from the following:
https://en.wikipedia.org/wiki/List_of_Magic:_The_Gathering_sets
Last updated: 5-13-19
Last set added: WAR
*/
//Common through Rare
var setCodeListPreMythic = ['1E', '2E', '2U', '3E', '4E', '5E', '6E', '7E', '8ED', '9ED', '10E', 'AN', 
'AQ', 'LE', 'DK', 'FE', 'HM', 'IA', 'AL', 'MI', 'VI', 'WL', 'TE', 'ST', 'EX', 'UZ', 'GU', 'AP', 'OD', 
'TOR', 'JUD', 'ONS', 'LGN', 'SCG', 'MRD', 'DST', '5DN', 'CHK', 'BOK', 'SOK', 'RAV', 'GPT', 'DIS', 'CSP', 
'TSP', 'PLC', 'FUT', 'LRW', 'MOR', 'SHM', 'EVE', 'PO', 'P2', 'PK', 'P3', 'P4', 'CH', 'BR', 'BD', 'EVG', 
'UG', 'UNH', 'MED', 'ME2', 'ME3', 'ME4']
//Common through Mythic
var setCodeListPostMythic = ['M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'ORI', 'M19', 'ALA', 'CON', 
'ARB', 'ZEN', 'WWK', 'ROE', 'SOM', 'MBS', 'NPH', 'ISD', 'DKA', 'AVR', 'RTR', 'GTC', 'DGM', 'THS', 'BNG', 
'JOU', 'KTK', 'FRF', 'DTK', 'BFZ', 'OGW', 'SOI', 'EMN', 'KLD', 'AER', 'AKH', 'HOU', 'XLN', 'RIX', 'DOM', 
'GRN', 'RNA', /*'MH1',*/ 'GS1', 'MD1', 'DD2', 'DDC', 'DDD', 'DDE', 'DDF', 'DDG', 'DDH', 'DDI', 'DDJ', 'DDK', 
'DDL', 'DDM', 'DDN', 'DDP', 'DDQ', 'DDR', 'DDS', 'DDT', 'DDU', 'SS1', 'H09', 'PD2', 'PD3', 'MMA', 'MM2', 
'EMA', 'MM3', 'IMA', 'A25', 'UMA', 'HOP', 'PC2', 'PCA', 'ARC', 'E01', 'CMD', 'CM1', 'C13', 'C14', 'C15', 
'C16', 'CMA', 'C17', 'CM2', 'C18', 'CNS', 'CN2', 'E02', 'BBD', 'UST', 'VMA', 'TPR', 'W16', 'W17', 
'GK1_IZZET', 'GK1_SELESN', 'GK1_BOROS', 'GK1_GOLGAR', 'GK2_RAKDOS', 'GK2_AZORIU', 'GK2_SIMIC', 
'GK2_GRUUL', 'GK2_ORZHOV', 'WAR']
//Only Rare
var setCodeListRareOnly = ['DRB']
//Only Mythic
var setCodeListMythicOnly = ['V09', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17', 'EXP', 'MPS_GRN']
//Only Special
var setCodeListSpecialOnly = ['MPS_KLD', 'MPS_AKH']

randomSet()
function randomSet() {
	var totalSetCount = setCodeListPreMythic.length + setCodeListPostMythic.length + setCodeListMythicOnly.length + setCodeListSpecialOnly.length
	var randomSet = Math.floor(Math.random() * totalSetCount)
	var possibleRarities, rarity, set
	if (randomSet < setCodeListPreMythic.length) {
		set = setCodeListPreMythic[randomSet]
		possibleRarities = 3
	} else {
		randomSet -= setCodeListPreMythic.length
		if (randomSet < setCodeListPostMythic.length) {
			set = setCodeListPostMythic[randomSet]
			possibleRarities = 4
		} else {
			randomSet -= setCodeListPostMythic.length
			if (randomSet < setCodeListRareOnly.length) {
				set = setCodeListRareOnly[randomSet]
				possibleRarities = 7
			} else {
				randomSet -= setCodeListRareOnly.length
				if (randomSet < setCodeListMythicOnly.length) {
					set = setCodeListMythicOnly[randomSet]
					possibleRarities = 8
				} else {
					randomSet -= setCodeListMythicOnly.length
					set = setCodeListSpecialOnly[randomSet]
					possibleRarities = 9
				}
			}
			
		}
	}
	if (possibleRarities == 7) {
		rarity = "R"
	} else if (possibleRarities == 8) {
		rarity = "M"
	} else if (possibleRarities == 9) {
		rarity = "S"
	} else {
		switch(Math.floor(Math.random() * possibleRarities)) {
			case 3:
				rarity = "M"
				break
			case 2:
				rarity = "R"
				break
			case 1:
				rarity = "U"
				break
			default:
				rarity = "C"
		}
	}
	document.getElementById("inputSetSymbolCode").value = set
	document.getElementById("inputSetSymbolRarity").value = rarity
	imageURL("http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + set + "&size=large&rarity=" + rarity, imgSetSymbol, "needsCrop")
}