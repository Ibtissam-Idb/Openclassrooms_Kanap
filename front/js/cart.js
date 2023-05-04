
// Get localstorage

const getItems = JSON.parse(localStorage.getItem("items"));
let totalQuantity = 0;
let cartPrice = 0;

// Get the product in the API

for (let i = 0; i < getItems.length; i++) {
    let item = getItems[i];

    totalQuantity += parseInt(item.quantity);

    let productId = item.id;
    let productColor = item.color;
    let productQuantity = item.quantity;

    let getApi = fetch("http://localhost:3000/api/products/" + productId)
        .then(response => response.json())
        .then(result => generateCart(result, productColor, productQuantity, totalQuantity));
}

// calculate cart price and cart quantity

function updateCart() {
    let totalQuantity = 0;
    let cartPrice = 0;

    for (let i = 0; i < getItems.length; i++) {

        let item = getItems[i];

        totalQuantity += parseInt(item.quantity);

        let priceHref = fetch("http://localhost:3000/api/products/" + item.id)
            .then(response => response.json())
            .then(data => {
                price = data.price;
                console.log(price);

                let itemPrice = item.quantity * price;
                cartPrice += itemPrice;

                let htmlQuantity = document.querySelector("#totalQuantity");
                htmlQuantity.innerHTML = totalQuantity;

                let htmlPrice = document.querySelector("#totalPrice");
                htmlPrice.innerHTML = cartPrice;
            });
    }
}

// generate products in the cart page

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

    updateCart();
    deleteOrModify(article);
};

function updateLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
    location.reload();
}

function deleteOrModify(article) {

    const dataId = article.dataset.id;
    const dataColor = article.dataset.color;
    const findItem = getItems.findIndex((item) => (item.id === dataId && item.color === dataColor));

    const buttonDelete = article.querySelector(".deleteItem");
    buttonDelete.addEventListener("click", function () {
        if (findItem !== -1) {
            getItems.splice(findItem, 1);
            updateLocalStorage(getItems);
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

        if (findItem !== -1 && newItem.quantity > 0) {
            getItems.splice(findItem, 1, newItem);
            localStorage.setItem("items", JSON.stringify(getItems));
            updateCart();
        }
        else if (findItem !== -1 && newItem.quantity <= 0) {
            getItems.splice(findItem, 1);
            updateLocalStorage(getItems);
        }
    })
};

    // check form valididty

    const form = document.querySelector(".cart__order__form");
    const submit = document.querySelector("#order");

    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const address = document.querySelector("#address");
    const city = document.querySelector("#city");
    const email = document.querySelector("#email");

    function verifyForm() {

        const nameRegex = /^[a-zA-ZÀ-ÿ\- ]+$/;
        const addressRegex = /^[a-zA-Z0-9À-ÿ\- ,']+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let isFirstNameValid = nameRegex.test(firstName.value.trim());
        let isLastNameValid = nameRegex.test(lastName.value.trim());
        let isAddressValid = addressRegex.test(address.value.trim());
        let isCityValid = addressRegex.test(city.value.trim());
        let isEmailValid = emailRegex.test(email.value.trim());

        const firstNameError = document.querySelector("#firstNameErrorMsg");
        firstNameError.innerHTML = isFirstNameValid ? "" : "Le prénom n'est pas valide";

        const lastNameError = document.querySelector("#lastNameErrorMsg");
        lastNameError.innerHTML = isLastNameValid ? "" : "Le nom n'est pas valide.";

        const addressError = document.querySelector("#addressErrorMsg");
        addressError.innerHTML = isAddressValid ? "" : "L'adresse n'est pas valide.";

        const cityError = document.querySelector("#cityErrorMsg");
        cityError.innerHTML = isCityValid ? "" : "La ville n'est pas valide.";

        const emailError = document.querySelector("#emailErrorMsg");
        emailError.innerHTML = isEmailValid ? "" : "L'e-mail n'est pas valide.";

        return isFirstNameValid && isLastNameValid && isAddressValid && isCityValid && isEmailValid;
    }

    // POST order

    submit.addEventListener("click", function (event) {
        event.preventDefault();

        if (verifyForm()) {

            const request = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value
                },
                products: getItems.map(item => item.id),
            }

            console.log(request);

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            })
                .then(response => response.json())
                .then(data => {
                    const orderId = data.orderId;
                    window.location.href = "../html/confirmation.html?id=" + orderId;
                });
        }
    })