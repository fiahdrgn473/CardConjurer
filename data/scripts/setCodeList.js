/*
This is a list of set codes.
It has all been typed manually, so there are possibly errors, but let's hope not!
Duplicates found and removed: ORI, W17, CED
Sets not found: Astral, Deckmasters, Duels of the Planeswalkers
The codes have been resourced from the following:
https://en.wikipedia.org/wiki/List_of_Magic:_The_Gathering_sets
and
https://magic.wizards.com/en/products/card-set-archive
Last updated: 9-8-19
Last set added: C19
*/
//Common through Rare
var setCodeListPreMythic = ['1E', '2E', '2U', '3E', '4E', '5E', '6E', '7E', '8ED', '9ED', '10E', 'AN', 
'AQ', 'LE', 'DK', 'FE', 'HM', 'IA', 'AL', 'MI', 'VI', 'WL', 'TE', 'ST', 'EX', 'UZ', 'GU', 'AP', 'OD', 
'TOR', 'JUD', 'ONS', 'LGN', 'SCG', 'MRD', 'DST', '5DN', 'CHK', 'BOK', 'SOK', 'RAV', 'GPT', 'DIS', 'CSP', 
'TSP', 'PLC', 'FUT', 'LRW', 'MOR', 'SHM', 'EVE', 'PO', 'P2', 'PK', 'P3', 'P4', 'CH', 'BR', 'BD', 'EVG', 
'UG', 'UNH', 'MED', 'ME2', 'ME3', 'ME4', 'HOP']
//Common through Mythic
var setCodeListPostMythic = ['M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'ORI', 'M19', 'ALA', 'CON', 
'ARB', 'ZEN', 'WWK', 'ROE', 'SOM', 'MBS', 'NPH', 'ISD', 'DKA', 'AVR', 'RTR', 'GTC', 'DGM', 'THS', 'BNG', 
'JOU', 'KTK', 'FRF', 'DTK', 'BFZ', 'OGW', 'SOI', 'EMN', 'KLD', 'AER', 'AKH', 'HOU', 'XLN', 'RIX', 'DOM', 
'GRN', 'RNA', 'MH1', 'GS1', 'MD1', 'DD2', 'DDC', 'DDD', 'DDE', 'DDF', 'DDG', 'DDH', 'DDI', 'DDJ', 'DDK', 
'DDL', 'DDM', 'DDN', 'DDP', 'DDQ', 'DDR', 'DDS', 'DDT', 'DDU', 'SS1', 'H09', 'PD2', 'PD3', 'MMA', 'MM2', 
'EMA', 'MM3', 'IMA', 'A25', 'UMA', 'PC2', 'PCA', 'ARC', 'E01', 'CMD', 'CM1', 'C13', 'C14', 'C15', 
'C16', 'CMA', 'C17', 'CM2', 'C18', 'CNS', 'CN2', 'E02', 'BBD', 'UST', 'VMA', 'TPR', 'W16', 'W17', 
'GK1_IZZET', 'GK1_SELESN', 'GK1_BOROS', 'GK1_GOLGAR', 'GK2_RAKDOS', 'GK2_AZORIU', 'GK2_SIMIC', 
'GK2_GRUUL', 'GK2_ORZHOV', 'WAR', 'M20', 'C19']
//Only Rare
var setCodeListRareOnly = ['DRB']
//Only Mythic
var setCodeListMythicOnly = ['V09', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17', 'EXP', 'MPS_GRN']
//Only Special
var setCodeListSpecialOnly = ['MPS_KLD', 'MPS_AKH']
//Only Rare / Mythic
var setCodeListRareMythicOnly = ['SS2']

randomSet(false)
function randomSet(updateHTML = true) {
	var totalSetCount = setCodeListPreMythic.length + setCodeListPostMythic.length + setCodeListRareOnly.length + setCodeListMythicOnly.length + setCodeListSpecialOnly.length + setCodeListRareMythicOnly.length
	var setIndex = Math.floor(Math.random() * (totalSetCount - 1))
	var possibleRarities, rarity, set
	if (setIndex < setCodeListPreMythic.length) {
		set = setCodeListPreMythic[setIndex]
		possibleRarities = ["C", "U", "R"]
	} else {
		setIndex -= setCodeListPreMythic.length
		if (setIndex < setCodeListPostMythic.length) {
			set = setCodeListPostMythic[setIndex]
			possibleRarities = ["C", "U", "R", "M"]
		} else {
			setIndex -= setCodeListPostMythic.length
			if (setIndex < setCodeListRareOnly.length) {
				set = setCodeListRareOnly[setIndex]
				possibleRarities = ["R"]
			} else {
				setIndex -= setCodeListRareOnly.length
				if (setIndex < setCodeListMythicOnly.length) {
					set = setCodeListMythicOnly[setIndex]
					possibleRarities = ["M"]
				} else {
					setIndex -= setCodeListMythicOnly.length
					if (setIndex < setCodeListSpecialOnly.length) {
						set = setCodeListSpecialOnly[setIndex]
						possibleRarities = ["S"]
					} else {
						setIndex -= setCodeListSpecialOnly.length
						if (setIndex < setCodeListRareMythicOnly.length) {
							set = setCodeListRareMythicOnly[setIndex]
							possibleRarities = ["M", "R"]
						} else {
							return
						}
					}
				}
			}
		}
	}
	var findingRarity = true 
	while (findingRarity) {
		switch(Math.floor(Math.random() * 5)) {
			case 4:
				rarity = "S"
				break
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
		if (possibleRarities.includes(rarity)) {
			findingRarity = false
		}
	}
	if (updateHTML) {
		document.getElementById("inputSetCode").value = set
		document.getElementById("inputSetRarity").value = rarity
	}
	setSymbol.src = "https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + set + "&size=large&rarity=" + rarity
}
