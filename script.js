const whatsappNumber = "919645778508";

const encodeMessage = (msg) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

document.querySelectorAll(".product-card").forEach((card) => {
  const productName = card.dataset.product;
  const sizeSelect = card.querySelector(".size-select");
  const priceEl = card.querySelector(".price");
  const orderBtn = card.querySelector(".order-btn");

  const updateCard = () => {
    const option = sizeSelect.selectedOptions[0];
    const size = option.value;
    const price = option.dataset.price;
    priceEl.textContent = `₹${price}`;
    const message = `Hi, I would like to order ${productName} - ${size} for ₹${price}.`;
    orderBtn.href = encodeMessage(message);
  };

  sizeSelect.addEventListener("change", updateCard);
  updateCard();
});

const form = document.getElementById("whatsapp-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      "Hi, I would like to place an order:",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Product: ${data.get("product")}`,
      `Size: ${data.get("size")}`,
      `Delivery Address: ${data.get("address")}`,
      `Additional Notes: ${data.get("notes") || "N/A"}`,
    ].join("\n");

    window.open(encodeMessage(message), "_blank", "noopener,noreferrer");
  });
}

const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}
