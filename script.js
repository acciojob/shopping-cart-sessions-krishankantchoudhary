// script.js

// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ✅ Always clear sessionStorage on page load to avoid leftover data
sessionStorage.removeItem("cart");

// -------------------- Helper Functions -------------------- //

// Get cart items from sessionStorage
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart items to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------- Rendering Functions -------------------- //

// Render all products with “Add to Cart” buttons
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach click events to each Add to Cart button
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render the cart list from sessionStorage
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -------------------- Core Functionality -------------------- //

// Add a product to cart (duplicates allowed)
function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  saveCart(cart);
  renderCart();
}

// Clear the entire cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// -------------------- Event Listeners -------------------- //

clearCartBtn.addEventListener("click", clearCart);

// -------------------- Initial Render -------------------- //

renderProducts();
renderCart();
