// Initialisation EmailJS
emailjs.init("UcOQrsNWkBJKpdq-1");

function showForm() {
  document.getElementById("orderForm").style.display = "flex";
}

// Liste des 58 wilayas
const wilayas = [
  "1 - Adrar", "2 - Chlef", "3 - Laghouat", "4 - Oum El Bouaghi", "5 - Batna", "6 - Béjaïa", "7 - Biskra", "8 - Béchar", "9 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine", "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès", "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma", "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane",
  "49 - Timimoun", "50 - Bordj Badji Mokhtar", "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt", "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
];

const wilayaSelect = document.getElementById("wilaya");
wilayas.forEach((wilaya) => {
  const option = document.createElement("option");
  option.value = wilaya;
  option.textContent = wilaya;
  wilayaSelect.appendChild(option);
});

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const params = {
    prenom: document.getElementById("prenom").value,
    nom: document.getElementById("nom").value,
    email: document.getElementById("email").value,
    wilaya: document.getElementById("wilaya").value,
    produit: document.getElementById("produit").value,
    quantite: document.getElementById("quantite").value,
    date: new Date().toLocaleString()
  };

  emailjs
    .send("service_ypcrj9b", "template_z3l5jva", params)
    .then(() => {
      alert("Commande envoyée avec succès !");
      document.getElementById("orderForm").reset();
      document.getElementById("orderForm").style.display = "none";
    })
    .catch((err) => {
      console.error("Erreur d'envoi :", err);
      alert("Échec de l'envoi. Réessayez.");
    });
});
