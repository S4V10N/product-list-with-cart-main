const productContainer = document.querySelector("#products");
const emptyCheckOut = document.querySelector(".if-empty");
const checkOut = document.querySelector(".if-not-empty");
const orderBox = document.querySelector(".order-box");
const orderQty = document.querySelector(".order-q");
const orderTotal = document.querySelectorAll(".order-total");
const orderConfirmed = document.querySelector(".order");
const orderConfirmedMsg = document.querySelector(".order-confirmed");

async function getProduct() {
    const response = await fetch("./data.json");
    const productData = await response.json();

    productContainer.innerHTML = ``;
    const products = productData.map((product) => {
        const name = product.name;
        const category = product.category;
        const price = product.price.toFixed(2);
        const thumbnail = product.image.thumbnail;
        const mobile = product.image.mobile;
        const tablet = product.image.tablet;
        const wind = window.screen.width >= 600 ? tablet : mobile;

        return `
        <div id="box" class="box" data-name="${name}" data-price="${price}">
            <div>
                <img src="${wind}" />
                <button class="cart">
                    <img src="assets/images/icon-add-to-cart.svg" alt="cart-icon" />
                    Add to Cart
                </button>
                <button class="order-qty edit-qty">
                    <div class="inc">
                        <img src="assets/images/icon-increment-quantity.svg" alt="add-item-to-cart-btn" />
                    </div>
                    <p class="order-items">0</p>
                    <div class="dec">
                        <img src="assets/images/icon-decrement-quantity.svg" alt="remove-item-from-cart-btn" />
                    </div>
                </button>
            </div>
            <div class="desc">
                <p class="category">${category}</p>
                <p class="product"><strong>${name}</strong></p>
                <p class="price">${price}</p>
            </div>
        </div>
        `;
    });

    productContainer.innerHTML = products.join("");

    // Add simple cart animation
    const cartBtn = document.querySelectorAll(".cart");
    cartBtn.forEach((cart) => {
        cart.classList.add("under");

        cart.addEventListener("click", () => cart.classList.remove("under"));
    });

    itemOrder();
    console.log(borderBox);
}

getProduct();

const itemOrder = () => {
    const incBtns = document.querySelectorAll(".edit-qty .inc");
    const decBtns = document.querySelectorAll(".edit-qty .dec");
    updateCheckoutState();

    incBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const box = btn.closest(".box");
            const countEl = box.querySelector(".order-items");
            const name = box.dataset.name;
            const price = Number(box.dataset.price);
            const thumbnail = box.querySelector("img").src; // get thumbnail from product box

            let qty = Number(countEl.innerText);
            qty++;
            countEl.innerText = qty;

            updateOrderBox(name, price, qty, countEl, thumbnail);
            updateCheckoutState();
        });
    });

    decBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const box = btn.closest(".box");
            const countEl = box.querySelector(".order-items");
            const name = box.dataset.name;
            const price = Number(box.dataset.price);
            const thumbnail = box.querySelector("img").src; // get thumbnail from product box

            let qty = Number(countEl.innerText);
            if (qty > 0) qty--;
            countEl.innerText = qty;

            updateOrderBox(name, price, qty, countEl, thumbnail);
            updateCheckoutState();
        });
    });
};

const updateCheckoutState = () => {
    const allCounts = document.querySelectorAll(".order-items");
    let totalQty = 0;
    let totalPrice = 0;

    allCounts.forEach((item) => {
        const box = item.closest(".box");
        const price = Number(box.dataset.price);
        const qty = Number(item.innerText);

        totalQty += qty;
        totalPrice += qty * price;
    });

    orderQty.innerText = totalQty;
    orderTotal.forEach((item) => {
        item.innerText = `$${totalPrice.toFixed(2)}`;
    });

    if (totalQty > 0) {
        checkOut.classList.remove("hidden");
        emptyCheckOut.classList.add("hidden");
    } else {
        checkOut.classList.add("hidden");
        emptyCheckOut.classList.remove("hidden");
    }
};

const updateOrderBox = (name, price, qty, countEl, thumbnail) => {
    let existingOrder = orderBox.querySelector(`.order[data-order="${name}"]`);
    let existingConfirmed = orderConfirmed.querySelector(
        `.confirmed-item[data-order="${name}"]`,
    );

    if (qty === 0) {
        if (existingOrder) existingOrder.remove();
        if (existingConfirmed) existingConfirmed.remove();
        updateCheckoutState();
        return;
    }

    // Update cart order box
    if (existingOrder) {
        existingOrder.querySelector(".order-qty").innerText = `${qty}x`;
        existingOrder.querySelector(".order-price-total").innerText =
            `$${(qty * price).toFixed(2)}`;
    } else {
        const orderEl = document.createElement("div");
        orderEl.classList.add("order");
        orderEl.dataset.order = name;

        orderEl.innerHTML = `
            <div>
                <p><strong>${name}</strong></p>
                <p>
                    <strong><span class="order-qty">${qty}x</span></strong>
                    <span class="price-per-order">@ $${price}</span>
                    <strong><span class="order-price-total">$${(qty * price).toFixed(2)}</span></strong>
                </p>
            </div>
            <div>
                <img src="assets/images/icon-remove-item.svg" alt="remove-item" class="remove-order"/>
            </div>
        `;

        // Remove button
        orderEl.querySelector(".remove-order").addEventListener("click", () => {
            orderEl.remove();
            if (existingConfirmed) existingConfirmed.remove();
            countEl.innerText = 0;

            const box = countEl.closest(".box");
            const cartBtn = box.querySelector(".cart");
            if (cartBtn) cartBtn.classList.add("under");

            updateCheckoutState();
        });
        document.querySelector("#new-order").addEventListener("click", () => {
            orderConfirmedMsg.classList.add("hidden");
            document.body.classList.remove("stop");
            countEl.innerText = 0;
            const box = countEl.closest(".box");
            const cartBtn = box.querySelector(".cart");
            if (cartBtn) cartBtn.classList.add("under");
            updateCheckoutState();
        });

        orderBox.appendChild(orderEl);
    }

    // Update confirmed order section
    if (existingConfirmed) {
        existingConfirmed.querySelector(".order-qty").innerText = `${qty}x`;
        existingConfirmed.querySelector(".order-price-total").innerText =
            `$${(qty * price).toFixed(2)}`;
    } else {
        const confirmedEl = document.createElement("div");
        confirmedEl.classList.add("confirmed-item");
        confirmedEl.dataset.order = name;

        confirmedEl.innerHTML = `

                <div>
                    <img src="${thumbnail}" alt="${name}-thumbnail-image" />
                </div>
                <div class="checkout-items">
                    <p><strong>${name}</strong></p>
                    <p>
                        <strong><span class="order-qty">${qty}x</span></strong>
                        <span class="price-per-order">@ $${price}</span>
                    </p>
                </div>
                <strong><span class="order-price-total">$${(qty * price).toFixed(2)}</span></strong>
        `;

        orderConfirmed.appendChild(confirmedEl);
    }

    updateCheckoutState();
};

document.querySelector("#confirm-order").addEventListener("click", () => {
    orderConfirmedMsg.classList.remove("hidden");
    document.body.classList.add("stop");
});
