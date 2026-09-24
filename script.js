
"use strict";

/* ================================
   MOBILE MENU
================================ */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

/* ================================
   NAVBAR SCROLL EFFECT
================================ */

const header = document.getElementById("header");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/* ================================
   FAQ ACCORDION
================================ */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach(otherItem => {
      otherItem.classList.remove("active");

      const otherQuestion = otherItem.querySelector(".faq-question");
      if (otherQuestion) {
        otherQuestion.setAttribute("aria-expanded", "false");
      }
    });

    if (!isActive) {
      item.classList.add("active");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

/* ================================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

/* ================================
   CURRENT YEAR
================================ */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ================================
   CONTACT FORM
================================ */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// ==========================================
// bright web studio  CONTACT FORM
// ==========================================

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value.trim();
    const message = document.getElementById("message").value.trim();

    // ==========================================
    // YOUR WHATSAPP NUMBER
    // Replace this with your real WhatsApp number
    // Country code ke saath, + sign ke baghair
    // Example: 923001234567
    // ==========================================

    const whatsappNumber = "923242551234";

    // Create WhatsApp message
    const whatsappMessage =
      `Hello Bright Web Studio!%0A%0A` +
      `*New Project Request*%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Email: ${encodeURIComponent(email)}%0A` +
      `Service: ${encodeURIComponent(service || "Not specified")}%0A` +
      `Project Details: ${encodeURIComponent(message)}`;

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Show status
    formStatus.textContent = "Opening WhatsApp...";
    formStatus.style.display = "block";

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // ==========================================
    // OPTIONAL NETLIFY FORM SUBMISSION
    // ==========================================

    try {
      const formData = new FormData(contactForm);

      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(formData).toString()
      });

      formStatus.textContent =
        "Request ready! WhatsApp has been opened.";
      
      // Reset form
      contactForm.reset();

    } catch (error) {
      console.error("Form submission error:", error);

      formStatus.textContent =
        "WhatsApp has been opened. Please send the message there.";
    }
  });
}
