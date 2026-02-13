# Frontend Mentor | Product list with cart

This is a solution to the [ Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Your users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [Github repo](https://github.com/S4V10N/product-list-with-cart-main.git)
- Live Site URL: [Live preview](https://s4-product-list-with-cart.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- SASS custom properties
- Flexbox Grid
- JS

### What I learned

i expanded my knowledge on state handling and basic interaction within the scope of the project

see code snippets below:B

```sass
    .order
        justify-content: space-between
        padding: 0
        div:has(img)
            width: 6rem
            border: none
            &:hover , &:active
                img
                    filter: none
```

```js
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
```

## Author

- Website [S4](https://savion-dev.vercel.app)
- Frontend Mentor [S4V10N](https://www.frontendmentor.io/profile/S4V10N)
- Twitter [Dev Savion](https://x.com/dev_savion?s=21)
