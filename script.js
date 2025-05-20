// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Navigation
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const header = document.querySelector("header");

  // Toggle navigation
  burger.addEventListener("click", () => {
    nav.classList.toggle("active");

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger animation
    burger.classList.toggle("toggle");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (nav.classList.contains("active") && !event.target.closest("nav")) {
      nav.classList.remove("active");
      burger.classList.remove("toggle");

      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    }
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          burger.classList.remove("toggle");
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Animate skill bars on scroll
  const skillSection = document.querySelector(".skills");
  const skillLevels = document.querySelectorAll(".skill-level");

  // Set initial width to 0
  skillLevels.forEach((level) => {
    level.style.width = "0";
  });

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Function to animate skill bars
  function animateSkillBars() {
    if (isInViewport(skillSection)) {
      skillLevels.forEach((level) => {
        const width = level.getAttribute("data-level");
        level.style.width = width;
      });
      // Remove event listener once animation is triggered
      window.removeEventListener("scroll", animateSkillBars);
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", animateSkillBars);
  // Check on initial load
  animateSkillBars();

  // Form submission
  const contactForm = document.getElementById("contactForm");

  // Typing effect for code container
  const codeElement = document.querySelector(".code-container code");
  if (codeElement) {
    const text = codeElement.innerHTML;
    codeElement.innerHTML = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        codeElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 20);
      }
    };

    // Start typing effect when element is in viewport
    const startTypingWhenVisible = () => {
      if (isInViewport(codeElement.parentElement)) {
        typeWriter();
        window.removeEventListener("scroll", startTypingWhenVisible);
      }
    };

    window.addEventListener("scroll", startTypingWhenVisible);
    // Check on initial load
    startTypingWhenVisible();
  }
});
