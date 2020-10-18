var imageElementList = []
const imageHeight = 525
var windowY

function readGalleryImageList() {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			buildHTML(this.responseText.split('\n'))
		}
	}
	xhttp.open('GET', '/gallery/galleryImageNameList.txt', true)
	xhttp.send()
}

readGalleryImageList()

function buildHTML(imageNameList) {
	imageNameList.forEach(function(item) {
		var element = document.createElement('div')
		var label = document.createElement('div')
		var image = document.createElement('img')
		element.classList = 'galleryCard galleryHidden'
		if (item.includes('Wasteland.png')) {
			element.classList += ' filterHidden'
		}
		image.imageName = item
		image.addEventListener('click', zoomImage)
		label.innerHTML = item.replace('.png', '').replace('_', ' ')
		element.appendChild(image)
		element.appendChild(label)
		document.getElementById('imageGallery').appendChild(element)
		imageElementList.push(element)
	})
	scrollEvent()
}

function zoomImage(event) {
	document.getElementById('fullImage').src = '/gallery/images/fullres/' + event.target.imageName
	document.getElementById('fullImage').classList = 'visible'
	document.getElementById('fullImagePreview').src = '/gallery/images/preview/' + event.target.imageName
	document.getElementById('fullImagePreview').classList = 'visible'
	document.getElementById('fullImageViewbox').classList = 'visible'
	windowY = window.scrollY
}

function unzoomImage() {
	document.getElementById('fullImage').classList = ''
	document.getElementById('fullImagePreview').classList = ''
	setTimeout(function(){document.getElementById('fullImageViewbox').classList = ''; document.getElementById('fullImage').src = ''}, 300)
}

window.addEventListener('scroll', scrollEvent, false)

function scrollEvent() {
	if (document.getElementById('fullImageViewbox').classList == 'visible') {
		window.scrollTo(0, windowY)
		return
	}
	windowInnerHeight = window.innerHeight
	imageElementList.forEach(function(element) {
		boundingRect = element.getBoundingClientRect()
		if (element.classList.contains('galleryHidden') && boundingRect.bottom >= 0 && boundingRect.top - windowInnerHeight <= 0) {
			element.children[0].src = '/gallery/images/preview/' + element.children[0].imageName
			element.classList.replace('galleryHidden', 'galleryVisible')
		}
	})
}

function sort(word) {
	imageElementList.forEach(function(element) {
		if (!element.classList.contains('filterHidden')) {
			element.classList.add('filterHidden')
		}
		if (element.children[1].innerHTML.toLowerCase().includes(word.toLowerCase())) {
			element.classList.remove('filterHidden')
		}
	})
	scrollEvent()
}