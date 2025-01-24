let productsHTML = "";

products.forEach((product) => {
    productsHTML += `
        <div class="products-grid-cell">
            <div class="image-container">
                <picture>
                    <source media="(max-width : 480px)" srcset="${product.image.mobile}">
                    <source media="(min-width : 481px) and (max-width : 1199px)" srcset="${product.image.tablet}">
                    <source media="(min-width : 1200px) and (max-width : 1900px)" srcset="${product.image.desktop}">
                    <img src="${product.image.thumbnail}" alt="">
                </picture>
                
            </div>
            <button class="add-to-cart-btn">Add To Cart</button>
            <div class="product-details">
                <p class="product-category">${product.category}</p>
                <p class="product-name">${product.name}</p>
                <p class="product-price">$${product.price}</p>
            </div>                    
        </div>
    `;

    document.querySelector(".products-grid-container").innerHTML = productsHTML
})