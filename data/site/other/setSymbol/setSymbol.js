var svg = document.getElementById('displaySVG');
var svgWidth = 500, svgHeight = 500, setSymbolWidth = 300, setSymbolHeight = 300;
var svgStroke = svg.children[1]
var svgFill = svg.children[2]
svg.setAttribute('width', svgWidth);
svg.setAttribute('height', svgHeight);
fetchSVGData('rtr');

function fetchSVGData(setCode) {
    var url = 'https://raw.githubusercontent.com/andrewgioia/Keyrune/master/svg/' + setCode + '.svg';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
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
    var setSymbolGradient = document.getElementById('inputSetSymbolRarity').value;
    var setSymbolStrokeColor = 'black';
    if (setSymbolGradient == 'Common') {
        setSymbolStrokeColor = 'white'
    }
    svgStroke.setAttribute('stroke', setSymbolStrokeColor)
    svgFill.setAttribute('fill', 'url(#grad' + setSymbolGradient + ')');
}

function downloadSetSymbolImage(linkElement) {
//    var setSymbolDownload = cardFinalCanvas.toDataURL()
//    linkElement.href = setSymbolDownload
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
}
