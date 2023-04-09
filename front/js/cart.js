
// obtenir le localstorage

const getItems = JSON.parse(localStorage.getItem("items"));
let totalQuantity = 0;
let cartPrice = 0;

// récupérer le produit dans l'API

for(let i = 0; i < getItems.length; i++) {
    let item = getItems[i];

    totalQuantity += parseInt(item.quantity);

    let productId = item.id;
    let productColor = item.color;
    let productQuantity = item.quantity;

    let getApi = fetch("http://localhost:3000/api/products/" + productId)
    .then(response => response.json())
    .then(result => generateCart(result, productColor, productQuantity, totalQuantity));
}

// générer le produit dans la page panier

function generateCart(furniture, itemColor, itemQuantity, cartQuantity) {
    let i = furniture;

    const section = document.getElementById("cart__items");

    // balise <article>

    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-id", i._id);
    article.setAttribute("data-color", itemColor);

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
    color.innerHTML = itemColor;

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
    inputQuantity.type = "number";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    inputQuantity.value = itemQuantity;

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

    const cartRecap = document.querySelector(".cart__price").querySelector(".child");

    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.innerHTML = cartQuantity;

    let productPrice = itemQuantity * i.price;
    cartPrice += productPrice;

    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = cartPrice;

    // manage modifications

    deleteOrModify(article);
};

function deleteOrModify(article) {

    const dataId = article.dataset.id;
    const dataColor = article.dataset.color;
    const findItem = getItems.findIndex((item) => (item.id === dataId && item.color === dataColor));

    const buttonDelete = article.querySelector(".deleteItem");
    buttonDelete.addEventListener("click", function () {
        if(findItem !== -1) {
            getItems.splice(findItem, 1);
            localStorage.setItem("items", JSON.stringify(getItems));
            location.reload();
        }
    });

    const inputQuantity = article.querySelector(".itemQuantity");
    inputQuantity.addEventListener("change", function () {

        const dataQuantity = inputQuantity.value;

        let newItem = {
            id: dataId,
            color: dataColor,
            quantity: dataQuantity,
        };

        if(findItem !== -1) {
            getItems.splice(findItem, 1, newItem);
            localStorage.setItem("items", JSON.stringify(getItems));
            updateCart();
            console.log("modified");
        }
    })
};
