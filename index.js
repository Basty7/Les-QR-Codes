// Fonction: Générer le QR Code

async function generer_QR() {
	var qrdiv = document.getElementById("qrcode");
	qrdiv.innerHTML = '';
	var url = document.getElementById("link").value;
	var qrc = new QRCode(qrdiv, url);
	await new Promise(r => setTimeout(r, 100));
	var qrimg = qrdiv.getElementsByTagName("img")[0];
	qrdiv.href = qrimg.src;
	qrdiv.download = `QRCode ${url}.png`;
}

async function generer_QR_2(string, divID) {
	var qrdiv = document.getElementById(divID);
	qrdiv.innerHTML = '';
	var border = document.getElementById("border").value;
	var colorFG = document.getElementById("colorFG").value;
	var colorBG = document.getElementById("colorBG").value;
	if (colorFG == "") {
		colorFG = "#000000";
	}
	if (colorBG == "") {
		colorBG = "#ffffff";
	}
	if (border == "") {
		border = 0;
	}
	var qrc = new QRCode(qrdiv, {
		text: string,
		width: 256 + 8*border,
		height: 256 + 8*border,
		useSVG: true,
		border: border,
		colorDark: colorFG,
		colorLight: colorBG,
		correctLevel: QRCode.CorrectLevel.H
		
	});

	await new Promise(r => setTimeout(r, 100));
	// var qrimg = qrdiv.getElementsByTagName("img")[0];
	// qrimg.onload = function () {
	// 	qrdiv.href = qrimg.src;
	// 	qrimg.classList.add("qrimg");
	// 	qrdiv.download = `QRCode.png`;
	// 	qrdiv.title = "Télécharger le Code QR";

	// };
	var svg = qrdiv.innerHTML;
	qrdiv.getElementsByTagName("svg")[0].classList.add("qrimg");
	svg = svg.slice(0, 4) + ' xmlns="http://www.w3.org/2000/svg"' + svg.slice(4);
	qrdiv.download = `QRCode.svg`;
	qrdiv.title = "Télécharger le Code QR";
	qrdiv.href = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));;
}

// Fonction: Effacer le contenu de la zone de texte

function clear_box(id) {
	document.getElementById(id).value = '';
}

// Fonction: Afficher le générateur de QR Code

function show(id) {
	var divs = document.getElementsByClassName("gen");
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.display = "none";
	}
	document.getElementById(id).style.display = "inline-block";
	document.getElementById("colors").style.display = "inline-block";
}

if (location.href.split("/").slice(-1) == "index.html" || location.href.split("/").slice(-1) == "index.html#") {
	document.getElementById('link').addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			generer_QR();
		}
	});
	document.getElementById("url_gen").addEventListener("click", function () {
		generer_QR();
	});
}
else if (location.href.split("/").slice(-1)[0] == "gen.html#" || location.href.split("/").slice(-1)[0] == "gen.html") {
	// document.getElementById("func_select").addEventListener("change", function () {show(this.value);});
	// Nouveau DropDown
	document.getElementById("funcs_bt").addEventListener("mouseover", function () {
		var funcs = document.getElementById("funcs");
		funcs.className = "funcs_sel_hover";
	});
	document.getElementById("funcs").addEventListener("mouseover", function () {
		var funcs = document.getElementById("funcs");
		funcs.className = "funcs_sel_hover";
	});

	document.getElementById("funcs_bt").addEventListener("mouseout", function () {
		var funcs = document.getElementById("funcs");
		funcs.className = "funcs_sel";
	});
	document.getElementById("funcs").addEventListener("mouseout", function () {
		var funcs = document.getElementById("funcs");
		funcs.className = "funcs_sel";
	});
	var funcs = document.getElementById("funcs");
	for (var i = 0; i < funcs.children.length; i++) {
		funcs.children[i].addEventListener("click", function () {
			// console.log(this.id.slice(7));
			show(this.id.slice(7));
		});
		document.getElementById(funcs.children[i].id.slice(7)).addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				event.preventDefault();
				console.log(this.id+"_gen");
				document.getElementById(this.id+"_gen").click();
			}
		});
	}


	// WIFI
	document.getElementById("wifi_gen").addEventListener("click", function () {
		var ssid = document.getElementById("ssid").value;
		var mdp = document.getElementById("mdp").value;
		var secu = document.getElementById("secu").value;
		var visi = document.getElementById("visi").value;
		generer_QR_2(`WIFI:S:${ssid};T:${secu};P:${mdp};H:${visi};;`, "qrcode");
	});
	// Protocole HTTP
	document.getElementById("http_gen").addEventListener("click", function () {
		var link = document.getElementById("link").value;

		generer_QR_2(link, "qrcode");
	});
	// Mailto
	document.getElementById("mailto_gen").addEventListener("click", function () {
		var mail = document.getElementById("mail").value;
		generer_QR_2(`mailto:${mail}`, "qrcode");
	});
	// Carte de contact
	document.getElementById("vCard_gen").addEventListener("click", function () {
		var firstName = document.getElementById("firstName").value;
		var lastName = document.getElementById("lastName").value;
		var email = document.getElementById("email").value;
		var phone = document.getElementById("phone").value;
		var vCard = "BEGIN:VCARD\n" +
			"VERSION:3.0\n" +
			"N:" + lastName + ";" + firstName + ";;;\n" +
			"FN:" + firstName + " " + lastName + "\n" +
			"EMAIL;TYPE=HOME,INTERNET, PREF:" + email + "\n" +
			"TEL;TYPE=CELL:" + phone + "\n" +
			"END:VCARD";
		generer_QR_2(vCard, "qrcode");
	});
};

const navs = document.getElementsByTagName("nav")[0].getElementsByTagName("a");

for (var i = 0; i < navs.length; i++) {
	if (navs[i].href == location.href) {
		navs[i].parentElement.style.backgroundColor = "#a66523df";
	}

}
