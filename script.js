// ============================================
// BLOGR LANDING PAGE — JavaScript
// Navigation: Hamburger toggle + Dropdown menus
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const dropdownButtons = document.querySelectorAll(".nav__link--dropdown");

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
});
