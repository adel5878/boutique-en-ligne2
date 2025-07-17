(function () {
  emailjs.init("UcOQrsNWkBJKpdq-1");
})();

document.getElementById("orderBtn").addEventListener("click", function () {
  document.getElementById("orderForm").classList.remove("hidden");
});

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const templateParams = {
    prenom: document.getElementById("prenom").value,
    nom: document.getElementById("nom").value,
    phone: document.getElementById("phone").value,
    user_email: document.getElementById("user_email").value,
    wilaya: document.getElementById("wilaya").value,
    product: document.getElementById("product").value,
    quantity: document.getElementById("quantity").value,
    timestamp: new Date().toLocaleString(),
    order_reference: Math.floor(Math.random() * 100000),
    site_url: window.location.href,
    client_ip_public: "Non disponible",
    client_ip_local: "Non disponible",
    client_device: navigator.userAgent,
    client_os: navigator.platform,
    client_type: "Navigateur Web",
    client_model: "Inconnu",
    client_geo: "Inconnu",
  };

  emailjs.send("service_ypcrj9b", "template_z3l5jva", templateParams).then(
    function (response) {
      alert("Commande envoyée avec succès !");
      document.getElementById("orderForm").reset();
    },
    function (error) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
      console.error("Erreur EmailJS:", error);
    }
  );
});
