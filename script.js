emailjs.init("UcOQrsNWkBJKpdq-1"); // Ton User ID EmailJS

const products = [
  {
    name: "Routeur TP-Link",
    image: "images/tp-link.jpg",
    marque: "TP-Link",
    reference: "TL-WR840N",
    caracteristiques: "Wi-Fi N300 Mbps, 4 ports LAN gigabit, sécurité WPA2",
    garantie: "2 ans",
    delai: "2-3 jours",
    disponibilite: "En stock"
  },
  {
    name: "Switch 8 Ports",
    image: "images/netgear-switch.jpg",
    marque: "Netgear",
    reference: "GS308",
    caracteristiques: "8 ports gigabit RJ45, plug and play, boîtier métal",
    garantie: "3 ans",
    delai: "1-2 jours",
    disponibilite: "Stock limité"
  },
  {
    name: "Caméra IP",
    image: "images/hikvision-camera.jpg",
    marque: "Hikvision",
    reference: "DS-2CD2042WD-I",
    caracteristiques: "4MP HD, vision nocturne, détection mouvement",
    garantie: "1 an",
    delai: "3-5 jours",
    disponibilite: "En stock"
  }
];

// Wilayas complètes (58)
const wilayas = [
  "1 - Adrar", "2 - Chlef", "3 - Laghouat", "4 - Oum El Bouaghi", "5 - Batna", "6 - Béjaïa",
  "7 - Biskra", "8 - Béchar", "9 - Blida", "10 - Bouira", "11 - Tamanrasset", "12 - Tébessa",
  "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", "16 - Alger", "17 - Djelfa", "18 - Jijel",
  "19 - Sétif", "20 - Saïda", "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma",
  "25 - Constantine", "26 - Médéa", "27 - Mostaganem", "28 - M’Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arreridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela", "41 - Souk Ahras",
  "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma", "46 - Aïn Témouchent", "47 - Ghardaïa",
  "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar", "51 - Ouled Djellal", "52 - Béni Abbès",
  "53 - In Salah", "54 - In Guezzam", "55 - Touggourt", "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
];

const productsContainer = document.getElementById('productsContainer');
const qtySelect = document.getElementById('quantity');
const wilayaSelect = document.getElementById('wilaya');
const orderForm = document.getElementById('orderForm');
let selectedProduct = null;

// Affichage des produits
products.forEach((p, idx) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <div class="details">
      <p><strong>Marque:</strong> ${p.marque}</p>
      <p><strong>Référence:</strong> ${p.reference}</p>
      <p><strong>Caractéristiques:</strong> ${p.caracteristiques}</p>
      <p><strong>Garantie:</strong> ${p.garantie}</p>
      <p><strong>Délai livraison:</strong> ${p.delai}</p>
      <p><strong>Disponibilité:</strong> ${p.disponibilite}</p>
    </div>
    <button type="button" onclick="selectProduct(${idx})">Commander</button>
  `;
  productsContainer.appendChild(card);
});

// Remplissage quantité (1 à 100)
for(let i=1; i<=100; i++) {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = i;
  qtySelect.appendChild(opt);
}

// Remplissage wilayas dans le select
wilayas.forEach(w => {
  const opt = document.createElement('option');
  opt.value = w;
  opt.textContent = w;
  wilayaSelect.appendChild(opt);
});

// Variables infos client
const ua = navigator.userAgent;
document.getElementById('client_device').value = ua;

let os = "Inconnu";
if(ua.includes("Win")) os = "Windows";
else if(ua.includes("Mac")) os = "MacOS";
else if(ua.includes("Linux")) os = "Linux";
else if(ua.includes("Android")) os = "Android";
else if(ua.includes("like Mac")) os = "iOS";
document.getElementById('client_os').value = os;

const deviceType = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "Mobile/Tablet" : "PC";
document.getElementById('client_type').value = deviceType;

let model = "Inconnu";
if(deviceType !== "PC"){
  const match = ua.match(/\(([^)]+)\)/);
  if(match) model = match[1];
}
document.getElementById('client_model').value = model;

document.getElementById('timestamp').value = new Date().toLocaleString();
document.getElementById('site_url').value = window.location.href;

fetch('https://api.ipify.org?format=json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('client_ip_public').value = data.ip;
    return fetch(`https://ipinfo.io/${data.ip}/json?token=30b8520dc83c25`);
  })
  .then(res => res.json())
  .then(info => {
    const geo = `${info.city || ''}, ${info.region || ''}, ${info.country || ''}`;
    document.getElementById('client_geo').value = geo;
  })
  .catch(() => {
    document.getElementById('client_geo').value = "Non disponible";
  });

function getLocalIP() {
  return new Promise((resolve) => {
    const pc = new RTCPeerConnection({iceServers: []});
    pc.createDataChannel('');
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
    pc.onicecandidate = event => {
      if (!event || !event.candidate) return;
      const ipMatch = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(event.candidate.candidate);
      if(ipMatch){
        document.getElementById('client_ip_local').value = ipMatch[1];
        resolve(ipMatch[1]);
        pc.onicecandidate = null;
      }
    };
  });
}
getLocalIP();

function selectProduct(idx) {
  selectedProduct = products[idx];
  document.getElementById('product').value = selectedProduct.name;
  document.getElementById('order_reference').value = generateOrderNumber();
  orderForm.style.display = 'block';
  window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
}

function generateOrderNumber() {
  const now = new Date();
  return 'CMD-' +
    now.getFullYear().toString().slice(2) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') + '-' +
    Math.floor(1000 + Math.random() * 9000);
}

orderForm.addEventListener('submit', function(e){
  e.preventDefault();

  emailjs.sendForm('service_ypcrj9b', 'template_z3l5jva', this)
    .then(() => {
      alert('✅ Commande envoyée avec succès ! Merci !');
      this.reset();
      orderForm.style.display = 'none';
      selectedProduct = null;
    })
    .catch(err => {
      alert('❌ Erreur lors de l’envoi : ' + JSON.stringify(err));
    });
});
