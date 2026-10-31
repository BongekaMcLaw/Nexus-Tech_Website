const cartContainer = document.getElementById("cart-items-container");
const subtotalEl = document.getElementById("cart-subtotal");
const totalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");

// 1. Get Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem("nexusCart")) || [];

// 2. Render the Cart
function renderCart() {
  cartContainer.innerHTML = ""; // Clear current HTML
  let subtotal = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<p class="empty-cart-msg">Your cart is currently empty. <br><br> <a href="index.html" style="color: #2b6cb0;">Go back to shop</a></p>';
    subtotalEl.textContent = "R0";
    totalEl.textContent = "R0";
    cartCountEl.textContent = "0";
    return;
  }

  cart.forEach((cartItem) => {
    // Find the full product details using the ID from the cart
    const product = products.find((p) => p.id === cartItem.id);

    if (product) {
      // Calculate item total (price * quantity)
      const itemTotal = product.price * cartItem.quantity;
      subtotal += itemTotal;
      totalItems += cartItem.quantity;

      // Create HTML for this item
      const itemHTML = `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}">
          <div class="cart-item-info">
            <h3>${product.name}</h3>
            <p class="item-price">R${product.price} x ${cartItem.quantity} = <strong>R${itemTotal}</strong></p>
          </div>
          <button class="remove-btn" onclick="removeItem(${product.id})">Remove</button>
        </div>
      `;
      cartContainer.innerHTML += itemHTML;
    }
  });

  // Update Summary UI
  subtotalEl.textContent = `R${subtotal}`;
  totalEl.textContent = `R${subtotal}`; // Assuming free shipping
  cartCountEl.textContent = totalItems;
}

// 3. Remove Item Logic
function removeItem(id) {
  // Filter out the item we want to remove
  cart = cart.filter((item) => item.id !== id);

  // Save back to localStorage
  localStorage.setItem("nexusCart", JSON.stringify(cart));

  // Re-render the page
  renderCart();
}

// 4. Fake Checkout Logic
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert(
    "Order placed successfully! (This is a frontend simulation. No real payment was taken.)",
  );

  // Clear cart
  localStorage.removeItem("nexusCart");
  renderCart();
}

// Run on page load
renderCart();
