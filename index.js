// Fonction: Générer le QR Code

async function generer_QR() {
	var qrdiv = document.getElementById("qrcode");
	qrdiv.innerHTML = '';
	var url = document.getElementById("link").value;
	var qrc = new QRCode(qrdiv, url);
	await new Promise(r => setTimeout(r, 50));
	qrdiv.href = qrdiv.getElementsByTagName("img")[0].src;
	qrdiv.download = `QRCode ${url}.png`;
}

async function generer_QR_2(string, divID, colorFG="#000000", colorBG="#FFFFFF"){
	var qrdiv = document.getElementById(divID);
	qrdiv.innerHTML = '';
	var qrc = new QRCode(qrdiv, {
		text: string,
		width: 128,
		height: 128,
		colorDark : colorFG,
		colorLight : colorBG,
		correctLevel : QRCode.CorrectLevel.H
	});
	await new Promise(r => setTimeout(r, 50));
	qrdiv.href = qrdiv.getElementsByTagName("img")[0].src;
	qrdiv.download = `QRCode.png`;
}

// Fonction: Effacer le contenu de la zone de texte

function clear_box(id) {
	document.getElementById(id).value = '';
	document.getElementById(id).innerHTML = 'https://';
}

// Fonction: Afficher le générateur de QR Code

function show(id) {
	var divs = document.getElementsByClassName("gen");
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.display = "none";
	}
	document.getElementById(id).style.display = "block";
}
