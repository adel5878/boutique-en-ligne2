emailjs.init("PRWN5poGo1YbcMfmq"); // Ton user ID EmailJS

const wilayaSelect = document.getElementById("wilaya");
const quantiteSelect = document.getElementById("quantite");
const form = document.getElementById("order-form");
const messageDiv = document.getElementById("message");

// Liste wilayas
const wilayas = [
  "1-Adrar", "2-Chlef", "3-Laghouat", "4-Oum El Bouaghi", "5-Batna", "6-Béjaïa", "7-Biskra", "8-Béchar",
  "9-Blida", "10-Bouira", "11-Tamanrasset", "12-Tébessa", "13-Tlemcen", "14-Tiaret", "15-Tizi Ouzou",
  "16-Alger", "17-Djelfa", "18-Jijel", "19-Sétif", "20-Saïda", "21-Skikda", "22-Sidi Bel Abbès",
  "23-Annaba", "24-Guelma", "25-Constantine", "26-Médéa", "27-Mostaganem", "28-M’Sila", "29-Mascara",
  "30-Ghardaïa", "31-Relizane", "32-El Oued", "33-El Tarf", "34-Tindouf", "35-Tissemsilt", "36-El Bayadh",
  "37-Illizi", "38-Bordj Bou Arréridj", "39-Boumerdès", "40-El Tarf", "41-Tindouf", "42-Tissemsilt",
  "43-El Bayadh", "44-Illizi", "45-Bordj Badji Mokhtar", "46-Béni Abbès", "47-Timimoun", "48-Touggourt",
  "49-Djanet", "50-In Salah", "51-In Guezzam", "52-El M'Ghair", "53-El Meniaa", "54-Ouled Djellal",
  "55-Bordj Baji Mokhtar", "56-Béni Abbès", "57-Timimoun", "58-Touggourt"
];

wilayas.forEach(w => {
  const option = document.createElement("option");
  option.value = w;
  option.textContent = w;
  wilayaSelect.appendChild(option);
});

// Quantités
for (let i = 1; i <= 100; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  quantiteSelect.appendChild(option);
}

// Générer une référence unique
function genererReference() {
  return "CMD" + Date.now().toString().slice(-6);
}

// Soumission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const refCommande = genererReference();

  fetch("https://ipinfo.io/json?token=30b8520dc83c25")
    .then(response => response.json())
    .then(data => {
      const templateParams = {
        order_reference: refCommande,
        prenom: this.prenom.value,
        nom: this.nom.value,
        phone: this.telephone.value,
        user_email: this.email.value,
        wilaya: this.wilaya.value,
        product: this.produit.value,
        quantity: this.quantite.value,
        timestamp: new Date().toLocaleString(),
        site_url: window.location.href,
        client_device: navigator.userAgent,
        client_os: navigator.platform,
        client_type: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        client_model: "non détecté",
        client_ip_public: data.ip,
        client_ip_local: "non détectée",
        client_geo: `${data.city}, ${data.region}, ${data.country}`
      };

      emailjs.send("service_ck03zot", "template_99pjvzj", templateParams)
        .then(() => {
          messageDiv.textContent = "✅ Commande envoyée avec succès !";
          messageDiv.style.color = "green";
          form.reset();
        })
        .catch((err) => {
          messageDiv.textContent = "❌ Erreur lors de l'envoi : " + (err.text || err);
          messageDiv.style.color = "red";
        });
    });
});
