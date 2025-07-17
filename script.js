// Initialisation EmailJS
(function() {
  emailjs.init("t1eFJ8YUvflLz-KIt"); // Remplace avec TON user ID
})();

let selectedProduct = "";

function selectProduct(productName) {
  selectedProduct = productName;
  document.getElementById("produit").value = productName;
  window.scrollTo({ top: document.getElementById("order-form").offsetTop, behavior: "smooth" });
}

// Gestion du formulaire
document.getElementById("order-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const date = new Date();
  const timestamp = date.toLocaleString("fr-FR");
  const reference = "CMD-" + Math.floor(1000 + Math.random() * 9000); // Ref à 4 chiffres

  const templateParams = {
    reference: reference,
    prenom: form.prenom.value,
    nom: form.nom.value,
    email: form.email.value,
    wilaya: form.wilaya.value,
    produit: form.produit.value,
    quantite: form.quantite.value,
    datetime: timestamp,
    useragent: navigator.userAgent
  };

  emailjs.send("service_xxx", "template_xxx", templateParams)
    .then(function (response) {
      alert("✅ Commande envoyée avec succès !");
      form.reset();
      document.getElementById("produit").value = "";
    }, function (error) {
      alert("❌ Une erreur est survenue. Merci de réessayer.");
      console.error(error);
    });
});
