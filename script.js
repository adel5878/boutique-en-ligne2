emailjs.init("UcOQrsNWkBJKpdq-1");

const products = ["Routeur TP-Link", "Switch 8 Ports", "Caméra IP", "Câble Ethernet"];

const wilayas = [
  "1 - Adrar", "2 - Chlef", "3 - Laghouat", "4 - Oum El Bouaghi", "5 - Batna", "6 - Béjaïa",
  "7 - Biskra", "8 - Béchar", "9 - Blida", "10 - Bouira", "11 - Tamanrasset", "12 - Tébessa",
  "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", "16 - Alger", "17 - Djelfa", "18 - Jijel",
  "19 - Sétif", "20 - Saïda", "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma",
  "25 - Constantine", "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arreridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela", "41 - Souk Ahras",
  "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma", "46 - Aïn Témouchent", "47 - Ghardaïa",
  "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar", "51 - Ouled Djellal",
  "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt", "56 - Djanet",
  "57 - El M'Ghair", "58 - El Meniaa"
];

const listContainer = document.getElementById("product-list");
const wilayaSelect = document.getElementById("wilaya");
const formPopup = document.getElementById("form-popup");
const orderForm = document.getElementById("order-form");
const selectedProduct = document.getElementById("selected-product");

products.forEach((product, i) => {
  const div = document.createElement("div");
  div.className = "product-item";
  div.innerHTML = `<h3>${product}</h3><button onclick="openForm('${product}')">Commander</button>`;
  listContainer.appendChild(div);
});

wilayas.forEach(w => {
  const opt = document.createElement("option");
  opt.value = w;
  opt.textContent = w;
  wilayaSelect.appendChild(opt);
});

window.openForm = function(product) {
  selectedProduct.value = product;
  formPopup.style.display = "block";
};

window.closeForm = function() {
  formPopup.style.display = "none";
  orderForm.reset();
};

orderForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(orderForm);
  const data = {
    prenom: formData.get("prenom"),
    nom: formData.get("nom"),
    phone: formData.get("phone"),
    user_email: formData.get("email"),
    wilaya: formData.get("wilaya"),
    quantity: formData.get("quantity"),
    product: formData.get("product"),
    order_reference: Date.now(),
    timestamp: new Date().toLocaleString(),
    site_url: window.location.href,
    client_ip_public: "Auto", // à remplacer par un appel réel IP si nécessaire
    client_ip_local: "Auto",
    client_device: navigator.userAgent,
    client_os: navigator.platform,
    client_type: "Navigateur",
    client_model: "N/A",
    client_geo: "N/A"
  };

  emailjs.send("service_ypcrj9b", "template_z3l5jva", data)
    .then(() => {
      alert("Commande envoyée avec succès !");
      closeForm();
    })
    .catch(err => {
      console.error("Erreur EmailJS :", err);
      alert("Erreur lors de l’envoi de la commande.");
    });
});
