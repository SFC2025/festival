/*
script.js
Funciones: slider (dots + autoplay + pausa en hover), parallax suave,
modal accesible (focus trap + ESC + overlay), menú móvil, dark mode persistente.

Notas:
- Velocidad slider: cambiar AUTO_MS.
- Parallax: ajustar PARALLAX_FACTOR.
- Si no existen algunos elementos en el DOM, el script sigue sin romper.
*/

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // CONFIG
  // =========================
  const AUTO_MS = 5000; // tiempo de autoplay del slider
  const PARALLAX_FACTOR = 0.18; // intensidad del parallax

  // =========================
  // SLIDER (Hero)
  // =========================
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots");
  const hero = document.querySelector(".hero");

  let index = 0;
  let autoTimer = null;

  // Crear dots según cantidad de slides
  if (slides.length && dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "dot";
      b.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
      b.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(b);
    });
  }

  function update() {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
      s.setAttribute("aria-hidden", i === index ? "false" : "true");
      s.style.willChange = "transform, opacity";
    });
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }
  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // Autoplay con pausa en hover
  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, AUTO_MS);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }
  if (hero) {
    hero.addEventListener("mouseenter", stopAuto, { passive: true });
    hero.addEventListener("mouseleave", startAuto, { passive: true });
  }

  // Teclado (izq/der) para mover el slider
  document.addEventListener("keydown", (e) => {
    if (!slides.length) return;
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Init slider
  if (slides.length) {
    goTo(0);
    startAuto();
  }

  // =========================
  // PARALLAX suave en scroll
  // =========================
  let ticking = false;
  function onScroll() {
    if (!slides.length) return;
    const y = window.scrollY || window.pageYOffset;
    slides.forEach((s) => {
      // mover muy levemente todo el slide
      s.style.transform = `translateY(${y * PARALLAX_FACTOR}px)`;
    });
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  // =========================
  // MODAL de contacto accesible
  // =========================
  const openModalBtn = document.getElementById("openModal");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("closeModal");

  let lastFocused = null;

  function getFocusable(container) {
    return container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
  }

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    const f = getFocusable(modal);
    if (f.length) f[0].focus();

    function trap(e) {
      if (e.key !== "Tab") return;
      const focusables = getFocusable(modal);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    modal.addEventListener("keydown", trap);
    modal.dataset.trap = "1";
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    if (lastFocused) lastFocused.focus();
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(); // cerrar con click en overlay
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") closeModal();
    });
  }

  // =========================
  // MENÚ MÓVIL (hamburguesa)
  // =========================
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".nav");
  if (hamburger && nav) {
    // ===== MENU MOBILE: cerrar al tocar afuera + al tocar un link =====
    const nav = document.querySelector(".nav");
    const hamburger = document.querySelector(".hamburger");

    if (nav && hamburger) {
      // Toggle menú
      hamburger.addEventListener("click", (e) => {
        e.stopPropagation(); // evita que el click “cuente” como click afuera
        nav.classList.toggle("open");
      });

      // Click afuera: cierra el menú
      document.addEventListener("click", (e) => {
        const clickDentroDelMenu = nav.contains(e.target);
        const clickEnHamburguesa = hamburger.contains(e.target);

        if (!clickDentroDelMenu && !clickEnHamburguesa) {
          nav.classList.remove("open");
        }
      });

      // Click en cualquier link del menú: cierra
      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("open");
        });
      });
    }
    document.addEventListener("touchstart", (e) => {
      const clickDentroDelMenu = nav.contains(e.target);
      const clickEnHamburguesa = hamburger.contains(e.target);

      if (!clickDentroDelMenu && !clickEnHamburguesa) {
        nav.classList.remove("open");
      }
    });

    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) nav.classList.remove("open");
    });
  }

  // =========================
  // DARK MODE persistente
  // =========================
  const toggle = document.getElementById("darkToggle");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme"); // 'dark' | 'light' | null

  function applyTheme(mode) {
    document.body.classList.toggle("dark", mode === "dark");
    if (toggle)
      toggle.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  }

  applyTheme(savedTheme || "light");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    });
  }
});
