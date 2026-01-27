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
        const elements = `
                            <div id="box" class="box">
                        <div>
                            <img
                          ]      src="${wind}" 
                            />
                            <button class="cart" onclick="hide">
                                <img
                                    src="assets/images/icon-add-to-cart.svg"
                                    alt="cart-icon"
                                />
                                Add to Cart
                            </button>
                            <button class="order-qty">
                                <div>
                                    <img
                                        src="assets/images/icon-increment-quantity.svg"
                                        alt="add-item-to-cart-btn"
                                        id="add-item"
                                    />
                                </div>
                                <p id="number-of-items">0</p>
                                <div>
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
}

getProduct();

const hide = () => {
    document.style.zIndex = "-9";
};
