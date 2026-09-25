(function () {
  const input = document.getElementById("university-search");
  const cards = Array.from(document.querySelectorAll("[data-uni-card]"));
  const countEl = document.getElementById("university-count");
  const total = cards.length;

  function applyFilter() {
    const q = (input.value || "").trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const haystack = (card.getAttribute("data-search") || "");
      const match = !q || haystack.includes(q);
      card.style.display = match ? "" : "none";
      if (match) visible += 1;
    });
    if (countEl) countEl.textContent = `${visible} of ${total} universities`;
  }

  if (input) {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("q");
    if (initial) input.value = initial.replace(/\+/g, " ");
    input.addEventListener("input", applyFilter);
    applyFilter();
  }
})();
