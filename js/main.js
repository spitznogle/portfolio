// ------------------------------
// Tab Switching
// ------------------------------
function openTab(evt, tabName) {
  // Hide all tab contents
  const tabcontent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove "active" class from all buttons
  const tabbuttons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabbuttons.length; i++) {
    tabbuttons[i].classList.remove("active");
  }

  // Show current tab and mark button active
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// ------------------------------
// Copy Code Button Functionality
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      const codeBlock = btn.closest(".tab-content").querySelector("pre");

      if (!codeBlock) {
        console.error("No code block found to copy");
        return;
      }

      const code = codeBlock.innerText;

      navigator.clipboard.writeText(code).then(() => {
        btn.innerText = "Copied!";
        setTimeout(() => btn.innerText = "Copy", 1500);
        });
    });
  });
});
