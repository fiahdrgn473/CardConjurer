<?php
$title = 'Card Conjurer - Creator';
$desc = 'Create custom Magic: The Gathering cards on any web-enabled device. Make creatures, tokens, planeswalkers, and more in showcase frames and high resolutions';
include('../globalHTML/header-1.php');
?>
	<link rel="preload" href="/fonts/beleren-b.ttf" as="font" type="font/ttf" crossorigin="anonymous" as='font'>
	<link rel="preload" href="/fonts/beleren-bsc.ttf" as="font" type="font/ttf" crossorigin="anonymous" as='font'>
	<link rel="preload" href="/fonts/gotham-medium.ttf" as="font" type="font/ttf" crossorigin="anonymous" as='font'>
	<link rel="preload" href="/fonts/goudy-medieval.ttf" as="font" type="font/ttf" crossorigin="anonymous" as='font'>
	<link rel="preload" href="/fonts/matrix.ttf" as="font" type="font/ttf" crossorigin="anonymous" as='font'>
	<link rel="preload" href="/fonts/matrix-b.ttf" as="font" type="font/ttf" crossorigin="anonymous" as='font'>
	<link rel="preload" href="/fonts/mplantin.ttf" as="font" type="font/ttf" crossorigin="anonymous" as='font'>
	<link rel="preload" href="/fonts/mplantin-i.ttf" as="font" type="font/ttf" crossorigin="anonymous" as='font'>
	<div class='main-content'>
		<!-- Popups -->
		<div id='frame-element-editor' class='frame-element-editor'>
			<h2 class='frame-element-editor-title'>Frame Image Editor</h2>
			<h2 class='frame-element-editor-close' onclick='this.parentElement.classList.remove("opened");'>X</h2>
			<div>
				<h5 class='input-description'>X</h5>
				<input id='frame-editor-x' class='input' type='number' placeholder='X' step='1'>
			</div>
			<div>
				<h5 class='input-description'>Y</h5>
				<input id='frame-editor-y' class='input' type='number' placeholder='X' step='1'>
			</div>
			<div>
				<h5 class='input-description'>Width</h5>
				<input id='frame-editor-width' class='input' type='number' placeholder='X' step='1'>
			</div>
			<div>
				<h5 class='input-description'>Height</h5>
				<input id='frame-editor-height' class='input' type='number' placeholder='X' step='1'>
			</div>
			<div>
				<h5 class='input-description'>Opacity</h5>
				<input id='frame-editor-opacity' class='input' type='number' placeholder='Opacity' max='100' min='0' step='1'>
			</div>
			<div>
				<h5 class='input-description'>Erase</h5>
				<label class='checkbox-container input'>Erase Card
					<input id='frame-editor-erase' type='checkbox' placeholder='Erase'>
					<span class='checkmark'></span>
				</label>
			</div>
			<div>
				<h5 class='input-description'>Overlay Mode</h5>
				<label class='checkbox-container input'>Preserve Alpha
					<input id='frame-editor-alpha' type='checkbox' placeholder='Preserve Alpha'>
					<span class='checkmark'></span>
				</label>
			</div>
			<div>
				<h5 class='input-description'>Select and remove masks</h5>
				<select id='frame-editor-masks' class='input margin-bottom'></select>
				<button onclick='frameElementMaskRemoved();' class='input'>Remove mask</button>
			</div>
			<div class='drop-area'>
	            <h5 class='margin-bottom padding input-description'>Drag and drop masks to add</h5>
	            <input type='file' multiple accept='.png, .svg, .jpg, .jpeg, .bmp' placeholder='File Upload' class='input' oninput='uploadFiles(event.target.files, uploadMaskOption);' data-dropFunction='uploadMaskOption' data-otherParams=''>
			</div>
		</div>
		<div id='textbox-editor' class='textbox-editor'>
			<h2 class='textbox-editor-title'>Textbox Editor</h2>
			<h2 class='textbox-editor-close' onclick='this.parentElement.classList.remove("opened");'>X</h2>
			<div>
				<h5 class='input-description'>X</h5>
				<input id='textbox-editor-x' class='input' type='number' placeholder='X' step='1'>
			</div>
			<div>
				<h5 class='input-description'>Y</h5>
				<input id='textbox-editor-y' class='input' type='number' placeholder='X' step='1'>
			</div>
			<div>
				<h5 class='input-description'>Width</h5>
				<input id='textbox-editor-width' class='input' type='number' placeholder='X' step='1'>
			</div>
			<div>
				<h5 class='input-description'>Height</h5>
				<input id='textbox-editor-height' class='input' type='number' placeholder='X' step='1'>
			</div>
		</div>
		<!-- Regular stuff -->
		<div class='creator-grid margin-bottom-large'>
			<canvas class='creator-canvas box-shadow' id='previewCanvas' width='750' height='1050'></canvas>
			<div class='creator-menu box-shadow'>
				<div id='creator-menu-tabs' class='creator-menu-tabs'>
					<h3 class='selectable readable-background selected' onclick='toggleCreatorTabs(event, "frame")'>Frame</h3>
					<h3 class='selectable readable-background' onclick='toggleCreatorTabs(event, "text")'>Text</h3>
					<h3 class='selectable readable-background' onclick='toggleCreatorTabs(event, "art")'>Art</h3>
					<h3 class='selectable readable-background' onclick='toggleCreatorTabs(event, "setSymbol")'>Set Symbol</h3>
					<h3 class='selectable readable-background' onclick='toggleCreatorTabs(event, "watermark")'>Watermark</h3>
					<h3 class='selectable readable-background' onclick='toggleCreatorTabs(event, "bottomInfo")'>Collector</h3>
					<h3 class='selectable readable-background' onclick='toggleCreatorTabs(event, "import")'>Import/Save</h3>
					<h3 class='selectable readable-background' onclick='toggleCreatorTabs(event, "tutorial"); loadTutorialVideo();'>Tutorial</h3>
				</div>
				<div id='creator-menu-sections' class='margin-bottom'>
					<div id='creator-menu-frame'>
						<div class='readable-background margin-bottom padding'>
							<h5 class='margin-bottom padding input-description'>
								Select a Frame Group and a Frame Pack, then you may Load the selected Frame Version (loading the frame version configures text placement, art size, etc...)</h5>
							<div class='input-grid margin-bottom'>
								<select id='selectFrameGroup' onchange='loadScript("/js/frames/group" + this.value + ".js")' class='input'>
									<option disabled>Standard Frames</option>
									<option value='Standard-3'>Regular</option>
									<option value='Token-2'>Tokens</option>
									<option value='Saga-1'>Sagas</option>
									<option value='Planeswalker'>Planeswalkers</option>
									<option value='Modal-1'>Modal DFC's</option>
									<option value='DFC'>Transform</option>
									<option disabled>Special Frames</option>
									<option value='Showcase-5'>Showcase Frames</option>
									<option value='Promo-2'>Promos (Tall Art)</option>
									<option value='Textless-4'>Textless/Fullart</option>
									<option disabled>Other Frames</option>
									<option value='Custom'>Custom</option>
									<option value='Misc-2'>Old/Misc</option>
									<option value='Margin'>1/8th Inch Margin</option>
								</select>
								<select id='selectFramePack' onchange='loadScript("/js/frames/pack" + this.value + ".js")' class='input'></select>
							</div>
							<div class='input-grid margin-bottom'>
								<button id='loadFrameVersion' class='input'>Load Frame Version</button>
							</div>
							<h5 class='input-description margin-bottom'>Automatically load Frame Version when loading Frame Packs</h5>
							<label class='checkbox-container input'>Auto load
								<input id='autoLoadFrameVersion' type='checkbox' onchange='autoLoadFrameVersion();' checked>
								<span class='checkmark'></span>
							</label>
						</div>
						<div class='readable-background margin-bottom padding'>
							<h5 class='margin-bottom padding input-description'>Select a Frame Image and a Mask, then add it to your card</h5>
							<div class='split-grid margin-bottom'>
								<div id='frame-picker' class='frame-picker'></div>
								<div id='mask-picker' class='mask-picker'></div>
							</div>
							<div class='input-grid margin-bottom'>
								<button id='addToFull' class='input' onclick='addFrame()'>Add Frame to Card</button>
								<button id='addToRightHalf' class='input' onclick='addFrame([{src:"/img/frames/maskRightHalf.png", name:"Right Half"}])'>Add Frame to Card (Right Half)</button>
							</div>
							<h5 class='collapsible collapsed padding input-description' onclick='toggleCollapse(event);'>More options</h5>
								<div>
									<div class='input-grid margin-bottom'>
										<button id='addToLeftHalf' class='input' onclick='addFrame([{src:"/img/frames/maskLeftHalf.png", name:"Left Half"}])'>Add Frame to Card (Left Half)</button>
										<button id='addToMiddleThird' class='input' onclick='addFrame([{src:"/img/frames/maskMiddleThird.png", name:"Middle Third"}])'>Add Frame to Card (Middle Third)</button>
									</div>
									<h5 class='padding input-description'>You can now double click frames and masks to add them to the card. You can do so while holding the shift, control, or alt keys to add to the right half, left half, or middle third, respectively.</h5>
								</div>
							<h5 id='selectedPreview' class='padding input-description'>(Selected: White Frame, No Mask)</h5>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Drag to reorder frame images</h5>
							<div id='frame-list' class='frame-list margin-bottom'></div>
							<h5 class='padding input-description'>You may also click to edit opacity, position, size, and more</h5>
						</div>
						<div class='readable-background padding'>
							<h5 class='margin-bottom padding input-description'>Upload custom frame images</h5>
							<div class='input-grid'>
								<div class='padding drop-area'>
						            <h5 class='margin-bottom padding input-description'>Drag and drop</h5>
						            <input type='file' multiple accept='.png, .svg, .jpg, .jpeg, .bmp' placeholder='File Upload' class='input' oninput='uploadFiles(event.target.files, uploadFrameOption);' data-dropFunction='uploadFrameOption' data-otherParams=''>
						        </div>
						        <div>
									<input type='url' placeholder='Via URL' class='input' onchange='imageURL(this.value, uploadFrameOption);'>
								</div>
							</div>
						</div>
					</div>
					<div id='creator-menu-text' class='hidden'>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Select a text area to edit</h5>
							<div id='text-options' class='input-grid'></div>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Enter card text</h5>
							<textarea id='text-editor' class='input margin-bottom' oninput='textEdited();'></textarea>
							<h5 class='margin-bottom padding input-description'>Edit the placement and size of the selected textbox</h5>
							<button class='input' onclick='textboxEditor();'>Edit Bounds</button>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='collapsible collapsed padding input-description' onclick='toggleCollapse(event);'>
								Text Code / Mana Symbol Code Reference
							</h5>
							<div class='padding'>
								<h5 class='margin-top'>Text Codes:</h5>
								<div class='text-codes margin-bottom padding'>
									<h5>Code</h5><h5>Result</h5>
									<h5>{i}</h5><h5>Italicizes</h5>
									<h5>{/i}</h5><h5>Removes italicization</h5>
									<h5>{lns}</h5><h5>Moves to the next line without an extra space (stands for line-no-space)</h5>
									<h5>{flavor}</h5><h5>Moves to the next line, draws the flavor text bar, and italicizes</h5>
									<h5>{fontsize#}</h5><h5>Changes the font size by # pixels (relative - use negative integers to shrink text - ie '{fontsize-12}')</h5>
									<h5>{fontcolor___}</h5><h5>Changes the font color to ___ (ie '{fontcolor#00FF00}')</h5>
									<h5>{left}</h5><h5>Aligns text to the left</h5>
									<h5>{center{</h5><h5>Aligns text to the center</h5>
									<h5>{right}</h5><h5>Aligns text to the right</h5>
									<h5>{permashift#,$}</h5><h5>Moves the text # pixels right and $ pixels down. Recommended for moving the text over large distances</h5>
									<h5>{up#}</h5><h5>Moves the text # pixels up</h5>
									<h5>{down#}</h5><h5>Moves the text # pixels down</h5>
									<h5>{left#}</h5><h5>Moves the text # pixels left</h5>
									<h5>{right#}</h5><h5>Moves the text # pixels right</h5>
									<h5>{shadow#}</h5><h5>Changes the shadow distance to # (use {shadow0} to remove the shadow)</h5>
									<h5>{shadowcolor#}</h5><h5>Changes the shadow color to #</h5>
									<h5>{kerning#}</h5><h5>Changes the kerning (letter spacing) to #</h5>
									<h5>Notes</h5><h5>For colors, you may use HTML color codes (ie 'green'), hex color codes (ie '#00FF00'), or rgb (ie 'rgb(0,255,0)'')</h5>
								</div>
								<h5>Mana Symbol Codes:</h5>
								<div class='text-codes padding'>
									<h5>Code</h5><h5>Result</h5>
									<h5>{1}, {2}... {20}</h5><h5>Generic mana (works for numbers 1 through 20)</h5>
									<h5>{w}, {u}, {b}, {r}, {g}</h5><h5>Colored mana</h5>
									<h5>{wu}, {wb}, {ub}... {2w}, {2u}...</h5><h5>Hybrid mana</h5>
									<h5>{pw}, {pu}...</h5><h5>Phyrexian mana</h5>
									<h5>{t}, {untap}</h5><h5>Respective tapping-related symbol</h5>
									<h5>{x}, {y}, {z}</h5><h5>Respective variable-related symbol</h5>
									<h5>{c}</h5><h5>Colorless-specific mana</h5>
									<h5>{snow}</h5><h5>Snow mana</h5>
									<h5>{e}</h5><h5>Energy symbol</h5>
									<h5>Notes</h5><h5>Hybrid/Phyrexian mana only works with WUBRG</h5>
								</div>
							</div>
						</div>
						<div class='readable-background padding'>
							<h5 class='padding input-description'>Add a textbox to your card</h5>
							<div class='padding input-grid'>
								<button class='input' onclick='addTextbox("Nickname");'>Nickname</button>
								<button class='input' onclick='addTextbox("Power/Toughness");'>Power/Toughness</button>
								<button class='input' onclick='addTextbox("DateStamp");'>Date Stamp</button>
							</div>
						</div>
					</div>
					<div id='creator-menu-art' class='hidden'>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Choose/upload your art</h5>
							<div class='input-grid margin-bottom'>
								<div class='padding drop-area'>
						            <h5 class='margin-bottom padding input-description'>Drag and drop</h5>
						            <input type='file' multiple accept='.png, .svg, .jpg, .jpeg, .bmp' placeholder='File Upload' class='input' oninput='uploadFiles(event.target.files, uploadArt, "autoFit");' data-dropFunction='uploadArt' data-otherParams='autoFit'>
						        </div>
						        <div>
									<input type='url' placeholder='Via URL' class='input' onchange='imageURL(this.value, uploadArt, "autoFit");'>
								</div>
							</div>
							<h5 class='margin-bottom padding input-description'>Or enter a card name</h5>
							<input id='art-name' type='text' placeholder='Enter Card Name' class='input margin-bottom' onchange='fetchScryfallData(this.value, artFromScryfall, true);'>
							<h5 class='padding margin-bottom input-description'>Select a specific card art to load</h5>
							<select class='input margin-bottom' id='art-index' onchange='changeArtIndex();'></select>
							<h5 class='margin-bottom padding input-description'>And credit the artist</h5>
							<div class='input-grid'>
								<input id='art-artist' type='text' class='input' oninput='artistEdited(this.value);' placeholder='Artist'>
							</div>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Position/scale your art (X, Y, Scale, Rotation)<br>Art is now visually adjustable! Click and drag anywhere on the card to move your art around. Hold shift while doing so to scale, or control to rotate.</h5>
							<div class='input-grid margin-bottom'>
								<input id='art-x' type='number' class='input' oninput='artEdited();' value=0>
								<input id='art-y' type='number' class='input' oninput='artEdited();' value=0>
								<input id='art-zoom' type='number' class='input' oninput='artEdited();' value=100 step=0.1 min=0>
								<input id='art-rotate' type='number' class='input' oninput='artEdited();' value=0 step=1 min=0 max=360>
							</div>
							<div class='input-grid'>
								<button class='input' onclick='autoFitArt();'>Auto Fit Art</button>
							</div>
						</div>
						<div class='readable-background padding'>
							<h5 class='padding margin-bottom input-description'>Clears the art, making it blank</h5>
							<button class='input margin-bottom' onclick='uploadArt(blank.src);'>Remove Art</button>
						</div>
					</div>
					<div id='creator-menu-setSymbol' class='hidden'>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Choose/upload your set symbol</h5>
							<div class='input-grid margin-bottom'>
								<div class='padding drop-area'>
						            <h5 class='margin-bottom padding input-description'>Drag and drop</h5>
						            <input type='file' multiple accept='.png, .svg, .jpg, .jpeg, .bmp' placeholder='File Upload' class='input' oninput='uploadFiles(event.target.files, uploadSetSymbol, "resetSetSymbol");' data-dropFunction='uploadSetSymbol' data-otherParams='resetSetSymbol'>
						        </div>
						        <div>
									<input type='url' placeholder='Via URL' class='input' onchange='imageURL(this.value, uploadSetSymbol, "resetSetSymbol");'>
								</div>
							</div>
							<h5 class='margin-bottom padding input-description'>Or enter a set code/rarity</h5>
							<div class='input-grid margin-bottom'>
								<input id='set-symbol-code' type='text' placeholder='Set Code' class='input' onchange='fetchSetSymbol();'>
								<input id='set-symbol-rarity' type='text' placeholder='Rarity' class='input' onchange='fetchSetSymbol();'>
							</div>
							<h5 class='collapsible collapsed padding input-description' onclick='toggleCollapse(event);'>
								How to find set codes
							</h5>
							<div class='padding'>
								<h5 class='margin-top'>Set codes are the two-three character combinations that represent sets. For sets released after 2015, the three-character set code can be found in the lower left hand corner.</h5>
								<h5 class='margin-top'>For older sets, the code may be different depending on your use:</h5>
								<p class='margin-top padding'>Set symbol images are fetched from the <a class='underline' href='https://gatherer.wizards.com/Pages/Default.aspx' target='_blank'>Gatherer</a>. After finding a card with the desired set symbol, right click the set symbol image and open it in a new tab. In the URL you should find the set code, following the 'set='</p>
								<p class='padding'>For watermarks, please reference <a class='underline' href='https://keyrune.andrewgioia.com/icons.html' target='_blank'>Keyrune</a>.</p>
								<p class='padding'>Generally, however, the set codes used by <a class='underline' href='https://scryfall.com/sets' target='_blank'>Scryfall</a> are accurate.</p>
							</div>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Position/scale your Set Symbol (X, Y, Scale)</h5>
							<div class='input-grid margin-bottom'>
								<input id='setSymbol-x' type='number' class='input' oninput='setSymbolEdited();' value=0>
								<input id='setSymbol-y' type='number' class='input' oninput='setSymbolEdited();' value=0>
								<input id='setSymbol-zoom' type='number' class='input' oninput='setSymbolEdited();' value=100 step=0.1 min=0>
							</div>
							<div class='input-grid'>
								<button class='input' onclick='resetSetSymbol();'>Reset Set Symbol</button>
							</div>
						</div>
						<div class='readable-background padding'>
							<h5 class='padding margin-bottom input-description'>Clears the Set Symbol, making it blank</h5>
							<button class='input margin-bottom' onclick='uploadSetSymbol(blank.src);'>Remove Set Symbol</button>
						</div>
					</div>
					<div id='creator-menu-watermark' class='hidden'>
					<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Choose/upload your watermark</h5>
							<div class='input-grid'>
								<div class='padding drop-area'>
						            <h5 class='margin-bottom padding input-description'>Drag and drop</h5>
						            <input type='file' multiple accept='.png, .svg, .jpg, .jpeg, .bmp' placeholder='File Upload' class='input' oninput='uploadFiles(event.target.files, uploadWatermark, "resetWatermark");' data-dropFunction='uploadWatermark' data-otherParams='resetWatermark'>
						        </div>
						        <div>
									<input type='url' placeholder='Via URL' class='input margin-bottom' onchange='imageURL(this.value, uploadWatermark, "resetWatermark");'>
									<input type='text' placeholder='Via Set Code' class='input' onchange='getSetSymbolWatermark(this.value);'>
								</div>
							</div>
							<h5 class='margin-bottom padding input-description'>Select lore-based watermarks</h5>
							<select class='input padding margin-bottom' onchange='getSetSymbolWatermark("https://raw.githubusercontent.com/andrewgioia/mana/master/svg/" + this.value + ".svg");'>
								<option disabled selected='selected'>None</option>
								<option disabled>Guilds (Ravnica)</option>
								<option value="guild-azorius">Azorius</option>
								<option value="guild-dimir">Dimir</option>
								<option value="guild-rakdos">Rakdos</option>
								<option value="guild-gruul">Gruul</option>
								<option value="guild-selesnya">Selesnya</option>
								<option value="guild-orzhov">Orzhov</option>
								<option value="guild-izzet">Izzet</option>
								<option value="guild-golgari">Golgari</option>
								<option value="guild-boros">Boros</option>
								<option value="guild-simic">Simic</option>
								<option disabled>Schools (Strixhaven)</option>
								<option value="school-silverquill">Silverquill</option>
								<option value="school-prismari">Prismari</option>
								<option value="school-witherbloom">Witherbloom</option>
								<option value="school-lorehold">Lorehold</option>
								<option value="school-quandrix">Quandrix</option>
								<option disabled>Clans (Tarkir - Old Timeline)</option>
								<option value="clan-abzan">Abzan</option>
								<option value="clan-jeskai">Jeskai</option>
								<option value="clan-sultai">Sultai</option>
								<option value="clan-mardu">Mardu</option>
								<option value="clan-temur">Temur</option>
								<option disabled>Clans (Tarkir - New Timeline)</option>
								<option value="clan-ojutai">Ojutai</option>
								<option value="clan-silumgar">Silumgar</option>
								<option value="clan-kolaghan">Kolaghan</option>
								<option value="clan-atarka">Atarka</option>
								<option value="clan-dromoka">Dromoka</option>
							</select>
							<h5 class='collapsible collapsed padding input-description' onclick='toggleCollapse(event);'>
								How to find set codes
							</h5>
							<div class='padding'>
								<h5 class='margin-top'>Set codes are the two-three character combinations that represent sets. For sets released after 2015, the three-character set code can be found in the lower left hand corner.</h5>
								<h5 class='margin-top'>For older sets, the code may be different depending on your use:</h5>
								<p class='margin-top padding'>Set symbol images are fetched from the <a class='underline' href='https://gatherer.wizards.com/Pages/Default.aspx' target='_blank'>Gatherer</a>. After finding a card with the desired set symbol, right click the set symbol image and open it in a new tab. In the URL you should find the set code, following the 'set='</p>
								<p class='padding'>For watermarks, please reference <a class='underline' href='https://keyrune.andrewgioia.com/icons.html' target='_blank'>Keyrune</a>.</p>
								<p class='padding'>Generally, however, the set codes used by <a class='underline' href='https://scryfall.com/sets' target='_blank'>Scryfall</a> are accurate.</p>
							</div>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Select watermark colors (left, right)</h5>
							<div class='input-grid margin-bottom'>
								<select class='input' id='watermark-left' onchange='watermarkEdited();'>
									<option value="none">None</option>
					                <option value="default">Actual Image</option>
					                <option value="#b79d58" selected="selected">White</option>
					                <option value="#8cacc5">Blue</option>
					                <option value="#5e5e5e">Black</option>
					                <option value="#c66d39">Red</option>
					                <option value="#598c52">Green</option>
					                <option value="#cab34d">Gold</option>
					                <option value="#647d86">Artifact/Colorless</option>
					                <option value="#5e5448">Land</option>
					                <option value="#ffffff">True White</option>
					                <option value="#000000">True Black</option>
								</select>
								<select class='input' id='watermark-right' onchange='watermarkEdited();'>
									<option value="none" selected="selected">None</option>
					                <option value="default">Actual Image</option>
					                <option value="#b79d58">White</option>
					                <option value="#8cacc5">Blue</option>
					                <option value="#5e5e5e">Black</option>
					                <option value="#c66d39">Red</option>
					                <option value="#598c52">Green</option>
					                <option value="#cab34d">Gold</option>
					                <option value="#647d86">Artifact/Colorless</option>
					                <option value="#5e5448">Land</option>
					                <option value="#ffffff">True White</option>
					                <option value="#000000">True Black</option>
								</select>
							</div>
							<h5 class='margin-bottom padding input-description'>And enter an opacity</h5>
							<div class='input-grid margin-bottom'>
								<input id='watermark-opacity' type='number' class='input' oninput='watermarkEdited();' value=40 step=1 min=0 max=100>
							</div>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='margin-bottom padding input-description'>Position/scale your watermark (X, Y, Scale)</h5>
							<div class='input-grid margin-bottom'>
								<input id='watermark-x' type='number' class='input' oninput='watermarkEdited();' value=0>
								<input id='watermark-y' type='number' class='input' oninput='watermarkEdited();' value=0>
								<input id='watermark-zoom' type='number' class='input' oninput='watermarkEdited();' value=100 step=0.1 min=0>
							</div>
							<div class='input-grid'>
								<button class='input' onclick='resetWatermark();'>Reset Watermark</button>
							</div>
						</div>
						<div class='readable-background padding'>
							<h5 class='padding margin-bottom input-description'>Clears the watermark, making it blank</h5>
							<button class='input margin-bottom' onclick='uploadWatermark(blank.src);'>Remove Watermark</button>
						</div>
					</div>
					<div id='creator-menu-bottomInfo' class='hidden'>
						<div class='readable-background padding margin-bottom'>
							<h5 class='padding margin-bottom input-description'>Enter the card number, rarity, set code, language, and artist's name</h5>
							<div class='padding input-grid'>
								<input id='info-number' type='text' class='input' oninput='bottomInfoEdited();' placeholder='Number' value=''>
								<input id='info-rarity' type='text' class='input' oninput='bottomInfoEdited();' placeholder='Rarity' value='P'>
								<input id='info-set' type='text' class='input' oninput='bottomInfoEdited();' placeholder='Set' value='MTG'>
								<input id='info-language' type='text' class='input' oninput='bottomInfoEdited();' placeholder='Language' value='EN'>
								<input id='info-artist' type='text' class='input' oninput='artistEdited(this.value);' placeholder='Artist'>
							</div>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='input-description padding margin-bottom'>Toggle between star (seen on foils) and dot (seen on regular cards)</h5>
							<div class='padding'>
								<button class='input padding' onclick='toggleStarDot();'>Toggle Star/Dot</button>
							</div>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='input-description padding margin-bottom'>Save current collector info as default</h5>
							<div class='padding'>
								<button class='input padding' onclick='setDefaultCollector();'>Save as Default</button>
							</div>
							<h5 class='input-description padding margin-bottom'>Clear your saved default collector info</h5>
							<div class='padding'>
								<button class='input padding' onclick='removeDefaultCollector();'>Clear Saved Defaults</button>
							</div>
						</div>
					</div>
					<div id='creator-menu-import' class='hidden'>
						<div class='readable-background margin-bottom padding'>
							<h5 class='padding margin-bottom input-description'>Import a real card by name</h5>
							<input id='import-name' class='input margin-bottom' type='text' onchange='fetchScryfallData(this.value, importCard);' placeholder='Enter Card Name'>
							<h5 class='padding margin-bottom input-description'>Select a specific card to import</h5>
							<select class='input margin-bottom' id='import-index' onchange='changeCardIndex();'></select>
							<h5 class='padding input-description'>Select a language for card imports (not all languages will always be available)</h5>
							<select class='input' id='import-language' onchange='fetchScryfallData(document.querySelector("#import-name").value, importCard);'>
								<option value="en">English</option>
								<option value="es">Spanish</option>
								<option value="fr">French</option>
								<option value="de">German</option>
								<option value="it">Italian</option>
								<option value="pt">Portuguese</option>
								<option value="ja">Japanese</option>
								<option value="ko">Korean</option>
								<option value="ru">Russian</option>
								<option value="zhs">Simplified Chinese</option>
								<option value="zht">Traditional Chinese</option>
								<option value="ph">Phyrexian</option>
							</select>
						</div>
						<div class='readable-background margin-bottom padding'>
							<h5 class='padding margin-bottom input-description'>Save your current card</h5>
							<button class='input margin-bottom' onclick='saveCard();'>Save Card</button>
							<h5 class='padding margin-bottom input-description'>Load a saved card</h5>
							<select id='load-card-options' class='input margin-bottom' type='text' onchange='loadCard(this.value);'></select>
							<h5 class='padding margin-bottom input-description'>Delete selected card</h5>
							<button class='input' onclick='deleteCard();'>Delete Card</button>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='padding margin-bottom input-description'>Download all saved cards</h5>
							<button class='input margin-bottom' onclick='downloadSavedCards();'>Download All</button>
							<h5 class='padding margin-bottom input-description'>Upload previously downloaded file of saved cards (downloaded from above)</h5>
							<input type='file' accept='.cardconjurer,.txt' class='input margin-bottom' oninput='uploadSavedCards(event);'>
							<h5 class='padding margin-bottom input-description'>Delete ALL saved cards</h5>
							<button class='input margin-bottom' onclick='deleteSavedCards();'>Delete All</button>
						</div>
						<div class='readable-background padding margin-bottom'>
							<h5 class='collapsible collapsed padding input-description' onclick='toggleCollapse(event);'>
								How are my cards saved?
							</h5>
							<div class='padding'>
								<h5 class='margin-top'>Cards are saved on your computer under your browser's localstorage, which usually has a limit of 5MB and cannot be changed.</h5>
								<h5 class='margin-top'>Unfortunately, this means that if you save a lot of cards, you could run out of space.</h5>
								<h5 class='margin-top'>Your localstorage runs out of space especially fast when you upload images directly from your computer, because the image itself has to be saved. However, if possible, uploading images via URL will save massive amounts of space, allowing you to save many more cards.</h5>
								<h5 class='margin-top'>And if you do run out of space, don't worry! You can download all saved cards then delete all saved cards,  freeing up all 5MB of space. And when you'd like to edit the cards you previously downloaded/deleted, you can reupload them via the file upload (under "Upload previously downloaded cards").</h5>
							</div>
						</div>
					</div>
					<div id='creator-menu-tutorial' class='hidden'>
						<div class='padding readable-background margin-bottom'>
							<h5 class='padding input-description'>This video is currently outdated, but still reflects the general process for making cards</h5>
						</div>
						<div class='padding readable-background margin-bottom'>
							<h5 class='padding input-description'>The biggest difference is that you must click the "Load Frame Version" button after selecting your frame pack to load necessary details, such as text placement.</h5>
						</div>
						<div class='video'>
							<iframe width="560" height="315" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
						</div>
					</div>
				</div>
				<div class='readable-background padding'>
					<h3 class='download padding' onclick='downloadCard();'>Download your card</h3>
					<h5 onclick='downloadCard(true);' id='downloadAlt' href='' target='_blank' class='padding download input-description' style='text-align: left;'>Click here for an alternative download</h5>
				</div>
			</div>
		</div>
		<div class='layer readable-background margin-bottom-larger'>
			<h1 class='center margin-bottom'>Share your cards</h1>
			<h4>
				I'd love to see the cards you're making, and I'm sure that others would too! Post a picture on Twitter with the hashtag <a style='color: #00aced;' href="https://twitter.com/search?q=%23CardConjurer&src=typed_query&f=live" target='_blank'>#CardConjurer</a>, or just check out what others have made!
			</h4>
		</div>
		<div class='layer readable-background margin-bottom-larger'>
			<h1 class='center margin-bottom'>How you can help</h1>
			<h4>
				Between server costs and paying for the domain, running Card Conjurer can take its toll - especially as a student! If you've enjoyed using Card Conjurer and would like to help me out, please consider joining my <a style='color: #f96854;' href="https://www.patreon.com/KyleBurton" target='_blank'>Patreon</a>. And if you'd like to make a one-time donation instead, I have a <a style='color: #3b7bbf;' href="https://www.paypal.me/kyleburtondonate" target='_blank'>PayPal</a> as well. Any assistance is greatly appreciated, even if it's simply checking out my <a style='color: #00aced;' href="https://twitter.com/ImKyle4815" target='_blank'>Twitter</a>!
			</h4>
		</div>
		<div class='layer readable-background margin-bottom-larger'>
			<h1 class='center margin-bottom'>Supporters</h1>
			<h4 class='margin-bottom'>Thank you so much to all of my supporters on <a style='color: #f96854;' href="https://www.patreon.com/KyleBurton" target='_blank'>Patreon</a>. Because of you, I can continue running and updating Card Conjurer.</h4>
			<div class='supporters margin-bottom'>
				<h4>Caprat</h4>
				<h4>Kobe P.</h4>
				<h4>Paul C.</h4>
				<h4>Alex W.</h4>
				<h4>Aaron C.</h4>
				<h4>Mike S.</h4>
				<h4>Ancestral MTG</h4>
				<h4>Sheepwave</h4>
				<h4>Yunas</h4>
				<h4>Ritchie T.</h4>
				<h4>Samuel T.</h4>
				<h4>Aurelian M.</h4>
				<h4>Rodney F.</h4>
				<h4>The Bell-Horwaths</h4>
				<h4>Swimmaf</h4>
				<h4>Gwynayne W.</h4>
				<h4>Cesar P.</h4>
				<h4>Marcos N.</h4>
				<h4>Bradley C.</h4>
			</div>
			<h4 class='margin-bottom'>And of course, thank you to all of those who have made donations in the past.</h4>
			<div class='supporters margin-bottom'>
				<h4>Navin K.</h4>
				<h4>Nicholas P.</h4>
				<h4>Chikara K.</h4>
				<h4>David C.</h4>
				<h4>Aaron J.</h4>
				<h4>Leif T.</h4>
				<h4>Martin C.</h4>
			</div>
			<h5 class='input-description'>(Please email me if you would like your name/nickname changed.)</h5>
		</div>
		<div class='layer readable-background margin-bottom-larger'>
			<h1 class='center margin-bottom'>Have feedback?</h1>
			<h4>
				Whether you've encountered a bug, want to request a feature, or have some criticism to offer, I'd love to hear it! If there's anything you'd like to let me know, please don't hesitate to send me an email at <a href='mailto:cardconjurermtg@gmail.com' target='_blank'>cardconjurermtg@gmail.com</a>.
			</h4>
		</div>
	</div>
	<script defer src='/js/creator-22.js'></script>
<?php include('../globalHTML/footer.php'); ?>
