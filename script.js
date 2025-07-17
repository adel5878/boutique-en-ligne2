emailjs.init("-NCu9wIQO7U8UzrJR"); // ton User ID

const products = [
  {
    name: "Routeur TP-Link",
    image: "https://static.tp-link.com/image/upload/2018/201808/20180813/TL-WR840N_1.jpg",
    marque: "TP-Link",
    reference: "TL-WR840N",
    caracteristiques: "Wi‑Fi N300 Mbps, 4 ports LAN, sécurité WPA2",
    garantie: "2 ans",
    delai: "2‑3 jours",
    disponibilite: "En stock"
  },
  {
    name: "Switch 8 Ports",
    image: "https://www.netgear.com/images/product/GS308-3000NAS_1000x1000.png",
    marque: "Netgear",
    reference: "GS308",
    caracteristiques: "8 ports gigabit RJ45, plug & play, boîtier métal",
    garantie: "3 ans",
    delai: "1‑2 jours",
    disponibilite: "Stock limité"
  },
  {
    name: "Caméra IP",
    image: "https://www.hikvision.com/content/dam/hikvision/en/products/ip-products/network-cameras/ds-2cd2042wd-i.jpg",
    marque: "Hikvision",
    reference: "DS-2CD2042WD-I",
    caracteristiques: "4 MP HD, vision nocturne, détection mouvement",
    garantie: "1 an",
    delai: "3‑5 jours",
    disponibilite: "En stock"
  }
];

const container = document.getElementById('productsContainer');
products.forEach((p, idx) => {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <div class="details">
      <p><strong>Marque:</strong> ${p.marque}</p>
      <p><strong>Réf:</strong> ${p.reference}</p>
      <p><strong>Caractéristiques:</strong> ${p.caracteristiques}</p>
      <p><strong>Garantie:</strong> ${p.garantie}</p>
      <p><strong>Délai livraison:</strong> ${p.delai}</p>
      <p><strong>Disponibilité:</strong> ${p.disponibilite}</p>
    </div>
    <button type="button" onclick="selectProduct(${idx})">Commander</button>`;
  container.appendChild(div);
});

// Tu dois aussi ici ajouter le reste du script JS de gestion du formulaire et de l’envoi par email
