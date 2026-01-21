/* ================= MOBILE NAVIGATION ================= */

// Hamburger and navigation menu elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

// Toggle mobile menu visibility
hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent immediate document click closure
  navMenu.classList.toggle("active");
});

// Prevent menu clicks from closing the menu
navMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Close menu when clicking outside
document.addEventListener("click", () => {
  navMenu.classList.remove("active");
});


/* ================= PRODUCT GALLERY ================= */

// Core gallery elements
const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".gallery-grid img");
const dots = document.querySelectorAll(".gallery-dots .dot");
const arrows = document.querySelectorAll(".gallery-arrow");

// Extract image sources from thumbnails
const galleryImages = Array.from(thumbnails).map(img => img.dataset.image);
let currentIndex = 0;

// Update gallery image, thumbnails, and dots
function updateGallery(index) {
  currentIndex = index;
  mainImage.src = galleryImages[currentIndex];

  thumbnails.forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// Handle thumbnail click
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateGallery(index);
  });
});

// Handle dot navigation click
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateGallery(index);
  });
});

// Handle arrow navigation click
arrows.forEach(arrow => {
  arrow.addEventListener("click", () => {
    const direction = arrow.dataset.direction;

    if (direction === "next") {
      updateGallery((currentIndex + 1) % galleryImages.length);
    } else {
      updateGallery(
        (currentIndex - 1 + galleryImages.length) % galleryImages.length
      );
    }
  });
});


/* ================= FRAGRANCE SELECTION ================= */

// Fragrance radio inputs
const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');

// Update main image when fragrance changes
fragranceRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.checked && radio.dataset.image) {
      mainImage.src = radio.dataset.image;
    }
  });
});

// Set initial gallery state
updateGallery(0);


/* ================= SUBSCRIPTION TOGGLE ================= */

// Subscription radio inputs and content containers
const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
const singleContent = document.getElementById("singleContent");
const doubleContent = document.getElementById("doubleContent");

// Toggle subscription content based on selection
purchaseRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "single") {
      singleContent.classList.remove("hidden");
      doubleContent.classList.add("hidden");
    } else {
      singleContent.classList.add("hidden");
      doubleContent.classList.remove("hidden");
    }
  });
});


/* ================= SCROLL-BASED COUNTER ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector(".four");

  // Reset all counters to zero
  function resetCounters() {
    counters.forEach(counter => {
      counter.textContent = "0%";
    });
  }

  // Animate counters to their target values
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let current = 0;
      const speed = 150;

      function updateCounter() {
        const increment = target / speed;
        current += increment;

        if (current < target) {
          counter.textContent = Math.ceil(current) + "%";
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + "%";
        }
      }

      updateCounter();
    });
  }

  // Observe section visibility to trigger animation
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resetCounters();
          animateCounters();
        } else {
          resetCounters();
        }
      });
    },
    { threshold: 0.5 }
  );

  if (section) observer.observe(section);
});
