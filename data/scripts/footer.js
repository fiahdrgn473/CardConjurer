// var xhttp = new XMLHttpRequest()
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     document.getElementById('footer').innerHTML = xhttp.responseText
//   }
// }
// xhttp.open('GET', 'https://cardconjurer.com/footer.txt')
// xhttp.send()
document.getElementById('footer').innerHTML = `
<div class='footer'>
    <div>
        <div>Theme</div>
        <hr>
        <div>
            <select id='inputColorPalette' onchange='loadScript("data/scripts/palettes/" + this.value + ".js")'>
                <option value='lightMode'>Light Mode</option>
                <option value='darkMode'>Dark Mode</option>
                <option value='dayRave'>Day Rave</option>
                <option value='nightRave'>Night Rave</option>
                <option value='scholarMode'>Scholar Mode</option>
            </select>
        </div>
    </div>
    <div>
        <div>Navigation</div>
        <hr>
        <div>
            <a href='index.html'>Card Creator</a><br>
            <a href='life.html'>Life Counter</a><br>
            <a href='askscryfall.html'>Ask Scryfall</a><br>
            <a href='phyrexian.html'>Phyrexian Text</a>
        </div>
    </div>
    <div>
        <div>Legal</div>
        <hr>
        <div>
            <a href='legal.html'>Terms and Conditions</a><br>
        </div>
    </div>
    <div>
        <div>Contact</div>
        <hr>
        <div>
            <label class="truncate"><a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=CardConjurerMTG@gmail.com&su=Card%20Conjurer&tf=1" target="_blank">CardConjurerMTG@gmail.com</a></label>
        </div>
    </div>
    <script defer src="data/scripts/animations.js"></script>
</div>
`