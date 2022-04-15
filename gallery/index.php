<?php
$title = 'Card Conjurer - Gallery';
$desc = 'See examples of available frames';
include('../globalHTML/header-1.php');
?>
	<h2 class='readable-background header-extension title center'>Gallery</h2>
	<div class='layer center'>
		<h3>Showcase Frames</h3>
		<h4>What they're called, and where to find them</h4>
	</div>
	<div class='layer center galleryGrid' id="galleryGrid"></div>
	<div class='layer center'></div>
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
		const templates = [
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
			return "https://raw.githubusercontent.com/ImKyle4815/cardconjurer/master/gallery/img/" + imageName;
		}
		templateSample = (name, location, image) => {
			const shell = document.createElement("div");
			shell.classList.add("galleryGridItem");
			shell.classList.add("readable-background");
			const img = document.createElement("img");
			img.src = getURL(image);
			shell.appendChild(img);
			const title = document.createElement("h4");
			title.innerHTML = name;
			shell.appendChild(title);
			const loc = document.createElement("p");
			loc.innerHTML = location;
			shell.appendChild(loc);
			return shell;
		}
		//main
		const container = document.getElementById("galleryGrid");
		for (t of templates) {
			container.appendChild(templateSample(t.name, t.location, t.image));
		}
	</script>
<?php include('../globalHTML/footer.php'); ?>