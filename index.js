// Fonction: Générer le QR Code
async function generer_QR(string, divID, isSimple = false) {
	const qrdiv = document.getElementById(divID);
	qrdiv.innerHTML = '';
	const tab = {
		'border': 2,
		'colorFG': '#000000',
		'colorBG': '#ffffff',
	};
	if (!isSimple) {
		const tab2 = Object.values(tab);
		for (let i = 0; i < 3; i++) {
			tab[Object.keys(tab)[i]] = document.getElementById(Object.keys(tab)[i]).value;
			if (tab[Object.keys(tab)[i]] == "") {
				tab[Object.keys(tab)[i]] = tab2[i];
			}
		}
	}
	const qrc = new QRCode(qrdiv, {
		text: string,
		width: 256 + 8*tab['border'],
		height: 256 + 8*tab['border'],
		useSVG: true,
		border: tab['border'],
		colorDark: tab['colorFG'],
		colorLight: tab['colorBG'],
		correctLevel: QRCode.CorrectLevel.H
	});
	await new Promise(r => setTimeout(r, 100));
	let svg = qrdiv.innerHTML;
	svg = svg.slice(0, 4) + ' xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"' + svg.slice(4);
	qrdiv.getElementsByTagName("svg")[0].classList.add("qrimg");
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
	const divs = document.getElementsByClassName("gen");
	for (let i = 0; i < divs.length; i++) {
		divs[i].style.display = "none";
	}
	document.getElementById(id).style.display = "inline-block";
	document.getElementById("colors").style.display = "inline-block";
}

// Ajouter les évènements aux éléments de la barre de navigation
const navlis = document.getElementsByTagName("nav")[0].children;

for (let i = 0; i < navlis.length; i++) {
	navlis[i].addEventListener("click", function () {
		location.href = this.id + ".html#";
	});
	if (navlis[i].id + '.html#' == location.href.split("/").slice(-1)[0]) {
		navlis[i].style.backgroundColor = "#a665239f";

	}
}

// Titre cliquable

const titre = document.getElementsByTagName("h1")[0];
titre.addEventListener("click", function () {
	titre.title = "Retour en haut de la page";
	location.href = "#";
});

// Permettre l'expansion des images

function expandImage(img) {
	img.classList.toggle("expandedIMG");
	img.classList.toggle("expandableIMG");
	if (document.getElementsByClassName("footer")[0].getAttribute("hidden") == "false") {
		document.getElementsByClassName("footer")[0].setAttribute("hidden", "true")
	}
	else {
		document.getElementsByClassName("footer")[0].setAttribute("hidden", "false")
	}
}

const expandableIMGs = document.getElementsByClassName("expandableIMG");
for (let i = 0; i < expandableIMGs.length; i++) {
	expandableIMGs[i].children[0].addEventListener("click", function () {
		expandImage(this.parentElement);
	});
}


// Ajouter les évènements aux éléments de la page d'accueil

if (location.href.split("/").slice(-1) == "index.html" || location.href.split("/").slice(-1) == "index.html#") {
	document.getElementById('link').addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			generer_QR(document.getElementById("link").value, "qrcode", true);
		}
	});
	document.getElementById("url_gen").addEventListener("click", function () {
		generer_QR(document.getElementById("link").value, "qrcode", true);
	});
}

// Ajouter les évènements aux éléments de la page de génération

else if (location.href.split("/").slice(-1)[0] == "gen.html#" || location.href.split("/").slice(-1)[0] == "gen.html") {
	// Nouveau DropDown
	const funcs = document.getElementById("funcs");
	document.getElementById("funcs_bt").addEventListener("mouseover", function () {
		funcs.className = "funcs_sel_hover";
	});
	document.getElementById("funcs_bt").addEventListener("click", function () {
		funcs.className = "funcs_sel_hover";
	});
	document.getElementById("funcs").addEventListener("mouseover", function () {
		funcs.className = "funcs_sel_hover";
	});
	document.getElementById("funcs_bt").addEventListener("mouseout", function () {
		funcs.className = "funcs_sel";
	});
	document.getElementById("funcs").addEventListener("mouseout", function () {
		funcs.className = "funcs_sel";
	});
	let fonction = "";
	for (let i = 0; i < funcs.children.length; i++) {
		funcs.children[i].addEventListener("click", function () {
			show(this.id.slice(7));
			funcs.className = "funcs_sel";
			fonction = this.id.slice(7);
		});
		document.getElementById(funcs.children[i].id.slice(7)).addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				event.preventDefault();
				document.getElementById(this.id+"_gen").click();
			}
		});
	}
	document.getElementById("gen-bt").addEventListener("click", function () {
		switch (fonction) {
			case "http":
				const link = document.getElementById("link").value;
				generer_QR(link, "qrcode");
				console.log("Went through http");
				break;
			case "wifi":
				const ssid = document.getElementById("ssid").value;
				const mdp = document.getElementById("mdp").value;
				const secu = document.getElementById("secu").value;
				const visi = document.getElementById("visi").value;
				generer_QR(`WIFI:S:${ssid};T:${secu};P:${mdp};H:${visi};;`, "qrcode");;
				console.log("Went through wifi");
				break;
			case "mailto":
				const mail = document.getElementById("mail").value;
				generer_QR(`mailto:${mail}`, "qrcode");
				console.log("Went through mailto");
				break;
			case "vCard":
				const firstName = document.getElementById("firstName").value;
				const lastName = document.getElementById("lastName").value;
				const email = document.getElementById("email").value;
				const phone = document.getElementById("phone").value;
				const vCard = "BEGIN:VCARD\n" +
					"VERSION:3.0\n" +
					"N:" + lastName + ";" + firstName + ";;;\n" +
					"FN:" + firstName + " " + lastName + "\n" +
					"EMAIL;TYPE=HOME,INTERNET, PREF:" + email + "\n" +
					"TEL;TYPE=CELL:" + phone + "\n" +
					"END:VCARD";
				generer_QR(vCard, "qrcode");
				console.log("Went through vCard");
				break;
			default:
				break;
		}
	});
};
