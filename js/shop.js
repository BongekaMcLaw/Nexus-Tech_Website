const grid = document.getElementById("products-grid");

// 1. Display Products
function displayProducts() {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="card-content">
        <h3>${product.name}</h3>
        <p class="price">R${product.price}</p>
        <p>${product.description}</p>
        <button class="btn add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 2. Add to Cart Logic
function addToCart(id) {
  // Get existing cart from localStorage, or empty array if none exists
  let cart = JSON.parse(localStorage.getItem("nexusCart")) || [];

  // Check if item already exists in cart
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity
  } else {
    cart.push({ id: id, quantity: 1 }); // Add new item
  }

  // Save back to localStorage
  localStorage.setItem("nexusCart", JSON.stringify(cart));

  updateCartCount();
  alert("Item added to cart!");
}

// 3. Update Cart Count in Header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("nexusCart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalItems;
}

// Initialize the page
displayProducts();
updateCartCount();
