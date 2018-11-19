//Create a canvas to work on when making white pixels transparent
var transparentCanvas = document.createElement("canvas")
var transparentContext = transparentCanvas.getContext("2d")

//Function that auto  the image
function whiteToTransparent(targetImage) {
    //Create image, size canvas, draw image
    var imgTemporary = new Image()
    imgTemporary.crossOrigin = "anonymous"
    imgTemporary.src = targetImage.src
    imgTemporary.onload = function() {
    	if (imgTemporary.width > 0 && imgTemporary.height > 0) {
    		transparentCanvas.width = imgTemporary.width
    		transparentCanvas.height = imgTemporary.height
    		transparentContext.drawImage(imgTemporary, 0, 0)
            //declare variables
            var width = transparentCanvas.width
            var height = transparentCanvas.height
            var imageData = transparentContext.getImageData(0,0,transparentCanvas.width,transparentCanvas.height)
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
            targetImage.src = transparentCanvas.toDataURL()
        }
    }
}
