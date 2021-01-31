//Configure sizes
const ppi = 600;
const pageWidth = 8.5 * ppi;
const pageHeight = 11 * ppi;
const cardWidth = 2.5 * ppi;
const cardHeight = 3.5 * ppi;
const cardMarginX = 10;
const cardMarginY = 10;
//Prepare variables/canvas/context
var imageList = [];
var canvas = document.querySelector('canvas');
canvas.width = pageWidth;
canvas.height = pageHeight;
var context = canvas.getContext('2d');
//Prepare pdf
// const doc = new jsPDF({
//     orientation: 'portrait',
//     unit: 'in',
//     format: [pageWidth / ppi, pageHeight / ppi]
// });
//Draw blank page
drawSheet();

function uploadCard(card) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {imageList.push(this); drawSheet();}
    img.src = card;
}

function drawSheet() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, pageWidth, pageHeight);
    const cardsX = Math.floor(pageWidth / cardWidth);
    const cardsY = Math.floor(pageHeight / cardHeight);
    var count = 0;
    for (var i = imageList.length - 1; i >= 0 && count < 9; i --) {
        if (imageList[i].width > 1) {
            context.drawImage(imageList[i], (pageWidth - cardsX * cardWidth - cardMarginX) / 2 + (count % cardsX) * (cardWidth + cardMarginX), (pageHeight - cardsY * cardHeight - cardMarginY) / 2 + (Math.floor(count / cardsX) % cardsY) * (cardHeight + cardMarginY), cardWidth, cardHeight);
        }
        count ++;
    }
}

async function downloadSheet() {
    // doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 8.5, 11);
    // doc.save('print.pdf');
    var download = document.createElement('a');
    download.download = 'print.png';
    download.href = canvas.toDataURL();
    document.body.appendChild(download);
    await download.click();
    download.remove();
}