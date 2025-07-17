emailjs.init('GM1NwWCrU0CjEm0Db'); // Public key

const form = document.getElementById('order-form');
const wilayaSelect = form.elements['wilaya'];
const quantitySelect = form.elements['quantity'];

// Ajouter les 58 wilayas
const wilayas = [
  "1 - Adrar", "2 - Chlef", "3 - Laghouat", "4 - Oum El Bouaghi", "5 - Batna", "6 - Béjaïa", "7 - Biskra", "8 - Béchar", "9 - Blida",
  "10 - Bouira", "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", "16 - Alger", "17 - Djelfa", "18 - Jijel",
  "19 - Sétif", "20 - Saïda", "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine", "26 - Médéa",
  "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla", "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj",
  "35 - Boumerdès", "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela", "41 - Souk Ahras", "42 - Tipaza",
  "43 - Mila", "44 - Aïn Defla", "45 - Naâma", "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt", "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
];

wilayas.forEach(w => {
  const opt = document.createElement('option');
  opt.value = w;
  opt.textContent = w;
  wilayaSelect.appendChild(opt);
});

// Quantité jusqu'à 100
for (let i = 1; i <= 100; i++) {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = i;
  quantitySelect.appendChild(opt);
}

// ID incrémenté par visiteur (stocké localement)
let orderCount = localStorage.getItem('order_count') || 0;
orderCount++;
localStorage.setItem('order_count', orderCount);

form.elements['order_reference'].value = "CMD-" + String(orderCount).padStart(4, '0');

// Infos navigateur
form.elements['timestamp'].value = new Date().toLocaleString();
form.elements['client_os'].value = navigator.platform;
form.elements['client_device'].value = navigator.userAgent;
form.elements['client_type'].value = /Mobile|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
form.elements['site_url'].value = window.location.href;

// Geolocation
navigator.geolocation.getCurrentPosition(pos => {
  const { latitude, longitude } = pos.coords;
  form.elements['client_geo'].value = `${latitude}, ${longitude}`;
});

// IP publique via API
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => form.elements['client_ip_public'].value = data.ip);

// IP locale via WebRTC
function getLocalIP(callback) {
  const rtc = new RTCPeerConnection({ iceServers: [] });
  rtc.createDataChannel('');
  rtc.createOffer().then(o => rtc.setLocalDescription(o));
  rtc.onicecandidate = evt => {
    if (evt && evt.candidate) {
      const ip = evt.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/)[1];
      callback(ip);
    }
  };
}
getLocalIP(ip => form.elements['client_ip_local'].value = ip);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  emailjs.sendForm('service_vgz1z6a', 'template_1u1m0v8', this)
    .then(() => {
      document.getElementById("message").textContent = "✅ Commande envoyée avec succès.";
      form.reset();
    })
    .catch(() => {
      document.getElementById("message").textContent = "❌ Erreur lors de l’envoi. Veuillez réessayer.";
    });
});
