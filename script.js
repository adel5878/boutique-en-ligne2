document.addEventListener("DOMContentLoaded", function () {
    const products = [
        {
            name: "Routeur TP-Link",
            image: "img/tp.jpg",
            description: "Routeur WiFi TP-Link haute performance.",
            reference: "TPLINK001"
        },
        {
            name: "Switch 8 ports",
            image: "img/switch.jpg",
            description: "Switch Ethernet 8 ports Gigabit.",
            reference: "SWITCH008"
        },
        {
            name: "Caméra IP HD",
            image: "img/camera.jpg",
            description: "Caméra de surveillance IP HD vision nocturne.",
            reference: "CAMIPHD01"
        }
    ];

    const productContainer = document.querySelector(".product-list");
    const formContainer = document.getElementById("formContainer");
    const form = document.getElementById("orderForm");
    const productInput = document.getElementById("productInput");
    const quantityInput = document.getElementById("quantityInput");

    // Injecter les produits dynamiquement
    products.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button data-index="${index}">Commander</button>
        `;
        productContainer.appendChild(productDiv);
    });

    // Gérer le clic sur "Commander"
    productContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            const productIndex = e.target.getAttribute("data-index");
            const selectedProduct = products[productIndex];
            formContainer.style.display = "block";
            productInput.value = `${selectedProduct.name} - ${selectedProduct.reference}`;
            quantityInput.value = 1;
        }
    });

    // Envoi du formulaire via emailJS
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        emailjs.sendForm("service_ypcrj9b", "template_z3l5jva", form, "UcOQrsNWkBJKpdq-1")
            .then(() => {
                alert("Commande envoyée avec succès !");
                form.reset();
                formContainer.style.display = "none";
            })
            .catch((error) => {
                alert("Erreur lors de l'envoi de la commande.");
                console.error("Erreur emailJS:", error);
            });
    });
});
