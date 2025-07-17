const products = [
  { name: "Routeur TP-Link", image: "images/tplink.png" },
  { name: "Caméra Hikvision", image: "images/hikvision.png" },
  { name: "Switch Netgear", image: "images/netgear.png" }
];

let selectedProduct = null;

function selectProduct(idx) {
  selectedProduct = products[idx];

  document.getElementById("product").value = selectedProduct.name;
  document.getElementById("order_reference").value = generateOrderNumber();

  document.getElementById("orderForm").style.display = "block";
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function generateOrderNumber() {
  const now = new Date();
  const timestamp = now.getFullYear().toString().slice(-2) +
                    String(now.getMonth() + 1).padStart(2, '0') +
                    String(now.getDate()).padStart(2, '0') +
                    String(now.getHours()).padStart(2, '0') +
                    String(now.getMinutes()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CMD-${timestamp}-${random}`;
}

function getUserInfo() {
  document.getElementById("timestamp").value = new Date().toLocaleString();

  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      document.getElementById("client_ip_public").value = data.ip || "";
      document.getElementById("client_geo").value = `${data.city || ""}, ${data.region || ""}, ${data.country_name || ""}`;
    })
    .catch(() => {
      document.getElementById("client_ip_public").value = "Inconnu";
      document.getElementById("client_geo").value = "Inconnu";
    });

  document.getElementById("site_url").value = window.location.href;

  const userAgent = navigator.userAgent;
  document.getElementById("client_device").value = /Mobi|Android/i.test(userAgent) ? "Mobile" : "PC";

  const os = getOS();
  document.getElementById("client_os").value = os;

  document.getElementById("client_type").value = navigator.platform || "Inconnu";
  document.getElementById("client_model").value = navigator.userAgentData?.model || "Inconnu";

  try {
    const localIP = getLocalIP();
    document.getElementById("client_ip_local").value = localIP;
  } catch {
    document.getElementById("client_ip_local").value = "Inconnu";
  }
}

function getOS() {
  const userAgent = window.navigator.userAgent;
  if (userAgent.indexOf("Win") !== -1) return "Windows";
  if (userAgent.indexOf("Mac") !== -1) return "MacOS";
  if (userAgent.indexOf("Linux") !== -1) return "Linux";
  if (/Android/.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
  return "Inconnu";
}

function getLocalIP() {
  let ip = "Inconnu";
  const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  if (!RTCPeerConnection) return ip;

  const pc = new RTCPeerConnection({ iceServers: [] });
  pc.createDataChannel("");
  pc.createOffer().then(offer => pc.setLocalDescription(offer)).catch(() => {});
  pc.onicecandidate = (ice) => {
    if (ice && ice.candidate && ice.candidate.candidate) {
      const result = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(ice.candidate.candidate);
      if (result) {
        ip = result[1];
        document.getElementById("client_ip_local").value = ip;
      }
      pc.onicecandidate = null;
      pc.close();
    }
  };
  return ip;
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  if (selectedProduct) {
    document.getElementById("product").value = selectedProduct.name;
  }

  document.getElementById("timestamp").value = new Date().toLocaleString();

  emailjs.sendForm("service_ypcrj9b", "template_z3l5jva", this)
    .then(() => {
      alert("✅ Commande envoyée avec succès ! Merci !");
      this.reset();
      document.getElementById("orderForm").style.display = "none";
      selectedProduct = null;
    })
    .catch(err => {
      alert("❌ Erreur lors de l’envoi : " + JSON.stringify(err));
    });
});

// Lancer dès le chargement
window.addEventListener("DOMContentLoaded", () => {
  getUserInfo();
});
