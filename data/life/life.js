//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
//define variables
var playerCount, startingLifeTotal, firstPlayerWide = false, lastPlayerWide = false, playerList = [], rowHeight = 0, columnWidth = 0, rowCount = 0, isFullscreen = true, touchscreen = false, loop
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
	drawAllPlayerBoxes()
}

function playerBox(playerBoxID, canvasRotation, wide) {
	//Actually needed vars
	this.id = playerBoxID
	this.rotation = canvasRotation
	this.life = startingLifeTotal
	this.canvas = document.createElement("canvas")
	this.direction = "false"
	this.holdTime = 0
	this.color = "#222222"
	this.textColor = "#ffffff"
	this.image = new Image()
	//vars to make navigation easier
	this.canvas.customVarID = playerBoxID
	this.canvas.customVarContext = this.canvas.getContext("2d")
	this.canvas.customVarContext.customVarCanvas = this.canvas
	//css classes
	this.canvas.classList.add("playerBox")
	if (wide) {
		this.canvas.classList.add("widePlayerBox")
	}
	//add it to the html
	document.getElementById("mainGrid").appendChild(this.canvas)
}
function configurePlayerBox(playerBoxID) {
	//All of this configures the size/shape/orientation of the player boxes
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

function resetLife() {
	for (var i = 1; i <= playerCount; i++) {
		playerList[i - 1].life = startingLifeTotal
	}
	document.getElementById('menu').classList.add('hidden')
	drawAllPlayerBoxes()
}
function updateColorSelector() {
	document.getElementById("inputPlayerColor").value = playerList[parseInt(document.getElementById("inputPlayer").value) - 1].color
	document.getElementById("inputTextColor").value = playerList[parseInt(document.getElementById("inputPlayer").value) - 1].textColor
}
function updateBackgroundColor(color) {
	playerList[parseInt(document.getElementById("inputPlayer").value) - 1].color = color
	drawPlayerBox(parseInt(document.getElementById("inputPlayer").value))
}
function updateTextColor(color) {
	playerList[parseInt(document.getElementById("inputPlayer").value) - 1].textColor = color
	drawPlayerBox(parseInt(document.getElementById("inputPlayer").value))
}
function loadImage(event, destination) {
	var input = event.target
	var reader = new FileReader()
	reader.onload = function() {
		var dataURL = reader.result
		destination.src = dataURL
		setTimeout(function(){drawPlayerBox(parseInt(document.getElementById("inputPlayer").value))}, 500)
	}
	reader.readAsDataURL(input.files[0])
}
var savedArtList = [], cardArtUrlList = [], cardArtArtistList = []
function inputCardArtName(cardArtNameInput) {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			savedArtList = this.responseText.split('"art_crop":"')
			savedArtList.splice(0, 1)
			document.getElementById("inputCardArtNameNumber").max = savedArtList.length
			document.getElementById("inputCardArtNameNumber").value = 1
			for (i = 0; i < savedArtList.length; i ++) {
				cardArtUrlList[i] = savedArtList[i].split('","border_crop":')[0]
			}
			for (i = 0; i < savedArtList.length; i ++) {
				cardArtArtistList[i] = savedArtList[i].slice(savedArtList[i].indexOf('"artist":"') + 10, savedArtList[i].indexOf('","border_color":'))
			}
			inputCardArtNameNumber(1)
		} else if (this.readyState == 4 && this.status == 404) {
			// alert("Sorry, but we can't seem to find any art for '" + cardArtNameInput + "'")
		}
	}
	xhttp.open("GET", "https://api.scryfall.com/cards/search?order=released&unique=art&q=name%3D" + cardArtNameInput.replace(/ /g, "_"), true)
	xhttp.send()
}
function inputCardArtNameNumber(cardArtNameNumberInput) {
	playerList[parseInt(document.getElementById('inputPlayer').value) - 1].image.src = cardArtUrlList[cardArtNameNumberInput - 1]
	setTimeout(function(){drawPlayerBox(parseInt(document.getElementById("inputPlayer").value))}, 500)
}
document.getElementById("mainGrid").addEventListener("touchmove", function(event) {
	event.preventDefault()
}, false)
function rollRNG() {
	document.getElementById("rngOutput").innerHTML = Math.floor(Math.random() * (parseInt(document.getElementById("inputRNGMax").value) - parseInt(document.getElementById("inputRNGMin").value) + 1) + parseInt(document.getElementById("inputRNGMin").value))
}
function updatePlayerBoxes() {
	// alert("did I click?")
	if (clicking) {
		// alert("yes I did!")
		//Make a list of the touch locations
		for (var i = 0; i < touchX.length; i++) {
			for (var n = 1; n <= playerList.length; n ++) {
				var playerBoxBounds = playerList[n - 1].canvas.getBoundingClientRect()
				if (touchX[i] >= playerBoxBounds.left && touchX[i] <= playerBoxBounds.right && touchY[i] >= playerBoxBounds.top && touchY[i] <= playerBoxBounds.bottom) {
					//This canvas is being clicked on! Do something about it.
					var direction = "", lifeAdjust = 0
					if (playerList[n - 1].rotation == 0) {
						if (touchX[i] > playerBoxBounds.width / 2 + playerBoxBounds.x) {
							direction = "up"
							lifeAdjust = 1
						} else {
							direction = "down"
							lifeAdjust = -1
						}
					} else if (playerList[n - 1].rotation == 90) {
						if (touchY[i] > playerBoxBounds.height / 2 + playerBoxBounds.y) {
							direction = "up"
							lifeAdjust = 1
						} else {
							direction = "down"
							lifeAdjust = -1
						}
					} else if (playerList[n - 1].rotation == 180) {
						if (touchX[i] > playerBoxBounds.width / 2 + playerBoxBounds.x) {
							direction = "down"
							lifeAdjust = -1
						} else {
							direction = "up"
							lifeAdjust = 1
						}
					} else {
						if (touchY[i] > playerBoxBounds.height / 2 + playerBoxBounds.y) {
							direction = "down"
							lifeAdjust = -1
						} else {
							direction = "up"
							lifeAdjust = 1
						}
					}
					playerList[n - 1].holdTime += 1
					if (playerList[n - 1].direction != direction) {
						playerList[n - 1].holdTime = 0
						playerList[n - 1].direction = direction
					}
					if (playerList[n - 1].holdTime != 0 && playerList[n - 1].holdTime < 5) {
						lifeAdjust = 0
					} else if (playerList[n - 1].holdTime > 28) {
						lifeAdjust *= 5
						if (playerList[n - 1].holdTime >= 60) {
							lifeAdjust *= 2
						}
					}
					playerList[n - 1].life += lifeAdjust
					// console.log(lifeAdjust)
					// alert("Their life total is now " + playerList[n - 1].life)
					drawPlayerBox(n)
				} //else {
				// 	playerList[n - 1].firection = "none"
				// 	playerList[n - 1].holdTime = 0
				// }
			}
			// if (i == touchX.length - 1) {
			// 	//At the end, start the loop!
			// 	loop = setTimeout(updatePlayerBoxes, 100)
			// }
		}
		setTimeout(updatePlayerBoxes, 100)
	}
	// setTimeout(function() {alert(touchX[0] + ", " + touchY[0] + " & " + touchX[1] + ", " + touchY[1])}, 1000)
}
function clearTimers() {
	for (var i = 1; i <= playerList.length; i ++) {
		playerList[i - 1].direction = "none"
		playerList[i - 1].holdTime = 0
	}
}
function drawPlayerBox(playerBoxID) {
	var currentPlayerBox = playerList[playerBoxID - 1]
	var context = currentPlayerBox.canvas.customVarContext
	context.textBaseline = "middle"
	var tempFontSize = 100
	context.font = "100pt belerenbsc"
	context.fillStyle = currentPlayerBox.color
	var tempCanvasHeight = currentPlayerBox.canvas.height, tempCanvasWidth = currentPlayerBox.canvas.width
	if (playerList[playerBoxID - 1].rotation == 90 || playerList[playerBoxID - 1].rotation == 270) {
		tempCanvasHeight = tempCanvasWidth
		tempCanvasWidth = currentPlayerBox.canvas.height
	}
	context.fillRect(tempCanvasWidth / -2, tempCanvasHeight / -2, tempCanvasWidth, tempCanvasHeight)
	if (currentPlayerBox.image.src != "") {
		var imageToDraw = currentPlayerBox.image
		if (imageToDraw.width / imageToDraw.height > tempCanvasWidth / tempCanvasHeight) {
			//The image is wider and should be fitted to its height
			context.drawImage(imageToDraw, tempCanvasHeight / imageToDraw.height * imageToDraw.width / -2, tempCanvasHeight / -2, tempCanvasHeight / imageToDraw.height * imageToDraw.width, tempCanvasHeight)
		} else {
			//The image is taller and should be fitted to its width
			context.drawImage(imageToDraw, tempCanvasWidth / -2, tempCanvasWidth / imageToDraw.width * imageToDraw.height / -2, tempCanvasWidth, tempCanvasWidth / imageToDraw.width * imageToDraw.height)
		}
	}
	if (currentPlayerBox.life < 1) {
		context.fillStyle = "#0008"
		context.fillRect(tempCanvasWidth / -2, tempCanvasHeight / -2, tempCanvasWidth, tempCanvasHeight)
		context.fillStyle = "#800"
	} else {
		context.fillStyle = playerList[playerBoxID - 1].textColor
	}
	while (context.measureText(currentPlayerBox.life).width >= tempCanvasWidth) {
		tempFontSize -= 1
		context.font = tempFontSize + "pt belerenbsc"
	}
	var horizontalShift = -1 * parseInt(context.measureText(currentPlayerBox.life).width) / 2
	context.strokeStyle = "black"
	context.lineWidth = 5
	context.strokeText(currentPlayerBox.life, horizontalShift, 0)
	context.fillText(currentPlayerBox.life, horizontalShift, 0)
}
function drawAllPlayerBoxes() {
	for (var i = 1; i <= playerList.length; i ++) {
		drawPlayerBox(i)
	}
}
//Event Listener magic! (always records mouse/touch positions so the loop can work without events)
var touchX = [], touchY = [], clicking = false
document.getElementById("mainGrid").addEventListener("mousedown", startMouseCoordinates, true)
window.addEventListener("mousemove", updateMouseCoordinates, true)
window.addEventListener("mouseup", endMouseCoordinates, true)
function startMouseCoordinates() {
	clicking = true
	updatePlayerBoxes()
}
function updateMouseCoordinates() {
	touchX[0] = event.clientX
	touchY[0] = event.clientY
}
function endMouseCoordinates() {
	clearTimeout(loop)
	clearTimers()
	clicking = false
}
window.addEventListener("touchstart", switchToTouchEvents, true)
function switchToTouchEvents() {
	window.removeEventListener("touchstart", switchToTouchEvents, true)
	document.getElementById("mainGrid").removeEventListener("mousedown", startMouseCoordinates, true)
	window.removeEventListener("mousemove", updateMouseCoordinates, true)
	window.removeEventListener("mouseup", endMouseCoordinates, true)
	document.getElementById("mainGrid").addEventListener("touchstart", startTouch, true)
	window.addEventListener("touchmove", moveTouch, true)
	window.addEventListener("touchend", endTouch, true)
}
function startTouch() {
	moveTouch()
	if (!clicking) {
		clicking = true
		updatePlayerBoxes()
	} else {
		clicking = true
	}
}
function moveTouch() {
	touchX = [], touchY = []
	for (var i = 0; i < event.touches.length; i ++) {
		touchX[i] = event.touches[i].clientX
		touchY[i] = event.touches[i].clientY
	}
}
function endTouch() {
	moveTouch()
	if (event.touches.length == 0) {
		clicking = false
		clearTimeout(loop)
		clearTimers()
	}
}