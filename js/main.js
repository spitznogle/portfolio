// ==============================
// Project Manager JS
// ==============================

// ------------------------------
// Tab Switching
// ------------------------------
function openTab(evt, tabName) {
  const container = evt.currentTarget.closest(".project-card, .modal-content");
  if (!container) return;

  // Hide all tab contents
  container.querySelectorAll(".tab-content").forEach(tc => tc.style.display = "none");

  // Remove active class from all buttons
  container.querySelectorAll(".tab-button").forEach(tb => tb.classList.remove("active"));

  // Show selected tab
  const activeTab = container.querySelector(`#${tabName}`);
  if (activeTab) activeTab.style.display = "block";

  // Mark button active
  evt.currentTarget.classList.add("active");
}

// ------------------------------
// Project Sorting
// ------------------------------
const grid = document.querySelector(".project-grid");

if (grid) {
  document.querySelectorAll(".sort-controls button").forEach(btn => {
    btn.addEventListener("click", () => {
      const sortType = btn.dataset.sort;

      const cards = Array.from(grid.children);

      const sorted = cards.sort((a, b) => {
        const aVal = a.dataset[sortType];
        const bVal = b.dataset[sortType];

        if (!aVal || !bVal) return 0;

        if (sortType === "date") return new Date(bVal) - new Date(aVal);
        if (sortType === "type") return aVal.localeCompare(bVal);

        return 0;
      });

      sorted.forEach(card => grid.appendChild(card));
    });
  });
}

// ------------------------------
// Modal and Copy Code Buttons
// ------------------------------
const modal = document.querySelector(".modal");
const modalBody = modal?.querySelector(".modal-body");
const closeModal = modal?.querySelector(".close-modal");

document.querySelectorAll(".project-card").forEach(card => {
  // Open modal on card click (ignore tab buttons and copy buttons)
  card.addEventListener("click", e => {
    if (e.target.closest(".tab-button") || e.target.closest(".copy-btn")) return;

    if (modalBody && modal) {
      modalBody.innerHTML = card.innerHTML;
      modalBody.scrollTop = 0;
      modal.classList.remove("hidden");
      Prism.highlightAll();
    }
  });

  // Copy buttons
  card.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation(); // Prevent modal open
      const code = btn.closest(".tab-content")?.querySelector("code");
      if (!code) return;

      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.innerText = "Copied!";
        setTimeout(() => btn.innerText = "Copy", 1500);
      });
    });
  });
});

// Close modal
if (closeModal && modal) {
  closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}
