// ============================================
// BLOGR LANDING PAGE — JavaScript
// Navigation: Hamburger toggle + Dropdown menus
// Features: Navbar Scroll + Smooth SaaS Animations
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const dropdownButtons = document.querySelectorAll(".nav__link--dropdown");

  // -- Navbar Scroll Effect --
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
  });

  // -- Hamburger toggle --
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-active");
    navToggle.setAttribute("aria-expanded", isOpen);

    // Close all dropdowns when closing menu
    if (!isOpen) {
      closeAllDropdowns();
    }
  });

  // -- Dropdown toggles --
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.closest(".nav__item--dropdown");
      const isOpen = parent.classList.contains("is-open");

      // Close other dropdowns
      closeAllDropdowns();

      // Toggle current
      if (!isOpen) {
        parent.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // -- Close dropdowns when clicking outside --
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".nav__item--dropdown") &&
      !e.target.closest(".nav__hamburger")
    ) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    document.querySelectorAll(".nav__item--dropdown").forEach((item) => {
      item.classList.remove("is-open");
    });
    dropdownButtons.forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
    });
  }

  // ============================================
  // TYPEWRITER EFFECT (Hero Title)
  // ============================================
  const heroTitle = document.querySelector(".hero__title");
  if (heroTitle) {
    const textToType = "A modern publishing platform";
    let charIndex = 0;
    let isDeleting = false;

    // Clear the hardcoded text initially
    heroTitle.innerHTML = "";

    function typeWriter() {
      // Get current substring depending on state
      const currentText = textToType.substring(0, charIndex);
      
      // Inject the text without the blinking cursor
      heroTitle.innerHTML = currentText;

      // Dynamic typing speeds: deletion is twice as fast as typing
      let typeSpeed = isDeleting ? 40 : 80;

      // Logic for pausing at ends
      if (!isDeleting && charIndex === textToType.length) {
        // Pause heavily at the end of typing
        typeSpeed = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Pause softly before starting to type again
        isDeleting = false;
        typeSpeed = 600;
      }

      // Decrement or increment character count
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      setTimeout(typeWriter, typeSpeed);
    }

    // Start the loop slightly after load
    setTimeout(typeWriter, 500);
  }

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--active");
          // Once revealed, unobserve to save performance
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% is visible
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
});
