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
var aidCanvas = document.createElement('canvas');
var aidContext = aidCanvas.getContext('2d');
drawSheet();
//svgs
var cuttingGuides = new Image();
cuttingGuides.src = 'cuttingGuides.svg';
var testImg = document.createElement('IMG');
testImg.src = cuttingGuides.src;
document.body.appendChild(testImg);

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
    context.clearRect(0, 0, page[0] * ppi, page[1] * ppi);
    aidCanvas.width = canvas.width;
    aidCanvas.height = canvas.height;
    aidContext.clearRect(0, 0, page[0] * ppi, page[1] * ppi);
    const cardsX = Math.floor(page[0] / cardWidth);
    const cardsY = Math.floor(page[1] / cardHeight);
    var count = 0;
    for (var i = imageList.length - 1; i >= 0 && count < cardsX * cardsY; i --) {
        if (imageList[i].width > 1) {
            const cardX = (page[0] - cardsX * cardWidth) / 2 + (count % cardsX) * (cardWidth + cardMarginX) - cardMarginX;
            const cardY = (page[1] - cardsY * cardHeight) / 2 + (Math.floor(count / cardsX) % cardsY) * (cardHeight + cardMarginY) - cardMarginY;
            try {
                context.drawImage(imageList[i], cardX * ppi, cardY * ppi, cardWidth * ppi, cardHeight * ppi);
                if (document.querySelector('#cuttingAids').checked) {
                    context.drawImage(cuttingGuides, cardX * ppi, cardY * ppi, cardWidth * ppi, cardHeight * ppi);
                }
                if (document.querySelector('#cuttingAids').checked) {
                    aidContext.fillStyle = 'black';
                    aidContext.fillRect(Math.floor((cardX - cardMarginX / 2) * ppi + 2), Math.floor((cardY - cardMarginY / 2) * ppi + 2), Math.ceil((cardWidth + cardMarginX) * ppi - 4), Math.ceil((cardHeight + cardMarginY) * ppi - 4));
                    if ((Math.floor(count / cardsX) % cardsY) == 0) {
                        aidContext.clearRect((cardX - cardMarginX / 2) * ppi, (cardY - cardMarginY / 2) * ppi, (cardWidth + cardMarginX) * ppi, cardMarginY * ppi / 2);
                    } else if ((Math.floor(count / cardsX) % cardsY) == cardsY - 1) {
                        aidContext.clearRect((cardX - cardMarginX / 2) * ppi, (cardY + cardHeight) * ppi, (cardWidth + cardMarginX) * ppi, cardMarginY * ppi / 2);
                    }
                    if ((count % cardsX) == 0) {
                        aidContext.clearRect((cardX - cardMarginX / 2) * ppi, (cardY - cardMarginY / 2) * ppi, cardMarginX * ppi / 2, (cardHeight + cardMarginY) * ppi);
                    } else if ((count % cardsX) == cardsX - 1) {
                        aidContext.clearRect((cardX + cardWidth) * ppi, (cardY - cardMarginY / 2) * ppi, cardMarginX * ppi / 2, (cardHeight + cardMarginY) * ppi);
                    }
                }
            } catch {
                console.log('image failed.');
            }
        }
        count ++;
    }
    if (document.querySelector('#cuttingAids').checked) {
        context.globalCompositeOperation = 'destination-over';
        context.drawImage(aidCanvas, 0, 0, aidCanvas.width, aidCanvas.height);
        context.globalCompositeOperation = 'source-over';
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
    if (document.querySelector('#cuttingAids').checked) {
        doc.addImage(aidCanvas, 'PNG', 0, 0, page[0], page[1]);
    }
    for (var i = imageList.length - 1; i >= 0 && count < cardsX * cardsY; i --) {
        if (imageList[i].width > 1) {
            const cardX = (page[0] - cardsX * cardWidth) / 2 + (count % cardsX) * (cardWidth + cardMarginX) - cardMarginX;
            const cardY = (page[1] - cardsY * cardHeight) / 2 + (Math.floor(count / cardsX) % cardsY) * (cardHeight + cardMarginY) - cardMarginY;
            console.log(`image: ${imageList[i].filename}, bounds: ${cardX}, ${cardY}, ${cardWidth}, ${cardHeight}`);
            doc.addImage(imageList[i], 'PNG', cardX, cardY, cardWidth, cardHeight);
            if (document.querySelector('#cuttingAids').checked) {
                doc.addImage(cuttingGuides, 'PNG', cardX, cardY, cardWidth, cardHeight);
            }
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