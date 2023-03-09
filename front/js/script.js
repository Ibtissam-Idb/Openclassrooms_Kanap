
// Insert products in the homepage

const reponseApi = await fetch("http://localhost:3000/api/products");
const furnitures = await reponseApi.json();

function generateFurnitures(furnitures) {
    for (let i = 0; i < furnitures.length; i++) {

        const article = furnitures[i];

        const sectionItems = document.querySelector(".items");
        const furnitureArticle = document.createElement("article");
        
        const furnitureLink = document.createElement("a");
        furnitureLink.href = `./product.html?id=${article.id}`;

        const furnitureImage = document.createElement("img");
        furnitureImage.src = article.imageUrl;
        furnitureImage.alt = article.altTxt;

        const furnitureName = document.createElement("h3");
        furnitureName.innerText = article.name;

        const furnitureDescription = document.createElement("p");
        furnitureDescription.innerText = article.description;

        const furniturePrice = document.createElement("p");
        furniturePrice.innerText = article.price;

        const furnitureId = document.createElement("p");
        furnitureId.innerText = article.id;

        const furnitureColors = document.createElement("option");
        furnitureColors.innerHTML = article.colors;


        sectionItems.appendChild(furnitureLink);
        furnitureLink.appendChild(furnitureArticle);
        furnitureArticle.appendChild(furnitureImage);
        furnitureArticle.appendChild(furnitureName);
        furnitureArticle.appendChild(furnitureDescription)
    }
}

generateFurnitures(furnitures);

// Link a product from the homepage to the product page

const getFurnituresId = new URLSearchParams(reponseApi);
const ParamsFurnituresId = getFurnituresId.get("id");
