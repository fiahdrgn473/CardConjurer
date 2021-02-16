//Configure sizes
var ppi = 600;
var pageWidth = 8.5 * ppi;
var pageHeight = 11 * ppi;
var cardWidth = 2.5 * ppi;
var cardHeight = 3.5 * ppi;
var cardMarginX = 10;
var cardMarginY = 10;
//Prepare variables/canvas/context
var imageList = [];
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
drawSheet();


function uploadCard(card) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {imageList.push(this); drawSheet();}
    img.src = card;
}

function drawSheet() {
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    context.clearRect(0, 0, pageWidth, pageHeight);
    const cardsX = Math.floor(pageWidth / cardWidth);
    const cardsY = Math.floor(pageHeight / cardHeight);
    var count = 0;
    for (var i = imageList.length - 1; i >= 0 && count < cardsX * cardsY; i --) {
        if (imageList[i].width > 1) {
            context.drawImage(imageList[i], (pageWidth - cardsX * cardWidth) / 2 + (count % cardsX) * (cardWidth + cardMarginX) - cardMarginX, (pageHeight - cardsY * cardHeight) / 2 + (Math.floor(count / cardsX) % cardsY) * (cardHeight + cardMarginY) - cardMarginY, cardWidth, cardHeight);
        }
        count ++;
    }
}

async function downloadSheet() {
    var download = document.createElement('a');
    download.download = 'print.png';
    download.href = canvas.toDataURL();
    document.body.appendChild(download);
    await download.click();
    download.remove();
}

function downloadPDF() {
    var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: [pageWidth / ppi, pageHeight / ppi]
    });
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pageWidth / ppi, pageHeight / ppi);
    doc.save('print.pdf');
}

function setPageSize(size = [8.5, 11]) {
    pageWidth = parseFloat(size[0]) * ppi;
    pageHeight = parseFloat(size[1]) * ppi;
    drawSheet();
}

function setCardDistance(distance) {
    cardMarginX = parseInt(distance);
    cardMarginY = parseInt(distance);
    drawSheet();
}

function changeOrientation() {
    var oldWidth = pageWidth;
    pageWidth = pageHeight;
    pageHeight = oldWidth;
    drawSheet();
}