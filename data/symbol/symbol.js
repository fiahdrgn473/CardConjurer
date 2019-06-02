//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
canvas = document.getElementById("canvas")
symbol = canvas.getContext("2d")
maskCanvas = document.createElement("canvas")
maskContext = maskCanvas.getContext("2d")
transparentCanvas = document.createElement("canvas")
transparentContext = transparentCanvas.getContext("2d")
cropCanvas = document.createElement("canvas")
cropContext = cropCanvas.getContext("2d")
gradientCanvas = document.createElement("canvas")
gradientCanvas.width = 750
gradientCanvas.height = 750
gradientContext = gradientCanvas.getContext("2d")
finalCanvas = document.createElement("canvas")
finalContext = finalCanvas.getContext("2d")

symbol.fillStyle = "black"

var imgOriginalSymbol = new Image()
var imgTransparentSymbol = new Image()
var imgCroppedSymbol = new Image()
var imgTempFinalSymbol = new Image()
var imgFinalSymbol = new Image()

imgOriginalSymbol.crossOrigin = "anonymous"
imgTransparentSymbol.crossOrigin = "anonymous"
imgCroppedSymbol.crossOrigin = "anonymous"
imgTempFinalSymbol.crossOrigin = "anonymous"
imgFinalSymbol.crossOrigin = "anonymous"

imgOriginalSymbol.onload = function() {
	whiteToTransparent(imgOriginalSymbol, imgTransparentSymbol)
}
imgTransparentSymbol.onload = function() {
	autocrop(imgTransparentSymbol, imgCroppedSymbol)
}
imgCroppedSymbol.onload = function() {
	createSymbol()
}
imgTempFinalSymbol.onload = function() {
	autocrop(this, imgFinalSymbol)
}
imgFinalSymbol.onload = function() {
	finalCanvas.width = imgFinalSymbol.width
	finalCanvas.height = imgFinalSymbol.height
	finalContext.clearRect(0, 0, finalCanvas.width, finalCanvas.height)
	finalContext.drawImage(imgFinalSymbol, 0, 0)
}

function createSymbol() {
	if (imgCroppedSymbol.src != "") {
		symbol.clearRect(0, 0, canvas.width, canvas.height)
		maskContext.globalCompositeOperation = "source-over"
		maskCanvas.width = imgCroppedSymbol.width
		maskCanvas.height = imgCroppedSymbol.height
		maskContext.clearRect(0, 0, maskCanvas.width, maskCanvas.height)
		maskContext.drawImage(imgCroppedSymbol, 0, 0)
		maskContext.globalCompositeOperation = "source-in"
		maskContext.fillStyle = document.getElementById("inputBorderColor").value
		maskContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height)
		var symbolSize = 500
		if (imgCroppedSymbol.width > imgCroppedSymbol.height) {
			width = symbolSize
			height = imgCroppedSymbol.height * symbolSize / imgCroppedSymbol.width
		} else {
			width = imgCroppedSymbol.width * symbolSize / imgCroppedSymbol.height
			height = symbolSize
		}
		var borderThickness = parseInt(document.getElementById("inputBorderThickness").value)
		var left = 375 - borderThickness
		var right = 375 + borderThickness
		var top = 375 - borderThickness
		var bottom = 375 + borderThickness
		for (var x = left; x <= right; x++) {
			for (var y = top; y <= bottom; y++) {
				symbol.drawImage(maskCanvas, x - width / 2, y - height / 2, width, height)
			}
		}
		gradientContext.globalCompositeOperation = "source-over"
		gradientContext.clearRect(0, 0, gradientCanvas.width, gradientCanvas.height)
		gradientContext.drawImage(imgCroppedSymbol, 375 - width / 2, 375 - height / 2, width, height)
		gradientContext.globalCompositeOperation = "source-in"
		var angle = parseInt(document.getElementById("inputGradientAngle").value) * Math.PI / 180
		while (angle <= 0) {
			angle += Math.PI * 2
		}
		while (angle > Math.PI * 2) {
			angle -= Math.PI * 2
		}
		var outerColor = document.getElementById("inputOuterColor").value
		var innerColor = document.getElementById("inputInnerColor").value
		if (document.getElementById("inputRarity").value != "custom") {
			outerColor = document.getElementById("inputRarity").value.split(",")[0]
			innerColor = document.getElementById("inputRarity").value.split(",")[1]
		}
		var gradientHorizontal = 0
		var gradientVertical = 0
		if (angle > 7 * Math.PI / 4 || angle <= Math.PI / 4) {
			gradientHorizontal = 250
			gradientVertical = Math.sin(angle) * 250 / Math.cos(angle)
		} else if (angle > 5 * Math.PI / 4) {
			gradientHorizontal = Math.sin(3 * Math.PI / 2 - angle) * -250 / Math.sin(angle - Math.PI)
			gradientVertical = -250
		} else if (angle > 3 * Math.PI / 4) {
			gradientHorizontal = -250
			gradientVertical = Math.sin(Math.PI - angle) * 250 / Math.cos(Math.PI - angle)
		} else {
			gradientHorizontal = Math.cos(angle) * 250 / Math.sin(angle)
			gradientVertical = 250
		}
		var gradient = gradientContext.createLinearGradient(375 - gradientHorizontal, 375 - gradientVertical, 375 + gradientHorizontal, 375 + gradientVertical)
		gradient.addColorStop(0, outerColor)
		gradient.addColorStop(0.5, innerColor)
		gradient.addColorStop(1, outerColor)
		gradientContext.fillStyle = gradient

		gradientContext.fillRect(125, 125, 500, 500)
		symbol.drawImage(gradientCanvas, 0, 0)

		imgTempFinalSymbol.src = canvas.toDataURL()
	}
}



//Function that auto... makes the image's white pixels transparent
function whiteToTransparent(source, destination) {
    //Create image, size canvas, draw image
    var imgTempTarget = new Image()
    imgTempTarget.crossOrigin = "anonymous"
    imgTempTarget.src = source.src
    imgTempTarget.onload = function() {
    	if (imgTempTarget.width > 0 && imgTempTarget.height > 0) {
    		transparentCanvas.width = imgTempTarget.width
    		transparentCanvas.height = imgTempTarget.height
    		transparentContext.drawImage(imgTempTarget, 0, 0)
            //declare variables
            var width = transparentCanvas.width
            var height = transparentCanvas.height
            var imageData = transparentContext.getImageData(0, 0, transparentCanvas.width, transparentCanvas.height)
            var x, y, index
            //Go through every pixel and
            for (y = 0; y < height; y++) {
            	for (x = 0; x < width; x++) {
                    index = (y * width + x) * 4
                    if (imageData.data[index] >= 250 && imageData.data[index + 1] >= 250 && imageData.data[index + 2] >= 250) {
                        imageData.data[index + 3] = 0
                    }
                }
            }
            transparentContext.clearRect(0, 0, width, height)
            transparentContext.putImageData(imageData, 0, 0)
            destination.src = transparentCanvas.toDataURL()
        }
    }
}


//Function that autocrops the image
function autocrop(source, destination) {
    //Create image, size canvas, draw image
    var imgTempTarget = new Image()
    imgTempTarget.crossOrigin = "anonymous"
    imgTempTarget.src = source.src
    imgTempTarget.onload = function() {
        if (imgTempTarget.width > 0 && imgTempTarget.height > 0) {
            cropCanvas.width = imgTempTarget.width
            cropCanvas.height = imgTempTarget.height
            cropContext.drawImage(imgTempTarget, 0, 0)
            //declare variables
            var width = cropCanvas.width
            var height = cropCanvas.height
            var pix = {x:[], y:[]}
            var imageData = cropContext.getImageData(0, 0, cropCanvas.width, cropCanvas.height)
            var x, y, index
            if (imageData.data.length > 4) {
            	//Go through every pixel and
	            for (y = 0; y < height; y++) {
	                for (x = 0; x < width; x++) {
	                    //(y * width + x) * 4 + 3 calculates the index at which the alpha value of the pixel at x, y is given
	                    index = (y * width + x) * 4 + 3
	                    if (imageData.data[index] > 0) {
	                        //pix is the image object that stores two arrays of x and y coordinates. These stored coordinates are all the visible pixels
	                        pix.x.push(x)
	                        pix.y.push(y)
	                    }
	                }
	            }
	            //sorts the arrays numerically
	            pix.x.sort(function(a,b){return a-b})
	            pix.y.sort(function(a,b){return a-b})
	            var n = pix.x.length - 1
	            //Finds the difference between the leftmost and rightmost visible pixels, and the topmost and bottommost pixels, cuts out a section of the canvas
	            width = pix.x[n] - pix.x[0]
	            height = pix.y[n] - pix.y[0]
	            var cropped = cropContext.getImageData(pix.x[0], pix.y[0], width + 1, height + 1)
	            //Resizes the canvas and draws cropped image
	            cropCanvas.width = width + 1
	            cropCanvas.height = height + 1
	            cropContext.putImageData(cropped, 0, 0)
	            //Saves the newly cropped image to the given image
	            destination.src = cropCanvas.toDataURL()
            }
        }
    }
}



//Loads images via URL
function imageURL(input, targetImage, processes) {
	targetImage.cropStatus = processes
	targetImage.src = "https://cors-anywhere.herokuapp.com/" + input
}

//Downloads the image!
function downloadCardImage(linkElement) {
	var symbolImageData = finalCanvas.toDataURL()
	if (symbolImageData == undefined) {
		alert("Sorry, it seems that you cannot download your symbol. Please try using a different browser/device.")
	}
	linkElement.href = symbolImageData
}