
/* choses à faire :
** 1) obtenir le localstorage
** 2) il manquera l'image, le nom & le prix de l'élément => récupérer tout ca via l'API
** 3) générer les élements depuis les informations obtenues dans l'API
*/

// obtenir le localstorage

const getItems = JSON.parse(localStorage.getItem("items"));

// récupérer l'id du produit

// récupérer le produit dans l'API

for(i = 0; i < getItems.length; i++) {
    let item = getItems[i];

    let productId = item.id;

    let getApi = fetch("http://localhost:3000/api/products/" + productId)
    .then(response => response.json())
    .then(result => generateCart(result));
}

// générer le produit dans la page panier

function generateCart(furniture) {
    let i = furniture;

    const section = document.getElementById("cart__items");

    // balise <article>

    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-id", i.id);
    article.setAttribute("data-color", i.color);

    // balise <div> et <img>

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("cart__item__img");

    const image = document.createElement("img");
    image.src = i.imageUrl;
    image.alt = i.altTxt;

    // balise <div class="cart__item__content">

    const itemContent = document.createElement("div");
    itemContent.classList.add("cart__item__content");

    // description

    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");

    const title = document.createElement("h2");
    title.innerHTML = i.name;

    const color = document.createElement("p");
    // color.innerHTML =

    const price = document.createElement("p");
    price.innerHTML = i.price + " €";

    // settings

    const settings = document.createElement("div");
    settings.classList.add("cart__item__content__settings");

    const settingsQuantity = document.createElement("div");
    settingsQuantity.classList.add("cart__item__content__settings__quantity");

    const quantity = document.createElement("p");
    quantity.innerHTML = "Qté : ";

    const inputQuantity = document.createElement("input");
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    // inputQuantity.value = [quantité choisie par l'utilisateur];

    const settingsDelete = document.createElement("div");
    settingsDelete.classList.add("cart__item__content__settings__delete");

    const buttonDelete = document.createElement("p");
    buttonDelete.classList.add("deleteItem");
    buttonDelete.innerHTML = "Supprimer";

    // appendChild

    section.appendChild(article);

    article.appendChild(imageContainer);
    article.appendChild(itemContent);

    imageContainer.appendChild(image);

    itemContent.appendChild(description);
    itemContent.appendChild(settings);

    description.appendChild(title);
    description.appendChild(color);
    description.appendChild(price);

    settings.appendChild(settingsQuantity);
    settings.appendChild(settingsDelete);

    settingsQuantity.appendChild(quantity);
    settingsQuantity.appendChild(inputQuantity);

    settingsDelete.appendChild(buttonDelete);

    // add total quantity and total price
}

// calculer le prix et le nombre d'articles

