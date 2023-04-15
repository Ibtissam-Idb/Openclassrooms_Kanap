// Obtenir l'ID de la commande

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const orderId = url.searchParams.get("id");

id = document.querySelector('#orderId');
id.innerHTML = orderId;

