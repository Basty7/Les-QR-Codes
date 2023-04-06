// Fonction: Générer le QR Code

async function generer_QR() {
	var qrdiv = document.getElementById("qrcode");
	qrdiv.innerHTML = '';
	var url = document.getElementById("link").value;
	var qrc = new QRCode(qrdiv, url);
	await new Promise(r => setTimeout(r, 100));
	var qrimg = qrdiv.getElementsByTagName("img")[0];
	qrimg.onload = function () {
		qrdiv.href = qrimg.src;
		qrdiv.download = `QRCode ${url}.png`;
	};
}

async function generer_QR_2(string, divID, colorFG = "#000000", colorBG = "#FFFFFF", border = 2) {
	var qrdiv = document.getElementById(divID);
	// qrdiv.innerHTML = '';
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
	var qrimg = qrdiv.getElementsByTagName("img")[0];
	qrimg.onload = function () {
		qrdiv.href = qrimg.src;
		qrimg.classList.add("qrimg");
		qrdiv.download = `QRCode.png`;
		qrdiv.title = "Télécharger le Code QR";

	};
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
	document.getElementById(id).style.display = "block";
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
	document.getElementById("func_select").addEventListener("change", function () {show(this.value);});
	// Nouveau DropDown
	document.getElementById("funcs_bt").addEventListener("mouseover", function () {
		var funcs = document.getElementById("funcs");
		funcs.hidden = false;
		funcs.className = "funcs_sel_hover";
	});
	document.getElementById("funcs").addEventListener("mouseover", function () {
		var funcs = document.getElementById("funcs");
		funcs.hidden = false;
		funcs.className = "funcs_sel_hover";
	});

	document.getElementById("funcs_bt").addEventListener("mouseout", function () {
		var funcs = document.getElementById("funcs");
		funcs.hidden = true;
		funcs.className = "funcs_sel";
	});
	document.getElementById("funcs").addEventListener("mouseout", function () {
		var funcs = document.getElementById("funcs");
		funcs.hidden = true;
		funcs.className = "funcs_sel";
	});
	var funcs = document.getElementById("funcs");
	for (var i = 0; i < funcs.children.length; i++) {
		funcs.children[i].addEventListener("click", function () {
			console.log(this.id.slice(7));
			show(this.id.slice(7));
		});
	}


	// WIFI
	document.getElementById("wifi_gen").addEventListener("click", function () {
		var ssid = document.getElementById("ssid").value;
		var mdp = document.getElementById("mdp").value;
		var secu = document.getElementById("secu").value;
		var visi = document.getElementById("visi").value;
		var border = document.getElementById("borderwifi").value;
		var colorFG = document.getElementById("colorFGW").value;
		var colorBG = document.getElementById("colorBGW").value;
		if (colorFG == "") {
			colorFG = "#000000";
		}
		if (colorBG == "") {
			colorBG = "#FFFFFF";
		}
		if (border == "") {
			border = 2;
		}
		generer_QR_2(`WIFI:S:${ssid};T:${secu};P:${mdp};H:${visi};;`, "qrcode", colorFG, colorBG, border);
	});
	// Protocole HTTP
	document.getElementById("url_gen").addEventListener("click", function () {
		var link = document.getElementById("link").value;
		var border = document.getElementById("borderHTTP").value;
		var colorFG = document.getElementById("colorFGHTTP").value;
		var colorBG = document.getElementById("colorBGHTTP").value;
		if (colorFG == "") {
			colorFG = "#000000";
		}
		if (colorBG == "") {
			colorBG = "#FFFFFF";
		}
		generer_QR_2(link, "qrcode", colorFG, colorBG, border);
	});
	// Carte de contact
	document.getElementById("vCard_gen").addEventListener("click", function () {
		var firstName = document.getElementById("firstName").value;
		var lastName = document.getElementById("lastName").value;
		var email = document.getElementById("email").value;
		var phone = document.getElementById("phone").value;
		var border = document.getElementById("bordervCard").value;
		var colorFG = document.getElementById("colorFGvCard").value;
		var colorBG = document.getElementById("colorBGvCard").value;
		if (colorFG == "") {
			colorFG = "#000000";
		}
		if (colorBG == "") {
			colorBG = "#FFFFFF";
		}
		var vCard = "BEGIN:VCARD\n" +
			"VERSION:3.0\n" +
			"N:" + lastName + ";" + firstName + ";;;\n" +
			"FN:" + firstName + " " + lastName + "\n" +
			"EMAIL;TYPE=HOME,INTERNET, PREF:" + email + "\n" +
			"TEL;TYPE=CELL:" + phone + "\n" +
			"END:VCARD";
		generer_QR_2(vCard, "qrcode", colorFG, colorBG, border);
	});
};
