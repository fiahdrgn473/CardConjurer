//Configure sizes
var ppi = 600;
var page = [8.5 * ppi, 11 * ppi];
var cardWidth = 2.5 * ppi;
var cardHeight = 3.5 * ppi;
var cardMarginX = parseInt(document.querySelector('#cardMargin').value);
var cardMarginY = parseInt(document.querySelector('#cardMargin').value);
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
    canvas.width = page[0];
    canvas.height = page[1];
    context.clearRect(0, 0, page[0], page[1]);
    const cardsX = Math.floor(page[0] / cardWidth);
    const cardsY = Math.floor(page[1] / cardHeight);
    var count = 0;
    for (var i = imageList.length - 1; i >= 0 && count < cardsX * cardsY; i --) {
        if (imageList[i].width > 1) {
            context.drawImage(imageList[i], (page[0] - cardsX * cardWidth) / 2 + (count % cardsX) * (cardWidth + cardMarginX) - cardMarginX, (page[1] - cardsY * cardHeight) / 2 + (Math.floor(count / cardsX) % cardsY) * (cardHeight + cardMarginY) - cardMarginY, cardWidth, cardHeight);
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
    var pageOrientation = 'portrait';
    if (page[0] > page[1]) {
        pageOrientation = 'landscape';
    }
    var doc = new jsPDF({
        orientation: pageOrientation,
        unit: 'in',
        format: [page[0] / ppi, page[1] / ppi]
    });
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, page[0] / ppi, page[1] / ppi);
    doc.save('print.pdf');
}

function setPageSize(size = [8.5, 11]) {
    page[0] = parseFloat(size[0]) * ppi;
    page[1] = parseFloat(size[1]) * ppi;
    drawSheet();
}

function setCardDistance(distance) {
    cardMarginX = parseInt(distance);
    cardMarginY = parseInt(distance);
    drawSheet();
}

function changeOrientation() {
    page = page.reverse();
    drawSheet();
}