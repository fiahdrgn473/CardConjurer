//============================================//
//       Card Conjurer, by Kyle Burton        //
//============================================//
window.onscroll = function() {scrollFunction()}
window.onresize = function() {scrollFunction()}

function scrollFunction() {
	var scrollHeight = document.body.scrollTop
	if (scrollHeight < 0) {
		scrollHeight = 0
	}
	var titleHeight = parseInt(window.innerWidth * 141 / 1236 - 10);
	if (window.innerWidth >= 750) {
		if (window.innerWidth >= 970) {
			titleHeight = 100
		}
		if (scrollHeight < titleHeight - 30) {
    		document.getElementById("header").style.maxHeight =  titleHeight - scrollHeight
  		} else {
    		document.getElementById("header").style.maxHeight = "30px"
  		}
  		document.getElementsByClassName("mainGrid")[0].style.marginTop = titleHeight + 10
	} else {
		document.getElementsByClassName("mainGrid")[0].style.marginTop = 0
		document.getElementById("header").style.maxHeight = titleHeight
	}
}

//Toggles the visibility of predetermined sections of the input boxes
function toggleView(targetId, targetClass) {
	for (var i = 0; i < document.getElementsByClassName(targetClass).length; i++) {
		document.getElementsByClassName(targetClass)[i].classList.remove("shown")
	}
	document.getElementById(targetClass + "-" + targetId).classList.add("shown")
}

//Loads images from a file upload
function loadImage(event, destination) {
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

//closes alerts
var close = document.getElementsByClassName("closebtn")
for (var i = 0; i < close.length; i++) {
	close[i].onclick = function() {
		parentDiv = this.parentElement
		parentDiv.style.opacity = "0"
		setTimeout(function() {parentDiv.style.display = "none"}, 250)
	}
}

function createAlert(type, message) {
	var newAlert = document.createElement("DIV")
	newAlert.innerHTML = message
	newAlert.classList.add("alert", type)
	document.getElementById("alertMenu").appendChild(newAlert)
	newAlert.onclick = function() {
		this.style.opacity = "0"
		setTimeout(function() {newAlert.classList.add("hidden")}, 250)
	}
}

//things to run at the end:
scrollFunction()