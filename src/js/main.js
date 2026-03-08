"use strict";

// VARIABLES

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const productList = document.getElementById("product-list");
const cartSideBar = document.getElementById("cart");

const closeCartBtn = document.getElementById("close-cart");

let cart = [];
let allProducts = [];

// LLAMAR A LA API

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

// PINTAR PRODUCTOS EN EL HTML

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

    productList.appendChild(card);
    const btn = card.querySelector(".card__button");
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// BUSCADOR DE PRODUCTOS

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

//AÑADIR AL CARRITO

function addToCart(productId) {
  const product = allProducts.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    console.log("Product added: ", product.title);
    renderCart();
  }
}

// MOSTRAR CARRITO

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart__item");
    cartItem.innerHTML = `
<p>${item.title} - ${item.price} €</p>
<button onclick="removeFromCart(${index})">X</button>
`;
    cartList.appendChild(cartItem);
    total += item.price;
  });
  totalElement.innerText = total.toFixed(2);
}

// ELIMINAR ITEMS DEL CARRITO

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  console.log("Item removed. Cart updated");
}

//EVENT LISTENERS

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("input", handleSearch);

closeCartBtn.addEventListener("click", () => {
  cartSideBar.hidden = true;
});

console.log("Página y JS cargados!");
