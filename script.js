// Initialiser EmailJS avec ton User ID
emailjs.init("UcOQrsNWkBJKpdq-1");

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

// Afficher le formulaire et sélectionner le produit quand on clique sur un bouton "Commander"
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

  // Préparer les données pour EmailJS
  const templateParams = {
    order_reference: refCommande,
    produit: produitSelect.value,
    wilaya: this.wilaya.value,
    quantite: this.quantite.value,
    prenom: this.prenom.value,
    nom: this.nom.value,
    user_email: this.email.value,
    telephone: this.telephone.value,
    timestamp: new Date().toLocaleString(),
    site_url: window.location.href,
    client_device: navigator.userAgent,
  };

  emailjs.send("service_ypcrj9b", "template_z3l5jva", templateParams)
    .then(() => {
      alert(`Commande envoyée avec succès !\nRéférence: ${refCommande}`);
      orderForm.reset();
      orderFormContainer.style.display = "none";
    })
    .catch((err) => {
      alert("Erreur lors de l'envoi : " + err.text || err);
    });
});
