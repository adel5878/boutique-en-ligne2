emailjs.init("user_xxxxxxxxxxxxxxx"); // Remplace par ton ID emailJS

const form = document.getElementById("orderForm");
const wilayaSelect = document.getElementById("wilaya-select");
const quantitySelect = document.getElementById("quantity-select");
const confirmationDiv = document.getElementById("confirmation");
const refSpan = document.getElementById("ref");

// Liste des 58 wilayas
const wilayas = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
  "26 - Médéa", "27 - Mostaganem", "28 - M’Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arreridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt",
  "56 - Djanet", "57 - El M’Ghair", "58 - El Meniaa"
];

wilayas.forEach(w => {
  const opt = document.createElement("option");
  opt.value = w;
  opt.textContent = w;
  wilayaSelect.appendChild(opt);
});

// Quantité jusqu'à 100
for (let i = 1; i <= 100; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  quantitySelect.appendChild(opt);
}

// Données IP & système
async function fetchInfos() {
  const res = await fetch("https://ipinfo.io/json?token=30b8520dc83c25");
  const data = await res.json();

  form.client_ip_public.value = data.ip || "";
  form.client_geo.value = data.loc || "";
  form.site_url.value = window.location.href;
  form.timestamp.value = new Date().toLocaleString();

  const agent = navigator.userAgent;
  form.client_device.value = agent;
  form.client_os.value = navigator.platform;
  form.client_type.value = /mobile/i.test(agent) ? "Mobile" : "Desktop";
  form.client_model.value = navigator.vendor || "N/A";

  const localIP = await getLocalIP();
  form.client_ip_local.value = localIP;
}

function getLocalIP() {
  return new Promise((resolve) => {
    const pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel("");
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
    pc.onicecandidate = e => {
      if (e && e.candidate) {
        const ip = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(e.candidate.candidate);
        resolve(ip[1]);
        pc.close();
      }
    };
  });
}

fetchInfos();

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Générer une référence aléatoire
  const ref = "CMD-" + Math.floor(100000 + Math.random() * 900000);
  form.order_reference.value = ref;

  const serviceID = "service_xxxx"; // à remplacer
  const templateID = "template_xxxx"; // à remplacer

  try {
    await emailjs.sendForm(serviceID, templateID, this);
    confirmationDiv.style.display = "block";
    refSpan.textContent = ref;
    form.reset();
  } catch (error) {
    alert("Erreur lors de l'envoi : " + error);
  }
});
