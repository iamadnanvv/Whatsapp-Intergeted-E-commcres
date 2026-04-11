const phoneNumber = "919999999999";

const products = [
  {
    id: "hyo-oversized-noise",
    name: "Oversized Noise Tee",
    category: "Oversized Tees",
    price: 1199,
    description: "Heavyweight cotton, drop shoulders, city-night attitude.",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "hyo-neon-rush",
    name: "Neon Rush Graphic",
    category: "Graphic Prints",
    price: 1399,
    description: "Front-back print built for bold street fits.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    sizes: ["M", "L", "XL"],
  },
  {
    id: "hyo-core-minimal",
    name: "Core Minimal Basic",
    category: "Minimal Basics",
    price: 999,
    description: "Clean silhouette for everyday layering and styling.",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "hyo-glitch-street",
    name: "Glitch Street Print",
    category: "Graphic Prints",
    price: 1499,
    description: "High-density print and soft finish for all-day comfort.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    sizes: ["M", "L", "XL"],
  },
  {
    id: "hyo-oversized-shadow",
    name: "Shadow Oversized Tee",
    category: "Oversized Tees",
    price: 1299,
    description: "Ultra-relaxed fit with reinforced neck rib.",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "hyo-minimal-blank",
    name: "Minimal Blank Essential",
    category: "Minimal Basics",
    price: 899,
    description: "A clean staple made from breathable combed cotton.",
    image:
      "https://images.unsplash.com/photo-1484519332611-516457305ff6?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
  },
];

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

const buildWhatsAppLink = (order) => {
  const total = order.price * order.quantity;
  const message = `Hi Ho-Yo 👋 I want to place an order:
Product: ${order.name}
Size: ${order.size}
Quantity: ${order.quantity}
Unit Price: ${formatPrice(order.price)}
Total: ${formatPrice(total)}

Customer Name: ${order.customerName}
Phone: ${order.customerPhone}
Address: ${order.addressLine}, ${order.city} - ${order.pincode}
Payment Method: ${order.paymentMethod}

Please confirm availability, shipping ETA, and payment collection on WhatsApp.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

const orderModal = document.querySelector("#orderModal");
const modalProductTitle = document.querySelector("#modalProductTitle");
const modalSize = document.querySelector("#modalSize");
const closeModal = document.querySelector("#closeModal");
const orderForm = document.querySelector("#orderForm");
let selectedProduct = null;

const openOrderModal = (product, chosenSize) => {
  selectedProduct = product;
  modalProductTitle.textContent = `${product.name} • ${formatPrice(product.price)}`;
  modalSize.innerHTML = product.sizes
    .map(
      (size) =>
        `<option value="${size}" ${size === chosenSize ? "selected" : ""}>${size}</option>`
    )
    .join("");
  orderModal.classList.add("active");
  orderModal.setAttribute("aria-hidden", "false");
};

const hideOrderModal = () => {
  orderModal.classList.remove("active");
  orderModal.setAttribute("aria-hidden", "true");
};

const createProductCard = (product) => {
  const card = document.createElement("article");
  card.className = "product-card reveal";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" loading="lazy" />
    <div class="product-content">
      <p class="tag">${product.category}</p>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <span class="price">${formatPrice(product.price)}</span>
      <div class="size-row">
        <label for="size-${product.id}">Size:</label>
        <select id="size-${product.id}">
          ${product.sizes
            .map((size) => `<option value="${size}">${size}</option>`)
            .join("")}
        </select>
      </div>
      <button class="buy-btn" type="button">Buy via WhatsApp</button>
    </div>
  `;

  const sizeSelect = card.querySelector("select");
  const buyButton = card.querySelector(".buy-btn");

  buyButton.addEventListener("click", () => {
    openOrderModal(product, sizeSelect.value);
  });

  return card;
};

const renderProducts = () => {
  const grid = document.querySelector("#productGrid");
  products.forEach((product) => grid.appendChild(createProductCard(product)));
};

const setupReveal = () => {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const setupOrderForm = () => {
  closeModal.addEventListener("click", hideOrderModal);
  orderModal.addEventListener("click", (event) => {
    if (event.target === orderModal) hideOrderModal();
  });

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData(orderForm);
    const order = {
      name: selectedProduct.name,
      price: selectedProduct.price,
      size: formData.get("size"),
      quantity: Number(formData.get("quantity")),
      customerName: formData.get("customerName"),
      customerPhone: formData.get("customerPhone"),
      addressLine: formData.get("addressLine"),
      city: formData.get("city"),
      pincode: formData.get("pincode"),
      paymentMethod: formData.get("paymentMethod"),
    };
    const waLink = buildWhatsAppLink(order);
    window.open(waLink, "_blank", "noopener,noreferrer");
    hideOrderModal();
    orderForm.reset();
  });
};

renderProducts();
setupReveal();
setupOrderForm();
