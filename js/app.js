document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("reveal-ready");

  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = document.querySelector(".menu-toggle");
  var panel = document.querySelector(".mobile-panel");
  if (toggle && panel) {
    var closeMenu = function () {
      toggle.classList.remove("open");
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  var revealTargets = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  if (typeof SITE_CONFIG !== "undefined") {
    document.querySelectorAll("[data-config]").forEach(function (el) {
      var key = el.getAttribute("data-config");
      var value = SITE_CONFIG[key];
      if (!value) return;
      if (el.tagName === "A") {
        if (key === "instagramUrl") el.href = value;
        else if (key === "tiktokUrl") el.href = value;
        else if (key === "whatsappNumber")
          el.href = "https://wa.me/" + value.replace(/\D/g, "");
        else if (key === "emailAddress") el.href = "mailto:" + value;
      } else {
        el.textContent = value;
      }
    });
  }

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent =
          "Formulário estático de demonstração — em um site publicado, este briefing seria enviado por e-mail ou integrado a um serviço de formulários.";
        note.classList.add("show");
      }
      form.reset();
    });
  }

  var modal = document.querySelector(".modal-overlay");
  if (modal) {
    var modalTitle = modal.querySelector("[data-modal-title]");
    var modalCategory = modal.querySelector("[data-modal-category]");
    var modalDesc = modal.querySelector("[data-modal-desc]");
    var modalTags = modal.querySelector("[data-modal-tags]");
    var modalMedia = modal.querySelector("[data-modal-media]");
    var modalNum = modal.querySelector("[data-modal-num]");

    var openModal = function (card) {
      var title = card.getAttribute("data-title");
      var category = card.getAttribute("data-category");
      var desc = card.getAttribute("data-desc");
      var tags = (card.getAttribute("data-tags") || "").split(",").filter(Boolean);
      var num = card.getAttribute("data-num");
      var img = card.getAttribute("data-img");

      if (modalTitle) modalTitle.textContent = title || "";
      if (modalCategory) modalCategory.textContent = category || "";
      if (modalDesc) modalDesc.textContent = desc || "";
      if (modalNum) modalNum.textContent = num || "";
      if (modalTags) {
        modalTags.innerHTML = "";
        tags.forEach(function (t) {
          var span = document.createElement("span");
          span.textContent = t.trim();
          modalTags.appendChild(span);
        });
      }
      if (modalMedia) {
        var label = modalMedia.querySelector(".img-label");
        var tag = modalMedia.querySelector(".img-tag");
        if (label) label.textContent = "INSIRA A IMAGEM DO PROJETO AQUI";
        if (tag) tag.textContent = img || "";
      }
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      modal.setAttribute("aria-hidden", "false");
    };

    var closeModal = function () {
      modal.classList.remove("open");
      document.body.style.overflow = "";
      modal.setAttribute("aria-hidden", "true");
    };

    document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(btn.closest(".p-item"));
      });
    });

    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }
});
