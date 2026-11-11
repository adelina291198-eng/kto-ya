// ===== ССЫЛКА НА СОЦСЕТЬ =====
// Вставь свою ссылку между кавычками, например "https://t.me/твой_ник"
const MOY_KONTAKT = "";
// =============================

(function () {
  // Кнопки «Написать мне»
  const links = document.querySelectorAll(".contact-link");
  const btn = document.getElementById("contact-btn");
  const hint = document.getElementById("contact-hint");
  if (MOY_KONTAKT) {
    links.forEach((a) => {
      a.href = MOY_KONTAKT;
      a.target = "_blank";
      a.rel = "noopener";
    });
  } else {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      hint.hidden = false;
    });
  }

  // Картинка поближе
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lb-img");
  const cap = document.getElementById("lb-cap");
  document.querySelectorAll(".shot").forEach((s) => {
    s.addEventListener("click", () => {
      img.src = s.dataset.full;
      img.alt = s.dataset.cap;
      cap.textContent = s.dataset.cap;
      box.showModal();
    });
  });
  document.getElementById("lb-close").addEventListener("click", () => box.close());
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });

  // Работа без интернета
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
