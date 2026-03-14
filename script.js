// Product data
const products = [
  {
    id: 1,
    title: "Nova Smart Watch X1",
    price: 129.99,
    category: "wearables",
    image: "assets/image (13).jfif",
    alt: "Smart Watch",
    description:
      "Sleek touchscreen smartwatch with fitness tracking, heart-rate monitor, and all-day battery life.",
  },
  {
    id: 2,
    title: "Elevate Pro Laptop Stand",
    price: 49.99,
    category: "accessories",
    image: "assets/image (2).jfif",
    alt: "Laptop Stand",
    description:
      "Adjustable aluminum laptop stand designed for better posture and improved airflow.",
  },
  {
    id: 3,
    title: "VoltMax 20000mAh Power Bank",
    price: 59.99,
    category: "accessories",
    image: "assets/image (3).jfif",
    alt: "Power Bank",
    description:
      "High-capacity portable charger with fast-charging support for phones and tablets.",
  },
  {
    id: 4,
    title: "ArmorShield Phone Case",
    price: 29.99,
    category: "accessories",
    image: "assets/image (4).jfif",
    alt: "Phone Case",
    description:
      "Shockproof protective case with slim design and enhanced grip for daily protection.",
  },
  {
    id: 5,
    title: "FlexFit Sports Socks",
    price: 14.99,
    category: "wearables",
    image: "assets/image (5).jfif",
    alt: "Sports Socks",
    description:
      "Breathable and moisture-wicking socks designed for maximum comfort during workouts.",
  },
  {
    id: 6,
    title: "PulseTrack Smart Ring",
    price: 199.99,
    category: "wearables",
    image: "assets/image (6).jfif",
    alt: "Smart Ring",
    description:
      "Minimal smart ring with sleep tracking, activity monitoring, and sleek modern design.",
  },
  {
    id: 7,
    title: "EchoBeat Mini Speaker",
    price: 89.99,
    category: "audio",
    image: "assets/image (7).jfif",
    alt: "Smart Speaker",
    description:
      "Compact smart speaker with immersive sound and voice assistant integration.",
  },
  {
    id: 8,
    title: "AirCharge Wireless Pad",
    price: 39.99,
    category: "accessories",
    image: "assets/image (8).jfif",
    alt: "Wireless Charger",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled smartphones.",
  },
];

// DOM Elements
const grid = document.querySelector(".product-grid");
const ProductCount = document.querySelector(".cart-item-count");
const cart = document.querySelector(".cart");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const searchButton = document.querySelector(".nav-search");
const input = document.getElementById("search-product");
const categoryFilter = document.querySelectorAll(".filter-button");
const themeButton = document.querySelector(".theme-toggle");
const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");
const cartContainer = document.getElementById("cartItems");
const checkout = document.getElementById("checkoutBtn");

// Light and Dark Mode
let currentTheme = "dark";
const toggleTheme = () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    lightIcon.style.display = "none";
    darkIcon.style.display = "inline-block";
    currentTheme = "light";
  } else {
    lightIcon.style.display = "inline-block";
    darkIcon.style.display = "none";
    currentTheme = "dark";
  }
};
themeButton.addEventListener("click", toggleTheme);

// Cart Array
let cartItems = [];

// Render Products
function renderProducts(productsToShow) {
  grid.innerHTML = "";
  productsToShow.forEach((product) => {
    grid.innerHTML += `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt}" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <strong>$ ${product.price}</strong>
          <button class="add-item" data-id=${product.id}>+</button>
        </div>
      </div>
    </div>`;
  });
}

// Add item to cart
const addToCart = (id) => {
  let product = products.find((p) => p.id === id);
  let existingItem = cartItems.find((item) => item.id === id);
  if (existingItem)
    existingItem.qty++; // increase qty if exists
  else cartItems.push({ ...product, qty: 1 }); // add new item
  ProductCount.textContent = cartItems.reduce((sum, i) => sum + i.qty, 0);
  renderCart();
};

// Render Cart Items
function renderCart() {
  cartContainer.innerHTML = "";
  let cartTotal = document.getElementById("cartTotal");

  if (cartItems.length === 0) {
    cartContainer.innerHTML = `<p class="empty-msg">Cart is empty!</p>`;
    cartTotal.textContent = "$0.00";
    return;
  }

  cartItems.forEach((cartItem) => {
    cartContainer.innerHTML += `
    <div class="cart-item">
      <div class="cart-item-image"><img src="${cartItem.image}" /></div>
      <div class="cart-item-details">
        <p class="cart-item-title">${cartItem.title}</p>
        <p class="cart-item-price">$${cartItem.price}</p> <!-- $ sign add kiya -->
        <div class="cart-item-quantity">
          <button class="quantity-btn inc-btn" data-id="${cartItem.id}">+</button>
          <input type="text" value="${cartItem.qty}" class="quantity-input" readonly>
          <button class="quantity-btn dec-btn" data-id="${cartItem.id}">-</button>
        </div>
      </div>
      <button class="remove-item" data-id="${cartItem.id}"><i class="fas fa-times"></i></button>
    </div>`;
  });

  let total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = "$" + total.toFixed(2);
}

// Cart Buttons (remove, +, -)
cartContainer.addEventListener("click", (e) => {
  let btn = e.target.closest(".remove-item");
  if (btn) {
    let id = Number(btn.dataset.id);
    cartItems = cartItems.filter((item) => item.id !== id);
    ProductCount.textContent = cartItems.reduce((sum, i) => sum + i.qty, 0);
    renderCart();
  }
  let incBtn = e.target.closest(".inc-btn");
  if (incBtn) {
    let id = Number(incBtn.dataset.id);
    let item = cartItems.find((item) => item.id === id);
    item.qty++;
    ProductCount.textContent = cartItems.reduce((sum, i) => sum + i.qty, 0);
    renderCart();
  }
  let decBtn = e.target.closest(".dec-btn");
  if (decBtn) {
    let id = Number(decBtn.dataset.id);
    let item = cartItems.find((item) => item.id === id);
    if (item.qty === 1) cartItems = cartItems.filter((item) => item.id !== id);
    else item.qty--;
    ProductCount.textContent = cartItems.reduce((sum, i) => sum + i.qty, 0);
    renderCart();
  }
});

// Checkout button
checkout.addEventListener("click", () => {
  if (cartItems.length === 0) {
    showToast("Your cart is empty!"); return;
  }

  const confirmOrder = confirm("Are you sure you want to checkout?");
  if (!confirmOrder) return;

  cartItems = [];
  ProductCount.textContent = 0;
  renderCart();

   showToast("Order placed! Thank you 🎉");
});

// Add product to cart from grid
grid.addEventListener("click", (e) => {
  let btn = e.target.closest(".add-item");
  if (btn) addToCart(Number(btn.getAttribute("data-id")));
});

// Open/Close Cart Modal
cart.addEventListener("click", () => cartModal.classList.add("active"));
closeCart.addEventListener("click", () => cartModal.classList.remove("active"));

// Category Filter
categoryFilter.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryFilter.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filteredProducts =
      btn.dataset.filter === "all"
        ? products
        : products.filter((p) => p.category === btn.dataset.filter);
    renderProducts(filteredProducts);
  });
});

// Search Products
let inputShow = "none";
searchButton.addEventListener("click", () => {
  input.style.display = inputShow === "none" ? "block" : "none";
  inputShow = inputShow === "none" ? "block" : "none";
});
input.addEventListener("input", () => {
  let val = input.value.toLowerCase().trim();
  renderProducts(
    products.filter(
      (p) =>
        p.title.toLowerCase().includes(val) ||
        p.description.toLowerCase().includes(val),
    ),
  );
});

// Toast Notification

let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// Initial render
renderProducts(products);
