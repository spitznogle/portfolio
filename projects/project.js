document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // Tab Switching
  // ------------------------------
  const buttons = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-content");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      // Deactivate all buttons and panels
      buttons.forEach(b => b.classList.remove("active"));
      panels.forEach(p => {
        p.classList.remove("active");
        p.style.display = "none";
      });

      // Activate clicked button and its panel
      btn.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) {
        panel.classList.add("active");
        panel.style.display = "block";
      }
    });
  });

  // ------------------------------
  // Copy Code Buttons
  // ------------------------------
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.previousElementSibling.querySelector("code");
      if (!code) return;

      navigator.clipboard.writeText(code.innerText)
        .then(() => {
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.textContent = "Copy Code";
          }, 1500);
        })
        .catch(err => console.error("Copy failed:", err));
    });
  });
});
