// ====================
// SWIPER
// ====================

if (document.querySelector(".mySwiper")) {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
      nextEl: "#next",
      prevEl: "#prev",
    },
  });
}

// ====================
// ELEMENTS
// ====================

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");

const searchInput = document.querySelector("#searchInput");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

// ====================
// CART DATA
// ====================

let productList = [];
let cartproduct = [];

// ====================
// CART OPEN
// ====================

if (cartIcon && cartTab) {
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();

    cartTab.classList.add("cart-tab-active");
  });
}

// ====================
// CART CLOSE
// ====================

if (closeBtn && cartTab) {
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cartTab.classList.remove("cart-tab-active");
  });
}

// ====================
// HAMBURGER MENU
// ====================

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", (e) => {
    e.preventDefault();

    mobileMenu.classList.toggle("mobile-menu-active");

    const bars = hamburger.querySelector("i");

    if (bars) {
      bars.classList.toggle("fa-bars");
      bars.classList.toggle("fa-xmark");
    }
  });
}

// ====================
// SIGN IN
// ====================

const signinForm = document.querySelector("#signinForm");
const signinPassword = document.querySelector("#password");
const signinTogglePassword = document.querySelector("#togglePassword");

if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Sign in button clicked!");
  });
}

if (signinTogglePassword && signinPassword) {
  signinTogglePassword.addEventListener("click", () => {
    if (signinPassword.type === "password") {
      signinPassword.type = "text";

      signinTogglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      signinPassword.type = "password";

      signinTogglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

// ====================
// GET THE APP
// ====================

const getAppBtn = document.querySelector("#getAppBtn");

if (getAppBtn) {
  getAppBtn.addEventListener("click", (e) => {
    e.preventDefault();

    alert("Our Foodie mobile app is coming soon!");
  });
}

// ====================
// CREATE ACCOUNT
// ====================

const signupForm = document.querySelector("#signupForm");
const signupPassword = document.querySelector("#signupPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const signupTogglePassword = document.querySelector("#signupTogglePassword");
const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");

// CREATE ACCOUNT

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (signupPassword.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }

    alert("Account created successfully!");

    signupForm.reset();
  });
}

// SHOW SIGNUP PASSWORD

if (signupTogglePassword && signupPassword) {
  signupTogglePassword.addEventListener("click", () => {
    if (signupPassword.type === "password") {
      signupPassword.type = "text";

      signupTogglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      signupPassword.type = "password";

      signupTogglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

// SHOW CONFIRM PASSWORD

if (toggleConfirmPassword && confirmPassword) {
  toggleConfirmPassword.addEventListener("click", () => {
    if (confirmPassword.type === "password") {
      confirmPassword.type = "text";

      toggleConfirmPassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      confirmPassword.type = "password";

      toggleConfirmPassword.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

// ====================
// UPDATE TOTALS
// ====================

const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach((item) => {
    const quantity = parseInt(
      item.querySelector(".quantity-value").textContent,
    );

    const price = parseFloat(
      item.querySelector(".item-total").textContent.replace("$", ""),
    );

    totalPrice += price;
    totalQuantity += quantity;
  });

  if (cartTotal) {
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  }

  if (cartValue) {
    cartValue.textContent = totalQuantity;
  }
};

// ====================
// SHOW PRODUCT CARDS
// ====================

const showCards = (products = productList) => {
  if (!cardList) return;

  cardList.innerHTML = "";

  products.forEach((product) => {
    const orderCard = document.createElement("div");

    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
      <div class="card-image">

        <img
          src="${product.image}"
          alt="${product.name}"
        />

      </div>

      <h4>${product.name}</h4>

      <h4 class="price">
        ${product.price}
      </h4>

      <a href="#" class="btn card-btn">
        Add to Cart
      </a>
    `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");

    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();

      addToCart(product);
    });
  });
};

// ====================
// SEARCH
// ====================

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(searchText),
    );

    showCards(filteredProducts);
  });
}

// ====================
// ADD TO CART
// ====================

const addToCart = (product) => {
  const existingProduct = cartproduct.find((item) => item.id === product.id);

  if (existingProduct) {
    alert("Item already in your cart!");
    return;
  }

  cartproduct.push(product);

  let quantity = 1;

  const price = parseFloat(product.price.replace("$", ""));

  const cartItem = document.createElement("div");

  cartItem.classList.add("item");

  cartItem.innerHTML = `
    <div class="item-image">

      <img
        src="${product.image}"
        alt="${product.name}"
      />

    </div>

    <div class="detail">

      <h4>
        ${product.name}
      </h4>

      <h4 class="item-total">
        ${product.price}
      </h4>

    </div>

    <div class="flex">

      <a href="#" class="quantity-btn minus">
        <i class="fa-solid fa-minus"></i>
      </a>

      <h4 class="quantity-value">
        ${quantity}
      </h4>

      <a href="#" class="quantity-btn plus">
        <i class="fa-solid fa-plus"></i>
      </a>

    </div>
  `;

  if (cartList) {
    cartList.appendChild(cartItem);
  }

  updateTotals();

  const plusBtn = cartItem.querySelector(".plus");
  const minusBtn = cartItem.querySelector(".minus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");

  // ====================
  // PLUS
  // ====================

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;

    updateTotals();
  });

  // ====================
  // MINUS
  // ====================

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (quantity > 1) {
      quantity--;

      quantityValue.textContent = quantity;

      itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;

      updateTotals();
    } else {
      cartItem.classList.add("slide-out");

      setTimeout(() => {
        cartItem.remove();

        cartproduct = cartproduct.filter((item) => item.id !== product.id);

        updateTotals();
      }, 300);
    }
  });
};

// ====================
// CHECKOUT ELEMENTS
// ====================

const checkoutBtn = document.querySelector(".checkout-btn");

const checkoutTab = document.querySelector(".checkout-tab");

const closeCheckout = document.querySelector(".close-checkout");

const checkoutForm = document.querySelector("#checkoutForm");

const checkoutTotal = document.querySelector(".checkout-total");

// ====================
// PAYMENT
// ====================

const paymentMethod = document.querySelector("#paymentMethod");

const upiDetails = document.querySelector("#upiDetails");

const cardDetails = document.querySelector("#cardDetails");

// ====================
// OPEN CHECKOUT
// ====================

if (checkoutBtn && checkoutTab) {
  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (cartproduct.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    checkoutTotal.textContent = cartTotal.textContent;

    checkoutTab.classList.add("checkout-tab-active");
  });
}

// ====================
// CLOSE CHECKOUT
// ====================

if (closeCheckout && checkoutTab) {
  closeCheckout.addEventListener("click", (e) => {
    e.preventDefault();

    checkoutTab.classList.remove("checkout-tab-active");
  });
}

// ====================
// PAYMENT METHOD
// ====================

if (paymentMethod) {
  paymentMethod.addEventListener("change", () => {
    upiDetails.classList.remove("active");
    cardDetails.classList.remove("active");

    if (paymentMethod.value === "upi") {
      upiDetails.classList.add("active");
    }

    if (paymentMethod.value === "card") {
      cardDetails.classList.add("active");
    }
  });
}

// ====================
// ORDER CONFIRMATION
// ====================

const orderConfirmation = document.querySelector("#orderConfirmation");

const orderIdElement = document.querySelector("#orderId");

const confirmationDetails = document.querySelector("#confirmationDetails");

const continueBtn = document.querySelector(".continue-btn");

// ====================
// ORDER HISTORY
// ====================

const ordersList = document.querySelector("#ordersList");

// ====================
// SAVE ORDER
// ====================

const saveOrder = (order) => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.unshift(order);

  localStorage.setItem("orders", JSON.stringify(orders));
};

// ====================
// SHOW ORDER CONFIRMATION
// ====================

const showOrderConfirmation = (order) => {
  if (!orderConfirmation) return;

  orderIdElement.textContent = order.id;

  confirmationDetails.innerHTML = `
    <p>
      <strong>Name:</strong>
      ${order.customer}
    </p>

    <p>
      <strong>Payment:</strong>
      ${order.payment}
    </p>

    <p>
      <strong>Total:</strong>
      ${order.total}
    </p>
  `;

  orderConfirmation.classList.add("active");
};

// ====================
// SHOW ORDER HISTORY
// ====================

const showOrderHistory = () => {
  if (!ordersList) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  ordersList.innerHTML = "";

  // ====================
  // NO ORDERS
  // ====================

  if (orders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty-orders">

        <i class="fa-solid fa-bag-shopping"></i>

        <h3>
          No orders yet
        </h3>

        <p>
          Your previous orders
          will appear here.
        </p>

        <a
          href="index.html#menu"
          class="btn"
        >
          Start Shopping
        </a>

      </div>
    `;

    return;
  }

  // ====================
  // DISPLAY ORDERS
  // ====================

  orders.forEach((order) => {
    const orderCard = document.createElement("div");

    orderCard.classList.add("order-card-history");

    // ====================
    // ORDER ITEMS
    // ====================

    const items = order.items
      .map((item) => {
        // Find product from products.json
        const product = productList.find((p) => p.id === item.id);

        // Use saved image first.
        // If old order has no image,
        // get image from products.json.
        const image = item.image || product?.image;

        const quantity = item.quantity || 1;

        const price = parseFloat(item.price.replace("$", ""));

        const itemTotal = price * quantity;

        return `
            <div class="order-item">

              <div class="order-item-image">

                <img
                  src="${image}"
                  alt="${item.name}"
                  onerror="this.style.display='none'"
                />

              </div>

              <div class="order-item-details">

                <h4>
                  ${item.name}
                </h4>

                <p>
                  Quantity: ${quantity}
                </p>

              </div>

              <div class="order-item-price">

                $${itemTotal.toFixed(2)}

              </div>

            </div>
          `;
      })
      .join("");

    // ====================
    // ORDER CARD
    // ====================

    orderCard.innerHTML = `
      <div class="order-card-top">

        <div class="order-info">

          <h3>
            Order #${order.id}
          </h3>

          <p>
            <strong>Date:</strong>
            ${order.date}
          </p>

          <p>
            <strong>Payment:</strong>
            ${order.payment}
          </p>

        </div>

        <span class="order-status">

          <i class="fa-solid fa-circle-check"></i>

          Delivered

        </span>

      </div>

      <div class="order-items">

        ${items}

      </div>

      <div class="order-card-bottom">

        <div class="order-total">

          <span>
            Total Amount
          </span>

          <h3>
            ${order.total}
          </h3>

        </div>

        <button
          class="btn reorder-btn"
          data-order-id="${order.id}"
        >

          <i class="fa-solid fa-rotate-right"></i>

          Reorder

        </button>

      </div>
    `;

    ordersList.appendChild(orderCard);
  });

  // ====================
  // REORDER
  // ====================

  document.querySelectorAll(".reorder-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const orderId = button.dataset.orderId;

      const order = orders.find((item) => item.id === orderId);

      if (!order) return;

      localStorage.setItem("reorderItems", JSON.stringify(order.items));

      window.location.href = "index.html#menu";
    });
  });
};

// ====================
// PLACE ORDER
// ====================

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#checkoutName").value.trim();

    const phone = document.querySelector("#checkoutPhone").value.trim();

    const address = document.querySelector("#checkoutAddress").value.trim();

    const payment = paymentMethod.value;

    // ====================
    // BASIC VALIDATION
    // ====================

    if (!name || !phone || !address || !payment) {
      alert("Please fill all the details.");

      return;
    }

    // ====================
    // UPI VALIDATION
    // ====================

    if (payment === "upi") {
      const upiId = document.querySelector("#upiId").value.trim();

      if (!upiId.includes("@")) {
        alert("Please enter a valid UPI ID.");

        return;
      }
    }

    // ====================
    // CARD VALIDATION
    // ====================

    if (payment === "card") {
      const cardNumber = document.querySelector("#cardNumber").value.trim();

      const cardName = document.querySelector("#cardName").value.trim();

      const expiry = document.querySelector("#expiry").value.trim();

      const cvv = document.querySelector("#cvv").value.trim();

      if (!cardNumber || !cardName || !expiry || !cvv) {
        alert("Please fill all card details.");

        return;
      }

      if (cardNumber.replace(/\s/g, "").length !== 16) {
        alert("Card number must contain 16 digits.");

        return;
      }

      if (cvv.length !== 3) {
        alert("CVV must contain 3 digits.");

        return;
      }
    }

    // ====================
    // CREATE ORDER ITEMS
    // ====================

    const orderItems = [];

    document.querySelectorAll(".item").forEach((item, index) => {
      const quantity = parseInt(
        item.querySelector(".quantity-value").textContent,
      );

      orderItems.push({
        id: cartproduct[index].id,

        name: cartproduct[index].name,

        price: cartproduct[index].price,

        image: cartproduct[index].image,

        quantity: quantity,
      });
    });

    // ====================
    // CREATE ORDER
    // ====================

    const order = {
      id: "FD-" + Date.now().toString().slice(-6),

      customer: name,

      phone: phone,

      address: address,

      payment:
        payment === "cod"
          ? "Cash on Delivery"
          : payment === "upi"
            ? "UPI"
            : "Card",

      items: orderItems,

      total: cartTotal.textContent,

      date: new Date().toLocaleString(),
    };

    // ====================
    // SAVE ORDER
    // ====================

    saveOrder(order);

    // ====================
    // SHOW CONFIRMATION
    // ====================

    showOrderConfirmation(order);

    // ====================
    // RESET CHECKOUT
    // ====================

    checkoutForm.reset();

    upiDetails.classList.remove("active");

    cardDetails.classList.remove("active");

    checkoutTab.classList.remove("checkout-tab-active");

    // ====================
    // CLEAR CART
    // ====================

    cartproduct = [];

    if (cartList) {
      cartList.innerHTML = "";
    }

    updateTotals();

    // ====================
    // UPDATE ORDER HISTORY
    // ====================

    showOrderHistory();
  });
}

// ====================
// CONTINUE SHOPPING
// ====================

if (continueBtn) {
  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (orderConfirmation) {
      orderConfirmation.classList.remove("active");
    }

    if (cartTab) {
      cartTab.classList.remove("cart-tab-active");
    }
  });
}

// ====================
// LOAD ORDER HISTORY
// ====================

showOrderHistory();

// ====================
// LOAD PRODUCTS
// ====================

const initApp = () => {
  // IMPORTANT:
  // Do NOT return when cardList is missing.
  // orders.html does not have cardList,
  // but it still needs products.json
  // for order images.

  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Products could not be loaded");
      }

      return response.json();
    })

    .then((data) => {
      // Save products globally
      productList = data;

      // Show product cards only on index.html
      if (cardList) {
        showCards();
      }

      // ====================
      // REORDER ITEMS
      // ====================

      if (cardList) {
        const reorderItems = JSON.parse(localStorage.getItem("reorderItems"));

        if (reorderItems) {
          reorderItems.forEach((item) => {
            const product = productList.find((p) => p.id === item.id);

            if (!product) return;

            addToCart(product);

            const cartItems = document.querySelectorAll(".item");

            const cartItem = cartItems[cartItems.length - 1];

            if (cartItem && item.quantity > 1) {
              const plusBtn = cartItem.querySelector(".plus");

              for (let i = 1; i < item.quantity; i++) {
                plusBtn.click();
              }
            }
          });

          localStorage.removeItem("reorderItems");
        }
      }

      // ====================
      // REFRESH ORDER HISTORY
      // ====================
      // This is important because
      // productList is now available.
      // Old orders can now get their
      // images from products.json.

      showOrderHistory();
    })

    .catch((error) => {
      console.error(error);
    });
};

// ====================
// START APP
// ====================

initApp();

// ====================
// SUBSCRIBE
// ====================

const subscribeBtn =
  document.querySelector("#subscribeBtn");

const subscribeEmail =
  document.querySelector("#subscribeEmail");

const subscribeMessage =
  document.querySelector("#subscribeMessage");

if (
  subscribeBtn &&
  subscribeEmail &&
  subscribeMessage
) {
  subscribeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email =
      subscribeEmail.value.trim();

    subscribeMessage.className = "";

    if (email === "") {
      subscribeMessage.textContent =
        "Please enter your email.";

      subscribeMessage.classList.add("error");

      return;
    }

    if (
      !email.includes("@") ||
      !email.includes(".")
    ) {
      subscribeMessage.textContent =
        "Please enter a valid email.";

      subscribeMessage.classList.add("error");

      return;
    }

    subscribeMessage.textContent =
      "Successfully subscribed!";

    subscribeMessage.classList.add("success");

    subscribeEmail.value = "";
  });
}

// var swiper = new Swiper(".mySwiper", {
//   loop: true,
//   navigation: {
//     nextEl: "#next",
//     prevEl: "#prev",
//   },
// });

// const cartIcon = document.querySelector(".cart-icon");
// const cartTab = document.querySelector(".cart-tab");
// const closeBtn = document.querySelector(".close-btn");
// const cardList = document.querySelector(".card-list");
// const cartList = document.querySelector(".cart-list");
// const cartTotal = document.querySelector(".cart-total");
// const cartValue = document.querySelector(".cart-value");
// const hamburger = document.querySelector(".hamburger");
// const mobileMenu = document.querySelector(".mobile-menu");
// const bars = document.querySelector('.fa-bars');
// const signinForm = document.querySelector("#signinForm");
// const signinpassword = document.querySelector("#password");
// const signintogglePassword = document.querySelector("#togglePassword");
// const signupForm = document.querySelector("#signupForm");
// const signuppassword = document.querySelector("#password");
// const confirmPassword = document.querySelector("#confirmPassword");
// const signuptogglePassword = document.querySelector("#togglePassword");
// const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");

// closeBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   cartTab.classList.remove("cart-tab-active");
// });

// closeBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   cartTab.classList.remove("cart-tab-active");
// });

// hamburger.addEventListener("click", (e) => {
//   e.preventDefault();

//   mobileMenu.classList.toggle("mobile-menu-active");

//   bars.classList.toggle("fa-bars");
//   bars.classList.toggle("fa-xmark");
// });

// togglePassword.addEventListener("click", () => {
//   if (password.type === "password") {
//     password.type = "text";
//     togglePassword.classList.replace("fa-eye", "fa-eye-slash");
//   } else {
//     password.type = "password";
//     togglePassword.classList.replace("fa-eye-slash", "fa-eye");
//   }
// });

// signinForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   alert("Sign in button clicked!");
// });

// togglePassword.addEventListener("click", () => {
//   if (password.type === "password") {
//     password.type = "text";

//     togglePassword.classList.replace("fa-eye", "fa-eye-slash");
//   } else {
//     password.type = "password";

//     togglePassword.classList.replace("fa-eye-slash", "fa-eye");
//   }
// });

// toggleConfirmPassword.addEventListener("click", () => {
//   if (confirmPassword.type === "password") {
//     confirmPassword.type = "text";

//     toggleConfirmPassword.classList.replace("fa-eye", "fa-eye-slash");
//   } else {
//     confirmPassword.type = "password";

//     toggleConfirmPassword.classList.replace("fa-eye-slash", "fa-eye");
//   }
// });

// signupForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (password.value !== confirmPassword.value) {
//     alert("Passwords do not match!");

//     return;
//   }

//   alert("Account created successfully!");

//   signupForm.reset();
// });

// let productList = [];
// let cartproduct = [];

// const updateTotals = () => {

//   let totalPrice = 0;
//   let totalQuantity = 0;

//   document.querySelectorAll('.item').forEach(item => {

//     const quantity = parseInt(item.querySelector('.quantity-value').textContent);
//     const price = parseFloat(item.querySelector('.item-total').textContent.replace('$', ''));

//     totalPrice += price;
//     totalQuantity += quantity;
//   });

//   cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
//   cartValue.textContent = totalQuantity;
// }

// const showCards = () => {
//   productList.forEach(product => {
//     const orderCard = document.createElement("div");
//     orderCard.classList.add("order-card");

//     orderCard.innerHTML = `
//           <div class="card-image">
//              <img src="${product.image}" alt="img" />
//           </div>
//           <h4>${product.name}</h4>
//           <h4 class="price">${product.price}</h4>
//           <a href="#" class="btn card-btn">Add to Cart</a>`;

//     cardList.appendChild(orderCard);

//     const cardBtn = orderCard.querySelector(".card-btn");
//     cardBtn.addEventListener("click", (e) => {
//       e.preventDefault();
//       addToCart(product);
//     });
//   });
// };

// const addToCart = (product) => {

//   const existingProduct = cartproduct.find(item => item.id === product.id);

//   if (existingProduct) {
//     alert('Item already in your cart!');
//     return;
//   }

//   cartproduct.push(product);

//   let quantity = 1;
//   let price = parseFloat(product.price.replace('$', ''));

//   const cartItem = document.createElement("div");
//   cartItem.classList.add("item");

//   cartItem.innerHTML = `
//      <div class="item-image">
//         <img src="${product.image}" alt="img" />
//       </div>
//       <div class="detail">
//         <h4>${product.name}</h4>
//         <h4 class="item-total">${product.price}</h4>
//       </div>
//       <div class="flex">
//         <a href="#" class="quantity-btn minus">
//           <i class="fa-solid fa-minus"></i>
//         </a>
//         <h4 class="quantity-value">${quantity}</h4>
//         <a href="#" class="quantity-btn plus">
//            <i class="fa-solid fa-plus"></i>
//         </a>
//      </div>`;

//   cartList.appendChild(cartItem);
//   updateTotals();

//   const plusBtn = cartItem.querySelector('.plus');
//   const quantityValue = cartItem.querySelector('.quantity-value');
//   const itemTotal = cartItem.querySelector('.item-total');
//   const minusBtn = cartItem.querySelector('.minus');

//   plusBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     quantity++;
//     quantityValue.textContent = quantity;
//     itemTotal.textContent = `${(price * quantity).toFixed(2)}`;
//     updateTotals();
//   });

//   minusBtn.addEventListener('click', (e) => {
//     e.preventDefault();

//     if (quantity > 1) {
//       quantity--;
//       quantityValue.textContent = quantity;
//       itemTotal.textContent = `${(price * quantity).toFixed(2)}`;
//       updateTotals();
//     }
//     else {
//       cartItem.classList.add('slide-out')

//       setTimeout(() => {
//         cartItem.remove();
//         cartproduct = cartproduct.filter(item => item.id !== product.id);
//         updateTotals();
//       }, 300)
//     }
//   })
// }

// const initApp = () => {
//   fetch("products.json")
//     .then((response) => response.json())
//     .then((data) => {
//       productList = data;
//       showCards();
//     });
// };

// initApp();
