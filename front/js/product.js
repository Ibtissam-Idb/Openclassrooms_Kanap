
// Get Correct Product Id

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const productId = url.searchParams.get("id");

const reponseApi = fetch("http://localhost:3000/api/products/" + productId)
    .then(response => response.json())
    .then(result => generateFurnitures(result));

// End

// Generate Correct Product

function generateFurnitures(furnitures) {
    const article = furnitures;

    const imageContainer = document.querySelector(".item__img");
    const furnitureImage = document.createElement("img");
    furnitureImage.src = article.imageUrl;
    furnitureImage.alt = article.altTxt;
    imageContainer.appendChild(furnitureImage);

    const furnitureTitle = document.querySelector("#title");
    furnitureTitle.innerText = article.name;

    const furniturePrice = document.querySelector("#price");
    furniturePrice.innerText = article.price;

    const furnitureDescription = document.querySelector("#description");
    furnitureDescription.innerText = article.description;

    const furnitureColors = article.colors;

    for (let i = 0; i < furnitureColors.length; i++) {

        const color = furnitureColors[i];

        const furnitureSelect = document.getElementById("colors");
        const furnitureOption = document.createElement("option");

        furnitureOption.innerHTML = color;
        furnitureOption.value = color;

        furnitureSelect.appendChild(furnitureOption);
    }
}

// End

// Add data to Local Storage

const productQuantity = document.getElementById("quantity");
const productColors = document.getElementById("colors");

const addToCartButton = document.getElementById("addToCart");

addToCartButton.addEventListener("click", function (event) {
    let newItem = {
        id: productId,
        color: productColors.value,
        quantity: productQuantity.value,
    }

    const getItems = JSON.parse(localStorage.getItem("items")) || [];

    const findSameItems = getItems.find((item) => (newItem.id === item.id && newItem.color === item.color));

    if (findSameItems) {
        findSameItems.quantity += parseInt(newItem.quantity);
        localStorage.setItem("items", JSON.stringify(getItems));
    } else {
        newItem.quantity = parseInt(newItem.quantity);
        getItems.push(newItem);
        localStorage.setItem("items", JSON.stringify(getItems));
    }

});

// End