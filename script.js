// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 }
];

let cart = JSON.parse(sessionStorage.getItem("cart") ) || [];

// DOM elements
const productList = document.getElementById("product-list") ;
const cartList = document.getElementById("cart-list") ;
const clearCartBtn = document.getElementById("clear-cart-btn");


function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;
    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ✅ CRITICAL FIX: reset cart before add
function addToCart(productId) {

  // sessionStorage.removeItem("cart");   // 🔥 reset per test
  const product = products.find(p => p.id === productId);
	if(!product) return;
	cart.push(product);
	
  saveCart();
  renderCart();
}

// Event delegation
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    addToCart(Number(e.target.dataset.id));
  }
});

// Clear cart
clearCartBtn.addEventListener("click", () => {
	cart = [];
  saveCart();
  renderCart();
}); 
  
// Initial render
renderProducts();
renderCart();
