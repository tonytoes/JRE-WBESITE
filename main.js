document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiffy Slider
  const slider = new SwiffySlider('#swiffy-animation', {
    autoplay: true,           // Enable autoplay
    autoplayInterval: 3000,   // Set interval for autoplay (3 seconds)
    loop: true,               // Enable looping (it will return to the first slide after the last one)
    navigation: true,         // Show navigation arrows
    indicators: true,         // Show indicators for navigation
    navAutohide: true,        // Auto-hide navigation when not hovered
  });

  // Initialize the slider
  slider.init();
});


document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.querySelector('.pre-btn');
  const nextButton = document.querySelector('.nxt-btn');
  const productContainer = document.querySelector('.product-container');

  let currentIndex = 0; // Track the current visible product index
  const productCards = document.querySelectorAll('.product-card');
  const totalProducts = productCards.length;
  const productsPerSlide = 4; // Show 4 products per slide

  // Function to update the scroll position based on the current index
  const updateScrollPosition = () => {
    const containerWidth = productContainer.offsetWidth; // Get the width of the container
    const scrollAmount = containerWidth * currentIndex; // Calculate the scroll position for 4 products at a time
    productContainer.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });

    // Disable previous button on the first slide
    prevButton.disabled = currentIndex === 0;
  };

  // Next button functionality: Move the container right
  nextButton.addEventListener('click', () => {
    if (currentIndex < totalProducts / productsPerSlide - 1) {
      currentIndex++; // Increment the index to show the next set of 4 products
      updateScrollPosition(); // Scroll right by one container width
    }
  });

  // Previous button functionality: Move the container left
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--; // Decrement the index to show the previous set of 4 products
      updateScrollPosition(); // Scroll left by one container width
    }
  });

  // Recalculate the container width on window resize
  window.addEventListener('resize', () => {
    const containerWidth = productContainer.offsetWidth;
    updateScrollPosition(); // Adjust the scroll position after resizing
  });

  // Initialize the slider to set correct position on load
  updateScrollPosition();
});


function showSideBar() {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}
function hideSideBar() {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
}

window.addEventListener("scroll", function () {
  var header = document.querySelector('.header-center');
  header.classList.toggle("sticky", window.scrollY > 0);
});

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(".btn_search .icon-search");
  const searchContainer = document.querySelector(".header-search");
  const closeIcon = document.querySelector(".header-search .fa-x");
  const searchLink = document.querySelector(".btn_search a"); // The wrapping <a> tag

  // Prevent hyperlink behavior
  searchLink.addEventListener("click", (event) => {
    event.preventDefault();
  });

  // Show the search container
  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Ensure link behavior is blocked
    searchContainer.classList.add("visible");
  });

  // Close the search container
  closeIcon.addEventListener("click", () => {
    searchContainer.classList.remove("visible");
  });

  // Optional: Close when clicking outside the search container
  document.addEventListener("click", (event) => {
    if (
      !searchContainer.contains(event.target) &&
      !searchButton.contains(event.target)
    ) {
      searchContainer.classList.remove("visible");
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Select the account dropdown toggle and the dropdown menu
  const accountToggle = document.querySelector("#header_ac a.dropdown-toggle");
  const accountDropdown = document.querySelector(".account-link-toggle");

  // Add event listener for the account toggle click
  accountToggle.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior (no navigation)

    // Toggle the visibility of the account dropdown
    if (accountDropdown.style.display === "none" || accountDropdown.style.display === "") {
      accountDropdown.style.display = "block";
    } else {
      accountDropdown.style.display = "none";
    }

    // Close other dropdowns (if any)
    closeOtherDropdowns("account-link-toggle");
  });

  // Function to close other dropdowns
  function closeOtherDropdowns(except) {
    const dropdowns = [
      "account-link-toggle", // Add other dropdowns if needed (like "cart-dropdown", etc.)
    ];

    dropdowns.forEach(function (dropdown) {
      if (dropdown !== except) {
        const element = document.querySelector(`.${dropdown}`);
        if (element) {
          element.style.display = "none";
        }
      }
    });
  }

  // Close dropdowns when clicking anywhere else on the document
  document.addEventListener("click", function (event) {
    if (!accountToggle.contains(event.target) && !accountDropdown.contains(event.target)) {
      accountDropdown.style.display = "none";
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const cartDropdown = document.querySelector("top-right .dropdown-menu");

  // Toggle dropdown visibility
  cartButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior if it's a form button
    const isVisible = cartDropdown.style.display === "block";
    cartDropdown.style.display = isVisible ? "none" : "block";
  });

  // Close dropdown if clicking outside
  document.addEventListener("click", (event) => {
    if (!cartButton.contains(event.target) && !cartDropdown.contains(event.target)) {
      cartDropdown.style.display = "none";
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.querySelector("#cart .btn");
  const cartDropdown = document.querySelector("#cart .dropdown-menu");

  // Toggle dropdown visibility
  cartButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior if it's a form button
    const isVisible = cartDropdown.style.display === "block";
    cartDropdown.style.display = isVisible ? "none" : "block";
  });

  // Close dropdown if clicking outside
  document.addEventListener("click", (event) => {
    if (!cartButton.contains(event.target) && !cartDropdown.contains(event.target)) {
      cartDropdown.style.display = "none";
    }
  });
});

let cartItems = []; // Array to hold cart items

// Function to update the cart total display
function updateCartTotal() {
  const cartTotalElement = document.getElementById('cart-total');
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartTotalElement.textContent = totalItems;
}

// Function to update the dropdown menu with subtotal
function updateCartDropdown() {
  const dropdownMenu = document.querySelector('.cart-items');
  dropdownMenu.innerHTML = ''; // Clear previous content

  if (cartItems.length === 0) {
    dropdownMenu.innerHTML = '<li class="empty-cart">Your Shopping cart is empty!</li>';
    return;
  }

  // Add each item to the dropdown
  cartItems.forEach(item => {
    const subtotal = (item.price * item.quantity).toFixed(2); // Calculate subtotal for this item

    const listItem = document.createElement('li');
    listItem.classList.add('cart-item');
    listItem.innerHTML = `
      <div class="cart-item-content">
        <img src="${item.img}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <span class="item-name">${item.name}</span>
          <span class="item-quantity">x${item.quantity}</span>
          <span class="item-subtotal">₱${subtotal}</span>
        </div>
        <button class="remove-item" data-id="${item.id}">Remove</button>
      </div>
    `;
    dropdownMenu.appendChild(listItem);
  });

  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = button.getAttribute('data-id');
      removeItemFromCart(itemId);
    });
  });

  // Calculate and display the total price (cart subtotal)
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  const totalPriceElement = document.createElement('li');
  totalPriceElement.classList.add('total-price');
  totalPriceElement.innerHTML = `Subtotal: ₱${totalPrice}`;
  dropdownMenu.appendChild(totalPriceElement);
}

// Function to add an item to the cart
function addItemToCart(item) {
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity; // Increment quantity
  } else {
    cartItems.push(item); // Add new item
  }

  updateCartTotal(); // Update the cart total
  updateCartDropdown(); // Update the dropdown menu
}

// Function to remove an item from the cart
function removeItemFromCart(itemId) {
  cartItems = cartItems.filter(item => item.id !== itemId);
  updateCartTotal(); // Update the cart total
  updateCartDropdown(); // Update the dropdown menu
}

// Mock event: Adding items to the cart
document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.card-btn'); // Buttons on product cards

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = {
        id: button.getAttribute('data-id'), // Product ID
        name: button.getAttribute('data-name'), // Product name
        img: button.getAttribute('data-img'), // Product image URL
        price: parseFloat(button.getAttribute('data-price')), // Price per item
        quantity: 1, // Default quantity
      };

      addItemToCart(item);
    });
  });
});

// Toggle sidebar visibility
function showSideBar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}
function hideSideBar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}

// Sticky header on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector('.header-center');
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(".btn_search .icon-search");
  const searchContainer = document.querySelector(".header-search");
  const closeIcon = document.querySelector(".header-search .fa-x");
  const searchLink = document.querySelector(".btn_search a");

  // Prevent hyperlink behavior
  searchLink.addEventListener("click", (event) => {
    event.preventDefault();
  });

  // Show the search container
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    searchContainer.classList.add("visible");
  });

  // Close the search container
  closeIcon.addEventListener("click", () => {
    searchContainer.classList.remove("visible");
  });

  // Optional: Close when clicking outside the search container
  document.addEventListener("click", (event) => {
    if (!searchContainer.contains(event.target) && !searchButton.contains(event.target)) {
      searchContainer.classList.remove("visible");
    }
  });
});

// Account dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  const accountToggle = document.querySelector("#header_ac a.dropdown-toggle");
  const accountDropdown = document.querySelector(".account-link-toggle");

  accountToggle.addEventListener("click", function (event) {
    event.preventDefault();
    accountDropdown.style.display = accountDropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function (event) {
    if (!accountToggle.contains(event.target) && !accountDropdown.contains(event.target)) {
      accountDropdown.style.display = "none";
    }
  });
});
