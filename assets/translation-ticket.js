(function () {
  const form = document.getElementById("translation-ticket");
  if (!form) return;
  const checkboxes = Array.from(form.querySelectorAll('input[type="checkbox"]'));
  const daysInput = document.getElementById("translation-days");
  const sendBtn = document.getElementById("translation-send");
  const confirmEl = document.getElementById("translation-confirm");

  function checkValidity() {
    const hasDoc = checkboxes.some((c) => c.checked);
    const hasDays = daysInput && daysInput.value.trim().length > 0;
    const isValid = hasDoc && hasDays;

    if (isValid) {
      sendBtn.disabled = false;
      sendBtn.className = "mt-5 rounded-full bg-[#123a70] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0e2c56] cursor-pointer transition shadow-sm";
    } else {
      sendBtn.disabled = true;
      sendBtn.className = "mt-5 rounded-full bg-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed opacity-60 transition";
    }
  }

  checkboxes.forEach((c) => c.addEventListener("change", checkValidity));
  if (daysInput) {
    daysInput.addEventListener("input", checkValidity);
    daysInput.addEventListener("change", checkValidity);
  }

  // Initial state check
  checkValidity();

  function buildMessage() {
    const chosen = checkboxes.filter((c) => c.checked).map((c) => c.value);
    const lines = [
      "Translation order request:",
      "",
      "Documents to translate:",
      ...(chosen.length ? chosen.map((d) => `- ${d}`) : ["- (none selected yet)"]),
      "",
      daysInput.value ? `Days needed for translation: ${daysInput.value}` : "Days needed for translation: (not specified)",
    ];
    return lines.join("\n");
  }

  sendBtn.addEventListener("click", () => {
    if (sendBtn.disabled) return;
    const message = buildMessage();
    window.open(`https://wa.me/923700171997?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    if (confirmEl) confirmEl.classList.remove("hidden");
  });
})();
