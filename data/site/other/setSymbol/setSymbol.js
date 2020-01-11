var svg = document.getElementById('displaySVG');
var svgWidth = 500, svgHeight = 500, setSymbolWidth = 300, setSymbolHeight = 300;
var svgStroke = svg.children[1]
var svgFill = svg.children[2]
svg.setAttribute('width', svgWidth);
svg.setAttribute('height', svgHeight);
var imageType = 'svg';
var canvas = document.getElementById('displayCanvas');
canvas.width = svgWidth
canvas.height = svgHeight
var context = canvas.getContext('2d');
var setSymbolImage = new Image();
setSymbolImage.onload = drawSetSymbol;
var setSymbolPath = '';
fetchSVGData('https://raw.githubusercontent.com/andrewgioia/Keyrune/master/svg/rtr.svg');


function fetchSVGData(url) {
    hideShow();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && xhttp.status != 404) {
            imageType = 'svg'
            setSymbolPath = xhttp.responseText.split('d="')[1].split('"></path>')[0];
            svgStroke.setAttribute('d', setSymbolPath);
            svgFill.setAttribute('d', setSymbolPath);
            var svgPathBoundingBox = svgStroke.getBBox();
            if (svgPathBoundingBox.width > svgPathBoundingBox.height) {
                scaleAmount = setSymbolWidth / svgPathBoundingBox.width;
            } else {
                scaleAmount = setSymbolHeight / svgPathBoundingBox.height;
            }
            svgStroke.setAttribute('transform', 'scale(' + scaleAmount + ') translate(' + parseFloat(((svgWidth - svgPathBoundingBox.width * scaleAmount)/2/scaleAmount)-svgPathBoundingBox.x) + ', ' + parseFloat(((svgHeight - svgPathBoundingBox.height * scaleAmount)/2/scaleAmount)-svgPathBoundingBox.y) + ')');
            svgFill.setAttribute('transform', 'scale(' + scaleAmount + ') translate(' + parseFloat(((svgWidth - svgPathBoundingBox.width * scaleAmount)/2/scaleAmount)-svgPathBoundingBox.x) + ', ' + parseFloat(((svgHeight - svgPathBoundingBox.height * scaleAmount)/2/scaleAmount)-svgPathBoundingBox.y) + ')');
            decorateSVG();
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
}

function decorateSVG() {
    if (imageType == 'svg') {
        var setSymbolGradient = document.getElementById('inputSetSymbolRarity').value;
        var setSymbolStrokeColor = 'black';
        if (setSymbolGradient == 'Common') {
            setSymbolStrokeColor = 'white'
        }
        svgStroke.setAttribute('stroke', setSymbolStrokeColor)
        svgFill.setAttribute('fill', 'url(#grad' + setSymbolGradient + ')');
    } else {
        drawSetSymbol()
    }
}

function downloadSetSymbolImage(linkElement) {
    linkElement.download = 'setSymbol.' + imageType
    if (imageType == 'svg') {
        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg);
        
        //add name spaces.
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }
        
        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
        
        //convert svg source to URI data scheme.
        var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
        
        //set url value to a element's href attribute.
        linkElement.href = url;
    } else {
        var setSymbolDownload = canvas.toDataURL();
        linkElement.href = setSymbolDownload;
    }
}

function uploadImage(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function() {
        imageType = 'png';
        hideShow();
        setSymbolImage.src = reader.result;
    }
    reader.readAsDataURL(input.files[0]);
}

function drawSetSymbol() {
    var scaleAmount;
    if (setSymbolImage.width > setSymbolImage.height) {
        scaleAmount = setSymbolWidth / setSymbolImage.width;
    } else {
        scaleAmount = setSymbolHeight / setSymbolImage.height;
    }
    context.globalCompositeOperation = 'source-over';
    context.clearRect(0, 0, svgWidth, svgHeight);
    var x1 = (svgWidth - setSymbolImage.width * scaleAmount) / 2, y1 = (svgHeight - setSymbolImage.height * scaleAmount) / 2, x2 = x1 + setSymbolImage.width * scaleAmount, y2 = y1 + setSymbolImage.height * scaleAmount;
    context.drawImage(setSymbolImage, x1, y1, x2 - x1, y2 - y1);
    context.globalCompositeOperation = 'source-in';
    var gradient = context.createLinearGradient(x1, y1, x2, y1);
    var gradientColors = document.getElementById('grad' + document.getElementById('inputSetSymbolRarity').value).innerHTML.split('stop-color:');
    gradient.addColorStop(0, gradientColors[1].split(';')[0]);
    gradient.addColorStop(0.5, gradientColors[2].split(';')[0]);
    gradient.addColorStop(1, gradientColors[3].split(';')[0]);
    context.fillStyle = gradient;
    context.fillRect(x1, y1, x2 - x1, y2 - y1);
}

function hideShow() {
    if (imageType == 'svg') {
        if (svg.classList.contains('hidden')) {
            svg.classList.remove('hidden');
        }
        if (!canvas.classList.contains('hidden')) {
            canvas.classList.add('hidden');
        }
    } else {
        if (canvas.classList.contains('hidden')) {
            canvas.classList.remove('hidden');
        }
        if (!svg.classList.contains('hidden')) {
            svg.classList.add('hidden');
        }
    }
}


