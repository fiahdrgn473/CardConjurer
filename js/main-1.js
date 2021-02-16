function toggleMenu() {
	if (document.querySelector('.hamburger').classList.contains('opened')) {
		document.querySelector('.hamburger').classList.remove('opened');
		Array.from(document.querySelectorAll('.menu-visible')).forEach(element => element.classList.remove('menu-visible'));
	} else {
		document.documentElement.style.setProperty('--window-diagonal-size', (Math.floor(Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)) + 100) + 'px');
		document.querySelector('.hamburger').classList.add('opened');
		document.querySelector('.menu').classList.add('menu-visible');
	}
}
function notify(message = '', seconds) {
	var notification = document.createElement('div');
	notification.classList = 'notification padding';
	var notificationMessage = document.createElement('h4');
	notificationMessage.innerHTML = message;
	notification.appendChild(notificationMessage);
	var close = document.createElement('h3');
	close.innerHTML = 'X';
	close.onclick = closeNotification;
	notification.appendChild(close);
	document.querySelector('.notification-container').appendChild(notification);
	if (seconds) {
		setTimeout(function(){close.click();}, seconds * 1000)
	}
}
function closeNotification(event) {
	var target = event.target.closest('.notification');
	target.classList.add('hidden');
	setTimeout(function(){target.remove();}, 500);
}
window.onload = function() {
	Array.from(document.querySelectorAll('input')).forEach(element => {
		element.autocomplete = 'off';
	});
}

// Drop to upload
const droppables = document.querySelectorAll('.drop-area');
Array.from(droppables).forEach(element => {
	element.addEventListener('dragenter', dropEnter, false);
	element.addEventListener('dragleave', dropLeave, false);
	element.addEventListener('dragover', dropOver, false);
	element.addEventListener('drop', dropDrop, false);
})
function dropEnter(e) {
	e.preventDefault();
	e.stopPropagation();
	e.target.closest('.drop-area').classList.add('hover');
}
function dropLeave(e) {
	e.preventDefault();
	e.stopPropagation();
	e.target.closest('.drop-area').classList.remove('hover');
}
function dropOver(e) {
	e.preventDefault();
	e.stopPropagation();
	e.target.closest('.drop-area').classList.add('hover');
}
function dropDrop(e) {
	e.preventDefault();
	e.stopPropagation();
	e.target.closest('.drop-area').classList.remove('hover');
	destination = window[e.target.closest('.drop-area').children[1].getAttribute('data-dropFunction')];
	otherParams = e.target.closest('.drop-area').children[1].getAttribute('data-otherParams');
	uploadFiles(e.dataTransfer.files, destination, otherParams);
}
async function uploadFiles(filesRaw, destination, otherParams) {
	var files = ([...filesRaw]);
	if (files.length > 9) {
		if (!confirm('You are uploading ' + files.length + ' images. Would you like to continue?')) {
			return;
		}
	}
	files.forEach(file => {
		var reader = new FileReader();
		reader.onloadend = function () {
			destination(reader.result, otherParams);
		}
		reader.onerror = function () {
			destination('/img/blank.png', otherParams);
		}
		reader.readAsDataURL(file);
	})
}