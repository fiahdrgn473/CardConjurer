<?php
$title = 'Card Conjurer - Gallery';
$desc = 'See examples of available frames';
include('../globalHTML/header-1.php');
?>
	<h2 class='readable-background header-extension title center'>Available Frames</h2>
	<h4 class='readable-background header-extension center'>What they're called, and where to find them</h4>
	<h3 class='layer center'>Showcase Frames</h3>
	<div class='layer center galleryGrid' id="showcaseGrid"></div>
	<h3 class='layer center'>Regular Frames</h3>
	<div class='layer center galleryGrid' id="regularGrid"></div>
	<h3 class='layer center'>Token Frames</h3>
	<div class='layer center galleryGrid' id="tokenGrid"></div>
	<h3 class='layer center'>Other Card Types</h3>
	<div class='layer center galleryGrid' id="otherGrid"></div>
	<style>
		.galleryGrid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
			grid-gap: 0.5rem;
			margin-bottom: 0.5rem;
			grid-gap: 2rem;
			padding-top: 0;
			align-content: start;
		}
		.galleryGridItem {
			max-width: 80vw;
			width: 20rem;
			height: auto;
			margin: auto;
			border-radius: 1rem;
			padding: 0.5rem;
		}
		.galleryGridItem > img {
			width: 100%;
			aspect-ratio: 5 / 7;
		}
		.galleryGridItem > h4 {
			padding: 0.25rem;
		}
		.galleryGridItem > p {
			padding: 0.125rem;
		}
	</style>
	<script>
		//template data
		//REGULAR FRAMES
		const regularTemplates = [
			{name: "Regular", location: "Regular > Regular Frames", image: "regular.png"},
			{name: "Lands", location: "Regular > Lands", image: "land.png"},
			{name: "Class", location: "Regular > Class (D&D)", image: "class.png"},
			{name: "Snow", location: "Regular > Snow (Kaldheim)", image: "snow.png"},
			{name: "Mutate", location: "Regular > Mutate (Ikoria)", image: "mutate.png"},
			{name: "Nyx", location: "Regular > Nyx (Theros)", image: "nyx.png"},
			{name: "Adventures", location: "Regular > Adventures (Eldraine)", image: "adventure.png"},
			{name: "Devoid", location: "Regular > Devoid (Zendikar)", image: "devoid.png"},
			{name: "Aftermath", location: "Regular > Aftermath (Amonkhet)", image: "aftermath.png"},
			{name: "Flip", location: "Regular > Flip (Kamigawa)", image: "flip.png"},
			{name: "Levelers", location: "Regular > Levelers (Zendikar)", image: "levelers.png"},
			{name: "Split", location: "Regular > Split Cards", image: "split.png"},
			{name: "Fuse", location: "Regular > Fuse Cards", image: "fuse.png"},
			{name: "Conspiracies", location: "Regular > Conspiracies (Draft Matters)", image: "conspiracy.png"},
			{name: "Colorshifted", location: "Regular > Colorshifted (Planar Chaos)", image: "colorshifted.png"},
		];
		//TOKEN FRAMES
		const tokenTemplates = [
			{name: "Regular Token", location: "Token > Regular", image: "tokenRegular.png"},
			{name: "Textless Token", location: "Token > Textless", image: "tokenTextless.png"},
			{name: "Tall Token", location: "Token > Tall", image: "tokenTall.png"},
			{name: "Day/Night Marker", location: "Token > Day/Night Marker", image: "tokenDayNight.png"},
			{name: "Jumpstart Front Cards", location: "Token > Jumpstart Front Cards", image: "tokenJumpstart.png"},
			{name: "Planeswalker Emblems", location: "Token > Planeswalker Emblems", image: "emblem.png"},
			{name: "Regular Token (Old)", location: "Token > Regular Token (Bordered M15)", image: "tokenOldRegular.png"},
			{name: "Textless Token (Old)", location: "Token > Textless Token (Bordered M15)", image: "tokenOldTextless.png"},
			{name: "Original Token", location: "Token > Original (Old Bordered)", image: "tokenOriginal.png"},
			{name: "Unglued Token", location: "Token > Unglued", image: "tokenUnglued.png"},
		];
		//OTHER FRAMES
		const otherTemplates = [
			// {name: "TEMPLATENAME", location: "Token > DISPLAYNAME", image: "IMAGENAME.png"},
		];
		//SHOWCASE FRAMES
		const showcaseTemplates = [
			{name: "Gilded (SNC)", location: "Showcase Frames > Gilded (SNC)", image: "sncGilded.png"},
			{name: "Ninja (NEO)", location: "Showcase Frames > Ninja (NEO)", image: "neoNinja.png"},
			{name: "Samurai (NEO)", location: "Showcase Frames > Samurai (NEO)", image: "neoSamurai.png"},
			{name: "Neon (NEO)", location: "Showcase Frames > Neon (NEO)", image: "neoNeon.png"},
			{name: "Fang (VOW)", location: "Showcase Frames > Fang (VOW)", image: "vowFang.png"},
			{name: "Equinox (Mid)", location: "Showcase Frames > Equinox (Mid)", image: "midEquinox.png"},
			{name: "Eternal Night (Mid)", location: "Showcase Frames > Eternal Night (Mid)", image: "midEternalNight.png"},
			{name: "D&D Sourcebook (AFR)", location: "Showcase Frames > D&D Sourcebook (AFR)", image: "afrSourcebook.png"},
			{name: "D&D Module (AFR)", location: "Showcase Frames > D&D Module (AFR)", image: "afrModule.png"},
			{name: "Sketch Cards (MH2)", location: "Showcase Frames > Sketch Cards (MH2)", image: "mh2Sketch.png"},
			{name: "Mystical Archive (STA)", location: "Showcase Frames > Mystical Archive (STA)", image: "staMysticalArchive.png"},
			{name: "Japanese Mystical Archive (STA)", location: "Showcase Frames > Japanese Mystical Archive (STA)", image: "staMysticalArchiveJP.png"},
			{name: "Horizontal Japanese Mystical Archive (STA)", location: "Showcase Frames > Horizontal Japanese Mystical Archive (STA)", image: "staMysticalArchiveJPHorizontal.png"},
			{name: "Phyrexian (KHM)", location: "Showcase Frames > Praetors (KHM)", image: "khmPraetors.png"},
			{name: "Viking (KHM)", location: "Showcase Frames > Kaldheim (KHM)", image: "khm.png"},
			{name: "Nonlegendary Viking (KHM)", location: "Showcase Frames > Nonlegendary Kaldheim (KHM)", image: "khmNonlegendary.png"},
			{name: "Etched Foils (CMR)", location: "Showcase Frames > Commander Legends (CMR)", image: "cmrEtched.png"},
			{name: "Basri Ket (M21)", location: "Showcase Frames > M21 Signature Spellbooks (M21)", image: "m21BasriKet.png"},
			{name: "Teferi (M21)", location: "Showcase Frames > M21 Signature Spellbooks (M21)", image: "m21Teferi.png"},
			{name: "Liliana (M21)", location: "Showcase Frames > M21 Signature Spellbooks (M21)", image: "m21Liliana.png"},
			{name: "Chandra (M21)", location: "Showcase Frames > M21 Signature Spellbooks (M21)", image: "m21Chandra.png"},
			{name: "Garruk (M21)", location: "Showcase Frames > M21 Signature Spellbooks (M21)", image: "m21Garruk.png"},
			{name: "Nyxtouched (THB)", location: "Showcase Frames > Theros Beyond Death (THB)", image: "thb.png"},
			{name: "Storybooks (ELD)", location: "Showcase Frames > Eldraine Storybooks (ELD)", image: "eld.png"},
			{name: "Borderless", location: "Showcase Frames > Borderless", image: "borderless.png"},
			{name: "Fullart", location: "Showcase Frames > Fullart", image: "fullart.png"},
			{name: "Nickname", location: "Showcase Frames > Nickname (\"Godzilla\")", image: "ikoNickname.png"},
			{name: "Extended Art", location: "Showcase Frames > Extended Art (Regular)", image: "extended.png"},
			{name: "FNM Inverted Promo", location: "Showcase Frames > FNM Promo (Inverted Promos)", image: "inverted.png"},
			{name: "Universes Beyond", location: "Showcase Frames > Universes Beyond", image: "universesBeyond.png"},
			{name: "Full Text", location: "Showcase Frames > Full Text", image: "fullText.png"},
			{name: "Etched", location: "Showcase Frames > Etched (Commander Precons)", image: "etched.png"},
			{name: "Expeditions (ZNR)", location: "Showcase Frames > ZNR Expeditions (2020)", image: "znrExpedition.png"},
			{name: "Jace", location: "Showcase Frames > Signature Spellbook (Jace/Gideon)", image: "jace.png"},
			{name: "Gideon", location: "Showcase Frames > Signature Spellbook (Jace/Gideon)", image: "gideon.png"},
			{name: "Gideon (Artifact)", location: "Showcase Frames > Signature Spellbook (Jace/Gideon)", image: "gideonArtifact.png"},
			{name: "Ixalan Maps (XLN)", location: "Showcase Frames > Ixalan Maps", image: "xlnMap.png"},
			{name: "Invocations (AKH)", location: "Showcase Frames > Amonkhet Invocations (u/Smyris)", image: "akhInvocation.png"},
			{name: "Expeditions (BFZ)", location: "Showcase Frames > BFZ Expeditions (2015)", image: "bfzExpedition.png"},
			{name: "Future Shifted (FUT)", location: "Showcase Frames > Future Shifted", image: "futFutureshifted.png"},
			{name: "Brawl Legend Crowns", location: "Showcase Frames > Brawl Legend Crowns", image: "brawlCrown.png"},
		];
		//functions
		getURL = (imageName) => {
			return "img/" + imageName;
			return "https://raw.githubusercontent.com/ImKyle4815/cardconjurer/master/gallery/img/" + imageName;
		}
		templateSample = (name, location, image) => {
			const shell = document.createElement("div");
			shell.classList.add("galleryGridItem");
			shell.classList.add("readable-background");
			const img = document.createElement("img");
			img.src = getURL("loading.jpg");
			shell.appendChild(img);
			const actualImage = new Image();
			actualImage.onload = () => {
				img.src = getURL(image);
			}
			actualImage.src = getURL(image);
			const title = document.createElement("h4");
			title.innerHTML = name;
			shell.appendChild(title);
			const loc = document.createElement("p");
			loc.innerHTML = location;
			shell.appendChild(loc);
			return shell;
		}
		populateGroup = (elementID, templates) => {
			const elem = document.getElementById(elementID);
			for (t of templates) {
				elem.appendChild(templateSample(t.name, t.location, t.image));
			}
		}
		//Populate everything
		populateGroup("regularGrid", regularTemplates);
		populateGroup("showcaseGrid", showcaseTemplates);
		populateGroup("tokenGrid", tokenTemplates);
		populateGroup("otherGrid", otherTemplates);
	</script>
<?php include('../globalHTML/footer.php'); ?>