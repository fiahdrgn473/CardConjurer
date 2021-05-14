//Configure sizes
var ppi = 600;
var page = [8.5, 11];
var cardWidth = 2.5;
var cardHeight = 3.5;
var cardMarginX = parseInt(document.querySelector('#cardMargin').value) / ppi;
var cardMarginY = parseInt(document.querySelector('#cardMargin').value) / ppi;
//Prepare variables/canvas/context
var imageList = [];
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
drawSheet();


function uploadCard(card, filename) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {imageList.push(this); drawSheet();}
    img.filename = filename.replace('filename=', '');
    img.src = card;
}

function drawSheet() {
    canvas.width = page[0] * ppi;
    canvas.height = page[1] * ppi;
    context.clearRect(0, 0, page[0], page[1]);
    const cardsX = Math.floor(page[0] / cardWidth);
    const cardsY = Math.floor(page[1] / cardHeight);
    var count = 0;
    for (var i = imageList.length - 1; i >= 0 && count < cardsX * cardsY; i --) {
        if (imageList[i].width > 1) {
            const cardX = (page[0] - cardsX * cardWidth) / 2 + (count % cardsX) * (cardWidth + cardMarginX) - cardMarginX;
            const cardY = (page[1] - cardsY * cardHeight) / 2 + (Math.floor(count / cardsX) % cardsY) * (cardHeight + cardMarginY) - cardMarginY;
            try {
                context.drawImage(imageList[i], cardX * ppi, cardY * ppi, cardWidth * ppi, cardHeight * ppi);
            } catch {
                console.log('image failed.');
            }
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
        format: [page[0], page[1]]
    });
    const cardsX = Math.floor(page[0] / cardWidth);
    const cardsY = Math.floor(page[1] / cardHeight);
    var count = 0;
    for (var i = imageList.length - 1; i >= 0 && count < cardsX * cardsY; i --) {
        if (imageList[i].width > 1) {
            const cardX = (page[0] - cardsX * cardWidth) / 2 + (count % cardsX) * (cardWidth + cardMarginX) - cardMarginX;
            const cardY = (page[1] - cardsY * cardHeight) / 2 + (Math.floor(count / cardsX) % cardsY) * (cardHeight + cardMarginY) - cardMarginY;
            console.log(`image: ${imageList[i].filename}, bounds: ${cardX}, ${cardY}, ${cardWidth}, ${cardHeight}`)
            doc.addImage(imageList[i], 'PNG', cardX, cardY, cardWidth, cardHeight);
        }
        count ++;
    }
    doc.save('print.pdf');
}

function setPageSize(size = [8.5, 11]) {
    page[0] = parseFloat(size[0]);
    page[1] = parseFloat(size[1]);
    drawSheet();
}

function setCardSize(size = [2.5, 3.5]) {
    cardWidth = parseFloat(size[0]);
    cardHeight = parseFloat(size[1]);
    drawSheet();
}

function setCardDistance(distance) {
    cardMarginX = parseInt(distance) / ppi;
    cardMarginY = parseInt(distance) / ppi;
    drawSheet();
}

function changeOrientation() {
    page = page.reverse();
    drawSheet();
}

function setPPI(inputPPI) {
    ppi = parseInt(inputPPI);
    setPageSize([page[0], page[1]]);
    setCardSize([cardWidth, cardHeight]);
}