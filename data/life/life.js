//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
//define variables
var playerCount, startingLifeTotal, firstPlayerWide = false, lastPlayerWide = false, playerList = [], rowHeight = 0, columnWidth = 0, rowCount = 0, isFullscreen = true, isMobile = false
if ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) {
	isMobile = true
}
//This function sets everything up
function fullscreen() {
	//Full screen!
	grid = document.getElementById("gridShell")
	if (grid.requestFullscreen) {
    	grid.requestFullscreen()
  	} else if (grid.mozRequestFullScreen) {
    	grid.mozRequestFullScreen()
  	} else if (grid.webkitRequestFullscreen) {
    	grid.webkitRequestFullscreen()
  	} else if (grid.msRequestFullscreen) {
    	grid.msRequestFullscreen()
  	} else {
  		isFullscreen = false
  		document.getElementById("return").classList.add("permaHidden")
  		document.getElementById("gridShell").classList.add("fullscreenUnavailable")
  	}
}
function startGame() {
	fullscreen()
	document.getElementById("return").classList.remove("hidden")
	//hide the settings and grab player count and starting life total
	document.getElementById("settings").classList.add("hidden")
	playerCount = parseInt(document.getElementById("inputPlayerCount").value)
	startingLifeTotal = parseInt(document.getElementById("inputStartingLife").value)
	//determine the layout based on player count
	if (playerCount % 2 == 0) {
		if (playerCount >= 6) {
			firstPlayerWide = true
			lastPlayerWide = true
		}
	} else {
		lastPlayerWide = true
	}
	//Make all the player boxes
	for (var i = 1; i <= playerCount; i ++) {
		//determine if the current box is rotated or widened
		var rotation, wide = false
		var orientationIndexAdjust = 0
		if (firstPlayerWide) {
			orientationIndexAdjust += 1
		}
		if (i == 1 && firstPlayerWide) {
			rotation = 180
		} else if (i == playerCount && lastPlayerWide) {
			rotation = 0
		} else if ((i + orientationIndexAdjust) % 2 == 0) {
			rotation = 270
		} else {
			rotation = 90
		}
		if ((i == 1 && firstPlayerWide) || (i == playerCount && lastPlayerWide)) {wide = true}
		playerList[i - 1] = new playerBox(i, rotation, wide)
		document.getElementById("inputPlayer").innerHTML += "<option value='" + i + "'>Player " + i + "</option>"
	}
	//Determine the grid size
	if (isFullscreen) {
		columnWidth = screen.width / 2 - 2
	} else {
		columnWidth = window.innerWidth / 2 - 2
	}
	rowCount = (playerCount - playerCount % 2) / 2 + 1
	if (playerCount == 2 || playerCount == 4) {
		rowCount -= 1
	}
	if (isFullscreen) {
		rowHeight = screen.height / rowCount - 2
	} else {
		rowHeight = window.innerHeight / rowCount - 2
	}
	//Now that all the player boxes are made, they must be configured
	for (var i = 1; i <= playerCount; i++) {
		configurePlayerBox(i)
	}
	//Set up the clock!
	setInterval(function() {
		for (var i = 1; i <= playerCount; i++) {
			if (playerList[i - 1].canvas.customVarMouseDown != "false") {
				playerList[i - 1].canvas.customVarMouseDelay += 1
				if (playerList[i - 1].canvas.customVarMouseDelay > 5) {
					if (playerList[i - 1].canvas.customVarMouseDown == "up") {
						playerList[i - 1].life += 1
					} else {
						playerList[i - 1].life -= 1
					}
					if (playerList[i - 1].canvas.customVarMouseDelay > 50) {
						if (playerList[i - 1].canvas.customVarMouseDown == "up") {
							playerList[i - 1].life += 4
						} else {
							playerList[i - 1].life -= 4
						}
					}
				}
			}
			var context = playerList[i - 1].canvas.customVarContext
			context.textBaseline = "middle"
			var tempFontSize = 100
			context.font = "100pt belerenbsc"
			var currentLife = playerList[context.customVarCanvas.customVarID - 1].life
			context.fillStyle = context.customVarCanvas.customVarColor
			var tempCanvasHeight = context.customVarCanvas.height, tempCanvasWidth = context.customVarCanvas.width
			if (playerList[context.customVarCanvas.customVarID - 1].rotation == 90 || playerList[context.customVarCanvas.customVarID - 1].rotation == 270) {
				tempCanvasHeight = tempCanvasWidth
				tempCanvasWidth = context.customVarCanvas.height
			}
			context.fillRect(tempCanvasWidth / -2, tempCanvasHeight / -2, tempCanvasWidth, tempCanvasHeight)
			context.fillStyle = "white"
			while (context.measureText(currentLife).width >= tempCanvasWidth) {
				tempFontSize -= 1
				context.font = tempFontSize + "pt belerenbsc"
			}
			var horizontalShift = -1 * parseInt(context.measureText(currentLife).width) / 2
			context.strokeStyle = "black"
			context.lineWidth = 5
			context.strokeText(currentLife, horizontalShift, 0)
			context.fillText(currentLife, horizontalShift, 0)
			
		}
	}, 100)
	window.addEventListener("touchstart", switchToTouchEvents, true)
}

function playerBox(playerBoxID, canvasRotation, wide) {
	this.id = playerBoxID
	this.rotation = canvasRotation
	this.life = startingLifeTotal
	this.canvas = document.createElement("canvas")
	this.canvas.customVarMouseDown = "false"
	this.canvas.customVarMouseDelay = 0
	this.canvas.customVarID = playerBoxID
	this.canvas.customVarColor = "#222222"
	this.canvas.customVarContext = this.canvas.getContext("2d")
	this.canvas.customVarContext.customVarCanvas = this.canvas
	this.canvas.classList.add("playerBox")
	if (wide) {
		this.canvas.classList.add("widePlayerBox")
	}
	document.getElementById("mainGrid").appendChild(this.canvas)
	this.canvas.addEventListener("mousedown", decoyMouseDownFunction, true)
	document.addEventListener("mouseup", decoyMouseUpFunction, true)
}
function decoyMouseDownFunction() {
	console.log("IT'S STILL CLICKING")
	mouseDownPlayerBox(this, event.clientX, event.clientY)
}
function decoyMouseUpFunction() {
	mouseUpPlayerBox(this)
}
function configurePlayerBox(playerBoxID) {
	var currentPlayer = playerList[playerBoxID - 1]
	var context = currentPlayer.canvas.customVarContext
	currentPlayer.canvas.width = columnWidth
	if (playerList[playerBoxID - 1].canvas.classList.contains("widePlayerBox")) {
		currentPlayer.canvas.width = columnWidth * 2 + 2
	}
	currentPlayer.canvas.height = rowHeight
	context.translate(currentPlayer.canvas.width / 2, currentPlayer.canvas.height / 2)
	context.rotate(Math.PI / 180 * currentPlayer.rotation)
}
function mouseDownPlayerBox(canvas, clickX = 0, clickY = 0) {
	if (clickX > 0 && clickY > 0) {
		var playerBoxBounds = canvas.getBoundingClientRect()
		if (playerList[canvas.customVarID - 1].rotation == 0) {
			if (clickX > playerBoxBounds.width / 2 + playerBoxBounds.x) {
				canvas.customVarMouseDown = "up"
				playerList[canvas.customVarID - 1].life += 1
			} else {
				canvas.customVarMouseDown = "down"
				playerList[canvas.customVarID - 1].life -= 1
			}
		} else if (playerList[canvas.customVarID - 1].rotation == 90) {
			if (clickY > playerBoxBounds.height / 2 + playerBoxBounds.y) {
				canvas.customVarMouseDown = "up"
				playerList[canvas.customVarID - 1].life += 1
			} else {
				canvas.customVarMouseDown = "down"
				playerList[canvas.customVarID - 1].life -= 1
			}
		} else if (playerList[canvas.customVarID - 1].rotation == 180) {
			if (clickX > playerBoxBounds.width / 2 + playerBoxBounds.x) {
				canvas.customVarMouseDown = "down"
				playerList[canvas.customVarID - 1].life -= 1
			} else {
				canvas.customVarMouseDown = "up"
				playerList[canvas.customVarID - 1].life += 1
			}
		} else {
			if (clickY > playerBoxBounds.height / 2 + playerBoxBounds.y) {
				canvas.customVarMouseDown = "down"
				playerList[canvas.customVarID - 1].life -= 1
			} else {
				canvas.customVarMouseDown = "up"
				playerList[canvas.customVarID - 1].life += 1
			}
		}
	}
}
function mouseUpPlayerBox() {
	for (var i = 1; i <= playerCount; i++) {
		playerList[i - 1].canvas.customVarMouseDown = "false"
		playerList[i - 1].canvas.customVarMouseDelay = 0
	}
}
function resetLife() {
	for (var i = 1; i <= playerCount; i++) {
		playerList[i - 1].life = startingLifeTotal
	}
	document.getElementById('menu').classList.add('hidden')
}
function updateColorSelector() {
	document.getElementById("inputPlayerColor").value = playerList[parseInt(document.getElementById("inputPlayer").value) - 1].canvas.customVarColor
}
function updateBackgroundColor(color) {
	playerList[parseInt(document.getElementById("inputPlayer").value) - 1].canvas.customVarColor = color
}


function switchToTouchEvents() {
	console.log("switching!")
	window.removeEventListener("touchstart", switchToTouchEvents, true)
	document.removeEventListener("mouseup", decoyMouseUpFunction, true)
	for (var i = 1; i <= playerCount; i++) {
		playerList[i - 1].canvas.removeEventListener("mousedown", decoyMouseDownFunction, true)
		playerList[i - 1].canvas.addEventListener("touchstart", function() {
			for (var i = 0; i < event.touches.length; i ++) {
				mouseDownPlayerBox(this, event.touches[i].clientX, event.touches[i].clientY)
			}
		}, true)
		playerList[i - 1].canvas.addEventListener("touchend", function() {
			mouseUpPlayerBox(this)
		}, true)
	}
}

// setTimeout(function(){switchToTouchEvents()}, 2000)