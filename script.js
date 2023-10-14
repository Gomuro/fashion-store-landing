// Get the loading animation element
let loadingAnimation = document.getElementById("loading-animation");

// Show the loading animation while the page is loading
window.addEventListener("beforeunload", function () {
  loadingAnimation.style.display = "block";
});

// Hide the loading animation when the page content is fully loaded
window.addEventListener("load", function () {
  loadingAnimation.style.display = "none";
});

// Initialize the cart with empty items
let cart = [];

// Function to open the cart modal
function openCartModal() {
  var modal = document.getElementById("cartModal");
  modal.style.display = "block";
  updateCartDisplay();
}

// Function to close the cart modal
function closeCartModal() {
  var modal = document.getElementById("cartModal");
  modal.style.display = "none";
}

// Function to update the cart display in the modal
function updateCartDisplay() {
  let cartItems = document.querySelector(".cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  for (let item of cart) {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    let itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    let itemName = document.createElement("h3");
    itemName.innerText = item.name;

    let itemPrice = document.createElement("p");
    itemPrice.innerText = "Price: $" + item.price;

    itemDetails.appendChild(itemName);
    itemDetails.appendChild(itemPrice);

    let itemQuantity = document.createElement("div");
    itemQuantity.classList.add("item-quantity");

    let quantityLabel = document.createElement("label");
    quantityLabel.innerText = "Quantity:";

    let quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = item.quantity;
    quantityInput.min = "1";

    // Add event listener to update item quantity in the cart
    quantityInput.addEventListener("change", function () {
      item.quantity = parseInt(quantityInput.value);
      updateCartDisplay();
    });

    itemQuantity.appendChild(quantityLabel);
    itemQuantity.appendChild(quantityInput);

    cartItem.appendChild(itemDetails);
    cartItem.appendChild(itemQuantity);

    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", function () {
      removeItemFromCart(item);
      updateCartDisplay();
    });

    cartItem.appendChild(removeButton);

    cartItems.appendChild(cartItem);

    total += item.price * item.quantity;
  }

  // Update the total price
  let cartTotal = document.getElementById("cartTotal");
  cartTotal.innerText = "$" + total.toFixed(2);
}

// Function to add an item to the cart
function addItemToCart(product) {
  let found = false;

  for (let item of cart) {
    if (item.id === product.id) {
      item.quantity += 1;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  // Update the cart display
  updateCartDisplay();

  // Display the product added message in the modal
  displayProductAddedMessage(product);

  // Update local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayProductAddedMessage(product) {
  const addedProductModal = document.getElementById("productAddedModal");
  const addedProductMessage = document.getElementById("addedProductMessage");

  addedProductMessage.textContent = `${product.name} has been added to your cart.`;
  addedProductModal.style.display = "flex";
}

// Function to close the product added modal
function closeProductAddedModal() {
  const addedProductModal = document.getElementById("productAddedModal");
  addedProductModal.style.display = "none";
}

// Function to remove an item from the cart
function removeItemFromCart(item) {
  const index = cart.indexOf(item);
  if (index !== -1) {
    cart.splice(index, 1);
  }

  // Update local storage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add an event listener to open the modal when the cart icon/button is clicked
var cartButton = document.getElementById("openCartModal");
cartButton.addEventListener("click", openCartModal);

// Add an event listener to close the modal when the close (X) button is clicked
var closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener("click", closeCartModal);

// Add an event listener to close the modal when the "Continue Shopping" button is clicked
var continueShoppingButton = document.getElementById("closeButton");
continueShoppingButton.addEventListener("click", closeCartModal);

// Load the cart from local storage
const savedCart = localStorage.getItem("cart");
if (savedCart) {
  cart = JSON.parse(savedCart);
}

// Update the cart display
updateCartDisplay();

// Product data
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
  },
  {
    id: 2,
    name: "Product 2",
    price: 24.99,
  },
  {
    id: 3,
    name: "Product 3",
    price: 29.99,
  },
];

// Add event listeners to the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productId = parseInt(button.getAttribute("data-product-id"));
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    if (selectedProduct) {
      addItemToCart(selectedProduct);
    }
  });
});
// Function to handle form submission
function handleSubmitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Hide the contact form
  let contactForm = document.querySelector(".contact-form");
  contactForm.style.display = "none";

  // Display a success message
  let successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.innerHTML =
    "Thank you for your message! We'll get back to you shortly.";
  document.querySelector(".contact-content").appendChild(successMessage);

  // You can also clear the form fields if needed
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

// Add a submit event listener to the form
let contactForm = document.querySelector(".contact-form form");
contactForm.addEventListener("submit", handleSubmitForm);

// Function to handle newsletter form submission
function handleNewsletterForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Hide the newsletter form
  const newsletterForm = document.getElementById("newsletterForm");
  newsletterForm.style.display = "none";

  // Display the success message
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";
}

// Add a submit event listener to the newsletter form
const newsletterForm = document.getElementById("newsletterForm");
newsletterForm.addEventListener("submit", handleNewsletterForm);

document.addEventListener("DOMContentLoaded", function () {
  // Get the "Products" link in the navigation menu
  const productsLink = document.querySelector('a[href="#products"]');
  const aboutUsLink = document.querySelector('a[href="#about"]');
  const contactLink = document.querySelector('a[href="#contact"]');
  const ctaLink = document.querySelector('.cta a[href="#products"]');

  // Get the target section (the products section)
  const productsSection = document.getElementById("products");
  const aboutUsSection = document.getElementById("about");
  const contactSection = document.getElementById("contact");

  // Add a click event listener to the "Products" link
  productsLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Scroll to the products section with smooth behavior
    productsSection.scrollIntoView({ behavior: "smooth" });
  });

  // Add a click event listener to the "about us" link
  aboutUsLink.addEventListener("click", function (e) {
    e.preventDefault();

    aboutUsSection.scrollIntoView({ behavior: "smooth" });
  });

  // Add a click event listener to the "contact" link

  contactLink.addEventListener("click", function (e) {
    e.preventDefault();

    contactSection.scrollIntoView({ behavior: "smooth" });
  });

  ctaLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Scroll to the products section with smooth behavior
    productsSection.scrollIntoView({ behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const topButton = document.getElementById("back-to-top");

  // Show the button when the user scrolls down 20 pixels from the top
  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  });

  topButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
