
var transparentCanvas = document.createElement("canvas")
var transparentContext = transparentCanvas.getContext("2d")
//transparentCanvas.onload = function() {
	//document.body.appendChild(transparentCanvas) //For testing purposes only
//}
transparentCanvas.onload = function() {
	alert("WHAT")
}
//document.body.appendChild(transparentCanvas)
//Function that auto  the image
function whiteToTransparent(url, destination) {
    //Create image, size canvas, draw image
    var imgTempSetSymbol = new Image()
    imgTempSetSymbol.crossOrigin = "anonymous"
    imgTempSetSymbol.src = url
    imgTempSetSymbol.onload = function() {
    	if (imgTempSetSymbol.width > 0 && imgTempSetSymbol.height > 0) {
    		transparentCanvas.width = imgTempSetSymbol.width
    		transparentCanvas.height = imgTempSetSymbol.height
    		transparentCanvas.drawImage(imgTempSetSymbol, 0, 0)
            //declare variables
            var width = transparentCanvas.width
            var height = transparentCanvas.height
            var pix = {x:[], y:[]}
            var imageData = transparentContext.getImageData(0,0,transparentCanvas.width,transparentCanvas.height)
            var x, y, index
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
            var transparentImage = transparentContext.getImageData(pix.x[0], pix.y[0], width + 1, height + 1)
            //Resizes the canvas and draws  image
            transparentCanvas.width = width + 1
            transparentCanvas.height = height + 1
            transparentContext.putImageData(transparentImage, 0, 0)
            //Saves the newly  image to the given image
            destination.src = transparentCanvas.toDataURL()
        }
    }
}
