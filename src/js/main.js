"use strict";

// 1. Variables globales (el array de productos, referencias al DOM...)
// 2. Función fetchProducts → llama a la API
// 3. Función renderProducts → pinta los productos en el HTML
// 4. Función filterProducts → filtra por búsqueda
// 5. Event listeners → los clicks de botones
// 6. Llamada inicial → arranca todo al cargar la página

// SECCIÓN DE QUERY-SELECTOR
// Éstos son los elementos que nos traemos de la página HTML y usamos en el código

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const productList = document.getElementById("product-list");
let allProducts = [];

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
  });
}

function filterProducts(query) {
  const filtered = allProducts.filter((product) => {
    const title = product.title.toLowerCase();
    return title.includes(query);
  });

  renderProducts(filtered);
}

// SECCIÓN DE FUNCIONES
// Éstas son funciones:
//   - con código auxiliar
//   - con código que usaremos en los eventos
//   - para pintar (render) en la página.

// SECCIÓN DE FUNCIONES DE EVENTOS
// Aquí van las funciones handler/manejadoras de eventos


function handleSearch() {
const query=searchInput.value.toLowerCase() ; 
filterProducts (query); 
}

searchBtn.addEventListener("click", handleSearch); 
searchInput.addEventListener("input", handleSearch);

// SECCIÓN DE EVENTOS
// Éstos son los eventos a los que reacciona la página
// Los más comunes son: click (en botones, enlaces), input (en ídem) y submit (en form)

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
// Este código se ejecutará cuando se carga la página
// Lo más común es:
//   - Pedir datos al servidor
//   - Pintar (render) elementos en la página

console.log("Página y JS cargados!");
