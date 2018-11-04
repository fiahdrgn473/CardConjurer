function loadImage(event, destination, arg) {
	if (arg != false) {
		var input = event.target
		var reader = new FileReader()
		reader.onload = function() {
			var dataURL = reader.result
			destination.src = dataURL
			destination.cropped = false
			if (destination == imgWatermark) {
				imgWatermark.whiteToTransparent = false
			}
		}
		reader.readAsDataURL(input.files[0])
	}
}