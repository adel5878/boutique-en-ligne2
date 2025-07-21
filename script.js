// Remplir la quantité (1 à 100)
const quantiteSelect = document.getElementById("quantite");
for (let i = 1; i <= 100; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  quantiteSelect.appendChild(option);
}

// Référence commande auto générée simple
function genererReference() {
  const now = Date.now().toString();
  return "CMD" + now.slice(-6);
}

const orderFormContainer = document.getElementById("order-form-container");
const produitSelect = document.getElementById("produit");
const orderForm = document.getElementById("order-form");

// Afficher le formulaire et sélectionner le produit
document.querySelectorAll(".btn-commande").forEach(btn => {
  btn.addEventListener("click", () => {
    const prodName = btn.getAttribute("data-product");
    produitSelect.value = prodName;
    orderFormContainer.style.display = "block";
    window.scrollTo({ top: orderFormContainer.offsetTop, behavior: "smooth" });
  });
});

// Envoi du formulaire
orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const refCommande = genererReference();

  // Infos système simples
  const userAgent = navigator.userAgent;
  const os = navigator.platform;
  const type = /Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop";

  fetch("https://ipinfo.io/json?token=30b8520dc83c25")
    .then(response => response.json())
    .then(data => {
      const templateParams = {
        order_reference: refCommande,
        produit: produitSelect.value,
        wilaya: this.wilaya.value,
        quantite: this.quantite.value,
        prenom: this.prenom.value,
        nom: this.nom.value,
        user_email: this.email.value,
        phone: this.telephone ? this.telephone.value : "non fourni",
        timestamp: new Date().toLocaleString(),
        site_url: window.location.href,
        client_device: userAgent,
        client_os: os,
        client_type: type,
        client_model: "non détecté", // Pour mobile, ajouter lib si besoin
        client_ip_public: data.ip,
        client_ip_local: "non détectée",
        client_geo: `${data.city}, ${data.region}, ${data.country}`,
      };

      emailjs.send("service_ck03zot", "template_99pjvzj", templateParams)
        .then(() => {
          alert(`Commande envoyée avec succès !\nRéférence: ${refCommande}`);
          orderForm.reset();
          orderFormContainer.style.display = "none";
        })
        .catch((err) => {
          alert("Erreur lors de l'envoi : " + (err.text || err));
        });
    });
});
