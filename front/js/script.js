
// get Api

const reponseApi = fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .then(result => generateFurnitures(result))

// End

// Insert products in the homepage

function generateFurnitures(furnitures) {
    for (let i = 0; i < furnitures.length; i++) {
      const article = furnitures[i];

        const sectionItems = document.querySelector(".items");
        const furnitureArticle = document.createElement("article");
        
        const furnitureLink = document.createElement("a");
        furnitureLink.href = `./product.html?id=${furnitures[i]._id}`;

        const furnitureImage = document.createElement("img");
        furnitureImage.src = article.imageUrl;
        furnitureImage.alt = article.altTxt;

        const furnitureName = document.createElement("h3");
        furnitureName.innerText = article.name;

        const furnitureDescription = document.createElement("p");
        furnitureDescription.innerText = article.description;

        sectionItems.appendChild(furnitureLink);
        furnitureLink.appendChild(furnitureArticle);
        furnitureArticle.appendChild(furnitureImage);
        furnitureArticle.appendChild(furnitureName);
        furnitureArticle.appendChild(furnitureDescription)
    }
}

// End