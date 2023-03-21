
// Get Correct Product Id

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const id = url.searchParams.get("id");

const reponseApi = fetch("http://localhost:3000/api/products/" + id)
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

        for(let i = 0; i < furnitureColors.length; i++) {

            const color = furnitureColors[i];

            const furnitureSelect = document.getElementById("colors");
            const furnitureOption = document.createElement("option");

            furnitureOption.innerHTML = color;
            furnitureOption.value = color;

            furnitureSelect.appendChild(furnitureOption);
        }
}