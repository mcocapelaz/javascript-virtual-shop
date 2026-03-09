"use strict";

// VARIABLES

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const productList = document.getElementById("product-list");
const cartSideBar = document.getElementById("cart");
const closeCartBtn = document.getElementById("close-cart");
const clearCartBtn = document.getElementById("clear-cart");
const checkOutSummary = document.getElementById("checkout-summary");
const summaryList = document.getElementById("summary-list");
const backBtn = document.getElementById("back-btn");
const checkOutBtn = document.getElementById("checkout-btn");
const summaryTotal = document.getElementById("summary-total");
const cartTotal = document.getElementById("cart-total");
const confirmBtn = document.getElementById("confirm-order-btn");

let cart = [];
let allProducts = [];

// API CALL

const fetchProducts = async () => {
  try {
    const url = "https://fakestoreapi.com/products";
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      allProducts = data;
      renderProducts(allProducts);
      console.log("Products loaded and stored in allProducts");
    } else {
      console.log(res.status);
    }
  } catch (err) {
    console.error(err);
  }
};
fetchProducts();

// PRODUCT CARDS

function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
<img class="card__image" src="${product.image}" alt="${product.title}">
<h3 class="card__title">${product.title}</h3> 
<p class="card__price">${product.price}</p>
<button class="card__button" data-id= "${product.id}">Add to cart
</button>
`;

    const itemCard = cart.find((cartItem) => cartItem.id === product.id);
    if (cart.find((cartItem) => cartItem.id === product.id)) {
      card.classList.add("card__selected");
    }

    productList.appendChild(card);
    const btn = card.querySelector(".card__button");
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      addToCart(id);
      card.classList.add("card__selected");
    });
  });
}

// PRODUCTS SEARCH ENGINE

function filterProducts(query) {
  const filtered = allProducts.filter((product) => {
    const title = product.title.toLowerCase();
    return title.includes(query);
  });

  renderProducts(filtered);
}

function handleSearch() {
  const query = searchInput.value.toLowerCase();
  filterProducts(query);
}

//ADD ITEMS TO CART

function addToCart(productId) {
  const product = allProducts.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    console.log("Product added: ", product.title);

    renderCart();
    
  }
}

// SHOW CART

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart__item");
    cartItem.innerHTML = `
<p>${item.title} ${item.price} €</p>
<button onclick="removeFromCart(${index})">X</button>
`;
    cartList.appendChild(cartItem);
    total += item.price;
  });
  cartTotal.innerText = total.toFixed(2);
}

// REMOVE ITEMS FROM CART

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  renderProducts(allProducts);
}

// CLEAR CART

function clearCart() {
  cart.length = 0;
  renderCart();
  renderProducts(allProducts);
}

// SHOW CHECKOUT

function showCheckout() {
  let total = 0;
  productList.hidden = true;
  checkOutSummary.hidden = false;
  summaryList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - ${item.price}€`;
    total += item.price;
    summaryList.appendChild(li);
  });
  summaryTotal.innerText = total.toFixed(2);
}

// CONFIRM ORDER

function confirmOrder() {
  alert("Your order is being processed. Thank you for your purchase!");
  clearCart();
  setTimeout(() => {
    checkOutSummary.hidden = true;
    productList.hidden = false;
  }, 3000);
}

// BACK TO SHOP BTN

function backToShop() {
  productList.hidden = false;
  checkOutSummary.hidden = true;
  summaryList.innerHTML = "";
}

//EVENT LISTENERS

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("input", handleSearch);
clearCartBtn.addEventListener("click", clearCart);
checkOutBtn.addEventListener("click", showCheckout);
backBtn.addEventListener("click", backToShop);
confirmBtn.addEventListener("click", confirmOrder);

console.log("Página y JS cargados!");
