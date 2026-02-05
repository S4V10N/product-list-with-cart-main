const productContainer = document.querySelector("#products");

async function getProduct() {
    const response = await fetch("./data.json");
    const productData = await response.json();

    const products = [];

    productContainer.innerHTML = ``;
    productData.forEach((product) => {
        const name = product.name;
        const category = product.category;
        const price = product.price.toFixed(2);
        const thumbnail = product.image.thumbnail;
        const mobile = product.image.mobile;
        const tablet = product.image.tablet;
        const wind = window.screen.width >= 600 ? tablet : mobile;
        const desktop = product.image.desktop;
        const cartItems = 0;
        const elements = `
                            <div id="box" class="box">
                        <div>
                            <img
                          ]      src="${wind}" 
                            />
                            <button class="cart" >
                                <img
                                    src="assets/images/icon-add-to-cart.svg"
                                    alt="cart-icon"
                                />
                                Add to Cart
                            </button>
                            <button class="order-qty edit-qty">
                                <div class="inc">
                                    <img
                                        src="assets/images/icon-increment-quantity.svg"
                                        alt="add-item-to-cart-btn"
                                        id="add-item"
                                    />
                                </div>
                                <p id="number-of-items" class="order-items">${cartItems}</p>
                                <div class="dec">
                                    <img
                                        src="assets/images/icon-decrement-quantity.svg"
                                        alt="remove-item-from-cart-btn"
                                        id="remove-item"
                                    />
                                </div>
                            </button>
                        </div>
                        <div class="desc">
                            <p id="category" class="category">${category}</p>
                            <p id="product" class="product">
                                <strong>${name}</strong>
                            </p>
                            <p id="price" class="price">${price}</p>
                        </div>
                    </div>
        `;
        products.push(elements);
    });
    productContainer.innerHTML = products.join("");
    const cartBtn = document.querySelectorAll(".cart");

    cartBtn.forEach((cart) => {
        cart.classList.add("under");
        cart.addEventListener("click", () => {
            cart.classList.remove("under");
        });
    });

    const orderDec = document.querySelectorAll(".edit-qty .dec");
    const orderTotal = document.querySelectorAll("#order-items");
    const orderInc = document.querySelectorAll(".edit-qty .inc");

    orderDec.forEach((order) => {
        let qty = 0;
        order.addEventListener("click", () => {
            orderTotal.innerHTML = qty <= 0 ? 0 : qty--;
            console.log(qty);
            console.log(orderTotal);
        });
    });
    orderInc.forEach((order) => {
        let qty = 0;
        order.addEventListener("click", () => {
            qty++;
            console.log(qty);
            console.log(orderTotal);
            orderTotal.innerText = qty;
        });
    });
}

getProduct();
