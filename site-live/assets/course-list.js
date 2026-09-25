(function () {
  const input = document.getElementById("course-search");
  const rows = Array.from(document.querySelectorAll("[data-course-row]"));
  const countEl = document.getElementById("course-count");
  const total = rows.length;

  function applyFilter() {
    const q = (input.value || "").trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const haystack = row.getAttribute("data-search") || "";
      const match = !q || haystack.includes(q);
      row.style.display = match ? "" : "none";
      if (match) visible += 1;
    });
    if (countEl) countEl.textContent = `${visible} of ${total} courses`;
  }

  if (input) {
    input.addEventListener("input", applyFilter);
    applyFilter();
  }

  document.querySelectorAll("[data-info-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("data-info-toggle"));
      if (!panel) return;
      const isHidden = panel.classList.contains("hidden");
      panel.classList.toggle("hidden");
      btn.textContent = isHidden ? "Hide admission info ↑" : "Show admission info →";
    });
  });
})();
