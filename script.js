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
// CHECKOUT
// ====================

const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutTab = document.querySelector(".checkout-tab");
const closeCheckout = document.querySelector(".close-checkout");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutTotal = document.querySelector(".checkout-total");

// OPEN CHECKOUT
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

// CLOSE CHECKOUT
if (closeCheckout && checkoutTab) {
  closeCheckout.addEventListener("click", (e) => {
    e.preventDefault();

    checkoutTab.classList.remove("checkout-tab-active");
  });
}

// PLACE ORDER
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#checkoutName").value.trim();
    const phone = document.querySelector("#checkoutPhone").value.trim();
    const address = document.querySelector("#checkoutAddress").value.trim();
    const payment = document.querySelector("#paymentMethod").value;

    if (!name || !phone || !address || !payment) {
      alert("Please fill all the details.");
      return;
    }

    alert("Order placed successfully!");

    checkoutForm.reset();
    checkoutTab.classList.remove("checkout-tab-active");
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
const signinTogglePassword =
  document.querySelector("#togglePassword");


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

      signinTogglePassword.classList.replace(
        "fa-eye",
        "fa-eye-slash"
      );

    } else {

      signinPassword.type = "password";

      signinTogglePassword.classList.replace(
        "fa-eye-slash",
        "fa-eye"
      );

    }

  });

}


// ====================
// CREATE ACCOUNT
// ====================

const signupForm = document.querySelector("#signupForm");

const signupPassword =
  document.querySelector("#signupPassword");

const confirmPassword =
  document.querySelector("#confirmPassword");

const signupTogglePassword =
  document.querySelector("#signupTogglePassword");

const toggleConfirmPassword =
  document.querySelector("#toggleConfirmPassword");


// CREATE ACCOUNT SUBMIT

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

      signupTogglePassword.classList.replace(
        "fa-eye",
        "fa-eye-slash"
      );

    } else {

      signupPassword.type = "password";

      signupTogglePassword.classList.replace(
        "fa-eye-slash",
        "fa-eye"
      );

    }

  });

}


// SHOW CONFIRM PASSWORD

if (toggleConfirmPassword && confirmPassword) {

  toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPassword.type === "password") {

      confirmPassword.type = "text";

      toggleConfirmPassword.classList.replace(
        "fa-eye",
        "fa-eye-slash"
      );

    } else {

      confirmPassword.type = "password";

      toggleConfirmPassword.classList.replace(
        "fa-eye-slash",
        "fa-eye"
      );

    }

  });

}


// CART DATA

let productList = [];
let cartproduct = [];


// ====================
// UPDATE TOTALS
// ====================

const updateTotals = () => {

  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach((item) => {

    const quantity = parseInt(
      item.querySelector(".quantity-value").textContent
    );

    const price = parseFloat(
      item
        .querySelector(".item-total")
        .textContent
        .replace("$", "")
    );

    totalPrice += price;
    totalQuantity += quantity;

  });


  if (cartTotal) {
    cartTotal.textContent =
      `$${totalPrice.toFixed(2)}`;
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
        <img src="${product.image}" alt="${product.name}">
      </div>

      <h4>${product.name}</h4>

      <h4 class="price">${product.price}</h4>

      <a href="#" class="btn card-btn">
        Add to Cart
      </a>
    `;

    cardList.appendChild(orderCard);

    const cardBtn =
      orderCard.querySelector(".card-btn");

    cardBtn.addEventListener("click", (e) => {

      e.preventDefault();

      addToCart(product);

    });

  });

};

if (searchInput) {

  searchInput.addEventListener("input", () => {

    const searchText =
      searchInput.value.toLowerCase().trim();

    const filteredProducts =
      productList.filter((product) =>
        product.name.toLowerCase().includes(searchText)
      );

    showCards(filteredProducts);

  });

}


// ====================
// ADD TO CART
// ====================

const addToCart = (product) => {

  const existingProduct =
    cartproduct.find(
      (item) => item.id === product.id
    );


  if (existingProduct) {

    alert("Item already in your cart!");

    return;

  }


  cartproduct.push(product);


  let quantity = 1;

  let price =
    parseFloat(
      product.price.replace("$", "")
    );


  const cartItem =
    document.createElement("div");

  cartItem.classList.add("item");


  cartItem.innerHTML = `
    <div class="item-image">

      <img
        src="${product.image}"
        alt="${product.name}"
      />

    </div>

    <div class="detail">

      <h4>${product.name}</h4>

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


  const plusBtn =
    cartItem.querySelector(".plus");

  const minusBtn =
    cartItem.querySelector(".minus");

  const quantityValue =
    cartItem.querySelector(".quantity-value");

  const itemTotal =
    cartItem.querySelector(".item-total");


  // PLUS BUTTON

  plusBtn.addEventListener("click", (e) => {

    e.preventDefault();

    quantity++;

    quantityValue.textContent =
      quantity;

    itemTotal.textContent =
      `$${(price * quantity).toFixed(2)}`;

    updateTotals();

  });


  // MINUS BUTTON

  minusBtn.addEventListener("click", (e) => {

    e.preventDefault();


    if (quantity > 1) {

      quantity--;

      quantityValue.textContent =
        quantity;

      itemTotal.textContent =
        `$${(price * quantity).toFixed(2)}`;

      updateTotals();

    } else {

      cartItem.classList.add("slide-out");


      setTimeout(() => {

        cartItem.remove();

        cartproduct =
          cartproduct.filter(
            (item) => item.id !== product.id
          );

        updateTotals();

      }, 300);

    }

  });

};


// ====================
// LOAD PRODUCTS
// ====================

const initApp = () => {

  if (!cardList) return;


  fetch("products.json")

    .then((response) => {

      if (!response.ok) {
        throw new Error("Products could not be loaded");
      }

      return response.json();

    })

    .then((data) => {

      productList = data;

      showCards();

    })

    .catch((error) => {

      console.error(error);

    });

};


initApp();


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
