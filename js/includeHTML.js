function includeHTML() {
	var elementList = document.getElementsByTagName('*');
	for (var i = 0; i < elementList.length; i ++) {
		element = elementList[i];
		var file = element.getAttribute('html-include');
		if (file) {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						element.innerHTML = this.responseText;
					} else if (this.status == 404) {
						element.innerHTML = 'HTML inclusion not found';
					}
					element.removeAttribute('html-include');
					includeHTML();
				}
			}
			xhttp.open('GET', file, true);
			xhttp.send();
			return;
		}
	}
}