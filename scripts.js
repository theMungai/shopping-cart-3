let productsHTML = "";

const cart = []
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
            <button class="add-to-cart-btn" data-product-name = "${product.name}" data-product-price = "${product.price}">Add To Cart</button>
            <div class="product-details">
                <p class="product-category">${product.category}</p>
                <p class="product-name">${product.name}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>                    
        </div>
    `;

    document.querySelector(".products-grid-container").innerHTML = productsHTML
});

const addButtons = document.querySelectorAll(".add-to-cart-btn");
addButtons.forEach((addButton) => {
    addButton.addEventListener("click", () => {
        const productName = addButton.dataset.productName;
        const productPrice = addButton.dataset.productPrice;
        
        // Checking if the product, already exists in the cart
        const matchingItem = cart.find((item) => item.name === productName)

        if(matchingItem){
            matchingItem.quantity += 1
        }
        else{
            cart.push({
                name : productName,
                price : productPrice,
                quantity : 1
            })
    
        }
        updateCart()
    });
});

function updateCart(){
    const cartWithItems = document.querySelector(".cart-with-items");
    const emptycart = document.querySelector(".empty-cart");
    const cartQuantity = document.querySelector(".cart-quantity")
    cartWithItems.innerHTML = ""

let totalAmount = 0
    cart.forEach((item) => {
       let cartHTML = `
        <div class="cart-added-items">
            <div class="added-items-details">
                <p class="added-item-name">${item.name}</p>
                <div class="quantity-and-price">
                    <p class="item-quantity">${item.quantity}x</p>
                    <p class="price-per-item">@$${(item.price * 1).toFixed(2)}</p>
                    <p class="quantity-and-price-product">${(item.quantity * item.price).toFixed(2)}</p>
                </div>
            </div>

            <div class="remove-button-container">
                <button class="remove-button">
                    <img src="/images/icon-remove-item.svg" alt="">
                </button>
                
            </div>
        </div>
    `;
    totalAmount += item.quantity * item.price
    cartWithItems.innerHTML += cartHTML
    });

    cartQuantity.textContent = cart.reduce((acc, item) => acc + item.quantity, 0)

    let totalHTML = `
        <div class="total-container">
            <p>Order Total</p>
            <h1>$${totalAmount.toFixed(2)}</h1>
        </div>

        <div class="confirm-order-container">
            <button class = "confirm-order-btn">Confirm Your Order</button>
        </div>
    `;

    cartWithItems.innerHTML += totalHTML

    const confirmButton = document.querySelector(".confirm-order-btn")
    confirmButton.addEventListener("click", () => {
        displayConfirmedOrder(totalAmount)
    })
}


function displayConfirmedOrder(totalAmount){
    const popDialog = document.querySelector(".popup-container");
    popDialog.style.display ="block"
    let modalHTML = `
        <div class="pop-up-details">
            <div class="pop-up-header">
                <img src="images/icon-order-confirmed.svg" alt="">
                <h1 style="color:hsl(14, 65%, 9%) ;">Order Confirmed</h1>
                <p style="color:hsl(7, 20%, 60%) ;">We hope you enjoy your food</p>
            </div>
            <div class="items-confirmed">
    `;

    cart.forEach((item) => {
        const product = products.find((product) => product.name === item.name)
        modalHTML += `
             
                <div class="image-quantity-and-price">
                    <div class="thumbnail-container">
                        <img src="${product.image.thumbnail}" alt="">
                    </div>

                    <div class="confirmed-product-name-quantity">
                        <p>${item.name}</p>
                        <div class="quantity-price">
                            <p>${item.quantity}x</p>
                            <p>@$${(item.price * 1).toFixed(2)}</p>
                        </div>
                    </div>
                    
                </div>

                <div class="confirmed-total-per-item">
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            
        
        `;
    });

    modalHTML += `
            <div class="total">
                <p>Order Total</p>
                <h1>$${totalAmount.toFixed(2)}</h1>
            </div>

            <div class="carbon-neutral">
                <img src="images/icon-carbon-neutral.svg" alt="">
                <p>This is a <span>carbon-neutral</span> delivery</p>
            </div>
            <button class="order-button js-start-new-order">Start New Order</button>
        </div>
    `;

    
    popDialog.innerHTML = modalHTML
}