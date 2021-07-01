//checks to see if it needs to run
if (!loadedVersions.includes('/js/frames/versionDungeon.js')) {
	loadedVersions.push('/js/frames/versionDungeon.js');
	sizeCanvas('dungeon');
	document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `dungeon`)">Dungeon</h3>';
	var newHTML = document.createElement('div');
	newHTML.id = 'creator-menu-dungeon';
	newHTML.classList.add('hidden');
	newHTML.innerHTML = `
	<div class='readable-background padding'>
		<h5 class='padding margin-bottom input-description'>Adjust the height (first input) and chapter count (second input) of each Dungeon ability</h5>
		<textarea id='dungeon-input' type='number' class='input margin-bottom' onchange='dungeonEdited();'>0,0,16,2\n0,2,16,17</textarea>
	</div>`;
	if (!card.dungeon) {
		card.dungeon = {abilities:[1, 1, 1, 0], count:3, x:0.1, width:0.3947};
	}
	document.querySelector('#creator-menu-sections').appendChild(newHTML);
	var dungeonFX1 = new Image();
	dungeonFX1.src = '/img/frames/dungeon/walls/fx/straight.png';
	var dungeonFX2 = new Image();
	dungeonFX2.src = '/img/frames/dungeon/walls/fx/corner.png';
	var dungeonFX3 = new Image();
	dungeonFX3.src = '/img/frames/dungeon/walls/fx/t.png';
	var dungeonFX4 = new Image();
	dungeonFX4.src = '/img/frames/dungeon/walls/fx/cross.png';
	var dungeonShape1 = new Image();
	dungeonShape1.src = '/img/frames/dungeon/walls/shape/straight.png';
	var dungeonShape2 = new Image();
	dungeonShape2.src = '/img/frames/dungeon/walls/shape/corner.png';
	var dungeonShape3 = new Image();
	dungeonShape3.src = '/img/frames/dungeon/walls/shape/t.png';
	var dungeonShape4 = new Image();
	dungeonShape4.src = '/img/frames/dungeon/walls/shape/cross.png';
	// var dungeonTexture = new Image();
	// dungeonTexture.src = '/img/frames/dungeon/dungeonTexture.png';
	dungeonShape4.onload = dungeonEdited;
}

function dungeonEdited() {
	//gather data
	data = document.querySelector('#dungeon-input').value;
	rooms = [];
	data.replace(/ /g, '').split('\n').forEach(room => {
		newRoom = room.split(',');
		for (i = 0; i < newRoom.length; i++) {
			newRoom[i] = parseInt(newRoom[i]);
		}
		rooms.push(newRoom);
	});
	console.log(rooms);
	
	//draw to dungeon canvas
	dungeonContext.clearRect(0, 0, dungeonCanvas.width, dungeonCanvas.height);


	drawTextBuffer();
	drawCard();
}

//Data structures...

class Vertex {
	constructor(x = 0, y = 0, up = false, down = false, left = false, right = false) {
		this.x = x;
		this.y = y;
		this.up = up;
		this.down = down;
		this.left = left;
		this.right = right;
	}
}

class Graph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }
  
    // functions to be implemented
  
    // addVertex(v)
    // addEdge(v, w)
    // printGraph()
  
    // bfs(v)
    // dfs(v)
}