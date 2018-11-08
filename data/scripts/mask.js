var mask = document.createElement("canvas")
var maskContext = mask.getContext("2d")

function drawMask(img, x, y, width, height, targetContext, imgMask, secondMask, arg) {
    if (imgMask.width > 0) {
        var context = targetContext
        mask.width = width
        mask.height = height
        maskContext.clearRect(0, 0, width, height)
        maskContext.globalCompositeOperation = "source-over"
        if (secondMask.src != undefined && secondMask.width > 0) {
            maskContext.drawImage(secondMask, 0, 0, width, height)
            if (arg == "reverseSecond") {
                maskContext.globalCompositeOperation = "source-out"
            } else {
                maskContext.globalCompositeOperation = "source-in"
            }
        }
        //console.log(width + ", " + height + " --- " + imgMask.width + ", " + imgMask.height + " --- " + img.width + ", " + img.height)
        maskContext.drawImage(imgMask, 0, 0, width, height)
        maskContext.globalCompositeOperation = "source-in"
        if (img.src == undefined) {
            maskContext.fillStyle = img
            maskContext.fillRect(0, 0, width, height)
        } else if (img.width > 0) {
            maskContext.drawImage(img, 0, 0, width, height)
        }
        targetContext.drawImage(mask, x, y, width, height)
    }
}
