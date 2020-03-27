//CSS & HTML stuff
window.layerElements = document.querySelectorAll('.layer')
window.addEventListener('resize', windowResized)
window.addEventListener('scroll', windowScrolled)
windowResized()

function windowResized() {
  window.windowHeight = window.innerHeight
  windowScrolled()
}
function windowScrolled() {
  for (var i = 0; i < layerElements.length; i++) {
    var positionFromTop = (layerElements[i].getBoundingClientRect().top + layerElements[i].getBoundingClientRect().bottom) / 2
    if (positionFromTop - windowHeight <= 0) {
      layerElements[i].classList.add('revealedLayer')
    }
  }
}